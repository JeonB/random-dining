import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { KAKAO_JAVASCRIPT_KEY } from '@env';
import { Restaurant } from '@_types/Restaurant';

interface MapProps {
  info: Restaurant;
}

const Map: React.FC<MapProps> = ({ info }) => {
  const [html, setHtml] = useState('');
  const appKey = KAKAO_JAVASCRIPT_KEY;

  useEffect(() => {
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
            <script type="text/javascript" src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&libraries=services,clusterer,drawing"></script>
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

                    // 마커를 생성합니다
                    const marker = new kakao.maps.Marker({
                        position: markerPosition
                    });

                    // 마커가 지도 위에 표시되도록 설정합니다
                    marker.setMap(map);

                    // 주소-좌표 변환 객체를 생성합니다
                    const geocoder = new kakao.maps.services.Geocoder();
                })();
            </script>
        </body>
    </html>
`;
    setHtml(newHtml);
  }, [info, appKey]);

  return (
    <WebView
      style={styles.container}
      source={{ html: html }}
      javaScriptEnabled={true}
    />
  );
};

export default Map;

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
});
