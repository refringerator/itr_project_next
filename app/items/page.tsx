"use server";

import Link from "next/link";
import { getItems } from "@/app/items/actions";

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
