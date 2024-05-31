"use client";

import { signInWithOAuth } from "@/utils/auth-helpers/client";
import { GithubOutlined, GoogleOutlined } from "@ant-design/icons";
import { type Provider } from "@supabase/supabase-js";
import { Button, Flex, Typography } from "antd";
import { useTranslations } from "next-intl";
import { useState } from "react";

type OAuthProviders = {
  name: Provider;
  displayName: string;
  icon: JSX.Element;
};

const oAuthProviders: OAuthProviders[] = [
  {
    name: "github",
    displayName: "GitHub",
    icon: <GithubOutlined />,
  },
  {
    name: "google",
    displayName: "Google",
    icon: <GoogleOutlined />,
  },
];

export default function OauthSignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useTranslations("Auth.Forms");

  const handleSubmit = (provider: Provider) => {
    setIsSubmitting(true);
    signInWithOAuth(provider);
  };

  return (
    <>
      <Typography.Text>{t("thirdPartrySignin")}</Typography.Text>
      <Flex style={{ maxWidth: "300px" }} gap="middle" vertical={false}>
        {oAuthProviders.map((provider) => (
          <Button
            key={provider.name}
            onClick={() => handleSubmit(provider.name)}
            icon={provider.icon}
            loading={isSubmitting}
          >
            {provider.displayName}
          </Button>
        ))}
      </Flex>
    </>
  );
}
