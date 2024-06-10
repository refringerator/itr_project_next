import { defaultImage } from "@/constants/server";
import { allCollectionsWithItemCount } from "@/utils/prisma/collections";
import { getUsersByToken } from "@/utils/prisma/profile";

export async function GET(request: Request) {
  const headers = request.headers;

  const token = headers.get("api-token");
  if (!token || token === "")
    return new Response("Need provide api token", { status: 400 });

  const users = await getUsersByToken(token);
  if (users.length === 0) return new Response("Invalid token", { status: 400 });

  const collectons = await allCollectionsWithItemCount();

  const data = collectons.map((c) => ({
    id: c.id,
    title: c.title,
    owner: c.author.name,
    topic: c.topic.title,
    description: c.description,
    itemsCount: c._count.items,
    image: c.coverUrl || `${process.env.NEXT_PUBLIC_SITE_URL}/${defaultImage}`,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/collections/${c.id}`,
  }));

  return Response.json({ data });
}
