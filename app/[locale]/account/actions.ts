"use server";

import { getUserData, setToken } from "@/utils/prisma/profile";

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export async function generateToken(userId: string | null) {
  if (!userId) return "";

  const newToken = uuidv4();
  await setToken(userId, newToken);
  return newToken;
}

export async function getToken(userId: string | null) {
  if (!userId) return "";
  const userData = await getUserData(userId);
  return userData?.apiToken || "";
}
