"use server";

import { getCollection } from "@/app/collections/actions";
import Link from "next/link";

type Props = {
  params: {
    id: number;
  };
};

export default async function Collection({ params: { id } }: Props) {
  const collection = await getCollection(Number(id));

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
