import CollectionsList from "@/components/Collection/CollectionsList";
import { get5LargeCollections } from "@/utils/prisma/collections";

export default async function Home() {
  const collections = await get5LargeCollections();

  const data = collections.map((c) => ({
    title: c.title,
    description: c.description || "",
    updatedAt: c.updatedAt,
    avatar: "",
    href: "",
  }));
  return (
    <>
      <CollectionsList data={data} />
    </>
  );
}
