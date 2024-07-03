import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, StyleSheet, SafeAreaView } from 'react-native'
import { WebView } from 'react-native-webview'
import Constants from 'expo-constants'
import { AppConfig } from 'app.config'
import { useStore } from '@_common/utils/zustandStore'

const RandomRestaurantMap = React.memo(
  ({
    currentLocation,
  }: {
    currentLocation: { currentLatitude: number; currentLongitude: number }
  }) => {
    const { KAKAO_JAVASCRIPT_KEY } = Constants.expoConfig?.extra as AppConfig
    const appKey = KAKAO_JAVASCRIPT_KEY
    const randomRestaurant = useStore(state => state.randomRestaurant)

    const { currentLatitude, currentLongitude } = currentLocation
    const webViewRef = useRef<WebView>(null)
    const [html, setHtml] = useState('')

    useEffect(() => {
      const generateHTML = () => {
        return `
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { display: flex; justify-content: center; align-items: center; height: 100%; margin: 0; padding: 0; }
            #map { width: 100%; height: 100%; padding: 0; margin: 0; }
          </style>
          <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&libraries=services"></script>
        </head>
        <body>
          <div id="map"></div>
          <script type="text/javascript">
            (function () {
              const container = document.getElementById('map');
              const options = {
                center: new kakao.maps.LatLng(${currentLatitude}, ${currentLongitude}),
                level: 3
              };
              const map = new kakao.maps.Map(container, options);

              const currentPosition = new kakao.maps.LatLng(${currentLatitude}, ${currentLongitude});
              const currentImageSrc = 'https://i.postimg.cc/bv4k38Cq/red-circle.png';
              const currentImageSize = new kakao.maps.Size(20, 20);
              const currentImageOption = { offset: new kakao.maps.Point(24, 40) };
              const currentMarkerImage = new kakao.maps.MarkerImage(currentImageSrc, currentImageSize, currentImageOption);
              const currentMarker = new kakao.maps.Marker({
                map: map,
                position: currentPosition,
                image: currentMarkerImage
              });
       
              const imageSrc = 'https://i.postimg.cc/pTp9xBHZ/free-icon-restaurant.png';
              const imageSize = new kakao.maps.Size(30, 30);
              const imgOptions = { offset: new kakao.maps.Point(13, 37) };
              const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
              markerPosition = new kakao.maps.LatLng(${randomRestaurant.y}, ${randomRestaurant.x});
           
              const marker = new kakao.maps.Marker({
                map: map,
                position: markerPosition,
                image: markerImage
              });
              map.setCenter(markerPosition);

            })();
          </script>
        </body>
      </html>
    `
      }
      setHtml(generateHTML())
    }, [randomRestaurant, currentLatitude, currentLongitude])

    return (
      <SafeAreaView style={styles.container}>
        <WebView
          ref={webViewRef}
          style={styles.webView}
          source={{ html }}
          javaScriptEnabled
          originWhitelist={['*']}
        />
      </SafeAreaView>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})

RandomRestaurantMap.displayName = 'RandomRestaurantMap'
export default RandomRestaurantMap
