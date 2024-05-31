import Profile from "@/sections/Profile";
import { getSupabaseUserOrRedirect } from "@/utils/auth-helpers/server";
import { getUserData } from "@/utils/prisma/profile";
import { Flex } from "antd";

export default async function Account() {
  const user = await getSupabaseUserOrRedirect("/signin");

  const userName = (await getUserData(user.id))?.name || "Hidden name";

  return (
    <Flex vertical>
      <h1>Profile page</h1>
      <Profile username={userName} />
    </Flex>
  );
}
