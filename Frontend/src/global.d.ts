declare module '*.js';
declare module '*.jsx';
declare module '*.ts';
declare module '*.tsx';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';

interface ImportMetaEnv {
    readonly VITE_APP_TITLE?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
