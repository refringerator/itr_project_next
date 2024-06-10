"use client";

import { getToken } from "@/app/[locale]/account/actions";
import { Context } from "@/context";
import { Typography, Button } from "antd";
import { useContext, useEffect, useState } from "react";

export default function UserToken() {
  const [token, setToken] = useState("");
  const context = useContext(Context);

  useEffect(() => {
    const d = async () => {
      const token = await getToken(context?.user?.id || null);
      setToken(token);
    };
    d();
  }, [context?.user?.id]);

  return (
    <p>
      <Typography.Text>Your API token: </Typography.Text>
      <Typography.Text copyable>{token}</Typography.Text>
    </p>
  );
}
