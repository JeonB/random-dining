import { View } from 'react-native'
import * as Device from 'expo-device'
import React, { useEffect, useState } from 'react'
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads'
import { useStore } from '@_common/utils/zustandStore'
import Constants from 'expo-constants'
import { AppConfig } from 'app.config'

const { PROD_ANDROID_BANNER_ID } = Constants.expoConfig?.extra as AppConfig
const { PROD_IOS_BANNER_ID } = Constants.expoConfig?.extra as AppConfig
const productionID =
  Device.osName === 'Android' ? PROD_ANDROID_BANNER_ID : PROD_IOS_BANNER_ID

const InlineAd = () => {
  const [isAdLoaded, setIsAdLoaded] = useState<boolean>(false)
  const isTrackingDenied = useStore(state => state.trackingDenied)

  useEffect(() => {}, [isTrackingDenied])

  return (
    <View style={{ height: isAdLoaded ? 'auto' : 0 }}>
      <BannerAd
        // 반드시 개발 환경에서는 테스트 광고 ID를 사용하고 프로덕션 환경에서는 실제 광고 ID를 사용해야 합니다.
        unitId={__DEV__ ? TestIds.BANNER : productionID}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          // App.tsx에서 업데이트한 trackingDenied 값에 따라 사용자화된 광고 제공여부 정함
          requestNonPersonalizedAdsOnly: isTrackingDenied,
        }}
        onAdLoaded={() => {
          setIsAdLoaded(true)
        }}
      />
    </View>
  )
}
export default InlineAd
