import { Page, Locator } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    readonly matchButtonByText: (
        text: string,
        options?: {
            match?: 'exact' | 'normalize' | 'contains' | 'starts-with' | 'attribute';
            attributeName?: string;
        }
    ) => Locator;
    readonly buttonInText: (text: string) => Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;

    constructor(page: Page) {
        this.page = page;
        this.matchButtonByText = (
            text: string,
            options?: {
                match?: 'exact' | 'normalize' | 'contains' | 'starts-with' | 'attribute';
                attributeName?: string; // for match: 'attribute'
            }
        ) => {
            const matchType = options?.match ?? 'normalize';

            switch (matchType) {
                case 'exact':
                    return page.locator(`//button[text()='${text}']`);

                case 'normalize':
                    return page.locator(`//button[normalize-space()='${text}']`);

                case 'contains':
                    return page.locator(`//button[contains(normalize-space(), '${text}')]`);

                case 'starts-with':
                    return page.locator(`//button[starts-with(normalize-space(), '${text}')]`);

                case 'attribute': {
                    const attr = options?.attributeName ?? 'value';
                    return page.locator(`//button[@${attr}='${text}']`);
                }

                default:
                    throw new Error(`Unsupported match type: ${matchType}`);
            }
        };
        this.buttonInText = (text: string) => page.getByRole('button', { name: text });
        this.firstNameInput = page.locator('input[name="firstName"]'); // Update as needed
        this.lastNameInput = page.locator('input[name="lastName"]');
    }

    get addButton() {
        return this.matchButtonByText('Add');
    }

    get saveButton() {
        return this.matchButtonByText('Save');
    }

    get logInButton() {
        return this.matchButtonByText('Login');
    }

    get confirmDeletion() {
        return this.matchButtonByText('Yes, Delete');
    }
}