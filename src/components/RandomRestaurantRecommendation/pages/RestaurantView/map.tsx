import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet, SafeAreaView } from 'react-native'
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
  const [html, setHtml] = useState('')
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
        <body >
            <div id="map" ></div>
            <button id="currentPositionButton"></button>
            <script type="text/javascript">
                (function () {
                    const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
                    const options = { //지도를 생성할 때 필요한 기본 옵션
                        center: new kakao.maps.LatLng(${
                          info ? info.y : currentLatitude
                        }, ${
                          info ? info.x : currentLongitude
                        }), //지도의 중심좌표.
                        level: 3 //지도의 레벨(확대, 축소 정도)
                    };

                    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

                    const markerPosition  = new kakao.maps.LatLng(${
                      info ? info.y : currentLatitude
                    }, ${info ? info.x : currentLongitude});

                    const imageSrc = '${isMapSearch ? '' : 'https://i.postimg.cc/pTp9xBHZ/free-icon-restaurant.png'}',
                    imageSize = new kakao.maps.Size(40, 40),
                    imageOption = { offset: new kakao.maps.Point(24, 40) }

                    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
                    var markerImage = new kakao.maps.MarkerImage(
                    imageSrc,
                    imageSize,
                    imageOption,)

                    // 마커를 생성합니다
                    const marker = new kakao.maps.Marker({
                      map: map,
                      position: markerPosition,
                      image: markerImage,
                    })
                    const currentPosition = new kakao.maps.LatLng(${currentLatitude}, ${currentLongitude})
                    const currentImageSrc = 'https://i.postimg.cc/bv4k38Cq/red-circle.png',
                    currentImageSize = new kakao.maps.Size(20, 20),
                    currentImageOption = { offset: new kakao.maps.Point(24, 40) }
                    const currentMarkerImage = new kakao.maps.MarkerImage(
                      currentImageSrc,
                      currentImageSize,
                      currentImageOption,)
                    const currentMarker = new kakao.maps.Marker({
                      map: map,
                      position: currentPosition,
                      image: currentMarkerImage,
                    })

                    // 버튼 클릭시 지도에서 현재 위치의 중심으로 이동
                    document.getElementById('currentPositionButton').onclick = function() {
                        map.setCenter(currentPosition);
                    };
                    // 지도 찾기면 버튼이 안 보임
                    if (${isMapSearch}) {
                      document.getElementById('currentPositionButton').style.display = 'block';
                      const clickedMarker = new kakao.maps.Marker({
                        // 지도 중심좌표에 마커를 생성합니다
                        position: map.getCenter()
                      });


                      let markerVisible = false;
                      // 지도에 클릭 이벤트를 등록합니다
                      kakao.maps.event.addListener(map, 'click', function(mouseEvent) {

                          // 클릭한 위도, 경도 정보를 가져옵니다
                          let latlng = mouseEvent.latLng;

                          // 마커가 이미 표시되어 있다면 마커를 숨기고, 그렇지 않다면 마커를 표시합니다.
                          if (markerVisible) {
                              clickedMarker.setMap(null);
                              markerVisible = false;
                          } else {
                              window.ReactNativeWebView.postMessage(JSON.stringify({ lat: latlng.getLat(), lng: latlng.getLng() }));
                              clickedMarker.setMap(map);
                              // 마커 위치를 클릭한 위치로 옮깁니다
                              clickedMarker.setPosition(latlng);
                              markerVisible = true;
                          }
                          window.ReactNativeWebView.postMessage(JSON.stringify({ markerVisible: markerVisible }));

                      });
                    } else {
                        document.getElementById('currentPositionButton').style.display = 'none';
                    }


                  })();
            </script>
        </body>
    </html>

`
    setHtml(newHtml)
  }, [info, appKey, isMapSearch])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        style={styles.container}
        source={{ html: html, baseUrl: '' }}
        javaScriptEnabled={true}
        testID="map"
        originWhitelist={['*']}
        onMessage={onMessage}
        // mixedContentMode="always"
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
