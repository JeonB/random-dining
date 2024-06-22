import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Dimensions, StyleSheet, SafeAreaView } from 'react-native'
import { WebView, WebViewMessageEvent } from 'react-native-webview'
import { LocationTypes } from '@_types'
import Constants from 'expo-constants'
import { AppConfig } from 'app.config'
import { useStore } from '@_common/utils/zustandStore'
import { useIsFocused } from '@react-navigation/native'

const Map = React.memo(
  ({
    restaurantItems,
    currentLocation,
    setMarkerLocation,
    setMarkerVisible,
  }: {
    restaurantItems?: LocationTypes[]
    currentLocation: { currentLatitude: number; currentLongitude: number }
    setMarkerLocation?: (location: { lat: number; lng: number }) => void
    setMarkerVisible?: (visible: boolean) => void
  }) => {
    const { KAKAO_JAVASCRIPT_KEY } = Constants.expoConfig?.extra as AppConfig
    const appKey = KAKAO_JAVASCRIPT_KEY
    const isFocused = useIsFocused()
    const { restaurant, setRestaurant } = useStore(state => ({
      restaurant: state.restaurant,
      setRestaurant: state.setRestaurant,
    }))
    const { currentLatitude, currentLongitude } = currentLocation
    const webViewRef = useRef<WebView>(null)

    const [isMapSearch, setIsMapSearch] = useState(true)
    const [isRestaurantInfoView, setRestaurantInfoView] = useState(false)

    useEffect(() => {
      if (!isFocused) {
        setRestaurant({
          place_name: '',
          address_name: '',
          phone: '',
          x: '',
          y: '',
        })
      }
    }, [isFocused, setRestaurant])

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
      if (restaurantItems) {
        setIsMapSearch(false)
        setRestaurantInfoView(true)
      }
    }, [restaurantItems])

    const html = useMemo(() => {
      return `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            margin: 0;
            padding: 0;
          }
          #map {
            width: 100%;
            height: 100%;
            padding: 0;
            margin: 0;
          }
          #currentPositionButton {
            position: absolute;
            right: 10px;
            z-index: 1;
            background-image: url('https://i.postimg.cc/1XyyGg1b/gps2.png');
            background-size: 60%;
            background-color: white;
            background-repeat: no-repeat;
            background-position: center;
            width: 50px;
            height: 50px;
            border: none;
            border-radius: 50%;
            box-shadow: 0px 2px 10.84px 0px rgba(0, 0, 0, 0.25);
            touch-action: manipulation;
          }
        </style>
        <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&libraries=services"></script>
        <script>
              window.onload = function() {
                var button = document.getElementById('currentPositionButton');
                button.style.bottom = window.innerHeight * 0.1 + 'px';
              };
        </script>
      </head>
      <body>
        <div id="map"></div>
        <button id="currentPositionButton"></button>
        <script type="text/javascript">
          (function () {
            const container = document.getElementById('map');
            const options = {
              center: new kakao.maps.LatLng(${currentLatitude}, ${currentLongitude}),
              level: 3
            };

            const map = new kakao.maps.Map(container, options);
            const infowindow = new kakao.maps.InfoWindow({zIndex:1});

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
            const imageSize = new kakao.maps.Size(22, 22);
            const imgOptions = {
                  offset: new kakao.maps.Point(13, 37)
                };
            const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);


            document.getElementById('currentPositionButton').onclick = function() {
              map.setCenter(currentPosition);
            };

            window.removeMarker = function(marker) {
              marker.setMap(null);
            }

            if (${isMapSearch}) {

              const clickedMarker = new kakao.maps.Marker({
                position: map.getCenter()
              });

              let markerVisible = false;
              kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
                let latlng = mouseEvent.latLng;

                if (markerVisible) {
                  clickedMarker.setMap(null);
                  markerVisible = false;
                } else {
                  window.ReactNativeWebView.postMessage(JSON.stringify({ lat: latlng.getLat(), lng: latlng.getLng() }));
                  clickedMarker.setMap(map);
                  clickedMarker.setPosition(latlng);
                  markerVisible = true;
                }
                window.ReactNativeWebView.postMessage(JSON.stringify({ markerVisible: markerVisible }));
              });

            } else if (${isRestaurantInfoView}) {

              kakao.maps.event.addListener(map, 'click', function () {
                infowindow.close()
              })

              function displayInfowindow(marker, title) {
                  var content = '<div style="padding:15px; z-index:1; text-align:center; display:flex; justify-content:center; align-items:center; max-width: 200px;"><span style="text-align:center;">' + title + '</span></div>';

                  infowindow.setContent(content);
                  infowindow.open(map, marker);
              }

              if('${restaurant.place_name}' !== ''){
                const iwPosition = new kakao.maps.LatLng('${restaurant.y}', '${restaurant.x}');
                const restaurantMarker = new kakao.maps.Marker({
                  position: iwPosition,
                  image: markerImage,
                  clickable: true
                });
                map.setCenter(iwPosition);
                restaurantMarker.setMap(map);
                displayInfowindow(restaurantMarker, '${restaurant.place_name}');

              }
            }
          })();
        </script>
      </body>
    </html>
    `
    }, [
      isMapSearch,
      restaurantItems,
      restaurant,
      currentLatitude,
      currentLongitude,
    ])

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <WebView
          ref={webViewRef}
          style={styles.container}
          source={{ html: html, baseUrl: '' }}
          javaScriptEnabled={true}
          testID="map"
          originWhitelist={['*']}
          onMessage={onMessage}
        />
      </SafeAreaView>
    )
  },
)

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

Map.displayName = 'Map'
export default Map
