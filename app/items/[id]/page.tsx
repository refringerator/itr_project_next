"use server";

import { getItem } from "@/app/items/actions";

type Props = {
  params: {
    id: number;
  };
};

export default async function Item({ params: { id } }: Props) {
  const item = await getItem(Number(id));

  return (
    <>
      <h2>Item {id}</h2>
      <p>{item.title}</p>
      <p>{item.author.name}</p>
      <p>{item.collection.title}</p>
      <p>p: {item.published}</p>
    </>
  );
}
