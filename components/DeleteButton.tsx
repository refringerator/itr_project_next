"use client";
import { Button } from "antd";

interface DeleteButtonProps {
  buttonText: string;
  onClick: () => void;
}

export const DeleteButton = ({ buttonText, onClick }: DeleteButtonProps) => {
  const clickAction = () => onClick();

  return (
    <Button onClick={clickAction} danger type="text">
      {buttonText}
    </Button>
  );
};
