import { chromium } from '@playwright/test';
import { SignInPage } from './pages/sign-in-page';
import * as dotenv from 'dotenv';
dotenv.config();

export async function saveGeneralAuthState() {
    const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  const signInPage = new SignInPage(page);

  await signInPage.visit();
    await signInPage.signInUser(`${process.env.TEST_EMAIL}`,`${process.env.TEST_PASSWORD}`);
    await page.waitForURL('**/dashboard/index')

    await context.storageState({ path: './general-auth.json'});
    await browser.close();
}
