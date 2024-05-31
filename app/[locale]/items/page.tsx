"use server";

import { getItems } from "@/utils/prisma/items";
import { Link } from "@/navigation";
import { getSupabaseUser } from "@/utils/auth-helpers/server";

export default async function Collections() {
  const user = await getSupabaseUser();
  const items = await getItems();
  return (
    <>
      {user && <Link href="/items/new">Create new item</Link>}
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link href={`/items/${item.id}`}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
