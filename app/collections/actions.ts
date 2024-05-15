"use server";

import { FieldType } from "@/components/CollectionForm";
import { getSupabaseUserOrRedirect } from "@/utils/auth-helpers/server";
import { getErrorRedirect, getStatusRedirect } from "@/utils/helpers";
import { prisma } from "@/utils/prisma";
import { redirect } from "next/navigation";

export async function createCollection(data: FieldType) {
  const { title, topicId, description } = data;

  const user = await getSupabaseUserOrRedirect("/signin");

  const collection = await prisma.collection.create({
    data: {
      title,
      topicId,
      description,
      authorId: user.id,
    },
  });

  redirect(
    getStatusRedirect(
      `/collections`,
      `New collection ${collection.id} created!`,
      "You can find it somethere"
    )
  );
}

export async function updateCollection(id: number, data: FieldType) {
  const { title, topicId, description } = data;

  await getSupabaseUserOrRedirect("/signin");

  const collection = await prisma.collection.update({
    where: { id },
    data: {
      title,
      topicId,
      description,
    },
  });

  redirect(
    getStatusRedirect(
      `/collections`,
      `Collection ${collection.id} updated!`,
      "You can find it somethere"
    )
  );
}

export async function getCollections() {
  return await prisma.collection.findMany();
}

export async function getCollection(id: number) {
  const collection = await prisma.collection.findUnique({
    where: { id },
    include: {
      author: { select: { name: true } },
      topic: { select: { title: true } },
    },
  });

  if (!collection)
    redirect(
      getErrorRedirect(
        `/collections`,
        "Collection not found",
        `Cant find collection with id ${id}!`
      )
    );

  return collection;
}

export async function deleteCollection(id: number) {
  await getSupabaseUserOrRedirect("/signin");

  const collection = await prisma.collection.delete({
    where: { id },
  });

  redirect(
    getStatusRedirect(
      `/collections`,
      `Collection ${collection.id} deleted!`,
      "You wont find it anymore"
    )
  );
}

export async function getTopics() {
  const locale = "ru_RU";
  const topics = await prisma.topic.findMany();

  return topics.map((topic) => ({
    id: topic.id,
    title: topic.translation.filter((v) => v.l === locale)[0]?.t || topic.title,
  }));
}
