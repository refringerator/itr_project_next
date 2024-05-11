"use server";

import ItemForm from "@/components/ItemForm";
import { createItem, my_collections } from "@/app/items/actions";

export default async function NewCollection() {
  const collections = await my_collections();

  return (
    <>
      <h2>Create item</h2>
      <ItemForm collections={collections} onFinish={createItem} />
    </>
  );
}
