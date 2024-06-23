import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Dimensions, StyleSheet, SafeAreaView } from 'react-native'
import { WebView, WebViewMessageEvent } from 'react-native-webview'
import Constants from 'expo-constants'
import { AppConfig } from 'app.config'
import { useStore } from '@_common/utils/zustandStore'
import {
  NavigationProp,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native'
import { RestaurantParamList } from '@_types'

const Map = React.memo(
  ({
    currentLocation,
    setMarkerLocation,
    setMarkerVisible,
  }: {
    currentLocation: { currentLatitude: number; currentLongitude: number }
    setMarkerLocation?: (location: { lat: number; lng: number }) => void
    setMarkerVisible?: (visible: boolean) => void
  }) => {
    const { KAKAO_JAVASCRIPT_KEY } = Constants.expoConfig?.extra as AppConfig
    const appKey = KAKAO_JAVASCRIPT_KEY
    const isFocused = useIsFocused()
    const navigation = useNavigation<NavigationProp<RestaurantParamList>>()
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
      if (data.navigate && data.url) {
        navigation.navigate('Detail', { url: data.url })
      }
    }

    useEffect(() => {
      if (!setMarkerVisible) {
        setIsMapSearch(false)
        setRestaurantInfoView(true)
      }
    }, [])

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
            left: 10px;
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

          .customoverlay {
            position:relative;
            bottom:85px;border-radius:6px;
            border: 1px solid #ccc;
            border-bottom:2px solid #ddd;
            float:left;
            }
          .customoverlay:nth-of-type(n) {
            border:0;
            box-shadow:0px 1px 2px #888;
            }
          .customoverlay .redArrow {
            display:block;
            text-decoration:none;color:#000;
            text-align:center;
            border-radius:6px;
            font-size:14px;
            font-weight:bold;
            overflow:hidden;
            background: #d95050 url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png) no-repeat right 14px center;
            }
          .customoverlay .title {
            display:block;
            text-align:center;
            background:#fff;
            margin-right:35px;
            padding:10px 15px;
            font-size:14px;
            font-weight:bold;
            }
          .customoverlay:after {
            content:'';
            position:absolute;
            margin-left:-12px;
            left:50%;
            bottom:-12px;
            width:22px;
            height:12px;
            background:url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')
            }
        </style>
        <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&libraries=services"></script>
        <script>
              window.onload = function() {
                var button = document.getElementById('currentPositionButton');
                button.style.bottom = window.innerHeight * 0.75 + 'px';
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
            const imageSize = new kakao.maps.Size(30, 30);
            const imgOptions = {
                  offset: new kakao.maps.Point(13, 37)
                };
            const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);


            document.getElementById('currentPositionButton').onclick = function() {
              map.setCenter(currentPosition);
            };

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
                const content = '<div class="customoverlay" onclick="window.ReactNativeWebView.postMessage(JSON.stringify({ navigate: true, url: \\'${restaurant.place_url}\\' }))">' +
                    '    <span class="redArrow"> ' +
                    '    <span class="title">${restaurant.place_name}</span>' +
                    '    </span>' +
                    '</div>';


                var customOverlay = new kakao.maps.CustomOverlay({
                  position: restaurantMarker.getPosition(),
                  content: content,
                  xAnchor: 0.49,
                  yAnchor: 0.15
                });

                // 커스텀 오버레이를 지도에 표시합니다
                customOverlay.setMap(map);

              }
            }
          })();
        </script>
      </body>
    </html>
    `
    }, [isMapSearch, restaurant, currentLatitude, currentLongitude])

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
