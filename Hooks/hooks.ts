import { BeforeAll, Before, After, setDefaultTimeout, ITestCaseHookParameter, Status } from '@cucumber/cucumber';
import { CustomWorld } from '../Steps/world';
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
});