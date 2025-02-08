/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_X_RAPID_API_KEY: string;
    readonly VITE_X_RAPID_API_HOST: string;
    // Add other environment variables here as needed
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}