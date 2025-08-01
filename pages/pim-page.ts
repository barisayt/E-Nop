import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class PimPage extends BasePage {
    readonly page: Page;
    readonly pimMenu: Locator;
    readonly photoInput: Locator;
    readonly successMessage: Locator;
    readonly employeeId: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.pimMenu = page.getByRole('link', { name: 'PIM' });
        this.photoInput = page.locator('input[type="file"]');
        this.successMessage = page.getByText('Success', { exact: true });
        this.employeeId = page.getByRole('textbox').nth(4);
    }

async gotoPimSection() {
    await this.pimMenu.click();
  }

  async addEmployeeWithPhoto(firstName: string, lastName: string, photoPath: string) {
    const randomNum = Math.floor(Math.random() * (9999 - 111 + 1)) + 111;
    await this.addButton.click();
    await this.employeeId.fill(randomNum.toString());
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.photoInput.setInputFiles(photoPath);
    await this.saveButton.click();
  }
} 