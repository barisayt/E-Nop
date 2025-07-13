import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from './world';
import { Locator, test, expect } from '@playwright/test';

Given('I am logged in as an authorized user', async function () {
    await this.signInPage.authorizedUserLogin();
});

Given('I am on the user management add user page', async function () {
    await this.userManagement.addButtonForUser();
});

When('I select the admin user role', async function () {
    await this.userManagement.addingUserRole();
});

When('I enter the employee name "a"', async function () {
    await this.userManagement.addingEmployeeName('a');
    await this.userManagement.listOfEmployees.waitFor({ state: 'visible' });
    await this.userManagement.selectFirstEmployee.waitFor({ state: 'visible' });
});

When('I select the first employee from the list', async function () {
    await this.page.waitForTimeout(2000);
    await this.userManagement.selectFirstEmployee.click();
});

When('I select the status "Enabled"', async function () {
    await this.userManagement.selectStatusOption();
});

When('I set a valid username and password', async function () {
    await this.userManagement.setUserNameAndPassword(this.username, this.password, this.password);
});

Then('I save the new user and I should see a success message', async function () {
    await this.userManagement.buttonInText('Save').click();
    await expect(this.userManagement.successMessage).toBeVisible();
});