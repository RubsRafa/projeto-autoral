import 'reflect-metadata';
import 'express-async-errors';
import express, { Express, json } from 'express';
import cors from 'cors';
import { connectDb, disconnectDB, loadEnv } from './config';
import { handleErrors } from './middlewares';
import {
  authRouter,
  chatRouter,
  commentsRouter,
  followsRouter,
  healthRouter,
  likesRouter,
  postsRouter,
  repostsRouter,
  userRouter,
} from './routers';

loadEnv();

const app = express();
app
  .use(cors())
  .use(json())
  .get('/health', (_req, res) => res.send('OK!'))
  .use('/auth', authRouter)
  .use('/posts', postsRouter)
  .use('/like', likesRouter)
  .use('/comment', commentsRouter)
  .use('/repost', repostsRouter)
  .use('/users', userRouter)
  .use('/follow', followsRouter)
  .use('/mental-health', healthRouter)
  .use('/chat', chatRouter)
  .use(handleErrors);

export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
