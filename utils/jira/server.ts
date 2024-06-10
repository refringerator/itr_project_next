import "server-only";

import fetch from "node-fetch";
import {
  jiraAuthHeader,
  jiraCollectionField,
  jiraServicedeskId,
  jiraUrl,
  jiraUrlField,
  requestTypeSupport,
} from "@/constants/server";
import { FormValues } from "@/components/UserHelper";

export const createRequest = async (jiraUserId: string, values: FormValues) => {
  const bodyData = {
    raiseOnBehalfOf: jiraUserId,
    requestTypeId: requestTypeSupport,
    serviceDeskId: jiraServicedeskId,
    isAdfRequest: false,
    requestFieldValues: {
      description: values.description,
      summary: values.title,
      priority: {
        name: values.priority,
      },
      [jiraCollectionField]: values.collection,
      [jiraUrlField]: values.url,
    },
  };

  const response = await fetch(`${jiraUrl}/rest/servicedeskapi/request`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${jiraAuthHeader}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  });

  console.log("createRequest", response.status, response.statusText);
  if (response.status != 201) {
    const t = await response.text();
    console.log("createRequest response", t);
  }

  return response.status;
};

export const createCustomer = async (email: string, displayName: string) => {
  const response = await fetch(`${jiraUrl}/rest/servicedeskapi/customer`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${jiraAuthHeader}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, displayName }),
  });
  console.log("createCustomer", response.status, response.statusText);

  const data = await response.json();

  return (data as { accountId?: string }).accountId || null;
};

export const getCustomerAccoundId = async (email: string) => {
  const searchParams = new URLSearchParams({ query: email });
  const response = await fetch(
    `${jiraUrl}/rest/servicedeskapi/servicedesk/${jiraServicedeskId}/customer?${searchParams.toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${jiraAuthHeader}`,
        Accept: "application/json",
        "X-ExperimentalApi": "opt-in",
        "Content-Type": "application/json",
      },
    }
  );

  console.log("getCustomerAccoundId", response.status, response.statusText);

  const data = await response.json();

  const acc = (
    data as { values: { emailAddress: string; accountId: string }[] }
  ).values.find((d) => d.emailAddress === email);

  return acc?.accountId || null;
};

export const getIssues = async (accountId: string) => {
  if (jiraAuthHeader === "" || jiraUrl === "") return [];

  const response = await fetch(
    `${jiraUrl}/rest/api/3/search?fields=status,summary,environment,issuetype,updated,created,priority&jql=reporter = "${accountId}"`,
    {
      method: "GET",
      headers: {
        Authorization: `Basic ${jiraAuthHeader}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  console.log("getIssues", response.status, response.statusText);

  return await response.json();
};
