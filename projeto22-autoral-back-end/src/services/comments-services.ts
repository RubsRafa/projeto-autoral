import { conflictError, notFoundError } from '../errors';
import { addComment, findComment, findPostById, getAllComments, removeComment } from '../repositories';

export async function addCommentService(userId: number, postId: number, comment: string) {
  await verifyInfo(postId);

  await addComment(userId, postId, comment);
  return;
}

export async function removeCommentService(userId: number, commentId: number) {
  const commentPost = await findComment(commentId);
  if (!commentPost) throw notFoundError();

  await verifyInfo(commentPost.postId);
  if (commentPost.userId !== userId) throw conflictError();

  await removeComment(commentId);
  return;
}

async function verifyInfo(postId: number) {
  const postExist = await findPostById(postId);
  if (!postExist) throw notFoundError();

  return;
}

export async function getComments() {
  const comments = await getAllComments();
  return comments;
}

const commentsService = {
  addCommentService,
  removeCommentService,
  verifyInfo,
  getComments,
};

export default commentsService;
