import "server-only";

import fetch from "node-fetch";
import { jiraAuthHeader, jiraUrl } from "@/constants/server";

export const createRequest = async (jiraUserId: string) => {
  const bodyData = {
    raiseOnBehalfOf: jiraUserId,
    requestTypeId: "6",
    serviceDeskId: "1",
    isAdfRequest: false,
    requestFieldValues: {
      description: "I need a new *mouse* for my Mac",
      summary: "Request JSD help via REST",
    },
  };
  //   `{
  //     "form": {
  //         "answers": {
  //             "1": {
  //                 "text": "Answer to a text form field"
  //             },
  //             "2": {
  //                 "date": "2023-07-06"
  //             },
  //             "3": {
  //                 "time": "14:35"
  //             },
  //             "4": { "choices": ["5"] }
  //         }
  //     },
  //     "isAdfRequest": false,
  //     "requestFieldValues": {
  //         "description": "I need a new *mouse* for my Mac",
  //         "summary": "Request JSD help via REST"
  //     },
  //     "raiseOnBehalfOf": "${jiraUserId}",
  //     "requestTypeId": "6",
  //     "serviceDeskId": "1"
  //   }`;

  fetch(`${jiraUrl}/rest/servicedeskapi/request`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${jiraAuthHeader}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  })
    .then((response) => {
      console.log(`Jira Response: ${response.status} ${response.statusText}`);
      return response.text();
    })
    .then((text) => console.log(text))
    .catch((err) => console.error(err));
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
  const data = await response.json();

  return (data as { accountId?: string }).accountId || null;
};
