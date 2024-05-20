"use server";

import { getCollections } from "@/utils/prisma/collections";
import { Link } from "@/navigation";

export default async function Collections() {
  const collections = await getCollections();
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
