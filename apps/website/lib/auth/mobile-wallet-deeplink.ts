"use client";

import bs58 from "bs58";
import nacl from "tweetnacl";

export type MobileWalletProvider =
  | "phantom"
  | "solflare";

export type MobileWalletFlowMode =
  | "login"
  | "link";

export type MobileWalletCallbackStage =
  | "connect"
  | "sign";

type MobileWalletFlow = {
  version: 1;
  state: string;
  provider: MobileWalletProvider;
  mode: MobileWalletFlowMode;
  next: string;
  useNativeReturn: boolean;
  createdAt: number;
  expiresAt: number;
  dappPublicKey: string;
  dappSecretKey: string;
  walletPublicKey?: string;
  walletSession?: string;
  address?: string;
  challengeId?: string;
  challengeExpiresAt?: string;
};

type ApiPayload = {
  success?: boolean;
  code?: string;
  error?: string;
  next?: string;
  challenge?: {
    id: string;
    message: string;
    expiresAt: string;
  };
  wallet?: {
    id: string;
    address: string;
    linkedAt: string;
  };
};

export type MobileWalletCallbackResult =
  | {
      kind: "redirect";
      url: string;
    }
  | {
      kind: "complete";
      url: string;
      message: string;
    };

const FLOW_PREFIX =
  "lifetopia:mobile-wallet-flow:";

const FLOW_TTL_MS =
  10 * 60 * 1000;

const PROVIDER_URLS = {
  phantom: {
    connect:
      "https://phantom.app/ul/v1/connect",
    signMessage:
      "https://phantom.app/ul/v1/signMessage",
    encryptionPublicKey:
      "phantom_encryption_public_key",
  },
  solflare: {
    connect:
      "https://solflare.com/ul/v1/connect",
    signMessage:
      "https://solflare.com/ul/v1/signMessage",
    encryptionPublicKey:
      "solflare_encryption_public_key",
  },
} as const;

function flowStorageKey(
  state: string,
): string {
  return `${FLOW_PREFIX}${state}`;
}

function randomState(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return bs58.encode(bytes);
}

function isRecord(
  value: unknown,
): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function isProvider(
  value: unknown,
): value is MobileWalletProvider {
  return (
    value === "phantom" ||
    value === "solflare"
  );
}

function isMode(
  value: unknown,
): value is MobileWalletFlowMode {
  return (
    value === "login" ||
    value === "link"
  );
}

function parseFlow(
  value: string | null,
): MobileWalletFlow | null {
  if (!value) {
    return null;
  }

  try {
    const parsed: unknown =
      JSON.parse(value);

    if (
      !isRecord(parsed) ||
      parsed.version !== 1 ||
      typeof parsed.state !==
        "string" ||
      !isProvider(
        parsed.provider,
      ) ||
      !isMode(parsed.mode) ||
      typeof parsed.next !==
        "string" ||
      typeof parsed.useNativeReturn !==
        "boolean" ||
      typeof parsed.createdAt !==
        "number" ||
      typeof parsed.expiresAt !==
        "number" ||
      typeof parsed.dappPublicKey !==
        "string" ||
      typeof parsed.dappSecretKey !==
        "string"
    ) {
      return null;
    }

    return parsed as MobileWalletFlow;
  } catch {
    return null;
  }
}

function removeExpiredFlows() {
  const now = Date.now();

  for (
    let index =
      localStorage.length - 1;
    index >= 0;
    index -= 1
  ) {
    const key =
      localStorage.key(index);

    if (
      !key?.startsWith(
        FLOW_PREFIX,
      )
    ) {
      continue;
    }

    const flow = parseFlow(
      localStorage.getItem(key),
    );

    if (
      !flow ||
      flow.expiresAt <= now
    ) {
      localStorage.removeItem(key);
    }
  }
}

function saveFlow(
  flow: MobileWalletFlow,
) {
  localStorage.setItem(
    flowStorageKey(flow.state),
    JSON.stringify(flow),
  );
}

