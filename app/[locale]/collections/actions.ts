"use server";

import { redirect } from "@/navigation";
import { CollectionFormFieldType } from "@/sections/Collection/CollectionForm";
import { getSupabaseUserOrRedirect } from "@/utils/auth-helpers/server";
import { getStatusRedirect } from "@/utils/helpers";
import {
  createCollection2,
  deleteCollection2,
  updateCollection2,
} from "@/utils/prisma/collections";
import { CustomField } from "@prisma/client";

export async function createCollection(data: CollectionFormFieldType) {
  console.log({ data });

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

export async function deleteCollection(id: number) {
  await getSupabaseUserOrRedirect("/signin");

  const collection = await deleteCollection2(id);

  redirect(
    getStatusRedirect(
      `/collections`,
      `Collection ${collection.id} deleted!`,
      "You wont find it anymore"
    )
  );
}
