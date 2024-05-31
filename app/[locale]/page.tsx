import { defaultImage } from "@/constants/server";
import { getLargeCollections } from "@/utils/prisma/collections";
import TagCloud from "@/components/TagCloud";
import { getFreqTags } from "@/utils/prisma/tags";
import CollectionCardList from "@/sections/Collection/CollectionCardList";
import { Flex } from "antd";

export default async function Home() {
  const collections = await getLargeCollections(8);
  const tags = await getFreqTags();

  const data = collections.map((c) => ({
    ...c,
    coverUrl: c.coverUrl || defaultImage,
  }));

  return (
    <Flex vertical justify={"flex-start"} align={"center"}>
      <CollectionCardList collections={data} />
      <TagCloud
        height={400}
        width={500}
        words={tags.map((t) => ({ text: t.title, value: t._count.items }))}
      />
    </Flex>
  );
}
