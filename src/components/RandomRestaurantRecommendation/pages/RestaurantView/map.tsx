import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'
import { LocationTypes } from '@_types/restaurant'
import Constants from 'expo-constants'
import { AppConfig } from 'app.config'

const Map = ({
  info,
  currentLocation,
}: {
  info?: LocationTypes
  currentLocation: { currentLatitude: number; currentLongitude: number }
}) => {
  const { currentLatitude, currentLongitude } = currentLocation
  const [html, setHtml] = useState('')
  const { KAKAO_JAVASCRIPT_KEY } = Constants.expoConfig?.extra as AppConfig
  const appKey = KAKAO_JAVASCRIPT_KEY
  const [isMapSearch, setIsMapSearch] = useState(false)
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
              bottom: 100px;
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
          }
        </style>
            <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&libraries=services"></script>
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
                      info ? info.y : 37.5676859104888
                    }, ${info ? info.x : 126.82597944995});

                    const imageSrc = '${isMapSearch ? '' : 'https://i.postimg.cc/pTp9xBHZ/free-icon-restaurant.png'}',
                    imageSize = new kakao.maps.Size(40, 40),
                    imageOption = { offset: new kakao.maps.Point(24, 40) }

                    // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
                    var markerImage = new kakao.maps.MarkerImage(
                    imageSrc,
                    imageSize,
                    imageOption,)

                    // 마커를 생성합니다
                    var marker = new kakao.maps.Marker({
                      map: map,
                      position: markerPosition,
                      image: markerImage,
                    })
                    var currentPosition = new kakao.maps.LatLng(${currentLatitude}, ${currentLongitude})
                    var currentImageSrc = 'https://i.postimg.cc/bv4k38Cq/red-circle.png',
                    currentImageSize = new kakao.maps.Size(20, 20),
                    currentImageOption = { offset: new kakao.maps.Point(24, 40) }
                    var currentMarkerImage = new kakao.maps.MarkerImage(
                      currentImageSrc,
                      currentImageSize,
                      currentImageOption,)
                    var currentMarker = new kakao.maps.Marker({
                      map: map,
                      position: currentPosition,
                      image: currentMarkerImage,
                    })

                    // 버튼 클릭시 지도에서 현재 위치의 중심으로 이동
                    document.getElementById('currentPositionButton').onclick = function() {
                        map.setCenter(currentPosition);
                    };
                    // 지도 찾기면 안 버튼이 안 보임
                    if (${isMapSearch}) {
                      document.getElementById('currentPositionButton').style.display = 'block';
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
    <WebView
      style={styles.container}
      source={{ html: html }}
      javaScriptEnabled={true}
      testID="map"
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
