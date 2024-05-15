import { prisma } from "@/utils/prisma";
import { getTopics } from "./topics";
import { FieldType } from "@/components/CollectionForm";
import { getUsedTags } from "./tags";

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

export const getCollections = () => prisma.collection.findMany();

export const createCollection2 = (data: FieldType & { userId: string }) => {
  const { title, topicId, description, userId } = data;

  return prisma.collection.create({
    data: {
      title,
      topicId,
      description,
      authorId: userId,
    },
  });
};

export const updateCollection2 = (id: number, data: FieldType) => {
  const { title, topicId, description } = data;

  return prisma.collection.update({
    where: { id },
    data: {
      title,
      topicId,
      description,
    },
  });
};

export const deleteCollection2 = (id: number) =>
  prisma.collection.delete({
    where: { id },
  });

export async function getUserCollectionsTags(userId: string) {
  const [tags, collections] = await prisma.$transaction([
    getUsedTags(),
    userCollections(userId),
  ]);

  return { tags, collections };
}
