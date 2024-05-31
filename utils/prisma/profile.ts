import { prisma } from "@/utils/prisma";

export const getUserData = (userId: string) =>
  prisma.user.findUnique({ where: { id: userId } });
