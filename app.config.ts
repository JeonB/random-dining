const dotenv = require('dotenv/config')
export interface AppConfig {
  KAKAO_RESTAPI_KEY: string
  KAKAO_JAVASCRIPT_KEY: string
  KAKAO_NATIVEAPP_KEY: string
}
export default {
  name: '랜덤다이닝',
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
    buildNumber: '1.0.0',
    bundleIdentifier: 'com.ifinfo.randomdining',
    infoPlist: {
      NSUserTrackingUsageDescription:
        '사용자의 데이터는 개인화된 광고 제공 목적으로 사용됩니다.',
    },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.ifinfo.randomdining',
    versionCode: 1,
  },
  web: {
    favicon: './assets/favicon.png',
  },
  plugins: [
    [
      'expo-tracking-transparency',
      {
        userTrackingPermission:
          '사용자의 데이터는 개인화된 광고 제공 목적으로 사용됩니다.',
      },
    ],
  ],
}
