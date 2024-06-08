"use server";

import { createCustomer, createRequest } from "@/utils/jira/server";
import { getUserData, setUserJiraId } from "@/utils/prisma/profile";

export async function createCustomerRequest(userId: string, userEmail: string) {
  const userData = await getUserData(userId);

  if (!userData) return;

  let jiraUserId = userData.jiraUserId;
  if (!jiraUserId) {
    jiraUserId = await createCustomer(userEmail, userData.name || "Customer");
    if (jiraUserId) setUserJiraId(userId, jiraUserId);
  }
  if (!jiraUserId) return;
  return await createRequest(jiraUserId);
}
