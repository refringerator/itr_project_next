"use client";

import { Popconfirm } from "antd";
import { useTranslations } from "next-intl";

interface PopConfirmProps {
  title: string;
  description: string;
  onConfirm: () => void;
}

const PopConfirm = ({
  children,
  title,
  description,
  onConfirm,
}: React.PropsWithChildren<PopConfirmProps>) => {
  const t = useTranslations("Components.PopConfirm");

  return (
    <Popconfirm
      title={title}
      placement="bottom"
      description={description}
      onConfirm={onConfirm}
      okText={t("yes")}
      cancelText={t("no")}
    >
      {children}
    </Popconfirm>
  );
};

export default PopConfirm;
