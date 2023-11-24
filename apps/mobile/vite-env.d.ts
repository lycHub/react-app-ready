/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_WECOM_CORP_ID: string;
  VITE_WECOM_AGENT_ID: string;
  VITE_API_BASE_URL: string;
  VITE_APP_BASE_SA: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}