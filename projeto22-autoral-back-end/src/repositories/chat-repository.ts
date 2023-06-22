import { MessagesParams } from '../protocols';
import { prisma } from '../config';

export async function getMyMessages() {
  return await prisma.chat.findMany({});
}

export async function getUserMessages() {
  return await prisma.chat.findMany({
    select: {
      fromId: true,
      toId: true,
      message: true,
      Chat_toIdToUsers: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      Chat_fromIdToUsers: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
}

export async function findChatById(id: number) {
  return await prisma.chat.findUnique({
    where: {
      id,
    },
  });
}

export async function sendMessages(body: MessagesParams) {
  return await prisma.chat.create({
    data: {
      fromId: body.fromId,
      toId: body.toId,
      message: body.message,
    },
  });
}

export async function deleteMessage(messageId: number) {
  return await prisma.chat.delete({
    where: {
      id: messageId,
    },
  });
}

const chatRepository = {
  getMyMessages,
  getUserMessages,
  findChatById,
  sendMessages,
  deleteMessage,
};

export default chatRepository;
