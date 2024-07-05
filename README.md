[![image.png](https://i.postimg.cc/9fPzMLXs/1.png)]
[![image.png](https://i.postimg.cc/MGJvqCwy/2.png)]

# Prerequisites

1. Java 17이상 [**`설치`**](https://www.oracle.com/kr/java/technologies/downloads/)
2. API key가 적힌 `.env` 파일을 루트 폴더에 생성 - 보안문제 때문에 [**`노션 링크`**](https://www.notion.so/env-680c842937774ca7a167c2d19c30522f?pvs=21)를 확인해주세요.

# Install

1. 패키지 설치

   ```bash
   # 이미 설치한 패키지면 넘어가셔도 됩니다. 혹시 설치가 안 되면 sudo로 진행해주세요.
   npm install -g eas-cli

   # package.json에 정의된 패키지들 설치
   npm install
   npm run prebuild

   # EAS로 앱을 빌드하고 배포하려면 expo계정이 필요합니다
   eas login
   ```

   eas 계정은 [여기](https://www.notion.so/3947fcdb8e1f4eacb5a2780fbefb9103?pvs=21)에서 확인해주세요.

2. 안드로이드 sdk 경로 설정 파일 생성

   `local.properties`을 android 루트 폴더에 생성

   ```bash
   # local.properties 라는 이름을 가진 파일 생성 후 android 폴더에 넣어주세요.

   # mac
   sdk.dir = /Users/사용자계정이름/Library/Android/sdk

   # windows
   sdk.dir = C\:\\Users\\사용자계정이름\\AppData\\Local\\Android\\sdk
   ```

# Usage

## Build & Submit

“_랜덤다이닝”_ 빌드 진행 상황은 [expo.dev](http://expo.dev)에서 확인 가능합니다.

### **local build**

로컬환경에서 에뮬레이터 또는 실제기기에 쓰이는 개발용 빌드

```bash
npm run ios
# 위 명령어 입력 후에 android도 빌드 하려면 터미널에 a를 눌러주세요.
```

### EAS preview build

EAS환경에서 에뮬레이터 또는 실제기기에 쓰이는 개발용 빌드. 현재 —auto-submit 플래그를 설정한 상태이기 때문에 빌드 완료 후 자동으로 스토어에 제출됩니다.

```bash
 # ios, android 동시 빌드 및 제출
npm run build:preview:all

 # ios빌드 및 제출 - 제출 완료되면 App Store Connect의 랜덤다이닝-DEV의 testflight에서 확인 가능
npm run build:preview:ios

 # android빌드 및 제출
npm run build:preview:android
```

### EAS production build

EAS환경에서 실제기기에 쓰이는 출시용 빌드. 현재 —auto-submit 플래그를 설정한 상태이기 때문에 빌드 완료 후 자동으로 스토어에 제출됩니다.

```bash
 # ios, android 동시 빌드 및 제출
npm run build:production:all

 # ios빌드 및 제출 - 제출 완료되면 App Store Connect의 랜덤다이닝의 testflight에서 확인 가능
npm run build:production:ios

 # android빌드 및 제출
npm run build:production:android
```

## Update

긴급하게 버그를 수정해야할 때 유용한 명령어입니다. 네이티브 코드에 관한 수정은 불가하고 스타일, 이미지, 스크립트코드 등 **비**네이티브 코드만 수정 가능합니다.

```bash
 # ios, android 동시 업데이트
npm run update:production:all

 # ios 업데이트
npm run update:production:ios

 # android 업데이트
npm run update:production:android
```
