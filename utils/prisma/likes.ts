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
      rating: { gte: 0 },
      comment: {
        itemId: itemId,
      },
    },
  });