function loadFlow(
  state: string,
): MobileWalletFlow {
  const flow = parseFlow(
    localStorage.getItem(
      flowStorageKey(state),
    ),
  );

  if (
    !flow ||
    flow.state !== state ||
    flow.expiresAt <= Date.now()
  ) {
    localStorage.removeItem(
      flowStorageKey(state),
    );

    throw new Error(
      "This mobile wallet request is missing or expired. Return to Lifetopia and start again.",
    );
  }

  return flow;
}

function clearFlow(state: string) {
  localStorage.removeItem(
    flowStorageKey(state),
  );
}

function getHttpsCallbackUrl(
  flow: Pick<
    MobileWalletFlow,
    "state" | "provider"
  >,
  stage: MobileWalletCallbackStage,
): string {
  const url = new URL(
    "/auth/wallet-mobile/callback",
    window.location.origin,
  );

  url.searchParams.set(
    "state",
    flow.state,
  );
  url.searchParams.set(
    "provider",
    flow.provider,
  );
  url.searchParams.set(
    "stage",
    stage,
  );

  return url.toString();
}

function getWalletRedirectUrl(
  flow: Pick<
    MobileWalletFlow,
    | "state"
    | "provider"
    | "useNativeReturn"
  >,
  stage: MobileWalletCallbackStage,
): string {
  const configuredScheme =
    process.env
      .NEXT_PUBLIC_COMMUNITYHUB_WALLET_SCHEME
      ?.trim()
      .replace(/:\/\/$/, "");

  if (
    configuredScheme &&
    flow.useNativeReturn
  ) {
    const query =
      new URLSearchParams({
        state: flow.state,
        provider: flow.provider,
        stage,
      });

    return `${configuredScheme}://wallet-auth?${query.toString()}`;
  }

  return getHttpsCallbackUrl(
    flow,
    stage,
  );
}

function buildConnectUrl(
  flow: MobileWalletFlow,
): string {
  const url = new URL(
    PROVIDER_URLS[
      flow.provider
    ].connect,
  );

  url.searchParams.set(
    "app_url",
    window.location.origin,
  );
  url.searchParams.set(
    "dapp_encryption_public_key",
    flow.dappPublicKey,
  );
  url.searchParams.set(
    "redirect_link",
    getWalletRedirectUrl(
      flow,
      "connect",
    ),
  );
  url.searchParams.set(
    "cluster",
    "mainnet-beta",
  );

  return url.toString();
}

function deriveSharedSecret(
  flow: MobileWalletFlow,
  walletPublicKey: string,
): Uint8Array {
  try {
    return nacl.box.before(
      bs58.decode(walletPublicKey),
      bs58.decode(
        flow.dappSecretKey,
      ),
    );
  } catch {
    throw new Error(
      "The wallet encryption response was invalid.",
    );
  }
}

function decryptWalletData(
  encryptedData: string,
  nonce: string,
  sharedSecret: Uint8Array,
): Record<string, unknown> {
  let opened: Uint8Array | null;

  try {
    opened = nacl.box.open.after(
      bs58.decode(encryptedData),
      bs58.decode(nonce),
      sharedSecret,
    );
  } catch {
    opened = null;
  }

  if (!opened) {
    throw new Error(
      "The wallet response could not be authenticated.",
    );
  }

  try {
    const parsed: unknown =
      JSON.parse(
        new TextDecoder().decode(
          opened,
        ),
      );

    if (!isRecord(parsed)) {
      throw new Error();
    }

    return parsed;
  } catch {
    throw new Error(
      "The wallet returned an invalid encrypted response.",
    );
  }
}

function encryptWalletPayload(
  payload: Record<string, unknown>,
  sharedSecret: Uint8Array,
): {
  nonce: string;
  data: string;
} {
  const nonce =
    nacl.randomBytes(
      nacl.box.nonceLength,
    );

  const encoded =
    new TextEncoder().encode(
      JSON.stringify(payload),
    );

  const encrypted =
    nacl.box.after(
      encoded,
      nonce,
      sharedSecret,
    );

  return {
    nonce: bs58.encode(nonce),
    data: bs58.encode(encrypted),
  };
}

async function readPayload(
  response: Response,
): Promise<ApiPayload> {
  return (await response
    .json()
    .catch(() => ({}))) as
    ApiPayload;
}

