import ItemList, { ItemsList } from "@/sections/Item/ItemList";

export type CollectionProps = {
  items: ItemsList;
};

export default function TheCollection({ items }: CollectionProps) {
  return (
    <>
      <ItemList data={items} />
    </>
  );
}
