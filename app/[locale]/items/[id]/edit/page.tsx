"use server";

import ItemForm, { ItemFormType } from "@/components/ItemForm";
import { deleteItem, updateItem } from "@/app/[locale]/items/actions";
import { DeleteButton } from "@/components/DeleteButton";
import { getSupabaseUserOrRedirect } from "@/utils/auth-helpers/server";
import { getMyCollectionsTagsItem } from "@/utils/prisma/items";
import { redirect } from "@/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditItem({ params: { id } }: Props) {
  const itemId = parseInt(id);
  const user = await getSupabaseUserOrRedirect("/signin");

  const { collections, tags, item } = await getMyCollectionsTagsItem(
    user.id,
    itemId
  );

  if (!item) redirect("/items/new");

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
          {
            ...item,
            ...item.customValues,
            tagsIds: item.tags.map((el) => el.title),
          } as ItemFormType
        }
        buttonText="Update"
      />
    </>
  );
}
