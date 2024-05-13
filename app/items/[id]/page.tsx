"use server";

import Link from "next/link";
import {
  getComments,
  getItem,
  addComment,
  getMyLikesOnComments,
  getTags,
} from "@/app/items/actions";
import { Comments } from "@/components/Comments";
import { Tag } from "antd";

type Props = {
  params: {
    id: string;
  };
};

export default async function Item({ params: { id } }: Props) {
  const itemId = parseInt(id);

  const item = await getItem(itemId);
  const comments = await getComments(itemId);
  const likes = await getMyLikesOnComments(itemId);
  const tags = (await getTags(itemId))?.tags || [];

  return (
    <>
      <h2>Item {id}</h2>
      <p>{item.title}</p>
      <p>{item.author.name}</p>
      <p>{item.collection.title}</p>
      <p>{item.published ? "published" : "not published"}</p>
      <>
        {tags.map((tag) => (
          <Tag key={tag.id}>{tag.title}</Tag>
        ))}
      </>
      <Link href={`/items/${id}/edit`}>Edit</Link>

      <Comments
        itemId={itemId}
        serverComments={comments}
        likedCommentIds={likes}
      />

      <form action={addComment.bind(null, itemId)}>
        <input type="text" name="text" />
        <button type="submit">Add</button>
      </form>
    </>
  );
}
