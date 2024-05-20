import { PrismaClient } from "@prisma/client";
import { createServerClient } from "@supabase/ssr";
import { Database } from "@/types_db";
import { test as setup } from "@playwright/test";

const prisma = new PrismaClient();

export const createAdminClient = () => {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { cookies: {} }
  );
};

async function clear_test_user_data() {
  const supabase = createAdminClient();
  const { data } = await supabase.auth.admin.listUsers();
  const supabase_users = data?.users || [];
  let ids: string[] = [];
  supabase_users.forEach(async (user) => {
    if (user.email?.match(/@test\.com/)) {
      ids.push(user.id);
      await supabase.auth.admin.deleteUser(user.id);
    }
  });

  const deleteItems = prisma.item.deleteMany({
    where: { authorId: { in: ids } },
  });
  const deleteCollections = prisma.collection.deleteMany({
    where: { authorId: { in: ids } },
  });
  const deleteUsers = prisma.user.deleteMany({
    where: { id: { in: ids } },
  });

  await prisma.$transaction([deleteItems, deleteCollections, deleteUsers]);
}

setup("clear", async () => {
  try {
    await clear_test_user_data();
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
});
