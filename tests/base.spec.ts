import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Collection management/);
});

test("collections page", async ({ page }) => {
  await page.goto("/collections");
  await expect(
    page.getByRole("heading", { name: "COLLECTIONS" })
  ).toBeVisible();
});

test("items page", async ({ page }) => {
  await page.goto("/items");
  await expect(page.getByRole("heading", { name: "ITEMS" })).toBeVisible();
});

test("get collection link", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Collections" }).click();
  await expect(
    page.getByRole("heading", { name: "COLLECTIONS" })
  ).toBeVisible();
});
