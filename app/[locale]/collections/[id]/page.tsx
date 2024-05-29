"use server";

import { getCollection } from "@/utils/prisma/collections";
import { Link } from "@/navigation";
import { redirect } from "@/navigation";
import Image from "next/image";
import TheCollection from "@/components/Collection/TheCollection";
import { defaultImage } from "@/constants/server";

type Props = {
  params: {
    id: string;
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
      <Image
        src={collection.coverUrl || defaultImage}
        width={500}
        height={500}
        alt="Picture of the author"
      />
      <TheCollection items={items} />
    </>
  );
}
