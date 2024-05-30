import CollectionsList from "@/sections/Collection/CollectionsList";
import { defaultImage } from "@/constants/server";
import { get5LargeCollections } from "@/utils/prisma/collections";
import TagCloud from "@/components/TagCloud";
import { getFreqTags } from "@/utils/prisma/tags";

export default async function Home() {
  const collections = await get5LargeCollections();
  const tags = await getFreqTags();

  const data = collections.map((c) => ({
    title: c.title,
    description: c.description || "",
    updatedAt: c.updatedAt,
    avatar: "",
    href: `/collections/${c.id}`,
    coverUrl: c.coverUrl || defaultImage,
  }));
  return (
    <>
      <CollectionsList data={data} />
      <TagCloud
        height={200}
        width={500}
        words={tags.map((t) => ({ text: t.title, value: t._count.items }))}
      />
    </>
  );
}
