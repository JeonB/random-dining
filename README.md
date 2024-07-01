[![image.png](https://i.postimg.cc/9fPzMLXs/1.png)]
[![image.png](https://i.postimg.cc/MGJvqCwy/2.png)]

# Install

```bash
# 이미 설치한 패키지면 넘어가셔도 됩니다. 혹시 설치가 안 되면 sudo로 진행해주세요.
npm install -g eas-cli dotenv-cli
npm install expo-updates expo-dev-client

# package.json에 정의된 패키지들 설치
npm install

# EAS로 앱을 빌드하고 배포하려면 expo계정이 필요합니다
eas login
```

# Usage

## Build & Submit

### **local build**

로컬환경에서 에뮬레이터 또는 실제기기에 쓰이는 개발용 빌드

```bash
npm run ios
# 위 명령어 입력 후에 android도 빌드 하려면 터미널에 a를 눌러주세요.
```

### EAS preview build

EAS환경에서 에뮬레이터 또는 실제기기에 쓰이는 개발용 빌드. 현재 —auto-submit 플래그를 설정한 상태이기 때문에 빌드 완료 후 자동으로 스토어에 제출됩니다.

Expo.dev에서 빌드 및 제출 상황 확인 가능합니다.

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

Expo.dev에서 빌드 및 제출 상황 확인 가능합니다.

```bash
 # ios, android 동시 빌드 및 제출
npm run build:production:all

 # ios빌드 및 제출 - 제출 완료되면 App Store Connect의 랜덤다이닝의 testflight에서 확인 가능
npm run build:production:ios

 # android빌드 및 제출
npm run build:production:android
```

## Update

긴급하게 버그를 수정해야할 때 유용한 명령어입니다. 네이티브 코드에 관한 수정은 불가하고 스타일, 이미지, 스크립트코드 등 비네이티브 코드만 수정 가능합니다.

```bash
 # ios, android 동시 업데이트
npm run update:production:all

 # ios 업데이트
npm run update:production:ios

 # android 업데이트
npm run update:production:android
```
