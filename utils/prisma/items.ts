import { prisma } from "@/utils/prisma";
import { userCollections } from "./collections";
import { getUsedTags } from "./tags";
import {
  getAverageItemRate,
  getUserLikesOnComments,
  getUserLikesOnItem,
} from "./likes";
import { ItemFormType } from "@/components/Item/ItemForm";
import { getComments } from "./comments";

export async function getMyCollectionsTagsItem(userId: string, itemId: number) {
  const [collections, tags, item] = await prisma.$transaction([
    userCollections(userId),
    getUsedTags(),
    getItem(itemId),
  ]);

  return { collections, tags, item };
}

export async function getItemCommentsLikes(userId: string, itemId: number) {
  const [item, comments, likes, rate, averageRate] = await prisma.$transaction([
    getItem(itemId),
    getComments(itemId),
    getUserLikesOnComments(userId, itemId),
    getUserLikesOnItem(userId, itemId),
    getAverageItemRate(itemId),
  ]);

  return {
    item,
    comments,
    likes: likes.map((i) => i.commentId),
    rate,
    averageRate,
  };
}

export const getItem = (itemId: number) =>
  prisma.item.findUnique({
    where: { id: itemId },
    include: {
      author: { select: { name: true } },
      collection: { select: { title: true } },
      tags: { select: { id: true, title: true } },
    },
  });

export const createNewItem = (data: ItemFormType & { userId: string }) => {
  const { title, collectionId, userId } = data;

  let json = Object.fromEntries(
    Object.entries(data).filter(([key]) => key.startsWith("cf_"))
  );

  return prisma.item.create({
    data: {
      title,
      collectionId,
      authorId: userId,
      customValues: json as PrismaJson.CustomValuesType,
    },
  });
};

export const updateItem2 = (
  id: number,
  title: string,
  collectionId: number,
  tagsRemove: string[],
  tagsAdd: string[],
  customFields: PrismaJson.CustomValuesType
) =>
  prisma.item.update({
    where: { id },
    data: {
      title,
      collectionId,
      customValues: customFields,
      tags: {
        connectOrCreate: tagsAdd.map((tag) => ({
          where: {
            title: tag,
          },
          create: {
            title: tag,
          },
        })),
        disconnect: tagsRemove.map((tag) => ({ title: tag })),
      },
    },
  });

export const getItems = () => prisma.item.findMany();

export const deleteItem2 = (itemId: number) =>
  prisma.item.delete({
    where: { id: itemId },
  });
