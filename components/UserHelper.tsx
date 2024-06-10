"use client";

import { FloatButton, Modal, Typography } from "antd";
import { Button, message, Space } from "antd";
import {
  QuestionCircleOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { createCustomerRequest } from "@/app/[locale]/actions";
import { Context } from "@/context";
import { useCallback, useContext } from "react";
import { HelpCenterLink } from "./HelpCenterLink";
import Link from "next/link";

const { confirm } = Modal;

export default function UserHelper() {
  const context = useContext(Context);
  const [messageApi, contextHolder] = message.useMessage();

  const showPromiseConfirm = useCallback(
    (userId: string, userEmail: string) => {
      console.log({ userEmail, userId });

      const content =
        userId === "" ? (
          <>
            <p>
              You need <Link href="/signin">login</Link> first to ask question
              in Collections App
            </p>
            <p>
              <Typography.Text>
                Or you can create request on our{" "}
              </Typography.Text>
              <HelpCenterLink />
            </p>
          </>
        ) : (
          "When clicked the OK button, this dialog will be closed after 1 second"
        );
      confirm({
        title: "Need help?",
        icon: <ExclamationCircleFilled />,
        content,

        async onOk() {
          try {
            await createCustomerRequest(userId, userEmail);
            // return await new Promise((resolve, reject) => {
            //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
            // });
            messageApi.open({
              type: "success",
              content: "New request created!",
            });
          } catch {
            messageApi.open({
              type: "error",
              content: "This is an error",
            });
            return console.log("Oops errors!");
          }
        },
        onCancel() {},
      });
    },
    [messageApi]
  );

  return (
    <>
      {contextHolder}
      <FloatButton
        icon={<QuestionCircleOutlined />}
        type="default"
        style={{ right: 24 }}
        tooltip={<div>Need help?</div>}
        onClick={() =>
          showPromiseConfirm(
            context?.user?.id || "",
            context?.user?.email || ""
          )
        }
      />
    </>
  );
}
