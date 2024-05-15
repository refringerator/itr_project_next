import { prisma } from "@/utils/prisma";

export async function getMyCollectionsTagsItem(userId: string, itemId: number) {
  const [collections, tags, item] = await prisma.$transaction([
    myCollections(userId),
    usedTags(),
    getItem(itemId),
  ]);

  return { collections, tags, item };
}

const myCollections = (userId: string) =>
  prisma.collection.findMany({
    where: { authorId: userId },
  });

const usedTags = () => prisma.tag.findMany();

const getItem = (itemId: number) =>
  prisma.item.findUnique({
    where: { id: itemId },
    include: {
      author: { select: { name: true } },
      collection: { select: { title: true } },
      tags: { select: { id: true, title: true } },
    },
  });
