"use server";

import { Link } from "@/navigation";
import { addComment, setRateOnItem } from "@/app/[locale]/items/actions";
import { Comments } from "@/components/Comment/Comments";
import { Tag } from "antd";
import { getItemCommentsLikes } from "@/utils/prisma/items";
import { getSupabaseUser } from "@/utils/auth-helpers/server";
import { redirect } from "@/navigation";
import { getErrorRedirect } from "@/utils/helpers";
import ItemRate from "@/components/Item/ItemRate";

type Props = {
  params: {
    id: string;
  };
};

export default async function Item({ params: { id } }: Props) {
  const itemId = parseInt(id);

  const user = await getSupabaseUser();

  const { item, comments, likes, rate, averageRate } =
    await getItemCommentsLikes(
      user?.id || "00000000-0000-0000-0000-000000000000",
      itemId
    );

  if (!item)
    return redirect(
      getErrorRedirect(
        `/items`,
        "Item not found",
        `Cant find item with id ${id}!`
      )
    );

  return (
    <>
      <h2>Item {id}</h2>
      <p>{item.title}</p>
      <p>{item.author.name}</p>
      <p>{item.collection.title}</p>
      <p>{item.published ? "published" : "not published"}</p>
      <p>Average rate is {averageRate._avg.rating}</p>
      <>
        {item.tags.map((tag) => (
          <Tag key={tag.id}>{tag.title}</Tag>
        ))}
      </>

      <ItemRate
        userRate={rate?.rating || 0}
        updateRate={setRateOnItem.bind(null, itemId)}
      />

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
