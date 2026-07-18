export const USERNAME_MIN_LENGTH = 4;
export const USERNAME_MAX_LENGTH = 16;
export const DISPLAY_NAME_MIN_LENGTH = 2;
export const DISPLAY_NAME_MAX_LENGTH = 32;
export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 72;
export const MINIMUM_ACCOUNT_AGE = 13;
export const ADULT_AGE = 18;

export const OFFICIAL_AVATAR_IDS = [
  "avatar-01",
  "avatar-02",
  "avatar-03",
  "avatar-04",
] as const;

export type OfficialAvatarId =
  (typeof OFFICIAL_AVATAR_IDS)[number];

export type LifetopiaGender = "male" | "female";

export type ValidationFailure = {
  valid: false;
  code: string;
  message: string;
};

export type ValidationSuccess<T> = {
  valid: true;
  value: T;
};

export type ValidationResult<T> =
  | ValidationSuccess<T>
  | ValidationFailure;

export type PasswordStrength =
  | "weak"
  | "fair"
  | "strong";

export type PasswordAssessment = {
  strength: PasswordStrength;
  score: number;
  requirements: {
    hasMinimumLength: boolean;
    hasUppercase: boolean;
    hasLowercase: boolean;
    hasNumber: boolean;
    hasSymbol: boolean;
    isWithinMaximumLength: boolean;
  };
};

export type DateOfBirthValue = {
  dateOfBirth: string;
  age: number;
  guardianConsentRequired: boolean;
};

export type RegistrationInput = {
  username: string;
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatarId: string;
  dateOfBirth: string;
  countryCode: string;
  countryName: string;
  gender: string;
  termsAccepted: boolean;
  privacyAccepted: boolean;
};

export type NormalizedRegistrationInput = {
  username: string;
  displayName: string;
  email: string;
  password: string;
  avatarId: OfficialAvatarId;
  dateOfBirth: string;
  age: number;
  guardianConsentRequired: boolean;
  countryCode: string;
  countryName: string;
  gender: LifetopiaGender;
  termsAccepted: true;
  privacyAccepted: true;
};

export type RegistrationField =
  | "username"
  | "displayName"
  | "email"
  | "password"
  | "confirmPassword"
  | "avatarId"
  | "dateOfBirth"
  | "countryCode"
  | "countryName"
  | "gender"
  | "termsAccepted"
  | "privacyAccepted";

export type RegistrationValidationFailure = {
  valid: false;
  errors: Partial<
    Record<RegistrationField, string>
  >;
};

export type RegistrationValidationResult =
  | ValidationSuccess<NormalizedRegistrationInput>
  | RegistrationValidationFailure;

const USERNAME_PATTERN =
  /^[a-z0-9_]+$/;

const DISPLAY_NAME_PATTERN =
  /^[\p{L}\p{N} ]+$/u;

const EMAIL_BASIC_PATTERN =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const COUNTRY_CODE_PATTERN =
  /^[A-Z]{2}$/;

const AUTH_LOOP_PATHS = new Set([
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/check-email",
  "/verify-email",
  "/account-access",
  "/guardian-consent",
  "/guardian-consent/confirm",
  "/mfa-challenge",
  "/mfa-recovery",
]);

const ALLOWED_AUTH_REDIRECT_ORIGINS =
  new Set([
    "https://lifetopiaworld.io",
    "https://www.lifetopiaworld.io",
    "https://community.lifetopiaworld.io",
    "http://localhost:3000",
    "http://localhost:3001",
  ]);

const PROTECTED_USERNAME_TOKENS =
  new Set([
    "admin",
    "administrator",
    "founder",
    "moderator",
    "modteam",
    "staff",
    "support",
    "supportteam",
    "helpdesk",
    "official",
    "system",
    "root",
    "security",
    "contact",
    "lifetopia",
    "lifetopiaworld",
    "developer",
    "artist",
    "alphatester",
    "betatester",
  ]);

