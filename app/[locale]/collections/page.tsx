"use server";

import { getCollections } from "@/utils/prisma/collections";
import { Link } from "@/navigation";
import { getSupabaseUser } from "@/utils/auth-helpers/server";

export default async function Collections() {
  const user = await getSupabaseUser();

  const collections = await getCollections();

  return (
    <>
      {user && <Link href="/collections/new">Create new collection</Link>}
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
