"use server";

import { getSupabaseUserOrRedirect } from "@/utils/auth-helpers/server";
import {
  createCustomer,
  createRequest,
  getCustomerAccoundId,
  getIssues,
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

export async function getUserIssues() {
  const user = await getSupabaseUserOrRedirect("/");
  const userData = await getUserData(user.id);

  if (!userData?.jiraUserId) return undefined;

  return await getIssues(userData.jiraUserId);
}