const SCAM_USERNAME_TOKENS =
  new Set([
    "claimreward",
    "claimtoken",
    "freeairdrop",
    "giveaway",
    "seedphrase",
    "recoveryphrase",
    "walletsupport",
    "walletverify",
    "walletverification",
  ]);

const PROFANITY_USERNAME_TOKENS =
  new Set([
    "fuck",
    "shit",
    "bitch",
    "kontol",
    "memek",
    "ngentot",
    "bangsat",
  ]);

function success<T>(
  value: T,
): ValidationSuccess<T> {
  return {
    valid: true,
    value,
  };
}

function failure(
  code: string,
  message: string,
): ValidationFailure {
  return {
    valid: false,
    code,
    message,
  };
}

function normalizeRiskToken(
  username: string,
): string {
  return username
    .toLowerCase()
    .replaceAll("_", "")
    .replaceAll("0", "o")
    .replaceAll("1", "i")
    .replaceAll("3", "e")
    .replaceAll("4", "a")
    .replaceAll("5", "s")
    .replaceAll("7", "t")
    .replaceAll("8", "b");
}

function matchesProtectedToken(
  riskToken: string,
  token: string,
): boolean {
  if (riskToken === token) {
    return true;
  }

  if (!riskToken.startsWith(token)) {
    return false;
  }

  const suffix = riskToken.slice(token.length);

  return /^\d+$/.test(suffix);
}

function containsBlockedUsernameToken(
  riskToken: string,
  tokens: ReadonlySet<string>,
): boolean {
  return [...tokens].some((token) =>
    matchesProtectedToken(
      riskToken,
      token,
    ),
  );
}

export function normalizeUsername(
  value: string,
): string {
  return value.trim().toLowerCase();
}

export function validateUsername(
  value: string,
): ValidationResult<string> {
  const username = normalizeUsername(value);

  if (
    username.length <
    USERNAME_MIN_LENGTH
  ) {
    return failure(
      "username_too_short",
      `Username must be at least ${USERNAME_MIN_LENGTH} characters.`,
    );
  }

  if (
    username.length >
    USERNAME_MAX_LENGTH
  ) {
    return failure(
      "username_too_long",
      `Username must be no more than ${USERNAME_MAX_LENGTH} characters.`,
    );
  }

  if (!USERNAME_PATTERN.test(username)) {
    return failure(
      "username_invalid_characters",
      "Username can only use lowercase letters, numbers, and underscores.",
    );
  }

  if (username.includes("___")) {
    return failure(
      "username_too_many_underscores",
      "Username cannot contain three consecutive underscores.",
    );
  }

  const riskToken =
    normalizeRiskToken(username);

  if (
    containsBlockedUsernameToken(
      riskToken,
      PROTECTED_USERNAME_TOKENS,
    )
  ) {
    return failure(
      "username_reserved",
      "This username is reserved by Lifetopia World.",
    );
  }

  if (
    containsBlockedUsernameToken(
      riskToken,
      SCAM_USERNAME_TOKENS,
    )
  ) {
    return failure(
      "username_scam_risk",
      "This username may mislead or endanger other users.",
    );
  }

  if (
    containsBlockedUsernameToken(
      riskToken,
      PROFANITY_USERNAME_TOKENS,
    )
  ) {
    return failure(
      "username_inappropriate",
      "This username is not allowed.",
    );
  }

  return success(username);
}

export function normalizeDisplayName(
  value: string,
): string {
  return value.trim().replace(/\s+/g, " ");
}

export function validateDisplayName(
  value: string,
): ValidationResult<string> {
  const displayName =
    normalizeDisplayName(value);

  if (
    displayName.length <
    DISPLAY_NAME_MIN_LENGTH
  ) {
    return failure(
      "display_name_too_short",
      `Display Name must be at least ${DISPLAY_NAME_MIN_LENGTH} characters.`,
    );
  }

  if (
    displayName.length >
    DISPLAY_NAME_MAX_LENGTH
  ) {
    return failure(
      "display_name_too_long",
      `Display Name must be no more than ${DISPLAY_NAME_MAX_LENGTH} characters.`,
    );
  }

  if (
    !DISPLAY_NAME_PATTERN.test(
      displayName,
    )
  ) {
    return failure(
      "display_name_invalid_characters",
      "Display Name can only contain letters, numbers, and spaces.",
    );
  }

  return success(displayName);
}

