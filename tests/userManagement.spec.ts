import { test, expect } from "../fixtures/orangeHRM-fixture";
import { faker } from "@faker-js/faker";

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
  await userManagement.addingUserRole();
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
  await userManagement.buttonInText('Save').click();
  await expect(userManagement.successMessage).toBeVisible();
});

/* test('Add Member with ESS Role', async ({ signInPage, page }) => {

}); */

/* test('Adding Member without Filling required fields @Negative', async ({ signInPage, page }) => {
#eb0910 BorderColor
}); */
/* test('Adding Member without Filling Required Fields @Negative', async ({ userManagement }) => {
await userManagement.addMemberAdminRole();
  await userManagement.saveButton.click();

  await expect(
    userManagement.userRole.evaluate(el => getComputedStyle(el).borderColor)
  ).resolves.toBe('rgb(235, 9, 16)');

  await expect(
    userManagement.status.evaluate(el => getComputedStyle(el).borderColor)
  ).resolves.toBe('rgb(235, 9, 16)');
}); */

