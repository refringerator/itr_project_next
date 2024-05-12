"use server";

import Link from "next/link";
import { getComments, getItem, addComment } from "@/app/items/actions";
import { Comments } from "@/components/Comments";

type Props = {
  params: {
    id: string;
  };
};

export default async function Item({ params: { id } }: Props) {
  const itemId = parseInt(id);

  const item = await getItem(itemId);

  const comments = await getComments(itemId);

  return (
    <>
      <h2>Item {id}</h2>
      <p>{item.title}</p>
      <p>{item.author.name}</p>
      <p>{item.collection.title}</p>
      <p>{item.published ? "published" : "not published"}</p>
      <Link href={`/items/${id}/edit`}>Edit</Link>
      <Comments itemId={itemId} serverComments={comments} />
      <form action={addComment.bind(null, itemId)}>
        <input type="text" name="text" />
        <button type="submit">Add</button>
      </form>
    </>
  );
}