export function normalizeEmail(
  value: string,
): string {
  return value.trim().toLowerCase();
}

export function validateEmail(
  value: string,
): ValidationResult<string> {
  const email = normalizeEmail(value);

  if (!email) {
    return failure(
      "email_required",
      "Email is required.",
    );
  }

  if (email.length > 254) {
    return failure(
      "email_too_long",
      "Email is too long.",
    );
  }

  if (!EMAIL_BASIC_PATTERN.test(email)) {
    return failure(
      "email_invalid",
      "Enter a valid email address.",
    );
  }

  const [localPart, domain] =
    email.split("@");

  if (
    !localPart ||
    !domain ||
    localPart.length > 64
  ) {
    return failure(
      "email_invalid",
      "Enter a valid email address.",
    );
  }

  if (
    localPart.startsWith(".") ||
    localPart.endsWith(".") ||
    localPart.includes("..")
  ) {
    return failure(
      "email_invalid",
      "Enter a valid email address.",
    );
  }

  const domainLabels =
    domain.split(".");

  const hasInvalidDomainLabel =
    domainLabels.some(
      (label) =>
        !label ||
        label.length > 63 ||
        label.startsWith("-") ||
        label.endsWith("-") ||
        !/^[a-z0-9-]+$/.test(label),
    );

  if (hasInvalidDomainLabel) {
    return failure(
      "email_invalid",
      "Enter a valid email address.",
    );
  }

  return success(email);
}

export function assessPassword(
  password: string,
): PasswordAssessment {
  const requirements = {
    hasMinimumLength:
      password.length >=
      PASSWORD_MIN_LENGTH,
    hasUppercase:
      /[A-Z]/.test(password),
    hasLowercase:
      /[a-z]/.test(password),
    hasNumber:
      /\d/.test(password),
    hasSymbol:
      /[^A-Za-z0-9]/.test(password),
    isWithinMaximumLength:
      password.length <=
      PASSWORD_MAX_LENGTH,
  };

  const score = [
    requirements.hasMinimumLength,
    requirements.hasUppercase,
    requirements.hasLowercase,
    requirements.hasNumber,
    requirements.hasSymbol,
    requirements.isWithinMaximumLength,
  ].filter(Boolean).length;

  const strength: PasswordStrength =
    score >= 6
      ? "strong"
      : score >= 4
        ? "fair"
        : "weak";

  return {
    strength,
    score,
    requirements,
  };
}

