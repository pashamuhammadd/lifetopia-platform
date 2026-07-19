type SolanaPublicKey = {
  toString(): string;
};

type SignedMessage =
  | Uint8Array
  | {
      signature: Uint8Array;
    };

type InjectedSolanaProvider = {
  isPhantom?: boolean;
  isSolflare?: boolean;
  publicKey?: SolanaPublicKey | null;
  connect(options?: {
    onlyIfTrusted?: boolean;
  }): Promise<
    | void
    | {
        publicKey?: SolanaPublicKey | null;
      }
  >;
  signMessage(
    message: Uint8Array,
    display?: "utf8",
  ): Promise<SignedMessage>;
};

type WalletWindow = Window & {
  solana?: InjectedSolanaProvider;
  solflare?: InjectedSolanaProvider;
  phantom?: {
    solana?: InjectedSolanaProvider;
  };
};

type StandardWalletAccount = {
  address: string;
  chains: readonly string[];
};

type MobileStandardWallet = {
  name: string;
  accounts: readonly StandardWalletAccount[];
  features: {
    "standard:connect"?: {
      connect(input?: {
        silent?: boolean;
      }): Promise<{
        accounts: readonly StandardWalletAccount[];
      }>;
    };
    "solana:signMessage"?: {
      signMessage(
        ...inputs: readonly {
          account: StandardWalletAccount;
          message: Uint8Array;
        }[]
      ): Promise<
        readonly {
          signedMessage: Uint8Array;
          signature: Uint8Array;
          signatureType?: "ed25519";
        }[]
      >;
    };
  };
};

export type DesktopWalletChoice =
  | "phantom"
  | "solflare";

export type WalletSource =
  | DesktopWalletChoice
  | "mobile";

export type WalletMessageSigner = {
  address: string;
  signMessage(
    message: Uint8Array,
  ): Promise<Uint8Array>;
};

export type MobileWalletBrowseLinks = {
  phantom: string;
  solflare: string;
};

let mobileWalletAdapterRegistered =
  false;

export function isAndroidDevice(): boolean {
  return (
    typeof navigator !== "undefined" &&
    /Android/i.test(
      navigator.userAgent,
    )
  );
}

export function isAndroidMobileWalletSupported(): boolean {
  if (
    typeof navigator === "undefined"
  ) {
    return false;
  }

  const userAgent =
    navigator.userAgent;

  const isAndroidChrome =
    isAndroidDevice() &&
    /Chrome\//i.test(userAgent);

  const isUnsupportedShell =
    /EdgA\/|OPR\/|Opera|SamsungBrowser|Firefox|FxiOS|; wv\)/i.test(
      userAgent,
    );

  return (
    isAndroidChrome &&
    !isUnsupportedShell
  );
}

export function hasSupportedInjectedWallet(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  const walletWindow =
    window as WalletWindow;

  return Boolean(
    walletWindow.phantom?.solana ||
      walletWindow.solflare ||
      walletWindow.solana
        ?.isPhantom ||
      walletWindow.solana
        ?.isSolflare,
  );
}

export function getMobileWalletBrowseLinks(): MobileWalletBrowseLinks {
  const pageUrl = encodeURIComponent(
    window.location.href,
  );

  const referrer =
    encodeURIComponent(
      window.location.origin,
    );

  return {
    phantom: `https://phantom.app/ul/browse/${pageUrl}?ref=${referrer}`,
    solflare: `https://solflare.com/ul/v1/browse/${pageUrl}?ref=${referrer}`,
  };
}

export function walletSourceLabel(
  source: WalletSource,
): string {
  if (source === "phantom") {
    return "Phantom";
  }

  if (source === "solflare") {
    return "Solflare";
  }

  return "mobile wallet";
}

function getInjectedProvider(
  choice: DesktopWalletChoice,
): InjectedSolanaProvider | null {
  const walletWindow =
    window as WalletWindow;

  if (choice === "phantom") {
    return (
      walletWindow.phantom?.solana ??
      (walletWindow.solana?.isPhantom
        ? walletWindow.solana
        : null)
    );
  }

  return (
    walletWindow.solflare ??
    (walletWindow.solana?.isSolflare
      ? walletWindow.solana
      : null)
  );
}

