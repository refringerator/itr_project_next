"use server";

import { getUserCollectionsWithCFs } from "@/utils/prisma/collections";
import { Link } from "@/navigation";
import { getSupabaseUserOrRedirect } from "@/utils/auth-helpers/server";
import { defaultImage } from "@/constants/server";
import CollectionsList from "@/sections/Collection/CollectionsList";
import { Flex } from "antd";

export default async function Collections() {
  const user = await getSupabaseUserOrRedirect("/collections");

  const collections = await getUserCollectionsWithCFs(user.id);

  const data = collections.map((c) => ({
    ...c,
    coverUrl: c.coverUrl || defaultImage,
  }));

  return (
    <Flex vertical style={{ width: "100%" }}>
      {user && <Link href="/collections/new">Create new collection</Link>}
      <CollectionsList data={data} />
    </Flex>
  );
}
