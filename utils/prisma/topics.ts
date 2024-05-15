import { prisma } from "@/utils/prisma";

export const getTopics = () => prisma.topic.findMany();
