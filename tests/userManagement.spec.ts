import { userInfo } from "os";
import { test, expect } from "../fixtures/orangeHRM-fixture";
import { faker } from "@faker-js/faker";
import { UserManagement } from "../pages/user_management";

test.use({ storageState: './general-auth.json' });

test.beforeEach(async ({ signInPage, userManagement }) => {
  await signInPage.authorizedUserLogin();
  await userManagement.addButtonForUser();
})

//Test has been closed due to UI refreshes so quickly and deletes all created users.
/* test.afterEach(async ({ signInPage, userManagement, fakerUsername }) => {
  await userManagement.adminButton.click();
  await userManagement.cleanCreatedUserRecords(fakerUsername).click();
  await userManagement.confirmDeletion.click();
}) */

test('Add Member with Admin Role @smoke', async ({ page, userManagement, fakerUsername, fakerName, fakerPassword }) => {
  await userManagement.addingUserRoleAsAdmin();
  //Required Employee name already in the system. Admin name is the best option. 
  await userManagement.addingEmployeeName('a');
  //Wait for list of employees
  await userManagement.listOfEmployees.waitFor({ state: 'visible' });
  //Wait for first employee is visible
  await userManagement.selectFirstEmployee.waitFor({ state: 'visible' });
  //DOM structure is unreliable due to element is hidden but clickable.
  await page.waitForTimeout(1000);
  await expect(userManagement.selectFirstEmployee).toBeVisible({ timeout: 5000 });
  //Click on first employee in the list
  await userManagement.selectFirstEmployee.click();
  await userManagement.selectStatusOption();
  await userManagement.setUserNameAndPassword(fakerUsername, fakerPassword, fakerPassword);
  await userManagement.saveButton.click();
  await expect(userManagement.successMessage).toBeVisible();
});

test('Add Member with ESS Role', async ({ page, userManagement, fakerUsername, fakerName, fakerPassword }) => {
  await userManagement.addingUserRoleAsESS();
  //Required Employee name already in the system. Admin name is the best option. 
  await userManagement.addingEmployeeName('a');
  //Wait for list of employees
  await userManagement.listOfEmployees.waitFor({ state: 'visible' });
  //Wait for first employee is visible
  await userManagement.selectFirstEmployee.waitFor({ state: 'visible' });
  //DOM structure is unreliable due to element is hidden but clickable.
  await page.waitForTimeout(1000);
  await expect(userManagement.selectFirstEmployee).toBeVisible({ timeout: 5000 });
  //Click on first employee in the list
  await userManagement.selectFirstEmployee.click();
  await userManagement.selectStatusOption();
  await userManagement.setUserNameAndPassword(fakerUsername, fakerPassword, fakerPassword);
  await userManagement.saveButton.click();
  await expect(userManagement.successMessage).toBeVisible();
});

test.describe('Password Validation', () => {
  test('Add Member with Admin Role - Password Min Length', async ({ page, userManagement, fakerUsername, fakerName }) => {
    const minPassword = 'a1' + 'b'.repeat(5); // 7 chars
    await userManagement.addingUserRoleAsAdmin();
    await userManagement.addingEmployeeName('a');
    await userManagement.listOfEmployees.waitFor({ state: 'visible' });
    await userManagement.selectFirstEmployee.waitFor({ state: 'visible' });
    await page.waitForTimeout(1000);
    await expect(userManagement.selectFirstEmployee).toBeVisible({ timeout: 5000 });
    await userManagement.selectFirstEmployee.click();
    await userManagement.selectStatusOption();
    await userManagement.setUserNameAndPassword(fakerUsername, minPassword, minPassword);
    await userManagement.saveButton.click();
    await expect(userManagement.successMessage).toBeVisible();
  });

  test('Add Member with Admin Role - Password Below Min Length', async ({ page, userManagement, fakerUsername, fakerName }) => {
    const shortPassword = 'a1b'.repeat(2); // 6 chars
    await userManagement.addingUserRoleAsAdmin();
    await userManagement.addingEmployeeName('a');
    await userManagement.listOfEmployees.waitFor({ state: 'visible' });
    await userManagement.selectFirstEmployee.waitFor({ state: 'visible' });
    await page.waitForTimeout(1000);
    await expect(userManagement.selectFirstEmployee).toBeVisible({ timeout: 5000 });
    await userManagement.selectFirstEmployee.click();
    await userManagement.selectStatusOption();
    await userManagement.setUserNameAndPassword(fakerUsername, shortPassword, shortPassword);
    await userManagement.saveButton.click();
    // Expect an error message or validation (update selector as needed)
    await expect(page.locator('text=Should have at least 7 characters')).toBeVisible();
  });

  test('Add Member with Admin Role - Password Max Length', async ({ page, userManagement, fakerUsername, fakerName }) => {
    const maxPassword = 'a1' + 'b'.repeat(62); // 64 chars
    await userManagement.addingUserRoleAsAdmin();
    await userManagement.addingEmployeeName('a');
    await userManagement.listOfEmployees.waitFor({ state: 'visible' });
    await userManagement.selectFirstEmployee.waitFor({ state: 'visible' });
    await page.waitForTimeout(1000);
    await expect(userManagement.selectFirstEmployee).toBeVisible({ timeout: 5000 });
    await userManagement.selectFirstEmployee.click();
    await userManagement.selectStatusOption();
    await userManagement.setUserNameAndPassword(fakerUsername, maxPassword, maxPassword);
    await userManagement.saveButton.click();
    await expect(userManagement.successMessage).toBeVisible();
  });

  test('Add Member with Admin Role - Password Above Max Length', async ({ page, userManagement, fakerUsername, fakerName }) => {
    const longPassword = 'a1' + 'b'.repeat(63); // 65 chars
    await userManagement.addingUserRoleAsAdmin();
    await userManagement.addingEmployeeName('a');
    await userManagement.listOfEmployees.waitFor({ state: 'visible' });
    await userManagement.selectFirstEmployee.waitFor({ state: 'visible' });
    await page.waitForTimeout(1000);
    await expect(userManagement.selectFirstEmployee).toBeVisible({ timeout: 5000 });
    await userManagement.selectFirstEmployee.click();
    await userManagement.selectStatusOption();
    await userManagement.setUserNameAndPassword(fakerUsername, longPassword, longPassword);
    await userManagement.saveButton.click();
    // Expect an error message or validation (update selector as needed)
    await expect(page.getByText('Should not exceed 64')).toBeVisible();
  });
});

