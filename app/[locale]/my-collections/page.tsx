"use server";

import { getUserCollections } from "@/utils/prisma/collections";
import { Link } from "@/navigation";
import { getSupabaseUserOrRedirect } from "@/utils/auth-helpers/server";

export default async function Collections() {
  const user = await getSupabaseUserOrRedirect("/collections");

  const { collections } = await getUserCollections(user.id);
  return (
    <>
      <Link href="/collections/new">Create new collection</Link>
      <ul>
        {collections.map((collection) => (
          <li key={collection.id}>
            <Link href={`/collections/${collection.id}`}>
              {collection.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
