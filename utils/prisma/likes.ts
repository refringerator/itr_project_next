import { prisma } from "@/utils/prisma";

export const setLike = (userId: string, commentId: number, rating: number) =>
  prisma.likeOnComment.upsert({
    where: { likeId: { commentId, userId: userId } },
    update: { rating },
    create: { userId: userId, commentId, rating },
  });

export const getUserLikesOnComments = (userId: string, itemId: number) =>
  prisma.likeOnComment.findMany({
    select: {
      commentId: true,
      rating: true,
    },
    where: {
      userId: userId,
      rating: { gt: 0 },
      comment: {
        itemId: itemId,
      },
    },
  });

export const getUserLikesOnItem = (userId: string, itemId: number) =>
  prisma.likeOnItem.findUnique({
    select: {
      rating: true,
    },
    where: {
      likeId: {
        userId: userId,
        itemId: itemId,
      },
    },
  });

export const setItemRate = (userId: string, itemId: number, rating: number) =>
  prisma.likeOnItem.upsert({
    where: { likeId: { itemId, userId } },
    update: { rating },
    create: { userId, itemId, rating },
  });

export const getAverageItemRate = (itemId: number) =>
  prisma.likeOnItem.aggregate({
    where: { itemId: itemId, rating: { gt: 0 } },
    _avg: {
      rating: true,
    },
  });
