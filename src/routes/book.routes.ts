import { Router } from 'express';
import { bookController } from '../controllers/book.controller';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: 책 검색 및 조회 API (독서 관리 앱용)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: 알라딘 상품 ID
 *           example: "123456789"
 *         isbn:
 *           type: string
 *           description: ISBN-10
 *           example: "8966260950"
 *         isbn13:
 *           type: string
 *           description: ISBN-13
 *           example: "9788966260959"
 *         title:
 *           type: string
 *           description: 책 제목
 *           example: "클린 코드"
 *         subtitle:
 *           type: string
 *           description: 부제
 *           example: "애자일 소프트웨어 장인 정신"
 *         author:
 *           type: string
 *           description: 저자
 *           example: "로버트 C. 마틴"
 *         publisher:
 *           type: string
 *           description: 출판사
 *           example: "인사이트"
 *         publishedDate:
 *           type: string
 *           description: 출판일
 *           example: "2013-12-24"
 *         description:
 *           type: string
 *           description: 책 설명
 *         coverImage:
 *           type: string
 *           description: 표지 이미지 URL
 *         categoryName:
 *           type: string
 *           description: 카테고리
 *           example: "국내도서>컴퓨터/IT"
 *         pageCount:
 *           type: number
 *           description: 페이지 수
 *           example: 584
 *         price:
 *           type: object
 *           properties:
 *             standard:
 *               type: number
 *               description: 정가
 *             sales:
 *               type: number
 *               description: 판매가
 *             currency:
 *               type: string
 *               example: "KRW"
 *         link:
 *           type: string
 *           description: 알라딘 상품 링크
 *         stockStatus:
 *           type: string
 *           description: 재고 상태
 *         rating:
 *           type: number
 *           description: 고객 평점 (5점 만점)
 *         addedAt:
 *           type: string
 *           format: date-time
 *           description: 등록 시간 (ISO 8601)
 */

/**
 * @swagger
 * /api/books/search:
 *   get:
 *     summary: 책 검색 (제목, 저자 등)
 *     description: 사용자가 입력한 검색어로 책을 검색합니다
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: 검색어 (제목, 저자 등)
 *         example: "클린코드"
 *       - in: query
 *         name: queryType
 *         schema:
 *           type: string
 *           enum: [Title, Author, Publisher, Keyword]
 *           default: Title
 *         description: 검색 타입
 *       - in: query
 *         name: maxResults
 *         schema:
 *           type: number
 *           default: 10
 *           minimum: 1
 *           maximum: 50
 *         description: 최대 결과 수
 *       - in: query
 *         name: start
 *         schema:
 *           type: number
 *           default: 1
 *         description: 시작 인덱스 (페이지네이션)
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [Accuracy, PublishTime, Title, SalesPoint]
 *           default: Accuracy
 *         description: 정렬 기준
 *     responses:
 *       200:
 *         description: 검색 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "5개의 책을 찾았습니다"
 *                 data:
 *                   type: object
 *                   properties:
 *                     books:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Book'
 *                     totalResults:
 *                       type: number
 *                     currentPage:
 *                       type: number
 *                     itemsPerPage:
 *                       type: number
 *                     query:
 *                       type: string
 *       400:
 *         description: 잘못된 요청
 *       404:
 *         description: 검색 결과 없음
 *       500:
 *         description: 서버 오류
 */
router.get('/search', bookController.searchBooks);

/**
 * @swagger
 * /api/books/isbn/{isbn}:
 *   get:
 *     summary: ISBN으로 책 검색 (독서 중인 책 등록용)
 *     description: |
 *       ISBN으로 정확한 책 정보를 조회합니다.
 *
 *       **사용 시나리오:**
 *       1. 사용자가 바코드 스캔 또는 ISBN 입력
 *       2. 이 API로 정확한 책 정보 조회
 *       3. iOS 앱에서 반환된 정보로 "독서 중인 책" 자동 등록
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: isbn
 *         required: true
 *         schema:
 *           type: string
 *         description: ISBN-10 또는 ISBN-13 (하이픈 포함 가능)
 *         example: "9788966260959"
 *     responses:
 *       200:
 *         description: 조회 성공 - 독서 중인 책으로 등록 가능
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "책 정보를 성공적으로 조회했습니다"
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       400:
 *         description: ISBN이 입력되지 않음
 *       404:
 *         description: 해당 ISBN의 책을 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
router.get('/isbn/:isbn', bookController.searchByISBN);

/**
 * @swagger
 * /api/books/{bookId}:
 *   get:
 *     summary: 책 상세 정보 조회
 *     description: 알라딘 상품 ID로 책의 상세 정보를 조회합니다
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: bookId
 *         required: true
 *         schema:
 *           type: string
 *         description: 알라딘 상품 ID
 *         example: "123456789"
 *     responses:
 *       200:
 *         description: 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Book'
 *       400:
 *         description: 책 ID가 입력되지 않음
 *       404:
 *         description: 책을 찾을 수 없음
 *       500:
 *         description: 서버 오류
 */
router.get('/:bookId', bookController.getBookDetail);

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: 통합 검색 (제목 또는 ISBN 자동 판별)
 *     description: |
 *       사용자 입력이 ISBN인지 제목인지 자동으로 판별하여 검색합니다.
 *
 *       **검색 로직:**
 *       - 숫자만 10자리 또는 13자리 → ISBN 검색
 *       - 그 외 → 제목 검색
 *
 *       **독서 관리 앱의 메인 검색 기능으로 사용 권장**
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: search
 *         required: true
 *         schema:
 *           type: string
 *         description: 검색어 (제목 또는 ISBN)
 *         example: "클린코드"
 *     responses:
 *       200:
 *         description: 검색 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                 searchType:
 *                   type: string
 *                   enum: [isbn, title]
 *                   description: 사용된 검색 타입
 *                 data:
 *                   oneOf:
 *                     - $ref: '#/components/schemas/Book'
 *                     - type: object
 *                       properties:
 *                         books:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/Book'
 *                         totalResults:
 *                           type: number
 *       400:
 *         description: 검색어가 입력되지 않음
 *       404:
 *         description: 검색 결과 없음
 *       500:
 *         description: 서버 오류
 */
router.get('/', bookController.unifiedSearch);

export default router;
