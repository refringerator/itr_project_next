"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

export function Notification() {
  const [api, contextHolder] = notification.useNotification();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const status = searchParams.get("status");
    const status_description = searchParams.get("status_description");
    const error = searchParams.get("error");
    const error_description = searchParams.get("error_description");

    if (error || status) {
      api[(error ? "error" : "info") as NotificationType]({
        message: error
          ? error ?? "Hmm... Something went wrong."
          : status ?? "Alright!",
        description: error ? error_description : status_description,
      });

      // Clear any 'error', 'status', 'status_description', and 'error_description' search params
      // so that the toast doesn't show up again on refresh, but leave any other search params
      // intact.
      const newSearchParams = new URLSearchParams(searchParams.toString());
      const paramsToRemove = [
        "error",
        "status",
        "status_description",
        "error_description",
      ];
      paramsToRemove.forEach((param) => newSearchParams.delete(param));
      const redirectPath = `${pathname}?${newSearchParams.toString()}`;
      router.replace(redirectPath, { scroll: false });
    }
  }, [searchParams]);

  return <>{contextHolder}</>;
}