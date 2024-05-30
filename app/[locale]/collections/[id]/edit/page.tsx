"use server";

import CollectionForm, {
  CollectionFormFieldType,
} from "@/sections/Collection/CollectionForm";
import {
  updateCollection,
  deleteCollection,
} from "@/app/[locale]/collections/actions";

import { DeleteButton } from "@/components/DeleteButton";
import { getSupabaseUserOrRedirect } from "@/utils/auth-helpers/server";
import { getTopicsCollection } from "@/utils/prisma/collections";
import { redirect } from "@/navigation";
import { getTranslations } from "next-intl/server";

type Props = {
  params: {
    id: string;
    locale: string;
  };
};

export default async function EditCollection({
  params: { id, locale },
}: Props) {
  const collectionId = parseInt(id);
  const t = await getTranslations("Collection.Page");
  await getSupabaseUserOrRedirect("/signin");

  const { topics, collection } = await getTopicsCollection(
    collectionId,
    locale
  );
  const updateCollectionWihtId = updateCollection.bind(
    null,
    collectionId,
    collection?.customFields
  );

  if (!collection) return redirect("/collections/new");

  return (
    <>
      <h2>
        {t("editCollection")}
        <DeleteButton
          buttonText={t("orDelete")}
          confirmTitle={t("deleteConfirmTitle")}
          descriptionText={t("deleteConfirmDesctiption")}
          onClick={deleteCollection.bind(null, collectionId)}
        />
      </h2>
      <CollectionForm
        topics={topics}
        onFinish={updateCollectionWihtId}
        initialValues={
          {
            ...collection,
            cover: collection.coverUrl,
          } as CollectionFormFieldType
        }
        buttonText="Update"
      />
    </>
  );
}
