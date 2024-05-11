"use server";

import ItemForm, { ItemFormType } from "@/components/ItemForm";
import { prisma } from "@/utils/prisma";
import { deleteItem, getItem, updateItem } from "@/app/items/actions";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { DeleteButton } from "@/components/DeleteButton";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditCollection({ params: { id } }: Props) {
  const collectionId = parseInt(id);
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/signin");
  }

  const updateCollectionWihtId = updateItem.bind(null, collectionId);
  const collections = await prisma.collection.findMany();
  const item = await getItem(collectionId);

  return (
    <>
      <h2>
        Edit item
        <DeleteButton
          buttonText="or delete it"
          onClick={deleteItem.bind(null, collectionId)}
        />
      </h2>
      <ItemForm
        collections={collections}
        onFinish={updateCollectionWihtId}
        initialValues={item as ItemFormType}
        buttonText="Update"
      />
    </>
  );
}
