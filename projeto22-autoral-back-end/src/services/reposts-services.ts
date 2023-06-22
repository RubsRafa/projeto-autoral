import { conflictError, notFoundError } from '../errors';
import { findPostById, findRepostIdByPostId, removeRepost, repost } from '../repositories';

export async function addRepostService(userId: number, postId: number) {
  await verifyInfo(postId);

  const repostPost = await findRepostIdByPostId(postId);
  repostPost.find((p) => {
    if (p.userId === userId) throw conflictError();
  });
  await repost(userId, postId);
  return;
}

export async function removeRepostService(userId: number, postId: number) {
  await verifyInfo(postId);

  const repostsPost = await findRepostIdByPostId(postId);
  const repost = repostsPost.find((r) => {
    if (r.userId === userId) return r;
  });

  if (!repost) throw conflictError();
  await removeRepost(repost.id);
}

async function verifyInfo(postId: number) {
  const postExist = await findPostById(postId);
  if (!postExist) throw notFoundError();

  return;
}

const repostsService = {
  addRepostService,
  removeRepostService,
  verifyInfo,
};

export default repostsService;
