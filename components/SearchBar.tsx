import { useRouter } from "@/navigation";
import { Input } from "antd";
import { useTranslations } from "next-intl";

export default function SearchBar() {
  const router = useRouter();
  const t = useTranslations("Components.SearchBar");

  const onPressEnter = (value: string) => {
    if (value.length > 1) router.push(`/search?q=${value}`);
  };

  return (
    <Input.Search
      placeholder={t("placeholder")}
      loading={false}
      onSearch={onPressEnter}
    />
  );
}
