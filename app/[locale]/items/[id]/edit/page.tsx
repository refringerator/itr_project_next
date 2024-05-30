"use server";

import ItemForm, { ItemFormType } from "@/sections/Item/ItemForm";
import { deleteItem, updateItem } from "@/app/[locale]/items/actions";
import { DeleteButton } from "@/components/DeleteButton";
import { getSupabaseUserOrRedirect } from "@/utils/auth-helpers/server";
import { getMyCollectionsTagsItem } from "@/utils/prisma/items";
import { redirect } from "@/navigation";
import { getTranslations } from "next-intl/server";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditItem({ params: { id } }: Props) {
  const itemId = parseInt(id);
  const t = await getTranslations("Item.Page");
  const user = await getSupabaseUserOrRedirect("/signin");

  const { collections, tags, item } = await getMyCollectionsTagsItem(
    user.id,
    itemId
  );

  if (!item) return redirect("/items/new");

  const updateItemWihtId = updateItem.bind(
    null,
    itemId,
    item.tags.map((t) => t.title)
  );

  const dateTypes = item.collection.customFields
    .filter((cf) => cf.type === "DATE")
    .map((cf) => `cf_${cf.id}`);
  const customValues = { ...item.customValues };

  return (
    <>
      <h2>
        {t("editItem")}
        <DeleteButton
          buttonText={t("orDelete")}
          confirmTitle={t("deleteConfirmTitle")}
          descriptionText={t("deleteConfirmDesctiption")}
          onClick={deleteItem.bind(null, itemId)}
        />
      </h2>
      <ItemForm
        collections={collections}
        tags={tags}
        onFinish={updateItemWihtId}
        dateFields={dateTypes}
        initialValues={
          {
            ...item,
            ...customValues,
            tagsIds: item.tags.map((el) => el.title),
          } as ItemFormType
        }
        buttonText="Update"
      />
    </>
  );
}
