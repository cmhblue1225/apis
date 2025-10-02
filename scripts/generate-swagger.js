const swaggerJsdoc = require('swagger-jsdoc');
const fs = require('fs');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'iOS Backend API',
      version: '1.0.0',
      description: 'iOS 앱을 위한 백엔드 API 문서 - 독서 관리 앱용 책 검색 API',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      }
    },
    servers: [
      {
        url: 'https://lucky-lollipop-31b7e2.netlify.app',
        description: 'Production server'
      },
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./src/routes/*.ts']
};

const swaggerSpec = swaggerJsdoc(options);

// public 폴더에 swagger.json 저장
const outputPath = path.join(__dirname, '../public/swagger.json');
fs.writeFileSync(outputPath, JSON.stringify(swaggerSpec, null, 2));

console.log('✅ Swagger JSON generated at:', outputPath);
console.log(`📊 Total endpoints: ${Object.keys(swaggerSpec.paths || {}).length}`);
