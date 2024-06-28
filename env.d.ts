// env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    APP_ENV: string
    STORYBOOK_ENABLED: string
    KAKAO_RESTAPI_KEY: string
    KAKAO_JAVASCRIPT_KEY: string
    KAKAO_NATIVEAPP_KEY: string
    PROD_ANDROID_BANNER_ID: string
    PROD_IOS_BANNER_ID: string
  }
}