async function createChallenge(
  flow: MobileWalletFlow,
  address: string,
): Promise<ApiPayload["challenge"]> {
  const endpoint =
    flow.mode === "login"
      ? "/api/auth/wallet-login/challenge"
      : "/api/auth/wallet/challenge";

  const response = await fetch(
    endpoint,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({
        address,
      }),
    },
  );

  const payload =
    await readPayload(response);

  if (
    payload.code === "mfa_required"
  ) {
    throw new Error(
      "Complete the authenticator challenge, then start wallet linking again.",
    );
  }

  if (
    !response.ok ||
    !payload.success ||
    !payload.challenge
  ) {
    throw new Error(
      payload.error ??
        "The wallet authentication challenge could not be created.",
    );
  }

  return payload.challenge;
}

function buildSignMessageUrl(
  flow: MobileWalletFlow,
  challengeMessage: string,
): string {
  if (
    !flow.walletPublicKey ||
    !flow.walletSession
  ) {
    throw new Error(
      "The mobile wallet connection is incomplete.",
    );
  }

  const sharedSecret =
    deriveSharedSecret(
      flow,
      flow.walletPublicKey,
    );

  const encrypted =
    encryptWalletPayload(
      {
        session:
          flow.walletSession,
        message: bs58.encode(
          new TextEncoder().encode(
            challengeMessage,
          ),
        ),
        display: "utf8",
      },
      sharedSecret,
    );

  const url = new URL(
    PROVIDER_URLS[
      flow.provider
    ].signMessage,
  );

  url.searchParams.set(
    "dapp_encryption_public_key",
    flow.dappPublicKey,
  );
  url.searchParams.set(
    "nonce",
    encrypted.nonce,
  );
  url.searchParams.set(
    "redirect_link",
    getWalletRedirectUrl(
      flow,
      "sign",
    ),
  );
  url.searchParams.set(
    "payload",
    encrypted.data,
  );

  return url.toString();
}

async function verifySignature(
  flow: MobileWalletFlow,
  signature: Uint8Array,
): Promise<MobileWalletCallbackResult> {
  if (!flow.challengeId) {
    throw new Error(
      "The mobile wallet challenge is incomplete.",
    );
  }

  if (
    signature.length !==
    nacl.sign.signatureLength
  ) {
    throw new Error(
      "The wallet returned an invalid Ed25519 signature.",
    );
  }

  const endpoint =
    flow.mode === "login"
      ? "/api/auth/wallet-login/verify"
      : "/api/auth/wallet/verify";

  const body =
    flow.mode === "login"
      ? {
          challengeId:
            flow.challengeId,
          signature:
            bytesToBase64(
              signature,
            ),
          next: flow.next,
        }
      : {
          challengeId:
            flow.challengeId,
          signature:
            bytesToBase64(
              signature,
            ),
        };

  const response = await fetch(
    endpoint,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      cache: "no-store",
      body: JSON.stringify(body),
    },
  );

  const payload =
    await readPayload(response);

  if (
    !response.ok ||
    !payload.success
  ) {
    throw new Error(
      payload.error ??
        "The wallet proof could not be verified.",
    );
  }

  clearFlow(flow.state);

  if (flow.mode === "login") {
    if (!payload.next) {
      throw new Error(
        "The secure wallet session did not provide a return URL.",
      );
    }

    return {
      kind: "complete",
      url: payload.next,
      message:
        "Wallet ownership verified. Returning to CommunityHub…",
    };
  }

  if (!payload.wallet) {
    throw new Error(
      "The verified wallet record was not returned.",
    );
  }

  return {
    kind: "complete",
    url: "/account/wallet?mobileWallet=linked",
    message:
      "Your Solana wallet is securely linked.",
  };
}

export function startMobileWalletDeepLink(
  provider: MobileWalletProvider,
  mode: MobileWalletFlowMode,
  next: string,
): string {
  removeExpiredFlows();

  const keyPair =
    nacl.box.keyPair();

  const now = Date.now();

  const flow: MobileWalletFlow = {
    version: 1,
    state: randomState(),
    provider,
    mode,
    next,
    useNativeReturn:
      new URLSearchParams(
        window.location.search,
      ).get("androidApp") === "1",
    createdAt: now,
    expiresAt:
      now + FLOW_TTL_MS,
    dappPublicKey: bs58.encode(
      keyPair.publicKey,
    ),
    dappSecretKey: bs58.encode(
      keyPair.secretKey,
    ),
  };

  saveFlow(flow);

  return buildConnectUrl(flow);
}

