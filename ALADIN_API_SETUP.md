# 알라딘 API 설정 가이드

이 문서는 알라딘 Open API를 사용하기 위한 설정 가이드입니다.

## 1. 알라딘 TTB 키 발급받기

### 단계별 가이드

1. **알라딘 회원가입**
   - https://www.aladin.co.kr 접속
   - 회원가입 진행 (이미 회원이라면 로그인)

2. **TTB 키 신청**
   - 알라딘 Open API 페이지 방문: https://blog.aladin.co.kr/openapi
   - 또는 직접 링크: https://www.aladin.co.kr/ttb/wkeyform.aspx
   - 로그인 후 API 키 신청 양식 작성
   - TTB(Tool, Tech, Book) 키 발급 (무료)

3. **TTB 키 확인**
   - 신청 후 즉시 발급됨
   - 형식: `ttb키이름1234001` (예시)
   - 이메일로도 전송됨

## 2. 환경 변수 설정

### .env 파일 생성

```bash
# 프로젝트 루트에 .env 파일 생성
cp .env.example .env
```

### TTB 키 입력

`.env` 파일을 열고 발급받은 TTB 키를 입력:

```env
ALADIN_TTB_KEY=여기에발급받은TTB키입력
```

예시:
```env
ALADIN_TTB_KEY=ttbtest1234001
```

## 3. API 사용량 및 제한

### 무료 플랜
- **일일 호출 제한**: 5,000회
- **분당 호출 제한**: 100회
- **검색 결과**: 최대 200개까지 조회 가능

### 주의사항
- API 키는 절대 공개하지 마세요
- `.env` 파일은 `.gitignore`에 포함되어 있어 Git에 커밋되지 않습니다
- 프로덕션 환경(Netlify)에서는 환경 변수를 별도로 설정해야 합니다

## 4. Netlify 환경 변수 설정

배포 시 Netlify 대시보드에서 환경 변수 설정:

1. Netlify 대시보드 → 해당 프로젝트 선택
2. **Site settings** → **Environment variables**
3. **Add a variable** 클릭
4. 다음 환경 변수 추가:
   ```
   Key: ALADIN_TTB_KEY
   Value: 여기에발급받은TTB키입력
   ```
5. **Save** 클릭

## 5. API 테스트

로컬에서 테스트:

```bash
# 개발 서버 실행
npm run dev

# 브라우저에서 테스트
http://localhost:3000/api/books?search=클린코드
http://localhost:3000/api/books/isbn/9788966260959
```

Swagger UI에서 테스트:
```
http://localhost:3000/api-docs
```

## 6. 알라딘 API 문서

- **공식 문서**: https://blog.aladin.co.kr/openapi
- **상품 검색 API**: ItemSearch
- **상품 조회 API**: ItemLookUp

## 문제 해결

### TTB 키 오류
```
Error: ALADIN_TTB_KEY 환경 변수가 설정되지 않았습니다
```
→ `.env` 파일에 `ALADIN_TTB_KEY` 설정 확인

### API 호출 실패
```
알라딘 API 호출 실패: timeout of 10000ms exceeded
```
→ 네트워크 연결 확인, TTB 키 유효성 확인

### 검색 결과 없음
```
검색 결과가 없습니다
```
→ 검색어 확인, 다른 키워드로 재시도

## 지원

- 알라딘 API 문의: https://blog.aladin.co.kr/openapi/category/39154
- 프로젝트 이슈: GitHub Issues
