import { conflictError, notFoundError, notFoundUserError } from '../errors';
import { FollowParams } from '../protocols';
import { createFollow, findFollow, findUserById, getAllFollows, getAllUsers, removeFollow } from '../repositories';

export async function findMyFollows(userId: number) {
  const myFollows = await getAllFollows(userId);
  const allUsers = await getAllUsers();

  const results: FollowParams[] = [];
  for (let i = 0; i < myFollows.length; i++) {
    const follow = myFollows[i];

    for (let x = 0; x < allUsers.length; x++) {
      const user = allUsers[x];

      if (user.id === follow.userIdIFollow) {
        results.push({
          id: follow.id,
          userId: follow.userId,
          userIdIFollow: follow.userIdIFollow,
          userName: user.name,
          userImage: user.image,
        });
      }
    }
  }

  return results;
}

export async function followUser(userId: number, userIdIFollow: number) {
  const existUserFollowed = await findUserById(userIdIFollow);
  if (!existUserFollowed) throw notFoundUserError();

  const myFollows = await getAllFollows(userId);
  const follow = myFollows.find((f) => f.userIdIFollow === userIdIFollow);
  if (follow) throw conflictError();

  await createFollow(userId, userIdIFollow);
  return;
}

export async function removeFollowService(followId: number) {
  const followExist = await findFollow(followId);
  if (!followExist) throw notFoundError();

  await removeFollow(followId);
  return;
}

const followsService = {
  findMyFollows,
  followUser,
  removeFollowService,
};

export default followsService;
