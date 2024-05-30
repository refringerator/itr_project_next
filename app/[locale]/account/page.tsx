import Profile from "@/sections/Profile";
import { getSupabaseUserOrRedirect } from "@/utils/auth-helpers/server";
import { getUsername } from "@/utils/prisma/profile";

export default async function Account() {
  const user = await getSupabaseUserOrRedirect("/signin");

  const userName = (await getUsername(user.id))?.name || "Hidden name";

  return (
    <>
      <h1>Profile page</h1>
      <Profile username={userName} />
    </>
  );
}
