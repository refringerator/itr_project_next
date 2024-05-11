"use server";

import { FieldType } from "@/components/CollectionForm";
import { getErrorRedirect, getStatusRedirect } from "@/utils/helpers";
import { prisma } from "@/utils/prisma";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function createCollection(data: FieldType) {
  const { title, topicId, description } = data;

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/signin");
  }

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
