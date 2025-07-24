import { test, expect } from '../fixtures/orangeHRM-fixture';

test.use({ storageState: './general-auth.json' });

test.beforeEach(async ({ signInPage }) => {
    await signInPage.authorizedUserLogin();
  });

test('Recruitment: Add application with today and 7 days from today', async ({ recruitmentPage, fakerFirstName, fakerLastName, fakerEmail }) => {
  await recruitmentPage.gotoRecruitmentSection();

  const today = new Date();

  await recruitmentPage.addApplicationWithCalendar(
    fakerFirstName,
    fakerLastName,
    fakerEmail,
    today,
  );

  await expect(recruitmentPage.successMessage).toBeVisible();
});

/* test('Recruitment: Add application with today and 7 days from today', async ({ recruitmentPage, fakerFirstName, fakerLastName, fakerEmail }) => {
  await recruitmentPage.gotoRecruitmentSection();

  const today = new Date();
  const toDate = new Date();
  toDate.setDate(today.getDate() + 25);

  await recruitmentPage.addApplicationWithCalendar(
    fakerFirstName,
    fakerLastName,
    fakerEmail,
    today,
    toDate
  );

  await expect(recruitmentPage.successMessage).toBeVisible();
}); */