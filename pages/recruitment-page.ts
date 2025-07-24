import { Page, Locator } from '@playwright/test';
import { BasePage } from './base-page';

export class RecruitmentPage extends BasePage{
  readonly page: Page;
  readonly recruitmentMenu: Locator;
  readonly emailInput: Locator;
  readonly dateOfApplicationInput: Locator;
  readonly toDateInput: Locator;
  readonly calendarDay: (day: number) => Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.recruitmentMenu = page.getByRole('link', { name: 'Recruitment' });
    this.emailInput = page.getByRole('textbox', { name: 'Type here' }).first();         // Update as needed
    this.dateOfApplicationInput = page.getByRole('textbox', { name: 'yyyy-dd-mm' }); // Update as needed
    this.toDateInput = page.locator('input[name="toDate"]'); // Update as needed
    this.calendarDay = (day: number) => page.locator(`//div[contains(@class, 'oxd-calendar-date') and text()='${day}']`);
    this.successMessage = page.getByText('Success', { exact: true });
  }

  async gotoRecruitmentSection() {
    await this.recruitmentMenu.click();
  }

  async addApplicationWithCalendar(firstName: string, lastName: string, email: string, today: Date) {
    await this.addButton.click();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);

    // Pick today's date
    await this.dateOfApplicationInput.click();
    await this.calendarDay(today.getDate()).click();

    /* // Pick "to" date (7 days from today)
    await this.toDateInput.click();
    await this.calendarDay(toDate.getDate()).click(); */

    await this.saveButton.click();
  }
}