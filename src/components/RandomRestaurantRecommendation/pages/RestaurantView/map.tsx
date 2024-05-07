import React, { useEffect, useState } from 'react'
import { Dimensions, StyleSheet } from 'react-native'
import { WebView } from 'react-native-webview'
import { RestaurantTypes } from '@_types/restaurant'
import Constants from 'expo-constants'
import { AppConfig } from 'app.config'
import { getLocation } from '@_services/api'

const Map = ({
  info,
  location,
}: {
  info?: RestaurantTypes
  location?: { latitude: number; longitude: number }
}) => {
  const [html, setHtml] = useState('')
  const { KAKAO_JAVASCRIPT_KEY } = Constants.expoConfig?.extra as AppConfig
  const appKey = KAKAO_JAVASCRIPT_KEY
  const [currentLocation, setCurrentLocation] = useState(location)
  const [isMapSearch, setIsMapSearch] = useState(false)
  useEffect(() => {
    if (!currentLocation) {
      const getCurrentLocation = async () => {
        const { latitude, longitude } = await getLocation()
        setCurrentLocation({
          latitude: Number(latitude),
          longitude: Number(longitude),
        })
      }
      setIsMapSearch(true)
      getCurrentLocation()
    }
  }, [currentLocation])
  useEffect(() => {
    if (currentLocation) {
      const { latitude, longitude } = currentLocation

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
        </style>
            <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&libraries=services"></script>
        </head>
        <body >
            <div id="map" ></div>
            <script type="text/javascript">
                (function () {
                    const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
                    const options = { //지도를 생성할 때 필요한 기본 옵션
                        center: new kakao.maps.LatLng(${
                          info ? info.y : 37.5676859104888
                        }, ${
                          info ? info.x : 126.82597944995
                        }), //지도의 중심좌표.
                        level: 3 //지도의 레벨(확대, 축소 정도)
                    };

                    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

                    // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
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
                    var currentPosition = new kakao.maps.LatLng(${latitude}, ${longitude})
                    var currentImageSrc = 'https://i.postimg.cc/bv4k38Cq/red-circle.png',
                    currentImageSize = new kakao.maps.Size(20, 20),
                    currentImageOption = { offset: new kakao.maps.Point(04, 30) }
                    var currentMarkerImage = new kakao.maps.MarkerImage(
                      currentImageSrc,
                      currentImageSize,
                      currentImageOption,)
                    var currentMarker = new kakao.maps.Marker({
                      map: map,
                      position: currentPosition,
                      image: currentMarkerImage,
                    })
                    // 주소-좌표 변환 객체를 생성합니다
                    var geocoder = new kakao.maps.services.Geocoder();
                    // 주소로 좌표를 검색합니다
                    geocoder.addressSearch('제주특별자치도 제주시 첨단로 242', function(result, status) {

                        // 정상적으로 검색이 완료됐으면
                         if (status === kakao.maps.services.Status.OK) {

                            var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                            // 결과값으로 받은 위치를 마커로 표시합니다
                            var marker = new kakao.maps.Marker({
                                map: map,
                                position: coords
                            });

                            // 인포윈도우로 장소에 대한 설명을 표시합니다
                            var infowindow = new kakao.maps.InfoWindow({
                                content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
                            });
                            infowindow.open(map, marker);

                            // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                            map.setCenter(coords);
                        }
                      });

                })();


            </script>
        </body>
    </html>

`
      setHtml(newHtml)
    }
  }, [info, appKey, currentLocation])

  return (
    <WebView
      style={styles.container}
      source={{ html: html }}
      javaScriptEnabled={true}
      testID="map"
      injectedJavaScriptBeforeContentLoaded={`
    window.onerror = function(message, sourcefile, lineno, colno, error) {
      alert("Message: " + message + " - Source: " + sourcefile + " Line: " + lineno + ":" + colno);
      return true;
    };
    true;
  `}
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
