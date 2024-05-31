"use server";

import ItemForm, { ItemFormType } from "@/sections/Item/ItemForm";
import { deleteItemWithCheck, updateItem } from "@/app/[locale]/items/actions";
import { DeleteButton } from "@/components/DeleteButton";
import { getSupabaseUserOrRedirect } from "@/utils/auth-helpers/server";
import { getMyCollectionsTagsItem } from "@/utils/prisma/items";
import { redirect } from "@/navigation";
import { getTranslations } from "next-intl/server";
import { getErrorRedirect, getKeysWithDateType } from "@/utils/helpers";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditItem({ params: { id } }: Props) {
  const itemId = parseInt(id);
  const t = await getTranslations("Item.Page");
  const user = await getSupabaseUserOrRedirect("/signin");

  const { collections, tags, item, userData } = await getMyCollectionsTagsItem(
    user.id,
    itemId
  );

  if (!item) return redirect("/items/new");

  const isSuperuser = userData?.superuser || false;

  if (item.authorId !== user.id && !isSuperuser)
    return redirect(
      getErrorRedirect(
        `/items`,
        "Forbidden",
        `You are not authorized to edit item with id ${id}!`
      )
    );

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
