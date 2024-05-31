// import CollectionsList from "@/sections/Collection/CollectionsList";
import { defaultImage } from "@/constants/server";
import { getLargeCollections } from "@/utils/prisma/collections";
import TagCloud from "@/components/TagCloud";
import { getFreqTags } from "@/utils/prisma/tags";
import CollectionCardList from "@/sections/Collection/CollectionCardList";

export default async function Home() {
  const collections = await getLargeCollections(8);
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
      <CollectionCardList collections={collections} />
      {/* <CollectionsList data={data} /> */}
      {/* <TagCloud
        height={200}
        width={500}
        words={tags.map((t) => ({ text: t.title, value: t._count.items }))}
      /> */}
    </>
  );
}
