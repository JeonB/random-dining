const dotenv = require('dotenv/config')
export interface AppConfig {
  KAKAO_RESTAPI_KEY: string
  KAKAO_JAVASCRIPT_KEY: string
}
export default {
  name: 'random-dining',
  slug: 'random-dining',
  version: '1.0.0',
  extra: {
    storybookEnabled: process.env.STORYBOOK_ENABLED,
    KAKAO_RESTAPI_KEY: process.env.KAKAO_RESTAPI_KEY,
    KAKAO_JAVASCRIPT_KEY: process.env.KAKAO_JAVASCRIPT_KEY,
  },
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  web: {
    favicon: './assets/favicon.png',
  },
}
