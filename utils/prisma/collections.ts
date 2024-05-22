import { prisma } from "@/utils/prisma";
import { getTopics } from "./topics";
import { FieldType } from "@/components/CollectionForm";
import { getUsedTags } from "./tags";
import { CustomField } from "@prisma/client";

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
      customFields: {
        select: {
          id: true,
          title: true,
          type: true,
          isFilter: true,
          isRequired: true,
        },
      },
    },
  });

export const userCollections = (userId: string) =>
  prisma.collection.findMany({
    where: { authorId: userId },
    include: { customFields: true },
  });

export const getCollections = () => prisma.collection.findMany();

export const createCollection2 = (data: FieldType & { userId: string }) => {
  const { title, topicId, description, userId, customFields } = data;

  const cfs = customFields?.map((cf) => ({
    ...cf,
    isFilter: cf.isFilter || false,
    isRequired: cf.isRequired || false,
  }));

  const customFields2 = cfs
    ? {
        createMany: { data: cfs as Omit<CustomField, "id">[] },
      }
    : undefined;

  return prisma.collection.create({
    data: {
      title,
      topicId,
      description,
      authorId: userId,
      customFields: customFields2,
    },
  });
};

export const updateCollection2 = (
  id: number,
  oldCFs: Omit<CustomField, "collectionId">[] | undefined,
  data: FieldType
) => {
  const { title, topicId, description, customFields } = data;

  const newCFs = customFields
    ?.filter((cf) => !cf.id)
    .map((cf) => ({
      ...cf,
      isFilter: cf.isFilter || false,
      isRequired: cf.isRequired || false,
    }));

  const deleteCFs = (oldCFs || []).filter(
    (cf) => !customFields?.map((e) => e.id).includes(cf.id)
  );

  const update = (customFields || [])
    .filter((cf) => cf.id)
    .map((cf) => ({
      ...cf,
      isFilter: cf.isFilter || false,
      isRequired: cf.isRequired || false,
    }));

  console.log({ update });
  console.log({ deleteCFs });
  console.log({ newCFs });

  return prisma.collection.update({
    where: { id },
    data: {
      title,
      topicId,
      description,
      customFields: {
        createMany: { data: newCFs as Omit<CustomField, "id">[] },
        deleteMany: deleteCFs.map((cf) => ({ id: cf.id })),
        update: update.map((cf) => ({ where: { id: cf.id }, data: { ...cf } })),
      },
    },
  });
};

export const deleteCollection2 = (id: number) =>
  prisma.collection.delete({
    where: { id },
  });

export async function getUserCollectionsTagsCFs(userId: string) {
  const [tags, collections] = await prisma.$transaction([
    getUsedTags(),
    userCollections(userId),
  ]);

  return { tags, collections };
}

export type UserCollectionType = NonNullable<
  Awaited<ReturnType<typeof getUserCollectionsTagsCFs>>["collections"][0]
>;
