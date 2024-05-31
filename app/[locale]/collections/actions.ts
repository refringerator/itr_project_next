"use server";

import { redirect } from "@/navigation";
import { CollectionFormFieldType } from "@/sections/Collection/CollectionForm";
import { getSupabaseUserOrRedirect } from "@/utils/auth-helpers/server";
import { getErrorRedirect, getStatusRedirect } from "@/utils/helpers";
import {
  createCollection2,
  deleteCollection,
  getCollectionUserData,
  getTopicsCollection,
  updateCollection2,
} from "@/utils/prisma/collections";
import { getTopics } from "@/utils/prisma/topics";
import { CustomField } from "@prisma/client";

export async function createCollection(data: CollectionFormFieldType) {
  const user = await getSupabaseUserOrRedirect("/signin");

  const collection = await createCollection2({ ...data, userId: user.id });

  redirect(
    getStatusRedirect(
      `/collections/${collection.id}`,
      `New collection ${collection.id} created!`,
      "You can find it somethere"
    )
  );
}

export async function updateCollection(
  id: number,
  oldCFs: Omit<CustomField, "collectionId">[] | undefined,
  data: CollectionFormFieldType
) {
  await getSupabaseUserOrRedirect("/signin");

  const collection = await updateCollection2(id, oldCFs, data);

  redirect(
    getStatusRedirect(
      `/collections/${collection.id}`,
      `Collection ${collection.id} updated!`,
      "You can find it somethere"
    )
  );
}

export async function deleteCollectionWithCheck(id: number) {
  const user = await getSupabaseUserOrRedirect("/signin");

  const { collection, userData } = await getCollectionUserData(id, user.id);

  if (!collection) return redirect("/collections");

  const isSuperuser = userData?.superuser || false;

  if (collection.authorId !== user.id && !isSuperuser)
    return redirect(
      getErrorRedirect(
        `/collections`,
        "Forbidden",
        `You are not authorized to delete collection with id ${id}!`
      )
    );
  const deletedCollection = await deleteCollection(id);

  redirect(
    getStatusRedirect(
      `/collections`,
      `Collection ${deletedCollection.id} deleted!`,
      "You wont find it anymore"
    )
  );
}

export async function getTranslatedTopics(curLocale: string) {
  const locale = curLocale === "ru" ? "ru_RU" : "en";

  const topics = await getTopics();

  return topics.map((topic) => ({
    id: topic.id,
    title: topic.translation.filter((v) => v.l === locale)[0]?.t || topic.title,
  }));
}
