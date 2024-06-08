"use client";

import { FloatButton, Modal } from "antd";
import {
  QuestionCircleOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { createCustomerRequest } from "@/app/[locale]/actions";
import { Context } from "@/context";
import { useContext } from "react";

const { confirm } = Modal;

const showPromiseConfirm = (userId: string, userEmail: string) => {
  confirm({
    title: "Do you want to delete these items?",
    icon: <ExclamationCircleFilled />,
    content:
      "When clicked the OK button, this dialog will be closed after 1 second",
    async onOk() {
      try {
        return await createCustomerRequest(userId, userEmail);
        // return await new Promise((resolve, reject) => {
        //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        // });
      } catch {
        return console.log("Oops errors!");
      }
    },
    onCancel() {},
  });
};

export default function UserHelper() {
  const context = useContext(Context);

  return (
    <FloatButton
      icon={<QuestionCircleOutlined />}
      type="default"
      style={{ right: 24 }}
      tooltip={<div>Need help?</div>}
      onClick={() =>
        showPromiseConfirm(context?.user?.id || "", context?.user?.email || "")
      }
    />
  );
}
