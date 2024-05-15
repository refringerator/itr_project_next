import { createClient } from "@/utils/supabase/server";
import { Comment } from "@prisma/client";

export const pubComment = (itemId: number, comment: Comment) => {
  const supabase = createClient();
  supabase.channel(`item-${itemId}`).send({
    type: "broadcast",
    event: "new-comment",
    payload: { ...comment, _count: { likes: 0 } },
  });
};
