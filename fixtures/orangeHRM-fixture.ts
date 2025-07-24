import { test as base } from "@playwright/test";
import { SignInPage } from "../pages/sign-in-page";
import { UserManagement } from "../pages/user_management";
import { faker } from "@faker-js/faker";
import { generatePassword } from "../fakerData";
import { PimPage } from "../pages/pim-page";
import { BasePage } from "../pages/base-page";
import { RecruitmentPage } from "../pages/recruitment-page";

type FakerData = {
    fakerUsername: string;
    fakerEmail: string;
    fakerPassword: string;
    fakerName: string;
    fakerFirstName: string;
    fakerLastName: string;
}

export const test = base.extend<FakerData & {
    signInPage: SignInPage;
    userManagement: UserManagement;
    pimPage: PimPage;
    basePage: BasePage;
    recruitmentPage: RecruitmentPage;
}>({

    // Define Fixture
    signInPage: async ({ page }, use) => {
        await use(new SignInPage(page));
    },
    userManagement: async ({ page }, use) => {
        await use(new UserManagement(page));
    },

    pimPage: async ({ page }, use) => {
        await use(new PimPage(page));
    },

    basePage: async ({ page }, use) => {
        await use(new BasePage(page));
    },

    recruitmentPage: async ({ page }, use) => {
        await use(new RecruitmentPage(page))
    },

    fakerEmail: async ({ }, use) => {
        await use(faker.internet.email());
    },

    fakerPassword: async ({ }, use) => {
        await use(generatePassword());
    },

    fakerUsername: async ({ }, use) => {
        await use(faker.internet.username());
    },

    fakerName: async ({ }, use) => {
        await use(faker.person.fullName())
    },

    fakerFirstName: async ({ }, use) => {
        await use(faker.person.firstName())
    },

    fakerLastName: async ({ }, use) => {
        await use(faker.person.lastName())
    },

});

export { expect } from '@playwright/test';