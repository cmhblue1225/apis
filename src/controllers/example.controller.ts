import { Request, Response } from 'express';

/**
 * 예제 컨트롤러
 * 실제 비즈니스 로직을 구현하는 곳
 */
export const exampleController = {
  /**
   * 모든 예제 데이터 조회
   */
  getExample: async (req: Request, res: Response) => {
    try {
      // 실제로는 데이터베이스에서 조회
      const data = [
        { id: '1', name: 'Example 1', description: 'First example' },
        { id: '2', name: 'Example 2', description: 'Second example' }
      ];

      res.status(200).json({
        success: true,
        message: 'Example API',
        data
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  },

  /**
   * ID로 예제 데이터 조회
   */
  getExampleById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      // 실제로는 데이터베이스에서 조회
      const data = { id, name: `Example ${id}`, description: 'Example data' };

      if (!data) {
        return res.status(404).json({
          success: false,
          message: 'Data not found'
        });
      }

      res.status(200).json({
        success: true,
        data
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  },

  /**
   * 새로운 예제 데이터 생성
   */
  createExample: async (req: Request, res: Response) => {
    try {
      const { name, description } = req.body;

      // 유효성 검증
      if (!name) {
        return res.status(400).json({
          success: false,
          message: 'Name is required'
        });
      }

      // 실제로는 데이터베이스에 저장
      const newData = {
        id: Date.now().toString(),
        name,
        description: description || '',
        createdAt: new Date().toISOString()
      };

      res.status(201).json({
        success: true,
        message: 'Created successfully',
        data: newData
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
};
