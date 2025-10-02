import { Router } from 'express';
import { exampleController } from '../controllers/example.controller';

const router = Router();

/**
 * @swagger
 * /api/example:
 *   get:
 *     summary: 예제 API 엔드포인트
 *     description: 예제 데이터를 반환합니다
 *     tags: [Example]
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Example API"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get('/', exampleController.getExample);

/**
 * @swagger
 * /api/example/{id}:
 *   get:
 *     summary: ID로 예제 데이터 조회
 *     description: 특정 ID의 예제 데이터를 반환합니다
 *     tags: [Example]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: 조회할 데이터의 ID
 *     responses:
 *       200:
 *         description: 성공
 *       404:
 *         description: 데이터를 찾을 수 없음
 */
router.get('/:id', exampleController.getExampleById);

/**
 * @swagger
 * /api/example:
 *   post:
 *     summary: 새로운 예제 데이터 생성
 *     description: 새로운 예제 데이터를 생성합니다
 *     tags: [Example]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Example Name"
 *               description:
 *                 type: string
 *                 example: "Example Description"
 *     responses:
 *       201:
 *         description: 생성됨
 *       400:
 *         description: 잘못된 요청
 */
router.post('/', exampleController.createExample);

export default router;
