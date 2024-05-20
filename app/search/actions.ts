"use server";

import { prisma } from "@/utils/prisma";

export async function search(search: string) {
  if (!search || search === "") return [];

  const res = await prisma.collection.findMany({
    where: {
      title: {
        search: search.split(" ").join(" & "),
      },
    },
  });

  console.log({ res });
  return res.map((v) => v.title);
}
