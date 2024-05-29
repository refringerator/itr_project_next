import CollectionsList from "@/components/Collection/CollectionsList";
import { get5LargeCollections } from "@/utils/prisma/collections";

export default async function Home() {
  const collections = await get5LargeCollections();
  const defaultImage = `${process.env.STORAGE_PROTOCOL}://${process.env.STORAGE_HOST}:${process.env.STORAGE_PORT}/storage/v1/object/public/collection/acorn.jpg`;

  const data = collections.map((c) => ({
    title: c.title,
    description: c.description || "",
    updatedAt: c.updatedAt,
    avatar: "",
    href: "",
    coverUrl: c.coverUrl || defaultImage,
  }));
  return (
    <>
      <CollectionsList data={data} />
    </>
  );
}
