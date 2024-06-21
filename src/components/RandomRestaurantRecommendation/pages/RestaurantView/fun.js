var markers = []

// 검색 결과 목록과 마커를 표출하는 함수입니다
function displayPlaces(places) {
  // 지도에 표시되고 있는 마커를 제거합니다
  removeMarker()

  for (var i = 0; i < places.length; i++) {
    // 마커를 생성하고 지도에 표시합니다
    var placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
      marker = addMarker(placePosition, i)

    ;(function (marker, title) {
      kakao.maps.event.addListener(marker, 'mouseover', function () {
        displayInfowindow(marker, title)
      })

      kakao.maps.event.addListener(marker, 'mouseout', function () {
        infowindow.close()
      })
    })(marker, places[i].place_name)
  }
}

// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
function addMarker(position, idx, title) {
  var imageSrc =
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
    imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
    imgOptions = {
      spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
      spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
      offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
    },
    markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
    marker = new kakao.maps.Marker({
      position: position, // 마커의 위치
      image: markerImage,
      clickable: true,
    })

  marker.setMap(map) // 지도 위에 마커를 표출합니다
  markers.push(marker) // 배열에 생성된 마커를 추가합니다

  return marker
}

// 지도 위에 표시되고 있는 마커를 모두 제거합니다
function removeMarker() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null)
  }
  markers = []
}

// 검색결과 목록 또는 마커를 클릭했을 때 호출되는 함수입니다
// 인포윈도우에 장소명을 표시합니다
function displayInfowindow(marker, title) {
  var content = '<div style="padding:5px;z-index:1;">' + title + '</div>'

  infowindow.setContent(content)
  infowindow.open(map, marker)
}
