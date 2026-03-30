// src/env.d.ts
/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_API_URL: string;
  readonly PUBLIC_STRIPE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
