"use server";

import {
  createCustomer,
  createRequest,
  getCustomerAccoundId,
} from "@/utils/jira/server";
import { getUserData, setUserJiraId } from "@/utils/prisma/profile";

export async function createCustomerRequest(userId: string, userEmail: string) {
  if (!userId) return;

  const userData = await getUserData(userId);

  if (!userData) return;

  let jiraUserId = userData.jiraUserId;
  if (!jiraUserId) {
    jiraUserId = await createCustomer(userEmail, userData.name || "Customer");
    if (!jiraUserId) jiraUserId = await getCustomerAccoundId(userEmail);

    if (jiraUserId) await setUserJiraId(userId, jiraUserId);
  }
  if (!jiraUserId) return;
  return await createRequest(jiraUserId);
}
