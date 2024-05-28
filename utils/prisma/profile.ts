import { prisma } from "@/utils/prisma";

export const getUsername = (userId: string) =>
  prisma.user.findUnique({ where: { id: userId } });
