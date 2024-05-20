"use client";

import { LikeFilled } from "@ant-design/icons";

import { Avatar, List, Space, Rate } from "antd";
import { useState } from "react";
import { CommentWithAdditionalFields } from "./Comments";
import { setMyLikeOnComment } from "@/app/[locale]/items/actions";

interface CommentProps {
  comment: CommentWithAdditionalFields;
  liked: boolean;
}

export function TheComment({ comment, liked }: CommentProps) {
  const numLike = Number(liked);
  const defLikes = comment._count.likes;

  const [likesCount, setLikesCount] = useState(defLikes);

  const avatar = `https://api.dicebear.com/7.x/miniavs/svg?seed=${comment.authorId}`;
  const href = "/";

  const OnChange = (value: number) => {
    setLikesCount(defLikes + value - numLike);
    setMyLikeOnComment(comment.id, value);
  };

  return (
    <List.Item
      actions={[
        <Space key="list-like">
          <Rate
            character={<LikeFilled />}
            count={1}
            defaultValue={numLike}
            onChange={OnChange}
          />
          {likesCount}
        </Space>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar} />}
        title={<a href={href}>{comment.authorId}</a>}
        description={`Added ${comment.createdAt.toLocaleString()}`}
      />
      {comment.text}
    </List.Item>
  );
}
