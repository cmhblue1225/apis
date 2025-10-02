# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

**iOS 앱 백엔드 API 서버**

- **역할**: iOS 앱을 위한 RESTful API 제공
- **책임**: API 개발, Swagger 문서화, 다른 개발자들에게 API 제공
- **배포**: Netlify Functions를 통한 서버리스 배포
- **레포지토리**: https://github.com/cmhblue1225/apis.git

## 개발 환경

- **플랫폼**: macOS (Darwin 25.0.0)
- **하드웨어**: MacBook Pro M4 Pro (14-core CPU, 20-core GPU)
- **위치**: `/Users/dev/apis`
- **Node.js**: v20+ (Apple Silicon 최적화)
- **TypeScript**: 5.3+
- **배포 플랫폼**: Netlify

## 핵심 명령어

### 로컬 개발
```bash
# 패키지 설치
npm install

# 개발 서버 실행 (로컬)
npm run dev
# → http://localhost:3000

# Netlify Dev 환경 실행
npm run netlify:dev

# Swagger 문서 생성
npm run swagger
# → http://localhost:3000/api-docs

# 타입 체크 및 빌드
npm run build

# 린트 검사
npm run lint

# 테스트 실행
npm test
```

### 배포
```bash
# Netlify 빌드
npm run netlify:build

# Git 푸시 시 자동 배포 (Netlify 연동 후)
git push origin main
```

## 프로젝트 구조

```
apis/
├── src/
│   ├── index.ts              # Express 앱 진입점, Swagger 설정
│   ├── routes/               # API 라우트 정의 (Swagger 주석 포함)
│   ├── controllers/          # 비즈니스 로직 구현
│   ├── models/               # 데이터 모델 정의
│   ├── middleware/           # Express 미들웨어
│   ├── utils/                # 유틸리티 함수
│   ├── types/                # TypeScript 타입 정의
│   └── functions/            # Netlify Functions용 코드
├── netlify/
│   └── functions/
│       └── api.ts            # Netlify Functions 래퍼
├── dist/                     # 빌드 결과물
├── netlify.toml              # Netlify 배포 설정
├── package.json              # 의존성 및 스크립트
└── tsconfig.json             # TypeScript 설정
```

## API 개발 워크플로우

### 1. 새로운 API 엔드포인트 추가

**단계:**
1. `src/types/` 에 필요한 타입 정의
2. `src/models/` 에 데이터 모델 작성 (필요시)
3. `src/controllers/` 에 비즈니스 로직 작성
4. `src/routes/` 에 라우트와 **Swagger 주석** 추가
5. `src/index.ts` 에 라우트 등록

**예시: User API 추가**

```typescript
// src/types/user.types.ts
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

// src/controllers/user.controller.ts
import { Request, Response } from 'express';

export const userController = {
  getUsers: async (req: Request, res: Response) => {
    // 비즈니스 로직
  },

  getUserById: async (req: Request, res: Response) => {
    // 비즈니스 로직
  }
};

// src/routes/user.routes.ts
import { Router } from 'express';
import { userController } from '../controllers/user.controller';

const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: 사용자 목록 조회
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: 성공
 */
router.get('/', userController.getUsers);

export default router;

// src/index.ts에 등록
import userRoutes from './routes/user.routes';
app.use('/api/users', userRoutes);
```

### 2. Swagger 문서화

**모든 API는 반드시 Swagger 주석을 포함해야 합니다.**

```typescript
/**
 * @swagger
 * /api/endpoint:
 *   method:
 *     summary: 간단한 설명
 *     description: 자세한 설명
 *     tags: [TagName]
 *     parameters:
 *       - in: path/query/body
 *         name: paramName
 *         required: true
 *         schema:
 *           type: string
 *         description: 파라미터 설명
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *     responses:
 *       200:
 *         description: 성공
 *       400:
 *         description: 잘못된 요청
 *       500:
 *         description: 서버 에러
 */
```

**Swagger 문서 확인:**
- 로컬: `http://localhost:3000/api-docs`
- 프로덕션: `https://your-app.netlify.app/api-docs`

