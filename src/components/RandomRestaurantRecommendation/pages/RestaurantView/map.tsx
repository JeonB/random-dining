import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { WebView, WebViewMessageEvent } from 'react-native-webview'
import { LocationTypes } from '@_types/restaurant'
import Constants from 'expo-constants'
import { AppConfig } from 'app.config'

const Map = ({
  info,
  currentLocation,
  setMarkerLocation,
  setMarkerVisible,
}: {
  info?: LocationTypes
  currentLocation: { currentLatitude: number; currentLongitude: number }
  setMarkerLocation?: (location: { lat: number; lng: number }) => void
  setMarkerVisible?: (visible: boolean) => void
}) => {
  const { currentLatitude, currentLongitude } = currentLocation
  const { KAKAO_JAVASCRIPT_KEY } = Constants.expoConfig?.extra as AppConfig
  const appKey = KAKAO_JAVASCRIPT_KEY
  const [isMapSearch, setIsMapSearch] = useState(false)

  const onMessage = (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data)
    if (data.lat && data.lng && setMarkerLocation) {
      setMarkerLocation({ lat: data.lat, lng: data.lng })
    }
    if (data.markerVisible !== undefined && setMarkerVisible) {
      setMarkerVisible(data.markerVisible)
    }
  }

  useEffect(() => {
    if (!info) {
      setIsMapSearch(true)
    }
  }, [info])

  const injectedJavaScript = `
    window.currentLatitude = ${currentLatitude};
    window.currentLongitude = ${currentLongitude};
    window.info = ${JSON.stringify(info)};
    window.appKey = "${appKey}";
    window.isMapSearch = ${isMapSearch};
  `
  const MAPHTML = require('../../../../../public/map.html')
  return (
    <WebView
      style={styles.container}
      source={MAPHTML} // Update this path to your map.html file
      javaScriptEnabled={true}
      testID="map"
      onMessage={onMessage}
      injectedJavaScript={injectedJavaScript}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    padding: 0,
    margin: 0,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Map
