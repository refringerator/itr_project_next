"use server";

import ItemForm, { ItemFormType } from "@/sections/Item/ItemForm";
import {
  deleteItemWithCheck,
  getUsersCollectionsTagsItem,
  updateItem,
} from "@/app/[locale]/items/actions";
import { DeleteButton } from "@/components/DeleteButton";
import { redirect } from "@/navigation";
import { getTranslations } from "next-intl/server";
import { getKeysWithDateType } from "@/utils/helpers";

type Props = {
  params: {
    itemId: string;
  };
};

export default async function EditItem({ params: { itemId: id } }: Props) {
  const itemId = parseInt(id);
  const t = await getTranslations("Item.Page");

  const { collections, tags, item } = await getUsersCollectionsTagsItem(itemId);

  if (!item) return redirect("/items/new");

  const updateItemWihtId = updateItem.bind(
    null,
    itemId,
    item.tags.map((t) => t.title)
  );

  return (
    <>
      <h2>
        {t("editItem")}
        <DeleteButton
          buttonText={t("orDelete")}
          confirmTitle={t("deleteConfirmTitle")}
          descriptionText={t("deleteConfirmDesctiption")}
          onClick={deleteItemWithCheck.bind(null, itemId)}
        />
      </h2>
      <ItemForm
        collections={collections}
        tags={tags}
        onFinish={updateItemWihtId}
        dateFields={getKeysWithDateType(item.collection.customFields)}
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