### 3. API 응답 형식

**일관된 응답 구조를 사용합니다:**

```typescript
// 성공 응답
{
  "success": true,
  "message": "작업 성공",
  "data": { /* 실제 데이터 */ }
}

// 에러 응답
{
  "success": false,
  "message": "에러 메시지",
  "error": "상세 에러 정보"
}

// 페이지네이션 응답
{
  "success": true,
  "data": [ /* 아이템 배열 */ ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}
```

## Netlify Functions 배포

### 로컬 테스트
```bash
npm run netlify:dev
```

### 환경 변수 설정
Netlify 대시보드에서 다음 환경 변수 설정:
```
NODE_ENV=production
API_BASE_URL=https://your-app.netlify.app
# 기타 필요한 환경 변수
```

### 배포 프로세스
1. 코드를 GitHub에 푸시
2. Netlify가 자동으로 빌드 및 배포
3. `netlify.toml` 설정에 따라 Functions 생성
4. `/api/*` 요청이 `/.netlify/functions/api`로 리다이렉트

## 코드 작성 규칙

### TypeScript
- **strict 모드** 활성화
- 모든 함수와 변수에 **타입 명시**
- `any` 타입 사용 최소화
- `src/types/`에 공통 타입 정의

### 에러 처리
```typescript
try {
  // 비즈니스 로직
} catch (error) {
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: error instanceof Error ? error.message : 'Unknown error'
  });
}
```

### 유효성 검증
- 클라이언트 입력은 항상 검증
- `express-validator` 사용 권장
- 필수 파라미터 체크

### 보안
- 민감한 정보는 `.env` 파일에 저장
- `.env`는 절대 Git에 커밋 금지
- CORS 설정 확인
- Helmet 미들웨어로 보안 헤더 설정

## 다른 개발자와 협업

### API 문서 제공
1. Swagger UI 링크 공유
2. Postman Collection 생성 (선택사항)
3. API 변경사항은 문서에 즉시 반영

### 버전 관리
- 주요 변경 시 API 버전 업데이트
- Breaking changes는 사전 공지
- Git 태그로 버전 관리

### 커뮤니케이션
- API 변경사항은 팀에 공지
- 엔드포인트 추가/수정/삭제 시 문서 업데이트
- 이슈는 GitHub Issues에 등록

## 성능 최적화

### Apple Silicon (M4 Pro) 최적화
- 네이티브 ARM64 패키지 사용
- `npm install` 시 자동으로 최적화된 바이너리 설치

### 캐싱 전략
- 자주 조회되는 데이터 캐싱
- Redis 또는 메모리 캐싱 고려

### 데이터베이스 최적화
- 인덱스 적절히 사용
- N+1 쿼리 문제 방지
- 페이지네이션 구현

## 트러블슈팅

### 로컬 개발 시 포트 충돌
```bash
# 3000번 포트 사용 중인 프로세스 종료
lsof -ti:3000 | xargs kill -9
```

### Netlify Functions 빌드 실패
- `netlify.toml` 설정 확인
- `package.json`의 build 스크립트 확인
- 환경 변수 설정 확인

### TypeScript 컴파일 에러
```bash
# 타입 체크
npx tsc --noEmit

# node_modules 재설치
rm -rf node_modules package-lock.json
npm install
```

## 참고 자료

- [Netlify Functions 문서](https://docs.netlify.com/functions/overview/)
- [Swagger/OpenAPI 명세](https://swagger.io/specification/)
- [Express.js 가이드](https://expressjs.com/)
- [TypeScript 핸드북](https://www.typescriptlang.org/docs/)

## 작업 시 유의사항

1. **모든 API는 Swagger 문서화 필수**
2. **일관된 응답 형식 사용**
3. **에러 처리 철저히**
4. **환경 변수로 민감한 정보 관리**
5. **코드 변경 시 테스트 필수**
6. **API 변경사항은 팀에 공지**
7. **한국어로 커뮤니케이션**
