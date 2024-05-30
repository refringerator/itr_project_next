"use client";
import { Button } from "antd";
import PopConfirm from "@/components/PopConfirm";

interface DeleteButtonProps {
  buttonText: string;
  descriptionText: string;
  confirmTitle: string;
  onClick: () => void;
}

export const DeleteButton = ({
  buttonText,
  descriptionText,
  confirmTitle,
  onClick,
}: DeleteButtonProps) => {
  const clickAction = () => onClick();

  return (
    <PopConfirm
      onConfirm={clickAction}
      description={descriptionText}
      title={confirmTitle}
    >
      <Button danger type="text">
        {buttonText}
      </Button>
    </PopConfirm>
  );
};
