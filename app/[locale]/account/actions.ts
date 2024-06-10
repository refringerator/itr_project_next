"use server";

import { getUserData } from "@/utils/prisma/profile";

export async function generateToken(userId: string) {}

export async function getToken(userId: string | null) {
  if (!userId) return "";
  const userData = await getUserData(userId);
  return userData?.apiToken || "";
}
