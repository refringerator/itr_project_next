"use server";

import { FormValues } from "@/components/UserHelper";
import { getSupabaseUserOrRedirect } from "@/utils/auth-helpers/server";
import {
  createCustomer,
  createRequest,
  getCustomerAccoundId,
  getIssues,
} from "@/utils/jira/server";
import { getCollection } from "@/utils/prisma/collections";
import { getItem } from "@/utils/prisma/items";
import { getUserData, setUserJiraId } from "@/utils/prisma/profile";

export async function createCustomerRequest(
  userId: string,
  userEmail: string,
  values: FormValues
) {
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

  let collection = "";
  if (values.collectionId) {
    const res = await getCollection(parseInt(values.collectionId));
    if (res) collection = res.title;
  } else if (values.itemId) {
    const res = await getItem(parseInt(values.itemId));
    if (res) collection = res.collection.title;
  }

  const v = { ...values, collection: collection };

  return await createRequest(jiraUserId, v);
}

export async function getUserIssues() {
  const user = await getSupabaseUserOrRedirect("/");
  const userData = await getUserData(user.id);

  if (!userData?.jiraUserId) return undefined;

  return await getIssues(userData.jiraUserId);
}
