import { faker } from '@faker-js/faker';

export function generatePassword(): string {
    const lowercase = faker.string.alpha({ length: 1 }).toLowerCase();
    const number = faker.number.int({ min: 0, max: 9 }).toString();

    const restLength = faker.number.int({ min: 5, max: 61 }); // total length between 7-63
    let rest = '';

    for (let i = 0; i < restLength; i++) {
        // 50% chance to pick number or letter
        const isNumber = Math.random() < 0.5;
        if (isNumber) {
            rest += faker.number.int({ min: 0, max: 9 }).toString();
        } else {
            rest += faker.string.alpha({ length: 1 }).toLowerCase();
        }
    }

    const password = lowercase + number + rest;
    return password;
}