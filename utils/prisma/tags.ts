import { prisma } from "@/utils/prisma";

export const getUsedTags = () => prisma.tag.findMany();

export const getItemTags = (itemId: number) =>
  prisma.item.findUnique({
    where: { id: itemId },
    select: { tags: true },
  });

export const getFreqTags = () =>
  prisma.tag.findMany({
    include: {
      _count: {
        select: { items: true },
      },
    },
  });
