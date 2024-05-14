"use server";

import ItemForm, { ItemFormType } from "@/components/ItemForm";
import {
  deleteItem,
  getItem,
  getUsedTags,
  my_collections,
  updateItem,
} from "@/app/items/actions";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { DeleteButton } from "@/components/DeleteButton";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditItem({ params: { id } }: Props) {
  const itemId = parseInt(id);
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/signin");
  }

  const collections = await my_collections();
  const tags = await getUsedTags();
  const item = await getItem(itemId);

  const updateItemWihtId = updateItem.bind(
    null,
    itemId,
    item.tags.map((t) => t.title)
  );

  return (
    <>
      <h2>
        Edit item
        <DeleteButton
          buttonText="or delete it"
          onClick={deleteItem.bind(null, itemId)}
        />
      </h2>
      <ItemForm
        collections={collections}
        tags={tags}
        onFinish={updateItemWihtId}
        initialValues={
          { ...item, tagsIds: item.tags.map((el) => el.title) } as ItemFormType
        }
        buttonText="Update"
      />
    </>
  );
}
