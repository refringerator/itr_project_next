"use server";

import { getItems } from "@/utils/prisma/items";
import { Link } from "@/navigation";

export default async function Collections() {
  const items = await getItems();
  return (
    <>
      <Link href="/items/new">Create new item</Link>
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
