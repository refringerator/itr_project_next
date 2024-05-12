"use client";

import { createClient } from "@/utils/supabase/client";
import { Comment } from "@prisma/client";
import { useEffect, useState } from "react";

interface CommentsProps {
  itemId: number;
  serverComments: Comment[];
}

export function Comments({ itemId, serverComments }: CommentsProps) {
  const [comments, setComments] = useState(serverComments);
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel(`item-${itemId}`)
      .on("broadcast", { event: "new-comment" }, ({ payload }) => {
        console.log("Received new comment!", { payload });
        setComments([...comments, payload as Comment]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [comments, itemId, supabase]);

  return (
    <>
      <h4>Comments</h4>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.text}</li>
        ))}
      </ul>
    </>
  );
}
