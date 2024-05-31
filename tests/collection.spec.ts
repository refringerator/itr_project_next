import { test, expect } from "@playwright/test";

const collection = {
  title: "Test collection",
  topic: "Rants",
  desc1: "first description",
  desc2: "updated description",
};

test("test", async ({ page }) => {
  await page.goto("/");

  // Go to collections
  await page.getByRole("link", { name: "Collections" }).click();
  await expect(
    page.getByRole("link", { name: "Create new collection" })
  ).toBeVisible();

  // Go to Create new collection form
  await page.getByRole("link", { name: "Create new collection" }).click();

  // All element visible
  await expect(page.getByText("Topic")).toBeVisible();
  await expect(page.getByText("Description")).toBeVisible();
  await expect(page.getByRole("button", { name: "Create" })).toBeVisible();
  await page.getByLabel("Topic").click();
  await expect(
    page.locator(
      ".ant-form-item-control-input-content > .ant-select > .ant-select-selector"
    )
  ).toBeVisible();
  await page.getByLabel("Topic").click();
  await expect(page.getByText("Rants")).toBeVisible();

  // Fill form and submit
  await page.getByLabel("Title").fill(collection.title);

  await page.getByLabel("Topic").click();
  await page.getByTitle("Rants").click();

  await page
    .getByPlaceholder("Something about collection")
    .fill(collection.desc1);
  await page.getByRole("button", { name: "Create" }).click();

  // Check creation
  await expect(page.getByText(/New collection .+? created!/)).toBeVisible();
  await expect(page.getByText(collection.title)).toBeVisible();
  await expect(page.getByText(collection.topic)).toBeVisible();
  await expect(page.getByText(new RegExp(collection.desc1))).toBeVisible();
  await expect(page.getByRole("link", { name: "Edit" })).toBeVisible();

  // Edit collection
  await page.getByRole("link", { name: "Edit" }).click();
  await expect(
    page.getByRole("heading", { name: "Edit collection or delete it" })
  ).toBeVisible();
  await expect(page.getByText("Title")).toBeVisible();
  await expect(page.getByText("Topic")).toBeVisible();
  await expect(page.getByText("Description", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Title")).toBeVisible();
  await page.getByPlaceholder("Something about collection").click();
  await page
    .getByPlaceholder("Something about collection")
    .fill(collection.desc2);
  await expect(page.getByRole("button", { name: "Update" })).toBeVisible();

  // Check update
  await page.getByRole("button", { name: "Update" }).click();
  await expect(page.getByText(/Collection .+? updated!/)).toBeVisible();
  await expect(page.getByText(new RegExp(collection.desc2))).toBeVisible();

  // Delete
  await page.getByRole("link", { name: "Edit" }).click();
  await expect(
    page.getByRole("button", { name: "or delete it" })
  ).toBeVisible();
  await page.getByRole("button", { name: "or delete it" }).click();
  await page.getByRole("button", { name: "Yes" }).click(); // popconfirm
  // Check delete
  await expect(page.getByText(/Collection .+? deleted!/)).toBeVisible();
  // TODO: run on empty db and check existing by title
});
