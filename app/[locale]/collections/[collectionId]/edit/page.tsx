"use server";

import CollectionForm, {
  CollectionFormFieldType,
} from "@/sections/Collection/CollectionForm";
import {
  updateCollection,
  deleteCollectionWithCheck,
} from "@/app/[locale]/collections/actions";

import { DeleteButton } from "@/components/DeleteButton";
import { getSupabaseUserOrRedirect } from "@/utils/auth-helpers/server";
import { getTopicsCollection } from "@/utils/prisma/collections";
import { redirect } from "@/navigation";
import { getTranslations } from "next-intl/server";
import { getErrorRedirect } from "@/utils/helpers";

type Props = {
  params: {
    collectionId: string;
    locale: string;
  };
};

export default async function EditCollection({
  params: { collectionId: id, locale },
}: Props) {
  const collectionId = parseInt(id);
  const t = await getTranslations("Collection.Page");
  const user = await getSupabaseUserOrRedirect("/signin");

  const { topics, collection, userData } = await getTopicsCollection(
    collectionId,
    user.id,
    locale
  );
  const updateCollectionWihtId = updateCollection.bind(
    null,
    collectionId,
    collection?.customFields
  );

  if (!collection) return redirect("/collections/new");

  const isSuperuser = userData?.superuser || false;

  if (collection.authorId !== user.id && !isSuperuser)
    return redirect(
      getErrorRedirect(
        `/collections`,
        "Forbidden",
        `You are not authorized to edit collection with id ${id}!`
      )
    );
  return (
    <>
      <h2>
        {t("editCollection")}
        <DeleteButton
          buttonText={t("orDelete")}
          confirmTitle={t("deleteConfirmTitle")}
          descriptionText={t("deleteConfirmDesctiption")}
          onClick={deleteCollectionWithCheck.bind(null, collectionId)}
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
