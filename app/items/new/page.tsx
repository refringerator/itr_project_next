"use server";

import ItemForm from "@/components/ItemForm";
import { createItem, getUsedTags, my_collections } from "@/app/items/actions";

export default async function NewCollection() {
  const collections = await my_collections();
  const tags = await getUsedTags();

  return (
    <>
      <h2>Create item</h2>
      <ItemForm collections={collections} tags={tags} onFinish={createItem} />
    </>
  );
}
