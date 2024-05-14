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

export async function updateItem(
  id: number,
  existedTags: string[],
  data: ItemFormType
) {
  const { title, collectionId, tagsIds } = data;

  const tagsRemove = existedTags.filter((t) => !tagsIds.includes(t));

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
      tags: {
        connectOrCreate: tagsIds.map((tag) => ({
          where: {
            title: tag,
          },
          create: {
            title: tag,
          },
        })),
        disconnect: tagsRemove.map((tag) => ({ title: tag })),
      },
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
      tags: { select: { id: true, title: true } },
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

export async function getComments(itemId: number) {
  return await prisma.comment.findMany({
    where: { itemId: itemId },
    orderBy: { createdAt: "asc" },
    include: {
      author: { select: { name: true } },
      _count: {
        select: { likes: true },
      },
    },
  });
}

export async function addComment(itemId: number, fd: FormData) {
  const { text } = Object.fromEntries(fd) as { text: string };
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/signin");
  }

  const comment = await prisma.comment.create({
    data: {
      text,
      itemId,
      authorId: user.id,
    },
    include: {
      author: { select: { name: true } },
    },
  });

  supabase.channel(`item-${itemId}`).send({
    type: "broadcast",
    event: "new-comment",
    payload: { ...comment, _count: { likes: 0 } },
  });
}

export async function getMyLikesOnComments(itemId: number) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const likes = await prisma.likeOnComment.findMany({
    select: {
      commentId: true,
      rating: true,
    },
    where: {
      userId: user.id,
      rating: { gte: 0 },
      comment: {
        itemId: itemId,
      },
    },
  });

  return likes.map((i) => i.commentId);
}

export async function setMyLikeOnComment(commentId: number, rating: number) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  await prisma.likeOnComment.upsert({
    where: { likeId: { commentId, userId: user.id } },
    update: { rating },
    create: { userId: user.id, commentId, rating },
  });
}

export async function getTags(itemId: number) {
  return await prisma.item.findUnique({
    where: { id: itemId },
    select: { tags: true },
  });
}

export async function getUsedTags() {
  return await prisma.tag.findMany();
}
