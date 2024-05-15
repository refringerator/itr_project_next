import { prisma } from "@/utils/prisma";
import { getTopics } from "./topics";

export async function getTopicsCollection(collectionId: number) {
  const locale = "ru_RU";

  const [topics, collection] = await prisma.$transaction([
    getTopics(),
    getCollection(collectionId),
  ]);

  return {
    topics: topics.map((topic) => ({
      id: topic.id,
      title:
        topic.translation.filter((v) => v.l === locale)[0]?.t || topic.title,
    })),
    collection,
  };
}

export const getCollection = (collectionId: number) =>
  prisma.collection.findUnique({
    where: { id: collectionId },
    include: {
      author: { select: { name: true } },
      topic: { select: { title: true } },
    },
  });

export const userCollections = (userId: string) =>
  prisma.collection.findMany({
    where: { authorId: userId },
  });
