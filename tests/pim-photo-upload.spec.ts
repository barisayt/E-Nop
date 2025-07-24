import { test, expect } from '../fixtures/orangeHRM-fixture';
import path from 'path';

test.use({ storageState: './general-auth.json' });

test.beforeEach(async ({ signInPage }) => {
    await signInPage.authorizedUserLogin();
  });

// Use a sample PNG from allure-results as the photo
const photoPath = path.resolve(__dirname, '../assets/binaryIT.jpg');

test('Add Employee with Photo in PIM section', async ({ pimPage, fakerFirstName, fakerLastName  }) => {
  await pimPage.gotoPimSection(); // Getting in the PIM page
  await pimPage.addEmployeeWithPhoto(fakerFirstName, fakerLastName, photoPath); //Adding first name, last name and photo using faker class
  await expect(pimPage.successMessage).toBeVisible(); //Ensure success message is shown and created the photo.
}); 