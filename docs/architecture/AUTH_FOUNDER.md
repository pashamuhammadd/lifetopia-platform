# Auth 16 — Founder Provisioning

## Official Founder identity

```text
username: pashamuhammad
primary role: founder
public badge: founder
```

Founder provisioning is one-time and requires:

```text
active account
verified email
current legal consent
permanent username
verified TOTP MFA
```

## Protected registry

```text
lifetopia_founder_registry
```

The registry is private and service-role only.

Unique partial indexes guarantee:

```text
one Founder primary role
one Founder public badge
```

Protection triggers prevent the Founder role or badge from being created
outside the registry or removed through an ordinary update.

## Assignment authority

The Auth 15 functions become usable after Founder provisioning.

```text
Founder
Can assign Admin and Moderator.
Can assign Developer, Artist, Alpha Tester, Beta Tester, Lifetopian.
Can manage the same public badges.

Admin
Can assign Developer, Artist, Alpha Tester, Beta Tester, Lifetopian.
Cannot assign or change Founder, Admin, or Moderator.
```

Every successful change is recorded in:

```text
account_role_changes
account_badge_changes
```

## Emergency boundary

Founder identity is immutable in normal product flows.

Any future Founder recovery, legal succession, or ownership transfer must use a
separately reviewed emergency migration—not a normal role assignment.
