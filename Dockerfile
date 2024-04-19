FROM node:alpine AS mobile-app

# 작업 디렉토리 설정
WORKDIR /app

# package.json 복사하여 종속성 설치
COPY ./apps/mobile-app/package.json ./

# 종속성 설치
RUN npm install

# 소스 코드 복사
COPY . .

# 포트 노출
EXPOSE 8081

# 애플리케이션 시작 명령어
CMD cd apps/mobile-app && npm start
