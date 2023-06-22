import { Users } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';

export type Error = {
  name: string;
  message: string;
};

export type JWT = {
  userId: number;
};

export type AuthenticatedRequest = Request & JWT;

export type validationMiddleware = (req: Request, res: Response, next: NextFunction) => void;

export type SignInParams = {
  email: string;
  password: string;
};

export type UserType = Users;

export type PostParams = {
  type: number;
  video?: string;
  image?: string;
  text?: string;
}

export type PostId = {
  postId: number;
};

export type CommentParams = {
  comment: string;
  postId: number;
};

export type invalidError = Error & {
  details: string[];
};

export type EditUserParams = {
  name?: string | null;
  email?: string | null;
  password?: string | null;
  confirmPassword?: string | null;
  image?: string | null;
  birthday?: Date | null;
};

export type FollowParams = {
  id: number;
  userId: number;
  userIdIFollow: number;
  userName: string;
  userImage: string;
};

export type FollowId = {
  followId: number;
};

export type FollowIdUser = {
  userIdIFollow: number;
};

export type PostsReturn = {
  id: number;
  userId: number;
  type: number;
  video: string;
  image: string;
  text: string;
  isReposted: boolean;
  createdAt: Date;
  updatedAt: Date;
  PostType: {
    id: number;
    type: string;
  };
  Users: {
    id: number;
    name: string;
    image: string;
  };
  repostedById: number;
  repostedByName: string;
  repostedByImage: string;
};

export type RepostReturn = {
  id: number;
  userId: number;
  postId: number;
  createdAt: Date;
  updatedAt: Date;
  Users: {
    id: number;
    name: string;
    image: string;
  };
};

export type HealthParams = {
  id?: number;
  userId: number;
  text?: string;
  color?: string;
  mood?: number;
};

export type MessagesParams = {
  fromId: number;
  toId: number;
  message: string;
};
