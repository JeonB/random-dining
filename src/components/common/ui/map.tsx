import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, StyleSheet, SafeAreaView } from 'react-native'
import { WebView, WebViewMessageEvent } from 'react-native-webview'
import { LocationTypes } from '@_types'
import Constants from 'expo-constants'
import { AppConfig } from 'app.config'
import { useStore } from '@_common/utils/zustandStore'

const Map = ({
  info,
  restaurantItems,
  currentLocation,
  setMarkerLocation,
  setMarkerVisible,
}: {
  info?: LocationTypes
  restaurantItems?: LocationTypes[]
  currentLocation: { currentLatitude: number; currentLongitude: number }
  setMarkerLocation?: (location: { lat: number; lng: number }) => void
  setMarkerVisible?: (visible: boolean) => void
}) => {
  const { KAKAO_JAVASCRIPT_KEY } = Constants.expoConfig?.extra as AppConfig
  const appKey = KAKAO_JAVASCRIPT_KEY
  const { restaurant } = useStore(state => ({ restaurant: state.restaurant }))
  const { currentLatitude, currentLongitude } = currentLocation
  const [html, setHtml] = useState('')
  const [isMapSearch, setIsMapSearch] = useState(false)
  const [getRestaurantInfo, setGetRestaurantInfo] = useState(false)

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
      if (restaurantItems) {
        setGetRestaurantInfo(true)
      }
    }
    const newHtml = `
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
              center: new kakao.maps.LatLng(${info ? info.y : currentLatitude}, ${info ? info.x : currentLongitude}),
              level: 3
            };

            const map = new kakao.maps.Map(container, options);
            const infowindow = new kakao.maps.InfoWindow({zIndex:1});

            // const markerPosition = new kakao.maps.LatLng(${info ? info.y : currentLatitude}, ${info ? info.x : currentLongitude});
            // const imageSrc = '${isMapSearch ? '' : 'https://i.postimg.cc/pTp9xBHZ/free-icon-restaurant.png'}';
            // const imageSize = new kakao.maps.Size(40, 40);
            // const imageOption = { offset: new kakao.maps.Point(24, 40) };
            // const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

            // const marker = new kakao.maps.Marker({
            //   map: map,
            //   position: markerPosition,
            //   image: markerImage
            // });

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

            document.getElementById('currentPositionButton').onclick = function() {
              map.setCenter(currentPosition);
            };

            if (${isMapSearch} && !${getRestaurantInfo}) {
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
            } else if (${getRestaurantInfo}) {
              var markers = [];
              function displayPlaces(places) {
                removeMarker();

                for (var i = 0; i < places.length; i++) {
                  var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x);
                  var marker = addMarker(placePosition, i);
                  (function (marker, title) {
                    kakao.maps.event.addListener(marker, 'click', function () {
                      displayInfowindow(marker, title)
                    })


                  })(marker, places[i].place_name)
                }
              }

              function addMarker(position) {
                var imageSrc = 'https://i.postimg.cc/pTp9xBHZ/free-icon-restaurant.png';
                var imageSize = new kakao.maps.Size(22, 22);
                var imgOptions = {
                  offset: new kakao.maps.Point(13, 37)
                };
                var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions);
                var marker = new kakao.maps.Marker({
                  position: position,
                  image: markerImage,
                  clickable: true
                });

                marker.setMap(map);
                markers.push(marker);
                return marker;
              }

              function removeMarker() {
                for (var i = 0; i < markers.length; i++) {
                  markers[i].setMap(null);
                }
                markers = [];
              }

              function displayInfowindow(marker, title) {
                var content = '<div style="padding:15px;z-index:1;">' + title + '</div>'

                infowindow.setContent(content)
                infowindow.open(map, marker)
              }

              kakao.maps.event.addListener(map, 'click', function () {
                      infowindow.close()
              })
              const arr = ${JSON.stringify(restaurantItems)};
              displayPlaces(arr);
            }
          })();
        </script>
      </body>
    </html>
    `
    setHtml(newHtml)
  }, [info, isMapSearch, restaurantItems])

  const webviewRef = useRef<WebView>(null)
  useEffect(() => {
    if (html) {
      const webviewScript = `
        if (markers) {
          for (var i = 0; i < markers.length; i++) {
            if (markers[i].getPosition().getLat() === '${restaurant.y}' && markers[i].getPosition().getLng() === '${restaurant.x}') {
              triggerMarkerClick(markers[i]);
            }
          }
        }
        true;
      `
      webviewRef.current?.injectJavaScript(webviewScript)
    }
  }, [restaurant])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        style={styles.container}
        source={{ html: html, baseUrl: '' }}
        javaScriptEnabled={true}
        testID="map"
        originWhitelist={['*']}
        onMessage={onMessage}
      />
    </SafeAreaView>
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
