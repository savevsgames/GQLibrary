/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string; // Add all environment variables your app uses
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
