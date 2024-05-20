"use server";

import { getCollection } from "@/utils/prisma/collections";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  params: {
    id: number;
  };
};

export default async function Collection({ params: { id } }: Props) {
  const collection = await getCollection(Number(id));

  if (!collection) redirect("/collections");

  return (
    <>
      <h2>Collection {id}</h2>
      <p>{collection.title}</p>
      <p>{collection.author.name}</p>
      <p>{collection.topic.title}</p>
      <p>p: {collection.published}</p>
      <p>d: {collection.description}</p>
      <Link href={`/collections/${id}/edit`}>Edit</Link>
    </>
  );
}
