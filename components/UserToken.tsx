"use client";

import { generateToken, getToken } from "@/app/[locale]/account/actions";
import { Context } from "@/context";
import { Typography } from "antd";
import { useContext, useEffect, useState } from "react";

export default function UserToken() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);

  useEffect(() => {
    const d = async () => {
      const token = await getToken(context?.user?.id || null);
      setToken(token);
    };
    d();
  }, [context?.user?.id]);

  const onClick = async () => {
    setLoading(true);
    const token = await generateToken(context?.user?.id || null);
    setToken(token);
    setLoading(false);
  };

  return (
    <>
      {token !== "" && (
        <p>
          <Typography.Text>Your API token: </Typography.Text>
          <Typography.Text copyable>{token}</Typography.Text>
        </p>
      )}
      <p>
        <Typography.Text>You can </Typography.Text>
        <Typography.Link disabled={loading} onClick={onClick}>
          generate {token !== "" && "new"}
        </Typography.Link>
        <Typography.Text> API token</Typography.Text>
      </p>
    </>
  );
}
