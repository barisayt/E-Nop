import { BeforeAll, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { CustomWorld } from './world';
import { saveGeneralAuthState } from '../auth-setup-hook';


setDefaultTimeout(60 * 1000);

BeforeAll(async function () {
    await saveGeneralAuthState();
});

Before(async function () {
    await (this as CustomWorld).init();
});

After(async function () {
  await (this as CustomWorld).close();
})