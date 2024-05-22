"use client";

import { Select } from "antd";

import { useRouter, usePathname } from "@/navigation";
import { useTransition } from "react";
import { useSearchParams, useParams } from "next/navigation";

export default function LocaleSelector() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { locale } = useParams();

  function onSelectChange(nextLocale: string) {
    const params = searchParams.size ? `?${searchParams.toString()}` : "";
    startTransition(() => {
      router.replace(pathname + params, { locale: nextLocale });
    });
  }

  return (
    <Select
      defaultValue={locale as string}
      disabled={isPending}
      style={{ width: 120 }}
      onChange={onSelectChange}
      options={[
        { value: "en", label: "English" },
        { value: "ru", label: "Russian" },
      ]}
    />
  );
}
