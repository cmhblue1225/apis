import serverless from 'serverless-http';
import app from '../../dist/index.js';

// Netlify Functions용으로 Express 앱을 래핑
const handler = serverless(app);

export { handler };
