"use server";

import { getCollection } from "@/utils/prisma/collections";
import { Link } from "@/navigation";
import { redirect } from "@/navigation";
import TheCollection from "@/components/Collection/TheCollection";

type Props = {
  params: {
    id: number;
  };
};

export default async function Collection({ params: { id } }: Props) {
  const collection = await getCollection(Number(id));

  if (!collection) return redirect("/collections");

  const items = collection.items.map((i) => ({
    id: i.id,
    published: i.published,
    createdAt: i.createdAt,
    title: i.title,
    tags: i.tags.map((t) => t.title),
  }));

  return (
    <>
      <h2>{collection.title}</h2>
      <Link href={`/collections/${id}/edit`}>Edit</Link>
      <p>{collection.author.name}</p>
      <p>{collection.topic.title}</p>
      <p>p: {collection.published}</p>
      <p>d: {collection.description}</p>
      <TheCollection items={items} />
    </>
  );
}
