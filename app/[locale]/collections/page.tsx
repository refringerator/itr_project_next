"use server";

import { getCollectionsWithCFs } from "@/utils/prisma/collections";
import { Link } from "@/navigation";
import { getSupabaseUser } from "@/utils/auth-helpers/server";
import CollectionsList from "@/sections/Collection/CollectionsList";
import { defaultImage } from "@/constants/server";

export default async function Collections() {
  const user = await getSupabaseUser();

  const collections = await getCollectionsWithCFs();
  const data = collections.map((c) => ({
    ...c,
    coverUrl: c.coverUrl || defaultImage,
  }));

  return (
    <>
      {user && <Link href="/collections/new">Create new collection</Link>}
      <CollectionsList data={data} />
    </>
  );
}
