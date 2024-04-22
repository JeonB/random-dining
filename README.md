[![image.png](https://i.postimg.cc/SxgXTdcg/image.png)](https://postimg.cc/cv846Q93)
[![image.png](https://i.postimg.cc/bNTdrgVq/image.png)](https://postimg.cc/xcX9FvSZ)

1. **요구 사항 분석**: 
    
    > **사용자 요구사항 정의**
    - 랜식추 프로그램(뭐먹지)은 사용자 주변 식당 중에서 랜덤으로 한 개의 식당을 추천해야 한다.
    > 
2. **기능 명세**: 
    
    > 개발해야할 기능 및 현재 개발 완료한 기능
    > 
    > - [x]  랜덤으로 나온 식당 중 마음에 안 들면 다시 랜덤 선택이 가능해야 한다. 이 때, 한 번 나온 식당은 제외한다. 리셋 기능도 있어야 한다.
    > - [x]  카테고리별로 메뉴 선정이 가능해야한다. 예를 들어 일식,중식,한식,양식,분식 등의 카테고리에서 식당이 추천되어야 한다.
    > - [ ]  사용자 기준 반경 50m ~ 250m 이내로 식당을 추천해야 한다.
    > - [ ]  위치 설정 - 현재 위치 혹은 사용자가 직접 위치를 설정할 수 있어야 한다.
    > - [ ]  리스트 사용자화 - 식당 리스트는 사용자가 직접 추가 및 삭제가 가능해야 한다.
    > - [ ]  방문한 식당은 리스트에 저장되어야 한다. 리스트에 저장된 식당 중 랜덤 선택에서 제외하는 기능도 있어야 한다.
    > - [ ]  설정 페이지 -
3. **데이터 구조 설계**: 
    
    > 사용한 DB, ORM 라이브러리
    > 
    > 1. PostgreSQL , TypeORM 사용
    > 2. 식당 entity 작성 - 식당명, 카테고리, 거리, 장소 URL, 전화번호 데이터를 Kakao API를 통해 추출 및 가공하여 DB에 저장
    > 3. **Entities (테이블):**
    >     
    >     **Restaurant (식당):**
    >     
    >     - id: Primary Key, UUID
    >     - name: 식당명, 문자열 (String)
    >     - category: 카테고리, 문자열 (String)
    >     - distance: 거리, 숫자 (Number)
    >     - placeUrl: 장소 URL, 문자열 (String)
    >     - phoneNumber: 전화번호, 문자열 (String)
    >     - x : 경도 (String)
    >     - y : 위도 (String)
4. **알고리즘 설계**: 
    
    > 1. 랜덤 식당 추천 알고리즘 - 배열 랜덤 셔플 및 30개까지 복사
    > 
    > 
    > 2. 바로 직전 추첨된 메뉴,일주일 전 메뉴 등 사용자가 설정한 메뉴들을 제외 가능하게 할 수 있음.
    > 
    > 3. 반경 250m이내의 식당만 크롤링하며 50m, 100m, 150m, 200m, 250m 구간 별로 식당 데이터를 가져 옴 
    > 
5. **사용자 인터페이스 설계**: 
    
    > ReactNative 전용 UI 라이브러리
    > 
    > 1. [React Native Elements](https://reactnativeelements.com/)
    > 2. [React Native Paper](https://callstack.github.io/react-native-paper/)
    > 3. [UI kitten](https://akveo.github.io/react-native-ui-kitten/)
    > 4. [TAMA GUI](https://tamagui.dev/)
    > 5. [RNUILib](https://wix.github.io/react-native-ui-lib/)
    > 6. [Radix](https://www.radix-ui.com/)
    > 7. [Glue Stack](https://gluestack.io/)
6. 사용 기술 스택: 
    
    > FrontEnd
    - React, ReactNative, Typescript 

7. **테스트 및 디버깅**: 
    
    > 테스트 라이브러리 
    - Jest
