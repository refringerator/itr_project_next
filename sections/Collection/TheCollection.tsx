import { setPublishItemWithCheck } from "@/app/[locale]/items/actions";
import ItemList, { ItemsList } from "@/sections/Item/ItemList";
import { CustomField } from "@prisma/client";

export type CollectionProps = {
  items: ItemsList;
  showActions: boolean;
  customFields: CustomField[];
};

export default function TheCollection({
  items,
  showActions,
  customFields,
}: CollectionProps) {
  return (
    <>
      <ItemList
        data={items}
        showActions={showActions}
        customFields={customFields}
        setPublishItem={setPublishItemWithCheck}
      />
    </>
  );
}
