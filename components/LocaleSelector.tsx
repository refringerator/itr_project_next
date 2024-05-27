"use client";

import { Select } from "antd";

import { useRouter, usePathname } from "@/navigation";
import { useCallback, useTransition } from "react";
import { useSearchParams, useParams } from "next/navigation";
import useDimension from "@/hooks/useDimension";
import { GlobalOutlined } from "@ant-design/icons";

export default function LocaleSelector() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { locale } = useParams();
  const showTitle = useDimension({ xs: false, sm: false, md: true });

  function onSelectChange(nextLocale: string) {
    const params = searchParams.size ? `?${searchParams.toString()}` : "";
    startTransition(() => {
      router.replace(pathname + params, { locale: nextLocale });
    });
  }

  const labelRender = useCallback(
    (props: any) => <>{showTitle ? props.label : <GlobalOutlined />}</>,
    [showTitle]
  );

  return (
    <Select
      defaultValue={locale as string}
      disabled={isPending}
      dropdownStyle={{ minWidth: "150px" }}
      onChange={onSelectChange}
      labelRender={labelRender}
      options={[
        { value: "en", label: "English" },
        { value: "ru", label: "Russian" },
      ]}
    />
  );
}
