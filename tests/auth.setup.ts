import { test as setup, expect } from "@playwright/test";

const email = "test@example.com";
const pass = "123123";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  await page.goto("/signin/password_signin");

  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(pass);
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page.getByText("Success!")).toBeVisible();
  await expect(page.getByText("You are now signed in.")).toBeVisible();

  await page.context().storageState({ path: authFile });
});
