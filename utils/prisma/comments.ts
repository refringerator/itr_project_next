import { prisma } from "@/utils/prisma";

export const getComments = (itemId: number) =>
  prisma.comment.findMany({
    where: { itemId: itemId },
    orderBy: { createdAt: "asc" },
    include: {
      author: { select: { name: true } },
      _count: {
        select: { likes: true },
      },
    },
  });

export const addComment2 = (text: string, itemId: number, userId: string) =>
  prisma.comment.create({
    data: {
      text,
      itemId,
      authorId: userId,
    },
    include: {
      author: { select: { name: true } },
    },
  });
