import type { Metadata } from "next";
import Link from "next/link";

import {
  LegalDocumentLayout,
  LegalSection,
} from "@/components/legal/LegalDocumentLayout";
import {
  LEGAL_CONTACT_EMAIL,
  LEGAL_DOCUMENTS,
} from "@/data/legal-documents";

const document = LEGAL_DOCUMENTS.privacy;

const sections = [
  { id: "scope", label: "Scope and responsibility" },
  { id: "data", label: "Data we process" },
  { id: "purposes", label: "How data is used" },
  { id: "public-profile", label: "Public profile information" },
  { id: "legal-bases", label: "Legal bases and consent" },
  { id: "sharing", label: "Service providers and sharing" },
  { id: "wallet", label: "Wallet and blockchain data" },
  { id: "children", label: "Younger users" },
  { id: "retention", label: "Data retention" },
  { id: "security", label: "Security" },
  { id: "rights", label: "Your privacy rights" },
  { id: "cookies", label: "Cookies and local storage" },
  { id: "international", label: "International processing" },
  { id: "changes", label: "Policy changes" },
] as const;

export const metadata: Metadata = {
  title: document.title,
  description:
    "How Lifetopia World collects, uses, protects, and shares personal data across its account, community, game, and future wallet services.",
  alternates: {
    canonical: document.path,
  },
  openGraph: {
    title: `${document.title} | Lifetopia World`,
    description:
      "Learn how Lifetopia World handles account, community, game, device, and future wallet data.",
    url: document.path,
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <LegalDocumentLayout
      badge="Privacy at Lifetopia"
      title={document.title}
      description="This Policy explains what personal data Lifetopia World processes, why it is needed, what may appear publicly, and the choices available to account holders."
      version={document.version}
      effectiveDate={document.effectiveDate}
      sections={sections}
      contactEmail={LEGAL_CONTACT_EMAIL}
    >
      <div className="rounded-[20px] border border-[#efd8a7] bg-[#fff8e7] p-5 text-sm font-semibold leading-6 text-[#735535]">
        This Privacy Policy is an operational draft. It should receive
        professional legal review before a major commercial launch or
        expansion into additional jurisdictions.
      </div>

      <LegalSection
        id="scope"
        title="1. Scope and responsibility"
      >
        <p>
          This Policy applies to the Lifetopia World website, account
          system, community platform, game experiences, marketplace,
          mobile applications, and future connected services that link
          to it.
        </p>

        <p>
          For this Policy, “Lifetopia,” “we,” and “us” refer to the
          Lifetopia World project team. Questions about personal data may
          be sent to{" "}
          <a
            href={`mailto:${LEGAL_CONTACT_EMAIL}`}
            className="font-black text-[#4f8124] underline underline-offset-4"
          >
            {LEGAL_CONTACT_EMAIL}
          </a>
          .
        </p>
      </LegalSection>

      <LegalSection
        id="data"
        title="2. Personal data we process"
      >
        <p>Depending on the features you use, we may process:</p>

        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Account identity:</strong> username, Display Name,
            email address, avatar, country, gender, role, join date, and
            account status.
          </li>
          <li>
            <strong>Private eligibility information:</strong> exact date
            of birth, calculated age, and future guardian-consent records.
          </li>
          <li>
            <strong>Authentication and security:</strong> session
            identifiers, login timestamps, device or browser details,
            security events, verification state, and password-reset
            activity. Lifetopia does not receive your plain-text password.
          </li>
          <li>
            <strong>Community activity:</strong> posts, comments, likes,
            bookmarks, follows, reports, moderation decisions, and
            support communications.
          </li>
          <li>
            <strong>Game and progression data:</strong> player progress,
            inventory, quests, achievements, rewards, Harmony points, and
            transaction history inside the service.
          </li>
          <li>
            <strong>Technical information:</strong> IP address, logs,
            error reports, approximate location derived from IP, and
            information needed to prevent abuse and maintain performance.
          </li>
          <li>
            <strong>Future wallet information:</strong> public wallet
            address, signed verification message, linked-account state,
            detected eligible assets, and relevant public blockchain
            activity.
          </li>
        </ul>
      </LegalSection>

      <LegalSection
        id="purposes"
        title="3. How we use personal data"
      >
        <p>We process data to:</p>

        <ul className="list-disc space-y-2 pl-6">
          <li>create, authenticate, and protect Lifetopia accounts;</li>
          <li>provide community, game, marketplace, and support features;</li>
          <li>display public profiles and community authorship;</li>
          <li>save progression, rewards, settings, and user choices;</li>
          <li>verify age, email, guardian consent, roles, and eligibility;</li>
          <li>detect spam, fraud, abuse, exploits, and security threats;</li>
          <li>moderate content and enforce the Terms of Service;</li>
          <li>send essential account, security, and service messages;</li>
          <li>measure reliability and improve Lifetopia; and</li>
          <li>comply with applicable legal obligations.</li>
        </ul>
      </LegalSection>

      <LegalSection
        id="public-profile"
        title="4. Public profile information"
      >
        <p>
          The following information may be visible to other users:
          username, Display Name, avatar, country, gender, calculated age,
          join date, role or badges, public posts, comments, and public
          game achievements.
        </p>

        <p>
          Your email address, exact date of birth, guardian information,
          authentication records, security events, and raw linked-wallet
          information are not intended to appear on your public profile.
          A public blockchain address may still be visible independently
          on the blockchain if you use it in a public transaction.
        </p>
      </LegalSection>

      <LegalSection
        id="legal-bases"
        title="5. Legal bases and consent records"
      >
        <p>
          Depending on the activity and applicable law, Lifetopia relies
          on your consent, performance of the services you request,
          legitimate interests such as security and abuse prevention, and
          compliance with legal obligations.
        </p>

        <p>
          Consent requests are presented separately and in understandable
          language. Lifetopia records the document version and timestamp
          associated with acceptance of the Terms and Privacy Policy.
          Optional marketing consent will not be bundled with required
          account consent.
        </p>
      </LegalSection>

      <LegalSection
        id="sharing"
        title="6. Service providers and data sharing"
      >
        <p>
          We may share limited data with service providers that support
          hosting, authentication, databases, email delivery, security,
          analytics, customer support, moderation, and infrastructure.
          These providers process data only for the services they provide
          to Lifetopia and are expected to protect it appropriately.
        </p>

        <p>
          We may also disclose information when required by law, to
          protect users or the platform, to investigate fraud or abuse,
          or as part of a legitimate organizational restructuring. We do
          not sell personal data to advertisers.
        </p>
      </LegalSection>

      <LegalSection
        id="wallet"
        title="7. Wallet and blockchain data"
      >
        <p>
          Wallet linking will use a signed message to prove control of a
          public wallet address. Lifetopia will never ask for or store a
          wallet seed phrase or private key.
        </p>

        <p>
          Public blockchain information is inherently visible and may be
          permanent. Disconnecting a wallet from Lifetopia does not erase
          transactions already recorded on a public blockchain.
        </p>
      </LegalSection>

      <LegalSection
        id="children"
        title="8. Younger users and guardian consent"
      >
        <p>
          Lifetopia requires users to be at least 13 years old. For users
          aged 13–17, interactive features may be restricted until
          parent or guardian consent is verified.
        </p>

        <p>
          Guardian contact information is private and used only for
          consent, safety, legal compliance, and related support. If we
          learn that an underage account was created without the required
          authorization, we may restrict the account and take reasonable
          steps to delete or correct the data.
        </p>
      </LegalSection>

      <LegalSection
        id="retention"
        title="9. Data retention and deletion"
      >
        <p>
          We keep personal data only for as long as reasonably necessary
          to provide the services, protect users, resolve disputes,
          enforce agreements, and meet legal obligations. Retention
          periods vary by data category.
        </p>

        <p>
          Account-deletion requests are currently handled through
          support and may include identity verification and a 30-day
          safety period before permanent deletion. Certain security,
          transaction, legal, or anti-fraud records may be retained longer
          where required or reasonably necessary.
        </p>
      </LegalSection>

      <LegalSection
        id="security"
        title="10. Security"
      >
        <p>
          Lifetopia uses access controls, row-level database security,
          private data separation, encrypted connections, authentication
          protections, backups, monitoring, and limited administrative
          access. No online system can guarantee absolute security.
        </p>

        <p>
          You should use a unique password, protect your devices, review
          connected sessions, and never disclose password-reset codes,
          wallet private keys, or recovery phrases.
        </p>
      </LegalSection>

      <LegalSection
        id="rights"
        title="11. Your privacy rights"
      >
        <p>
          Subject to applicable law, you may request access, correction,
          completion, restriction, objection, withdrawal of consent,
          portability where applicable, or deletion of personal data.
          We may need to verify your identity before fulfilling a request.
        </p>

        <p>
          Some profile fields can be updated through account settings.
          Sensitive changes, including exact birth date, email, gender,
          or certain identity fields, may require review by an authorized
          administrator.
        </p>
      </LegalSection>

      <LegalSection
        id="cookies"
        title="12. Cookies and local storage"
      >
        <p>
          Lifetopia uses cookies and similar browser storage for login
          sessions, security, preferences, and essential functionality.
          Future analytics or optional measurement tools will be
          documented and, where required, presented with appropriate
          choices.
        </p>
      </LegalSection>

      <LegalSection
        id="international"
        title="13. International processing"
      >
        <p>
          Lifetopia and its service providers may process data in
          countries other than your own. Where applicable, we use
          reasonable contractual, organizational, and technical measures
          to protect data during international processing.
        </p>
      </LegalSection>

      <LegalSection
        id="changes"
        title="14. Changes to this Policy"
      >
        <p>
          We may update this Policy when services, vendors, security
          practices, or legal requirements change. Material updates will
          receive a new version and effective date. Registered users may
          be asked to accept an updated version before using interactive
          features.
        </p>

        <p>
          This Policy should be read together with the{" "}
          <Link
            href="/terms"
            className="font-black text-[#4f8124] underline underline-offset-4"
          >
            Terms of Service
          </Link>
          .
        </p>
      </LegalSection>
    </LegalDocumentLayout>
  );
}
