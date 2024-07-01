[![image.png](https://i.postimg.cc/SxgXTdcg/image.png)](https://postimg.cc/cv846Q93)
[![image.png](https://i.postimg.cc/bNTdrgVq/image.png)](https://postimg.cc/xcX9FvSZ)

# Install

---

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

---

## Build

### **local build**

로컬환경에서 에뮬레이터 또는 실제기기에 쓰이는 개발용 빌드

```bash
npm run ios
# 위 명령어 입력 후에 android도 빌드 하려면 터미널에 a를 눌러주세요.
```

### EAS preview build

EAS환경에서 에뮬레이터 또는 실제기기에 쓰이는 개발용 빌드. Expo.dev에서 확인 가능

```bash
 # ios, android 동시 빌드 및 제출
 build:preview:all

 # ios빌드 및 제출 - 제출 완료되면 App Store Connect의 랜덤다이닝-DEV의 testflight에서 확인 가능
 build:preview:ios

 # android빌드 및 제출
 build:preview:android
```

### EAS production build

EAS환경에서 실제기기에 쓰이는 출시용 빌드. Expo.dev에서 확인 가능

```bash
 # ios, android 동시 빌드 및 제출
 build:production:all

 # ios빌드 및 제출 - 제출 완료되면 App Store Connect의 랜덤다이닝의 testflight에서 확인 가능
 build:production:ios

 # android빌드 및 제출
 build:production:android
```
