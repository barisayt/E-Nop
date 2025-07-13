import { test as base } from "@playwright/test";
import { SignInPage } from "../pages/sign-in-page";
import { UserManagement } from "../pages/user_management";
import { faker } from "@faker-js/faker";
import { generatePassword } from "../fakerData";

type FakerData = {
    fakerUsername: string;
    fakerEmail: string;
    fakerPassword: string;
    fakerName: string;
}

export const test = base.extend<FakerData & {
    signInPage: SignInPage;
    userManagement: UserManagement;
}>({

    // Define Fixture
    signInPage: async ({ page }, use) => {
        await use(new SignInPage(page));
    },
    userManagement: async ({ page }, use) => {
        await use(new UserManagement(page));
    },

    fakerEmail: async ({ }, use) => {
        await use(faker.internet.email());
    },

    fakerPassword: async ({ }, use) => {
        await use(generatePassword());
    },

    fakerUsername: async ({ }, use) => {
        await use(faker.internet.userName());
    },

    fakerName: async ({ }, use) => {
        await use(faker.person.fullName())
    },

});

export { expect } from '@playwright/test';