export function validatePassword(
  password: string,
  identity?: {
    username?: string;
    email?: string;
  },
): ValidationResult<string> {
  const assessment =
    assessPassword(password);

  if (
    !assessment.requirements
      .hasMinimumLength
  ) {
    return failure(
      "password_too_short",
      `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
    );
  }

  if (
    !assessment.requirements
      .isWithinMaximumLength
  ) {
    return failure(
      "password_too_long",
      `Password must be no more than ${PASSWORD_MAX_LENGTH} characters.`,
    );
  }

  if (
    !assessment.requirements
      .hasUppercase ||
    !assessment.requirements
      .hasLowercase ||
    !assessment.requirements
      .hasNumber ||
    !assessment.requirements
      .hasSymbol
  ) {
    return failure(
      "password_not_strong",
      "Password must contain uppercase, lowercase, number, and symbol.",
    );
  }

  const comparablePassword =
    password.toLowerCase();

  const comparableUsername =
    identity?.username
      ? normalizeUsername(
          identity.username,
        )
      : "";

  const comparableEmail =
    identity?.email
      ? normalizeEmail(identity.email)
      : "";

  if (
    comparableUsername &&
    comparablePassword ===
      comparableUsername
  ) {
    return failure(
      "password_matches_username",
      "Password cannot be the same as your username.",
    );
  }

  if (
    comparableEmail &&
    comparablePassword ===
      comparableEmail
  ) {
    return failure(
      "password_matches_email",
      "Password cannot be the same as your email.",
    );
  }

  return success(password);
}

function getUtcToday(
  now: Date,
): {
  year: number;
  month: number;
  day: number;
} {
  return {
    year: now.getUTCFullYear(),
    month: now.getUTCMonth() + 1,
    day: now.getUTCDate(),
  };
}

export function calculateAge(
  dateOfBirth: string,
  now = new Date(),
): number | null {
  const match =
    /^(\d{4})-(\d{2})-(\d{2})$/.exec(
      dateOfBirth,
    );

  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  const parsedDate = new Date(
    Date.UTC(year, month - 1, day),
  );

  if (
    parsedDate.getUTCFullYear() !==
      year ||
    parsedDate.getUTCMonth() + 1 !==
      month ||
    parsedDate.getUTCDate() !== day
  ) {
    return null;
  }

  const today = getUtcToday(now);

  let age = today.year - year;

  const birthdayHasPassed =
    today.month > month ||
    (
      today.month === month &&
      today.day >= day
    );

  if (!birthdayHasPassed) {
    age -= 1;
  }

  return age;
}

export function validateDateOfBirth(
  value: string,
  now = new Date(),
): ValidationResult<DateOfBirthValue> {
  const dateOfBirth = value.trim();
  const age = calculateAge(
    dateOfBirth,
    now,
  );

  if (age === null) {
    return failure(
      "date_of_birth_invalid",
      "Enter a valid date of birth.",
    );
  }

  if (age < 0) {
    return failure(
      "date_of_birth_future",
      "Date of birth cannot be in the future.",
    );
  }

  if (age < MINIMUM_ACCOUNT_AGE) {
    return failure(
      "minimum_age_not_met",
      `You must be at least ${MINIMUM_ACCOUNT_AGE} years old to create an account.`,
    );
  }

  return success({
    dateOfBirth,
    age,
    guardianConsentRequired:
      age < ADULT_AGE,
  });
}

export function validateGender(
  value: string,
): ValidationResult<LifetopiaGender> {
  const gender =
    value.trim().toLowerCase();

  if (
    gender !== "male" &&
    gender !== "female"
  ) {
    return failure(
      "gender_invalid",
      "Choose Male or Female.",
    );
  }

  return success(gender);
}

export function validateCountryCode(
  value: string,
): ValidationResult<string> {
  const countryCode =
    value.trim().toUpperCase();

  if (
    !COUNTRY_CODE_PATTERN.test(
      countryCode,
    )
  ) {
    return failure(
      "country_code_invalid",
      "Choose a valid country.",
    );
  }

  return success(countryCode);
}

export function validateCountryName(
  value: string,
): ValidationResult<string> {
  const countryName =
    value.trim().replace(/\s+/g, " ");

  if (
    countryName.length < 2 ||
    countryName.length > 80
  ) {
    return failure(
      "country_name_invalid",
      "Choose a valid country.",
    );
  }

  if (
    !/^[\p{L} .'-]+$/u.test(
      countryName,
    )
  ) {
    return failure(
      "country_name_invalid",
      "Choose a valid country.",
    );
  }

  return success(countryName);
}

export function validateAvatarId(
  value: string,
): ValidationResult<OfficialAvatarId> {
  const avatarId = value.trim();

  if (
    !OFFICIAL_AVATAR_IDS.includes(
      avatarId as OfficialAvatarId,
    )
  ) {
    return failure(
      "avatar_invalid",
      "Choose an official Lifetopia avatar.",
    );
  }

  return success(
    avatarId as OfficialAvatarId,
  );
}

export function sanitizeAuthRedirectValue(
  value: string | null | undefined,
  fallback = "/",
): string {
  const candidate = value?.trim();

  if (!candidate) {
    return fallback;
  }

  if (
    /[\u0000-\u001F\u007F\\]/.test(
      candidate,
    )
  ) {
    return fallback;
  }

  try {
    if (
      candidate.startsWith("/") &&
      !candidate.startsWith("//")
    ) {
      const relativeUrl = new URL(
        candidate,
        "https://lifetopiaworld.io",
      );

      if (
        AUTH_LOOP_PATHS.has(
          relativeUrl.pathname,
        )
      ) {
        return fallback;
      }

      return (
        relativeUrl.pathname +
        relativeUrl.search +
        relativeUrl.hash
      );
    }

    const absoluteUrl =
      new URL(candidate);

    if (
      !ALLOWED_AUTH_REDIRECT_ORIGINS.has(
        absoluteUrl.origin,
      )
    ) {
      return fallback;
    }

    if (
      AUTH_LOOP_PATHS.has(
        absoluteUrl.pathname,
      )
    ) {
      return fallback;
    }

    return absoluteUrl.toString();
  } catch {
    return fallback;
  }
}

export function validateRegistrationInput(
  input: RegistrationInput,
  now = new Date(),
): RegistrationValidationResult {
  const errors: Partial<
    Record<RegistrationField, string>
  > = {};

  const username =
    validateUsername(input.username);

  if (!username.valid) {
    errors.username = username.message;
  }

  const displayName =
    validateDisplayName(
      input.displayName,
    );

  if (!displayName.valid) {
    errors.displayName =
      displayName.message;
  }

  const email =
    validateEmail(input.email);

  if (!email.valid) {
    errors.email = email.message;
  }

  const password =
    validatePassword(
      input.password,
      {
        username:
          username.valid
            ? username.value
            : input.username,
        email:
          email.valid
            ? email.value
            : input.email,
      },
    );

  if (!password.valid) {
    errors.password = password.message;
  }

  if (
    input.password !==
    input.confirmPassword
  ) {
    errors.confirmPassword =
      "Password confirmation does not match.";
  }

  const avatar =
    validateAvatarId(input.avatarId);

  if (!avatar.valid) {
    errors.avatarId = avatar.message;
  }

  const dateOfBirth =
    validateDateOfBirth(
      input.dateOfBirth,
      now,
    );

  if (!dateOfBirth.valid) {
    errors.dateOfBirth =
      dateOfBirth.message;
  }

  const countryCode =
    validateCountryCode(
      input.countryCode,
    );

  if (!countryCode.valid) {
    errors.countryCode =
      countryCode.message;
  }

  const countryName =
    validateCountryName(
      input.countryName,
    );

  if (!countryName.valid) {
    errors.countryName =
      countryName.message;
  }

  const gender =
    validateGender(input.gender);

  if (!gender.valid) {
    errors.gender = gender.message;
  }

  if (!input.termsAccepted) {
    errors.termsAccepted =
      "You must accept the Terms of Service.";
  }

  if (!input.privacyAccepted) {
    errors.privacyAccepted =
      "You must accept the Privacy Policy.";
  }

  if (
    Object.keys(errors).length > 0 ||
    !username.valid ||
    !displayName.valid ||
    !email.valid ||
    !password.valid ||
    !avatar.valid ||
    !dateOfBirth.valid ||
    !countryCode.valid ||
    !countryName.valid ||
    !gender.valid
  ) {
    return {
      valid: false,
      errors,
    };
  }

  return success({
    username: username.value,
    displayName: displayName.value,
    email: email.value,
    password: password.value,
    avatarId: avatar.value,
    dateOfBirth:
      dateOfBirth.value.dateOfBirth,
    age: dateOfBirth.value.age,
    guardianConsentRequired:
      dateOfBirth.value
        .guardianConsentRequired,
    countryCode: countryCode.value,
    countryName: countryName.value,
    gender: gender.value,
    termsAccepted: true,
    privacyAccepted: true,
  });
}
