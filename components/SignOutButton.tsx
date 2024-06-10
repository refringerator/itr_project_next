import { usePathname, useRouter } from "@/navigation";
import { handleRequest } from "@/utils/auth-helpers/client";
import { SignOut } from "@/utils/auth-helpers/server";
import { getRedirectMethod } from "@/utils/auth-helpers/settings";
import { LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useTranslations } from "next-intl";

function SignOutButton({ onClick }: { onClick?: () => void }) {
  const path = usePathname();
  const router = useRouter();
  const t = useTranslations("Header");

  return (
    <Button
      icon={<LogoutOutlined />}
      onClick={() => {
        onClick && onClick();
        handleRequest(
          { pathName: path },
          SignOut,
          getRedirectMethod() === "client" ? router : null
        );
      }}
    >
      {t("signout")}
    </Button>
  );
}

export default SignOutButton;