export async function handleMobileWalletCallback(
  params: URLSearchParams,
): Promise<MobileWalletCallbackResult> {
  removeExpiredFlows();

  const state =
    params.get("state") ?? "";

  const stage =
    params.get("stage");

  if (
    !state ||
    (stage !== "connect" &&
      stage !== "sign")
  ) {
    throw new Error(
      "The mobile wallet callback is incomplete.",
    );
  }

  const flow = loadFlow(state);

  const callbackProvider =
    params.get("provider");

  if (
    callbackProvider !==
    flow.provider
  ) {
    clearFlow(state);
    throw new Error(
      "The mobile wallet provider did not match the request.",
    );
  }

  const walletError =
    params.get("errorMessage");

  if (
    params.has("errorCode") ||
    walletError
  ) {
    clearFlow(state);
    throw new Error(
      walletError ||
        "The mobile wallet request was cancelled.",
    );
  }

  const encryptedData =
    params.get("data");
  const nonce =
    params.get("nonce");

  if (!encryptedData || !nonce) {
    throw new Error(
      "The mobile wallet did not return an encrypted response.",
    );
  }

  if (stage === "connect") {
    const providerConfig =
      PROVIDER_URLS[
        flow.provider
      ];

    const walletPublicKey =
      params.get(
        providerConfig.encryptionPublicKey,
      );

    if (!walletPublicKey) {
      throw new Error(
        "The mobile wallet did not return its encryption key.",
      );
    }

    const sharedSecret =
      deriveSharedSecret(
        flow,
        walletPublicKey,
      );

    const connected =
      decryptWalletData(
        encryptedData,
        nonce,
        sharedSecret,
      );

    const address =
      typeof connected.public_key ===
      "string"
        ? connected.public_key
        : null;

    const walletSession =
      typeof connected.session ===
      "string"
        ? connected.session
        : null;

    if (!address || !walletSession) {
      throw new Error(
        "The mobile wallet did not provide an address and session.",
      );
    }

    const challenge =
      await createChallenge(
        flow,
        address,
      );

    if (!challenge) {
      throw new Error(
        "The mobile wallet challenge was unavailable.",
      );
    }

    const updatedFlow: MobileWalletFlow = {
      ...flow,
      walletPublicKey,
      walletSession,
      address,
      challengeId:
        challenge.id,
      challengeExpiresAt:
        challenge.expiresAt,
    };

    saveFlow(updatedFlow);

    return {
      kind: "redirect",
      url: buildSignMessageUrl(
        updatedFlow,
        challenge.message,
      ),
    };
  }

  if (
    !flow.walletPublicKey ||
    !flow.challengeId ||
    !flow.challengeExpiresAt ||
    new Date(
      flow.challengeExpiresAt,
    ).getTime() <= Date.now()
  ) {
    clearFlow(state);
    throw new Error(
      "The mobile wallet signing challenge expired. Start again.",
    );
  }

  const sharedSecret =
    deriveSharedSecret(
      flow,
      flow.walletPublicKey,
    );

  const signed = decryptWalletData(
    encryptedData,
    nonce,
    sharedSecret,
  );

  const signatureValue =
    typeof signed.signature ===
    "string"
      ? signed.signature
      : null;

  if (!signatureValue) {
    throw new Error(
      "The mobile wallet did not return a signature.",
    );
  }

  let signature: Uint8Array;

  try {
    signature = bs58.decode(
      signatureValue,
    );
  } catch {
    throw new Error(
      "The mobile wallet signature encoding was invalid.",
    );
  }

  return verifySignature(
    flow,
    signature,
  );
}

function bytesToBase64(
  bytes: Uint8Array,
): string {
  let binary = "";

  for (const byte of bytes) {
    binary +=
      String.fromCharCode(byte);
  }

  return window.btoa(binary);
}
