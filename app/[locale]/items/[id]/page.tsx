"use server";

import { Tag } from "antd";
import { addComment, setRateOnItem } from "@/app/[locale]/items/actions";
import { Comments } from "@/components/Comment/Comments";
import { getItemCommentsLikes } from "@/utils/prisma/items";
import { getSupabaseUser } from "@/utils/auth-helpers/server";
import { redirect, Link } from "@/navigation";
import { getErrorRedirect } from "@/utils/helpers";
import ItemRate from "@/sections/Item/ItemRate";
import CommentForm from "@/components/CommentForm";
// import { prisma } from "@/utils/prisma";

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
      <p>
        <b>Title:</b> {item.title}
      </p>
      <p>
        <b>Author:</b> {item.author.name}
      </p>
      <p>
        <b>Collection:</b> {item.collection.title}
      </p>
      <p>{item.published ? "published" : "not published"}</p>
      {!!item.collection.customFields.length && <p>Custom fields:</p>}
      {item.collection.customFields.map((cf) => {
        return (
          <p key={cf.id}>
            {cf.id} - {cf.title}: {item.customValues[`cf_${cf.id}`]}
          </p>
        );
      })}
      <p>
        {averageRate._avg.rating
          ? `Average rate is ${averageRate._avg.rating}`
          : "No rate"}
      </p>
      <>
        {item.tags.map((tag) => (
          <Tag key={tag.id}>{tag.title}</Tag>
        ))}
      </>

      <ItemRate
        readOnly={!user}
        userRate={rate?.rating || 0}
        updateRate={setRateOnItem.bind(null, itemId)}
      />

      <Link href={`/items/${id}/edit`}>Edit</Link>

      <Comments
        itemId={itemId}
        serverComments={comments}
        likedCommentIds={likes}
      />

      <CommentForm action={addComment.bind(null, itemId)} />
    </>
  );
}
