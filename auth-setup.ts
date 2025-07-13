import { test, expect } from "./fixtures/orangeHRM-fixture";

test('StorageState for general testing account', async ({ page, signInPage }) => {
    await signInPage.visit();
    await signInPage.signInUser(`${process.env.TEST_EMAIL}`,`${process.env.TEST_PASSWORD}`);
    await page.waitForURL('**/dashboard/index')

    await page.context().storageState({ path: './general-auth.json'});
});