"use client";
import { Button } from "antd";
import PopConfirm from "@/components/PopConfirm";

interface DeleteButtonProps {
  buttonText: string;
  descriptionText: string;
  confirmTitle: string;
  type?: "text" | "link";
  onClick: () => void;
}

export const DeleteButton = ({
  buttonText,
  descriptionText,
  confirmTitle,
  type = "text",
  onClick,
}: DeleteButtonProps) => {
  const clickAction = () => onClick();

  return (
    <PopConfirm
      onConfirm={clickAction}
      description={descriptionText}
      title={confirmTitle}
    >
      <Button danger type={type}>
        {buttonText}
      </Button>
    </PopConfirm>
  );
};
