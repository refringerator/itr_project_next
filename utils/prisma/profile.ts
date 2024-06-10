import { prisma } from "@/utils/prisma";

export const getUserData = (userId: string) =>
  prisma.user.findUnique({ where: { id: userId } });

export const setUserJiraId = (userId: string, jiraUserId: string) =>
  prisma.user.updateMany({ data: { jiraUserId }, where: { id: userId } });

export const getUsersByToken = (token: string) =>
  prisma.user.findMany({ where: { apiToken: { equals: token } } });

export const setToken = (userId: string, apiToken: string) =>
  prisma.user.updateMany({ data: { apiToken }, where: { id: userId } });
