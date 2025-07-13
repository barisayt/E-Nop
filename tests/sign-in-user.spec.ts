import { test, expect } from "../fixtures/orangeHRM-fixture";

test.use({ storageState: './general-auth.json' });

test('Sign In the Page', async ({ signInPage, page }) => {
        await signInPage.visit();
        await page.waitForTimeout(15000);
    });