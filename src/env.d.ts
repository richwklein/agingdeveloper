// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly ANALYTICS_TRACKING_ID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
