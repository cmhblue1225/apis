import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions';
import express, { Request, Response, NextFunction } from 'express';
import serverless from 'serverless-http';
import app from '../../src/index';

// Netlify Functions용으로 Express 앱을 래핑
const handler: Handler = serverless(app);

export { handler };
