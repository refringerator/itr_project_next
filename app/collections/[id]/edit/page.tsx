"use server";

import CollectionForm, { FieldType } from "@/components/CollectionForm";
import {
  getCollection,
  updateCollection,
  deleteCollection,
  getTopics,
} from "@/app/collections/actions";

import { DeleteButton } from "@/components/DeleteButton";
import { getSupabaseUserOrRedirect } from "@/utils/auth-helpers/server";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditCollection({ params: { id } }: Props) {
  const collectionId = parseInt(id);
  await getSupabaseUserOrRedirect("/signin");

  const updateCollectionWihtId = updateCollection.bind(null, collectionId);
  const topics = await getTopics();
  const collection = await getCollection(collectionId);

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
