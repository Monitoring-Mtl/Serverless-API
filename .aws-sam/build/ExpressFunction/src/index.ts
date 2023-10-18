import serverless from 'serverless-http';
import app from './app';

//Serverless wrapper for express app
export const handler = serverless(app);
