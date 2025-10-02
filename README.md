# iOS Backend API

iOS 앱을 위한 백엔드 RESTful API 서버

## 📋 프로젝트 개요

이 프로젝트는 iOS 앱 개발팀을 위한 백엔드 API를 제공합니다.

- **배포 플랫폼**: Netlify Functions (서버리스)
- **기술 스택**: Node.js, Express, TypeScript
- **문서화**: Swagger/OpenAPI 3.0
- **레포지토리**: https://github.com/cmhblue1225/apis

## 🚀 빠른 시작

### 필수 요구사항

- Node.js 20 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 레포지토리 클론
git clone https://github.com/cmhblue1225/apis.git
cd apis

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env
# .env 파일을 열어 필요한 환경 변수 설정

# 개발 서버 실행
npm run dev
```

개발 서버가 실행되면 다음 주소로 접근할 수 있습니다:
- API 서버: http://localhost:3000
- Swagger 문서: http://localhost:3000/api-docs

## 📚 API 문서

### Swagger UI

모든 API 엔드포인트는 Swagger UI를 통해 문서화되어 있습니다.

- **로컬**: http://localhost:3000/api-docs
- **프로덕션**: https://your-app.netlify.app/api-docs

### 사용 가능한 엔드포인트

#### 헬스 체크
```
GET /health
```

#### 예제 API (샘플)
```
GET    /api/example       # 모든 데이터 조회
GET    /api/example/:id   # 특정 데이터 조회
POST   /api/example       # 새 데이터 생성
```

## 🛠️ 개발 가이드

### 프로젝트 구조

```
apis/
├── src/
│   ├── index.ts              # Express 앱 진입점
│   ├── routes/               # API 라우트
│   ├── controllers/          # 비즈니스 로직
│   ├── models/               # 데이터 모델
│   ├── middleware/           # 미들웨어
│   ├── utils/                # 유틸리티
│   ├── types/                # TypeScript 타입
│   └── functions/            # Netlify Functions
├── netlify/
│   └── functions/            # Netlify Functions 래퍼
├── netlify.toml              # Netlify 설정
└── package.json
```

### 새로운 API 추가하기

1. **타입 정의** (`src/types/`)
2. **컨트롤러 작성** (`src/controllers/`)
3. **라우트 정의** (`src/routes/`)
4. **Swagger 주석 추가** (라우트 파일)
5. **index.ts에 라우트 등록**

자세한 내용은 `CLAUDE.md` 파일을 참고하세요.

### 사용 가능한 명령어

```bash
# 개발
npm run dev              # 개발 서버 실행
npm run netlify:dev      # Netlify Dev 환경 실행

# 빌드
npm run build            # TypeScript 빌드
npm run netlify:build    # Netlify 배포용 빌드

# 코드 품질
npm run lint             # ESLint 검사
npm test                 # 테스트 실행

# 문서
npm run swagger          # Swagger 문서 생성
```

## 🌐 배포

### Netlify 배포 설정

1. Netlify에 GitHub 레포지토리 연결
2. 빌드 설정:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Functions directory**: `netlify/functions`

3. 환경 변수 설정 (Netlify 대시보드):
   ```
   NODE_ENV=production
   API_BASE_URL=https://your-app.netlify.app
   ```

4. Git push 시 자동 배포:
   ```bash
   git push origin main
   ```

## 📝 API 응답 형식

### 성공 응답
```json
{
  "success": true,
  "message": "작업 성공",
  "data": { }
}
```

### 에러 응답
```json
{
  "success": false,
  "message": "에러 메시지",
  "error": "상세 에러 정보"
}
```

## 🔒 보안

- 모든 민감한 정보는 환경 변수로 관리
- CORS 설정으로 허용된 도메인만 접근 가능
- Helmet 미들웨어로 보안 헤더 설정
- 입력 데이터 유효성 검증

## 🤝 협업

### API 변경사항 공유

- Swagger 문서 링크를 팀에 공유
- 주요 변경사항은 Git 커밋 메시지에 명시
- Breaking changes는 사전 공지

### Git 워크플로우

```bash
# 새 기능 개발
git checkout -b feature/새기능이름
# 작업 후 커밋
git commit -m "feat: 새로운 API 엔드포인트 추가"
git push origin feature/새기능이름
# Pull Request 생성
```

## 📞 문의

프로젝트 관련 문의사항은 GitHub Issues를 통해 등록해주세요.

## 📄 라이선스

ISC

---

**개발자**: iOS Backend Team
**마지막 업데이트**: 2025-10-02
