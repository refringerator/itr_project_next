"use client";

import { LikeFilled } from "@ant-design/icons";

import { Avatar, List, Space, Rate } from "antd";
import { useState } from "react";
import { CommentWithAdditionalFields } from "./Comments";
import { setMyLikeOnComment } from "@/app/[locale]/items/actions";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

interface CommentProps {
  comment: CommentWithAdditionalFields;
  liked: boolean;
  readOnly: boolean;
}

export function TheComment({ comment, liked, readOnly }: CommentProps) {
  const numLike = Number(liked);
  const defLikes = comment._count.likes;

  const t = useTranslations("TheComment");
  const { locale } = useParams();
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
            disabled={readOnly}
          />
          {t("likes", { count: likesCount })}
        </Space>,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar} />}
        title={<a href={href}>{`${t("author")} ${comment.author.name}`}</a>}
        description={`${t("added")} ${comment.createdAt.toLocaleString(
          locale
        )}`}
      />
      {comment.text}
    </List.Item>
  );
}
