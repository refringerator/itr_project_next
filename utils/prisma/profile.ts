import { prisma } from "@/utils/prisma";

export const getUserData = (userId: string) =>
  prisma.user.findUnique({ where: { id: userId } });

export const setUserJiraId = (userId: string, jiraUserId: string) =>
  prisma.user.updateMany({ data: { jiraUserId }, where: { id: userId } });
