# Lifetopia Platform Architecture v2

## Root Structure

lifetopia-platform/
├── apps/
├── packages/
├── public/
├── config/
├── docs/
└── scripts/

## apps/

Only application-specific code.

apps/
├── website/
├── grants/
├── docs/
└── play/

Allowed inside apps:
- app/
- components/
- providers/
- styles/
- middleware.ts
- next.config.js
- package.json
- tsconfig.json

Avoid inside apps:
- shared data
- shared types
- shared utils
- shared hooks
- shared lib
- shared assets

## packages/

Shared source code.

packages/
├── ui/
├── data/
├── types/
├── hooks/
├── lib/
├── utils/
├── constants/
├── config/
└── services/

## public/

Shared public assets for all apps.

public/
├── branding/
├── game/
├── website/
├── development/
└── media/

## config/

Shared project configuration.

config/
├── project.json
├── roadmap.json
├── funding.json
├── technology.json
└── team.json

## scripts/

Automation scripts.

scripts/
├── sync-public.mjs
├── project-update.mjs
├── project-status.mjs
└── generate-*.mjs

## Rule

Apps compose.
Packages share.
Public stores assets.
Config stores project data.
Scripts automate.
Docs explain.