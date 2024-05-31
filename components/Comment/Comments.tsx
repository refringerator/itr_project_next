"use client";

import { createClient } from "@/utils/supabase/client";
import { Comment } from "@prisma/client";
import { useEffect, useState } from "react";
import { TheComment } from "./TheComment";
import { List } from "antd";

export type CommentWithAdditionalFields = {
  author: {
    name: string | null;
  };
  _count: {
    likes: number;
  };
} & Comment;
interface CommentsProps {
  itemId: number;
  serverComments: CommentWithAdditionalFields[];
  likedCommentIds: number[];
}

export function Comments({
  itemId,
  serverComments,
  likedCommentIds,
}: CommentsProps) {
  const [comments, setComments] = useState(serverComments);
  const [readOnly, setReadOnly] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel(`item-${itemId}`)
      .on("broadcast", { event: "new-comment" }, ({ payload }) => {
        setComments([
          ...comments,
          {
            ...(payload as CommentWithAdditionalFields),
            createdAt: new Date(payload.createdAt),
          },
        ]);
      })
      .subscribe();

    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setReadOnly(!session?.user));

    return () => {
      supabase.removeChannel(channel);
    };
  }, [comments, itemId, supabase]);

  return (
    <>
      <List
        itemLayout="vertical"
        size="large"
        rowKey="id"
        header={
          <div>
            <b>Comments</b>
          </div>
        }
        pagination={{
          onChange: (page) => {
            // console.log(page);
          },
          pageSize: 5,
        }}
        dataSource={comments}
        renderItem={(comment) => (
          <TheComment
            readOnly={readOnly}
            comment={comment}
            liked={likedCommentIds.includes(comment.id)}
          />
        )}
      />
    </>
  );
}
