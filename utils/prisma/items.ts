import { prisma } from "@/utils/prisma";
import { userCollections } from "./collections";

export async function getMyCollectionsTagsItem(userId: string, itemId: number) {
  const [collections, tags, item] = await prisma.$transaction([
    userCollections(userId),
    usedTags(),
    getItem(itemId),
  ]);

  return { collections, tags, item };
}

export async function getItemCommentsLikes(userId: string, itemId: number) {
  const [item, comments, likes] = await prisma.$transaction([
    getItem(itemId),
    getComments(itemId),
    getMyLikesOnComments(userId, itemId),
  ]);

  return { item, comments, likes: likes.map((i) => i.commentId) };
}

const usedTags = () => prisma.tag.findMany();

export const getItem = (itemId: number) =>
  prisma.item.findUnique({
    where: { id: itemId },
    include: {
      author: { select: { name: true } },
      collection: { select: { title: true } },
      tags: { select: { id: true, title: true } },
    },
  });

export const getMyLikesOnComments = (userId: string, itemId: number) =>
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
