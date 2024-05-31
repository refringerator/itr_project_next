import { prisma } from "@/utils/prisma";
import { getTopics } from "./topics";
import { CollectionFormFieldType } from "@/sections/Collection/CollectionForm";
import { getUsedTags } from "./tags";
import { CustomField } from "@prisma/client";
import { getUserData } from "./profile";

export async function getTopicsCollection(
  collectionId: number,
  userId: string,
  curLocale: string
) {
  const locale = curLocale === "ru" ? "ru_RU" : "en";

  const [topics, collection, userData] = await prisma.$transaction([
    getTopics(),
    getCollection(collectionId),
    getUserData(userId),
  ]);

  return {
    topics: topics.map((topic) => ({
      id: topic.id,
      title:
        topic.translation.filter((v) => v.l === locale)[0]?.t || topic.title,
    })),
    collection,
    userData,
  };
}

export const getCollection = (collectionId: number) =>
  prisma.collection.findUnique({
    where: { id: collectionId },
    include: {
      author: { select: { name: true } },
      topic: { select: { title: true } },
      items: {
        select: {
          id: true,
          title: true,
          published: true,
          tags: true,
          createdAt: true,
        },
      },
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

export const createCollection2 = (
  data: CollectionFormFieldType & { userId: string }
) => {
  const { title, topicId, description, userId, customFields, cover } = data;

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
      coverUrl: cover || "",
      description,
      authorId: userId,
      customFields: customFields2,
    },
  });
};

export const updateCollection2 = (
  id: number,
  oldCFs: Omit<CustomField, "collectionId">[] | undefined,
  data: CollectionFormFieldType
) => {
  const { title, topicId, description, customFields, cover } = data;

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

  // console.log({ update });
  // console.log({ deleteCFs });
  // console.log({ newCFs });
  // console.log({ cover });

  return prisma.collection.update({
    where: { id },
    data: {
      title,
      topicId,
      description,
      coverUrl: cover,
      customFields: {
        createMany: { data: newCFs as Omit<CustomField, "id">[] },
        deleteMany: deleteCFs.map((cf) => ({ id: cf.id })),
        update: update.map((cf) => ({ where: { id: cf.id }, data: { ...cf } })),
      },
    },
  });
};

export const deleteCollection = (id: number) =>
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

export type CollectionCardType = NonNullable<
  Awaited<ReturnType<typeof getLargeCollections>>[0]
>;

export const getLargeCollections = (count = 5) =>
  prisma.collection.findMany({
    include: {
      author: true,
    },
    // where: {
    //   published: true,
    // },
    take: count,
  });

export async function getCollectionUserData(
  collectionId: number,
  userId: string
) {
  const [collection, userData] = await prisma.$transaction([
    getCollection(collectionId),
    getUserData(userId),
  ]);

  return {
    collection,
    userData,
  };
}

export async function getUserCollections(userId: string) {
  const [collections] = await prisma.$transaction([userCollections(userId)]);

  return { collections };
}
