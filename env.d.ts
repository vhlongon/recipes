declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      SHADOW_DATABASE_URL: string;
      JWT_SECRET: string;
      COOKIE_NAME: string;
      OPENAI_API_KEY: string;
      PROTECT_COOKIE_NAME: string;
      PROTECT_SECRET: string;
    }
  }
}

export default global;
