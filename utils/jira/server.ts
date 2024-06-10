import "server-only";

import fetch from "node-fetch";
import {
  jiraAuthHeader,
  jiraServicedeskId,
  jiraUrl,
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
    },
    form: {
      "1": {
        text: "Answer to a text form field",
      },
      "2": {
        date: "2023-07-06",
      },
      "3": {
        time: "14:35",
      },
      "4": { choices: ["5"] },
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

  return await response.text();
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
  console.log("getCustomerAccoundId", response.status, response.statusText);

  const data = await response.json();

  return (data as { accountId?: string }).accountId || null;
};

export const getCustomerAccoundId = async (email: string) => {
  const response = await fetch(
    `${jiraUrl}/rest/servicedeskapi/servicedesk/${jiraServicedeskId}/customer?query=${email}`,
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
