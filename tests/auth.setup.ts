import { test as setup, expect } from "@playwright/test";

const email = Math.random().toString(16).slice(2, 10) + "@test.com";
const pass = "123123";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  await page.goto("/signin/signup");
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Password").fill(pass);
  await page.getByRole("button", { name: "Sign up" }).click();

  await expect(page.getByText("Success!")).toBeVisible();
  await expect(page.getByText("You are now signed in.")).toBeVisible();

  // await page.getByRole("button", { name: "Sign out" }).click();
  await page.locator("img").click();
  await page.getByRole("button", { name: "logout Sign out" }).click();

  await page.goto("/signin/password_signin");
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Password").fill(pass);
  await page.getByRole("button", { name: "Sign in" }).click();

  await expect(page.getByText("Success!")).toBeVisible();
  await expect(page.getByText("You are now signed in.")).toBeVisible();

  await page.context().storageState({ path: authFile });
});