async function connectDesktopWallet(
  choice: DesktopWalletChoice,
): Promise<WalletMessageSigner> {
  const label =
    walletSourceLabel(choice);

  const provider =
    getInjectedProvider(choice);

  if (!provider) {
    throw new Error(
      `${label} was not detected. Install or unlock the ${label} browser extension, reload this page, and try again.`,
    );
  }

  let publicKey =
    provider.publicKey ?? null;

  if (!publicKey) {
    const connection =
      await provider.connect();

    publicKey =
      connection?.publicKey ??
      provider.publicKey ??
      null;
  }

  if (!publicKey) {
    throw new Error(
      `${label} did not provide a Solana public key after connecting.`,
    );
  }

  return {
    address: publicKey.toString(),
    async signMessage(message) {
      const signed =
        await provider.signMessage(
          message,
          "utf8",
        );

      return signed instanceof
        Uint8Array
        ? signed
        : signed.signature;
    },
  };
}

function equalBytes(
  left: Uint8Array,
  right: Uint8Array,
): boolean {
  if (left.length !== right.length) {
    return false;
  }

  return left.every(
    (value, index) =>
      value === right[index],
  );
}

function isExpectedSignedMessage(
  message: Uint8Array,
  signedMessage: Uint8Array,
  signature: Uint8Array,
): boolean {
  if (
    equalBytes(
      signedMessage,
      message,
    )
  ) {
    return true;
  }

  if (
    signature.length !== 64 ||
    signedMessage.length !==
      message.length +
        signature.length
  ) {
    return false;
  }

  const messagePart =
    signedMessage.slice(
      0,
      message.length,
    );

  const signaturePart =
    signedMessage.slice(
      message.length,
    );

  return (
    equalBytes(
      messagePart,
      message,
    ) &&
    equalBytes(
      signaturePart,
      signature,
    )
  );
}

async function connectMobileWallet(): Promise<WalletMessageSigner> {
  if (
    !isAndroidMobileWalletSupported()
  ) {
    throw new Error(
      "Mobile wallet connection is available on supported Android browsers and the CommunityHub Android app.",
    );
  }

  const [
    mobileWalletModule,
    walletStandardModule,
  ] = await Promise.all([
    import(
      "@solana-mobile/wallet-standard-mobile"
    ),
    import("@wallet-standard/app"),
  ]);

  if (!mobileWalletAdapterRegistered) {
    mobileWalletModule.registerMwa({
      appIdentity: {
        name: "Lifetopia World",
        uri: window.location.origin,
        icon: "apple-touch-icon.png",
      },
      authorizationCache:
        mobileWalletModule.createDefaultAuthorizationCache(),
      chains: ["solana:mainnet"],
      chainSelector:
        mobileWalletModule.createDefaultChainSelector(),
      async onWalletNotFound() {
        throw new Error(
          "Android could not open a compatible MWA wallet. Use Open in Phantom or Open in Solflare below.",
        );
      },
    });

    mobileWalletAdapterRegistered =
      true;
  }

  const wallet =
    walletStandardModule
      .getWallets()
      .get()
      .find(
        (candidate) =>
          candidate.name ===
          mobileWalletModule.SolanaMobileWalletAdapterWalletName,
      ) as
      | MobileStandardWallet
      | undefined;

  const connectFeature =
    wallet?.features[
      "standard:connect"
    ];

  const signMessageFeature =
    wallet?.features[
      "solana:signMessage"
    ];

  if (
    !wallet ||
    !connectFeature ||
    !signMessageFeature
  ) {
    throw new Error(
      "The Android mobile wallet adapter could not be initialized. Reload this page and try again.",
    );
  }

  const connection =
    await connectFeature.connect();

  const account =
    connection.accounts.find(
      (candidate) =>
        candidate.chains.includes(
          "solana:mainnet",
        ),
    ) ?? connection.accounts[0];

  if (!account?.address) {
    throw new Error(
      "The selected mobile wallet did not provide a Solana account.",
    );
  }

  return {
    address: account.address,
    async signMessage(message) {
      const [signed] =
        await signMessageFeature.signMessage(
          {
            account,
            message,
          },
        );

      if (!signed?.signature) {
        throw new Error(
          "The selected mobile wallet did not return a message signature.",
        );
      }

      if (
        !isExpectedSignedMessage(
          message,
          signed.signedMessage,
          signed.signature,
        )
      ) {
        throw new Error(
          "The selected mobile wallet changed the authentication message, so the request was stopped.",
        );
      }

      return signed.signature;
    },
  };
}

export async function connectWallet(
  source: WalletSource,
): Promise<WalletMessageSigner> {
  return source === "mobile"
    ? connectMobileWallet()
    : connectDesktopWallet(source);
}

export function bytesToBase64(
  bytes: Uint8Array,
): string {
  let binary = "";

  for (const byte of bytes) {
    binary +=
      String.fromCharCode(byte);
  }

  return window.btoa(binary);
}
