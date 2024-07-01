import { ExpoConfig, ConfigContext } from 'expo/config'
export interface AppConfig {
  KAKAO_RESTAPI_KEY: string
  KAKAO_JAVASCRIPT_KEY: string
  KAKAO_NATIVEAPP_KEY: string
  PROD_ANDROID_BANNER_ID: string
  PROD_IOS_BANNER_ID: string
}
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: process.env.APP_ENV === 'production' ? '랜덤다이닝' : '랜덤다이닝(DEV)',
  slug: 'random-dining',
  version: '2.0.1',
  extra: {
    storybookEnabled: process.env.STORYBOOK_ENABLED,
    KAKAO_RESTAPI_KEY: process.env.KAKAO_RESTAPI_KEY,
    KAKAO_JAVASCRIPT_KEY: process.env.KAKAO_JAVASCRIPT_KEY,
    PROD_ANDROID_BANNER_ID: process.env.PROD_ANDROID_BANNER_ID,
    PROD_IOS_BANNER_ID: process.env.PROD_IOS_BANNER_ID,
    eas: {
      projectId: 'a6d7b0a6-43fb-42f0-b832-33ba126e59d8',
    },
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
    supportsTablet: false,
    buildNumber: '3',
    bundleIdentifier:
      process.env.APP_ENV === 'production'
        ? 'com.ifinfo.randomdining'
        : 'com.ifinfo.randomdining-dev',
    infoPlist: {
      CFBundleDevelopmentRegion: 'ko',
      NSAppTransportSecurity: {
        NSAllowsArbitraryLoadsInWebContent: true,
      },
      ITSAppUsesNonExemptEncryption: false,
      NSLocationAlwaysAndWhenInUseUsageDescription:
        '이 앱이 위치 기반 식당 추천을 위해 위치 정보를 사용하도록 허용합니다.',
      NSLocationAlwaysUsageDescription:
        '이 앱이 위치 기반 식당 추천을 위해 위치 정보를 사용하도록 허용합니다.',
      NSLocationWhenInUseUsageDescription:
        '이 앱이 위치 기반 식당 추천을 위해 위치 정보를 사용하도록 허용합니다.',
      NSUserTrackingUsageDescription:
        '개인에게 최적화된 광고를 제공하기 위해 사용자의 광고활동 정보를 수집합니다.',
      SKAdNetworkItems: [
        {
          SKAdNetworkIdentifier: [
            'cstr6suwn9.skadnetwork',
            '4fzdc2evr5.skadnetwork',
            '4pfyvq9l8r.skadnetwork',
            '2fnua5tdw4.skadnetwork',
            'ydx93a7ass.skadnetwork',
            '5a6flpkh64.skadnetwork',
            'p78axxw29g.skadnetwork',
            'v72qych5uu.skadnetwork',
            'ludvb6z3bs.skadnetwork',
            'cp8zw746q7.skadnetwork',
            'c6k4g5qg8m.skadnetwork',
            's39g8k73mm.skadnetwork',
            '3qy4746246.skadnetwork',
            '3sh42y64q3.skadnetwork',
            'f38h382jlk.skadnetwork',
            'hs6bdukanm.skadnetwork',
            'v4nxqhlyqp.skadnetwork',
            'wzmmz9fp6w.skadnetwork',
            'yclnxrl5pm.skadnetwork',
            't38b2kh725.skadnetwork',
            '7ug5zh24hu.skadnetwork',
            '9rd848q2bz.skadnetwork',
            'y5ghdn5j9k.skadnetwork',
            'n6fk4nfna4.skadnetwork',
            'v9wttpbfk9.skadnetwork',
            'n38lu8286q.skadnetwork',
            '47vhws6wlr.skadnetwork',
            'kbd757ywx3.skadnetwork',
            '9t245vhmpl.skadnetwork',
            'a2p9lx4jpn.skadnetwork',
            '22mmun2rn5.skadnetwork',
            '4468km3ulz.skadnetwork',
            '2u9pt9hc89.skadnetwork',
            '8s468mfl3y.skadnetwork',
            'av6w8kgt66.skadnetwork',
            'klf5c3l5u5.skadnetwork',
            'ppxm28t8ap.skadnetwork',
            '424m5254lk.skadnetwork',
            'ecpz2srf59.skadnetwork',
            'uw77j35x4d.skadnetwork',
            'mlmmfzh3r3.skadnetwork',
            '578prtvx9j.skadnetwork',
            '4dzt52r2t5.skadnetwork',
            'gta9lk7p23.skadnetwork',
            'e5fvkxwrpn.skadnetwork',
            '8c4e2ghe7u.skadnetwork',
            'zq492l623r.skadnetwork',
            '3rd42ekr43.skadnetwork',
            '3qcr597p9d.skadnetwork',
            'vutu7akeur.skadnetwork',
            'eh6m2bh4zr.skadnetwork',
            'pwa73g5rt2.skadnetwork',
          ],
        },
      ],
    },
    entitlements: { 'aps-environment': 'production' },
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package:
      process.env.APP_ENV === 'production'
        ? 'com.ifinfo.randomdining'
        : 'com.ifinfo.randomdining.dev',
    versionCode: 24,
    permissions: [
      'android.permission.ACCESS_FINE_LOCATION',
      'android.permission.ACCESS_COARSE_LOCATION',
      'android.permission.ACCESS_NETWORK_STATE',
      'com.google.android.gms.permission.AD_ID',
    ],
  },
  web: {
    favicon: './assets/favicon.png',
  },
  updates: {
    url: 'https://u.expo.dev/a6d7b0a6-43fb-42f0-b832-33ba126e59d8',
  },
  runtimeVersion: '2.0.1',
  plugins: [
    [
      'expo-tracking-transparency',
      {
        userTrackingPermission:
          '개인에게 최적화된 광고를 제공하기 위해 사용자의 광고활동 정보를 수집합니다.',
      },
    ],
    [
      'expo-build-properties',
      {
        android: {
          usesCleartextTraffic: true,
        },
      },
    ],
  ],
})
