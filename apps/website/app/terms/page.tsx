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

const document = LEGAL_DOCUMENTS.terms;

const sections = [
  { id: "acceptance", label: "Acceptance" },
  { id: "eligibility", label: "Eligibility and younger users" },
  { id: "accounts", label: "Accounts and security" },
  { id: "community", label: "Community conduct" },
  { id: "content", label: "User content" },
  { id: "game-services", label: "Game services and virtual items" },
  { id: "wallet", label: "Wallet and Web3 features" },
  { id: "intellectual-property", label: "Intellectual property" },
  { id: "availability", label: "Service availability" },
  { id: "enforcement", label: "Suspension and termination" },
  { id: "disclaimers", label: "Disclaimers and liability" },
  { id: "changes", label: "Changes to these Terms" },
  { id: "law", label: "Governing law" },
] as const;

export const metadata: Metadata = {
  title: document.title,
  description:
    "The rules governing access to Lifetopia World, its community, game services, accounts, and future Web3 features.",
  alternates: {
    canonical: document.path,
  },
  openGraph: {
    title: `${document.title} | Lifetopia World`,
    description:
      "Read the rules governing Lifetopia World accounts, community participation, game services, and connected features.",
    url: document.path,
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <LegalDocumentLayout
      badge="Lifetopia Legal"
      title={document.title}
      description="These Terms explain the rules for using the Lifetopia World website, community, game experiences, account system, marketplace, and connected services."
      version={document.version}
      effectiveDate={document.effectiveDate}
      sections={sections}
      contactEmail={LEGAL_CONTACT_EMAIL}
    >
      <div className="rounded-[20px] border border-[#efd8a7] bg-[#fff8e7] p-5 text-sm font-semibold leading-6 text-[#735535]">
        These Terms are an operational draft for Lifetopia World and
        should receive professional legal review before a major
        commercial launch, token sale, or regulated marketplace release.
      </div>

      <LegalSection
        id="acceptance"
        title="1. Acceptance of these Terms"
      >
        <p>
          These Terms form an agreement between you and the Lifetopia
          World project team. By creating an account, accessing the
          services, or participating in the community, you agree to
          these Terms and the{" "}
          <Link
            href="/privacy"
            className="font-black text-[#4f8124] underline underline-offset-4"
          >
            Privacy Policy
          </Link>
          .
        </p>

        <p>
          When a feature presents additional rules, event terms, or
          marketplace conditions, those additional rules also apply to
          that feature. If you do not agree, do not create an account or
          use the affected service.
        </p>
      </LegalSection>

      <LegalSection
        id="eligibility"
        title="2. Eligibility and younger users"
      >
        <p>
          You must be at least 13 years old to create a Lifetopia
          account. Users aged 13–17 must have permission from a parent or
          legal guardian. Interactive features may remain restricted
          until required guardian consent is verified.
        </p>

        <p>
          You must provide accurate age information. Lifetopia may
          request additional verification when reasonably necessary to
          protect younger users or comply with applicable law.
        </p>
      </LegalSection>

      <LegalSection
        id="accounts"
        title="3. Accounts and security"
      >
        <p>
          Each account must use a unique email address and username.
          Future wallet features may also require a unique wallet
          connection. You are responsible for your login credentials,
          connected devices, and activity performed through your account.
        </p>

        <p>
          Do not sell, impersonate, share, or transfer an account without
          written permission from Lifetopia. Notify us promptly if you
          believe your account or connected wallet has been compromised.
        </p>
      </LegalSection>

      <LegalSection
        id="community"
        title="4. Community conduct"
      >
        <p>
          Lifetopia is designed as a welcoming social world. You may not
          use the services for harassment, threats, hate, sexual
          exploitation, scams, phishing, malware, spam, impersonation,
          privacy violations, illegal activity, or attempts to disrupt
          the platform.
        </p>

        <p>
          You may not evade moderation, manipulate rewards, exploit bugs,
          automate abusive activity, or interfere with another user’s
          access. Reports may be reviewed by authorized moderators.
        </p>
      </LegalSection>

      <LegalSection
        id="content"
        title="5. User content"
      >
        <p>
          You retain ownership of content you submit, such as posts,
          comments, profile information, or creative uploads. You grant
          Lifetopia a worldwide, non-exclusive, royalty-free license to
          host, store, reproduce, format, display, and distribute that
          content only as needed to operate, secure, moderate, promote,
          and improve the services.
        </p>

        <p>
          You must have the rights needed to submit your content. We may
          remove or restrict content that violates these Terms, community
          rules, intellectual-property rights, safety requirements, or
          applicable law.
        </p>
      </LegalSection>

      <LegalSection
        id="game-services"
        title="6. Game services and virtual items"
      >
        <p>
          Lifetopia may provide game progress, Harmony points, virtual
          currency, cosmetic items, quests, rewards, and marketplace
          features. Unless explicitly stated otherwise, off-chain points
          and virtual items are not legal tender, do not represent a bank
          deposit, and have no guaranteed cash value.
        </p>

        <p>
          Game balance, rewards, item availability, and progression may
          change to protect fairness, correct errors, address exploits,
          or improve the experience. Unauthorized trading, duplication,
          or manipulation may result in removal of items or account
          restrictions.
        </p>
      </LegalSection>

      <LegalSection
        id="wallet"
        title="7. Wallet and Web3 features"
      >
        <p>
          Future wallet features may allow account linking, digital-asset
          verification, rewards, or blockchain transactions. Lifetopia
          does not custody your private keys or recovery phrase. You are
          responsible for securing your wallet and reviewing transactions
          before signing.
        </p>

        <p>
          Blockchain transactions may be irreversible and may involve
          network fees, technical failures, scams, volatility, or third-
          party protocols. Nothing in Lifetopia constitutes financial,
          investment, legal, or tax advice, and no asset value or future
          return is guaranteed.
        </p>
      </LegalSection>

      <LegalSection
        id="intellectual-property"
        title="8. Lifetopia intellectual property"
      >
        <p>
          Lifetopia World names, logos, game art, characters, software,
          interfaces, stories, documentation, and official assets are
          owned by or licensed to the Lifetopia World project team and
          its contributors. These Terms do not transfer those rights to
          you.
        </p>

        <p>
          You may not copy, sell, scrape, reverse engineer, redistribute,
          or create misleading official-looking materials except where
          applicable law permits it or Lifetopia provides written
          permission.
        </p>
      </LegalSection>

      <LegalSection
        id="availability"
        title="9. Service availability and changes"
      >
        <p>
          Lifetopia is under active development. Features may be
          incomplete, changed, suspended, or removed. Maintenance,
          security incidents, third-party outages, blockchain conditions,
          and technical limitations may affect availability.
        </p>

        <p>
          We aim to preserve user data and continuity, but uninterrupted
          service or permanent availability of any feature is not
          guaranteed.
        </p>
      </LegalSection>

      <LegalSection
        id="enforcement"
        title="10. Suspension and termination"
      >
        <p>
          We may restrict interactions, suspend, or ban an account when
          reasonably necessary for safety, fraud prevention, legal
          compliance, platform integrity, or enforcement of these Terms.
          Where appropriate, the account owner will receive the reason
          and duration of a restriction.
        </p>

        <p>
          Restricted users may retain read-only access when doing so is
          safe and lawful. Serious or repeated violations may result in
          permanent termination and loss of access to associated service
          features.
        </p>
      </LegalSection>

      <LegalSection
        id="disclaimers"
        title="11. Disclaimers and limitation of liability"
      >
        <p>
          The services are provided on an “as available” basis to the
          maximum extent permitted by law. We do not promise that every
          feature will be error-free, secure against every threat, or
          compatible with every device, wallet, or third-party service.
        </p>

        <p>
          To the maximum extent permitted by applicable law, Lifetopia is
          not liable for indirect, incidental, special, or consequential
          losses arising from use of the services, third-party conduct,
          wallet compromise, blockchain activity, or loss of data outside
          our reasonable control. Nothing here excludes rights or
          liabilities that cannot lawfully be excluded.
        </p>
      </LegalSection>

      <LegalSection
        id="changes"
        title="12. Changes to these Terms"
      >
        <p>
          We may update these Terms as the services, laws, or safety
          requirements change. Material updates will receive a new
          version and effective date. Registered users may be required to
          review and accept the updated version before continuing to use
          interactive features.
        </p>
      </LegalSection>

      <LegalSection
        id="law"
        title="13. Governing law and contact"
      >
        <p>
          These Terms are governed by the laws of the Republic of
          Indonesia, without limiting any mandatory consumer or data-
          protection rights that apply to you.
        </p>

        <p>
          Questions, safety reports, or legal notices may be sent to{" "}
          <a
            href={`mailto:${LEGAL_CONTACT_EMAIL}`}
            className="font-black text-[#4f8124] underline underline-offset-4"
          >
            {LEGAL_CONTACT_EMAIL}
          </a>
          .
        </p>
      </LegalSection>
    </LegalDocumentLayout>
  );
}
