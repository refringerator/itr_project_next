"use server";

import CollectionForm, { FieldType } from "@/components/CollectionForm";
import {
  updateCollection,
  deleteCollection,
} from "@/app/[locale]/collections/actions";

import { DeleteButton } from "@/components/DeleteButton";
import { getSupabaseUserOrRedirect } from "@/utils/auth-helpers/server";
import { getTopicsCollection } from "@/utils/prisma/collections";
import { redirect } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditCollection({ params: { id } }: Props) {
  const collectionId = parseInt(id);
  await getSupabaseUserOrRedirect("/signin");

  const { topics, collection } = await getTopicsCollection(collectionId);
  const updateCollectionWihtId = updateCollection.bind(
    null,
    collectionId,
    collection?.customFields
  );

  if (!collection) redirect("/collections/new");

  return (
    <>
      <h2>
        Edit collection
        <DeleteButton
          buttonText="or delete it"
          onClick={deleteCollection.bind(null, collectionId)}
        />
      </h2>
      <CollectionForm
        topics={topics}
        onFinish={updateCollectionWihtId}
        initialValues={collection as FieldType}
        buttonText="Update"
      />
    </>
  );
}
