"use server";

import { ItemFormType } from "@/components/ItemForm";
import { getErrorRedirect, getStatusRedirect } from "@/utils/helpers";
import { prisma } from "@/utils/prisma";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function createItem(data: ItemFormType) {
  const { title, collectionId } = data;

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/signin");
  }

  const item = await prisma.item.create({
    data: {
      title,
      collectionId,
      authorId: user.id,
    },
  });

  redirect(
    getStatusRedirect(
      `/items`,
      `New item ${item.id} created!`,
      "You can find it somethere"
    )
  );
}

export async function updateItem(id: number, data: ItemFormType) {
  const { title, collectionId } = data;

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/signin");
  }

  const item = await prisma.item.update({
    where: { id },
    data: {
      title,
      collectionId,
    },
  });

  redirect(
    getStatusRedirect(
      `/items`,
      `Item ${item.id} updated!`,
      "You can find it somethere"
    )
  );
}

export async function getItems() {
  return await prisma.item.findMany();
}

export async function getItem(id: number) {
  const item = await prisma.item.findUnique({
    where: { id },
    include: {
      author: { select: { name: true } },
      collection: { select: { title: true } },
    },
  });

  if (!item)
    redirect(
      getErrorRedirect(
        `/items`,
        "Item not found",
        `Cant find item with id ${id}!`
      )
    );

  return item;
}

export async function deleteItem(id: number) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/signin");
  }

  const item = await prisma.item.delete({
    where: { id },
  });

  redirect(
    getStatusRedirect(
      `/items`,
      `Item ${item.id} deleted!`,
      "You wont find it anymore"
    )
  );
}

export async function my_collections() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/signin");
  }

  return await prisma.collection.findMany({
    where: { authorId: user.id },
  });
}
