"use server";

import { ItemFormType } from "@/components/Item/ItemForm";
import {
  getSupabaseUser,
  getSupabaseUserOrRedirect,
} from "@/utils/auth-helpers/server";
import { getStatusRedirect } from "@/utils/helpers";
import { addComment2 } from "@/utils/prisma/comments";
import { createNewItem, deleteItem2, updateItem2 } from "@/utils/prisma/items";
import { setLike } from "@/utils/prisma/likes";
import { pubComment } from "@/utils/supabase/s-helpers";

import { redirect } from "@/navigation";

export async function createItem(data: ItemFormType) {
  const user = await getSupabaseUserOrRedirect("/signin");

  const item = await createNewItem({ ...data, userId: user.id });

  redirect(
    getStatusRedirect(
      `/items/${item.id}`,
      `New item ${item.id} created!`,
      "You can find it somethere"
    )
  );
}

export async function updateItem(
  id: number,
  existedTags: string[],
  data: ItemFormType
) {
  const { title, collectionId, tagsIds } = data;

  const tagsRemove = existedTags.filter((t) => !tagsIds.includes(t));

  await getSupabaseUserOrRedirect("/signin");

  const json = Object.fromEntries(
    Object.entries(data).filter(([key]) => key.startsWith("cf_"))
  );
  const item = await updateItem2(
    id,
    title,
    collectionId,
    tagsRemove,
    tagsIds,
    json as PrismaJson.CustomValuesType
  );

  redirect(
    getStatusRedirect(
      `/items/${item.id}`,
      `Item ${item.id} updated!`,
      "You can find it somethere"
    )
  );
}

export async function deleteItem(id: number) {
  await getSupabaseUserOrRedirect("/signin");

  const item = await deleteItem2(id);

  redirect(
    getStatusRedirect(
      `/items`,
      `Item ${item.id} deleted!`,
      "You wont find it anymore"
    )
  );
}

export async function addComment(itemId: number, fd: FormData) {
  const { text } = Object.fromEntries(fd) as { text: string };
  const user = await getSupabaseUserOrRedirect("/signin");

  const comment = await addComment2(text, itemId, user.id);
  pubComment(itemId, comment);
}

export async function setMyLikeOnComment(commentId: number, rating: number) {
  const user = await getSupabaseUser();

  if (!user) {
    return;
  }

  await setLike(user.id, commentId, rating);
}
