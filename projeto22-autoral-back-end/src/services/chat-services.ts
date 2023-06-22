import { MessagesParams } from '../protocols';
import {
  deleteMessage,
  findChatById,
  findUserById,
  getMyFollowsInfo,
  getMyMessages,
  getUserMessages,
  sendMessages,
} from '../repositories';
import { conflictError, notFoundError, notFoundUserError } from '../errors';

export async function getAllMyMessages(userId: number, otherUser: number) {
  const messages = await getMyMessages();
  const messagesFiltered = messages.filter(
    (m) => (m.fromId === userId && m.toId === otherUser) || (m.fromId === otherUser && m.toId === userId),
  );
  return messagesFiltered;
}

export async function addNewMessage(body: MessagesParams) {
  const userExist = await findUserById(body.fromId);
  if (!userExist) throw notFoundUserError();

  const otherUserExist = await findUserById(body.toId);
  if (!otherUserExist) throw notFoundUserError();

  await sendMessages(body);
  return;
}

export async function deleteUserMessage(userId: number, messageId: number) {
  const messageExist = await findChatById(messageId);
  if (!messageExist) throw notFoundError();

  if (messageExist.fromId !== userId) throw conflictError();
  await deleteMessage(messageExist.id);
  return;
}

export async function getOnlyUsersChat(userId: number) {
  const myFollows = await getMyFollowsInfo(userId);
  const messages = await getUserMessages();

  const users = messages
    .filter((m) => m.fromId === userId || m.toId === userId)
    .map((u) =>
      u.fromId === userId
        ? { user: u.Chat_toIdToUsers, message: u.message }
        : { user: u.Chat_fromIdToUsers, message: u.message },
    );
  const filterUsers: { user: { id: number; name: string; image: string }; message: string }[] = [];
  const filterUsersIds: number[] = [];
  users.forEach((s) => {
    if (filterUsersIds.includes(s.user.id)) {
      return;
    } else {
      filterUsers.push(s);
      filterUsersIds.push(s.user.id);
    }
  });
  myFollows.forEach((f) => {
    if (filterUsersIds.includes(f.Users_Follows_userIdIFollowToUsers.id)) {
      return;
    } else {
      filterUsers.push({ user: f.Users_Follows_userIdIFollowToUsers, message: null });
      filterUsersIds.push(f.Users_Follows_userIdIFollowToUsers.id);
    }
  });

  return filterUsers;
}

const chatServices = {
  getAllMyMessages,
  addNewMessage,
  deleteUserMessage,
  getOnlyUsersChat,
};

export default chatServices;
