import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.routeFromHAR('./tests/hars/ingredients.har', {
        url: '**/ingredients',
        update: false,
    });

    await page.routeFromHAR('./tests/hars/orders.har', {
        url: '**/orders',
        update: false,
    });

    await page.routeFromHAR('./tests/hars/user.har', {
        url: '**/auth/user',
        update: false,
    });
});

test.describe('add ingredients from list to constructor', () => {
    test('add one filling to constructor', async ({ page }) => {
        await page.goto('/');

        const testIngredient = page
            .getByTestId('mains-ingredients')
            .locator('li')
            .first();

        const name = await testIngredient.getByTestId('ingredient-name').innerText();

        await testIngredient.getByRole('button', { name: /добавить/i }).click();

        const constructorIngredient = page
            .getByTestId('constructor-ingredients')
            .locator('li')
            .first();

        await expect(
            page.getByTestId('constructor-ingredients').locator('li')
        ).toHaveCount(1);

        await expect(constructorIngredient).toContainText(name);
    });

    test('add two identical fillings to constructor', async ({ page }) => {
        await page.goto('/');

        const testIngredient = page
            .getByTestId('mains-ingredients')
            .locator('li')
            .first();

        const name = await testIngredient.getByTestId('ingredient-name').innerText();

        await testIngredient.getByRole('button', { name: /добавить/i }).click();

        await expect(
            page.getByTestId('constructor-ingredients').locator('li')
        ).toHaveCount(1);

        const constructorIngredient1 = page
            .getByTestId('constructor-ingredients')
            .locator('li')
            .first();

        await expect(constructorIngredient1).toContainText(name);

        await testIngredient.getByRole('button', { name: /добавить/i }).click();

        const constructorIngredient2 = page
            .getByTestId('constructor-ingredients')
            .locator('li')
            .nth(1);

        await expect(
            page.getByTestId('constructor-ingredients').locator('li')
        ).toHaveCount(2);

        await expect(constructorIngredient2).toContainText(name);
    });

    test('add two different fillings to constructor', async ({ page }) => {
        await page.goto('/');

        const testIngredient1 = page
            .getByTestId('mains-ingredients')
            .locator('li')
            .first();

        const name1 = await testIngredient1.getByTestId('ingredient-name').innerText();

        await testIngredient1.getByRole('button', { name: /добавить/i }).click();

        await expect(
            page.getByTestId('constructor-ingredients').locator('li')
        ).toHaveCount(1);

        const constructorIngredient1 = page
            .getByTestId('constructor-ingredients')
            .locator('li')
            .first();

        await expect(constructorIngredient1).toContainText(name1);

        const testIngredient2 = page
            .getByTestId('mains-ingredients')
            .locator('li')
            .nth(1);

        const name2 = await testIngredient2.getByTestId('ingredient-name').innerText();

        await testIngredient2.getByRole('button', { name: /добавить/i }).click();

        const constructorIngredient2 = page
            .getByTestId('constructor-ingredients')
            .locator('li')
            .nth(1);

        await expect(
            page.getByTestId('constructor-ingredients').locator('li')
        ).toHaveCount(2);

        await expect(constructorIngredient2).toContainText(name2);
    });

    test('add and replace bun', async ({ page }) => {
        await page.goto('/');

        const testIngredient1 = page
            .getByTestId('bun-ingredients')
            .locator('li')
            .first();

        const name1 = await testIngredient1.getByTestId('ingredient-name').innerText();

        await testIngredient1.getByRole('button', { name: /добавить/i }).click();

        await expect(page.getByTestId('constructor-bun-1').locator('div')).toHaveCount(
            1
        );

        await expect(page.getByTestId('constructor-bun-2').locator('div')).toHaveCount(
            1
        );

        const constructorIngredient1 = page
            .getByTestId('constructor-bun-1')
            .locator('div')
            .first();

        const constructorIngredient2 = page
            .getByTestId('constructor-bun-2')
            .locator('div')
            .first();

        await expect(constructorIngredient1).toContainText(name1);

        await expect(constructorIngredient2).toContainText(name1);

        const testIngredient2 = page.getByTestId('bun-ingredients').locator('li').nth(1);

        const name2 = await testIngredient2.getByTestId('ingredient-name').innerText();

        await testIngredient2.getByRole('button', { name: /добавить/i }).click();

        await expect(page.getByTestId('constructor-bun-1').locator('div')).toHaveCount(
            1
        );

        await expect(page.getByTestId('constructor-bun-2').locator('div')).toHaveCount(
            1
        );

        await expect(constructorIngredient1).toContainText(name2);

        await expect(constructorIngredient2).toContainText(name2);
    });
});

test.describe('modal window works', () => {
    test('open modal window', async ({ page }) => {
        await page.goto('/');

        const testIngredient1 = page
            .getByTestId('mains-ingredients')
            .locator('li')
            .first();

        await testIngredient1.locator('a').first().click();

        const modal = page.getByTestId('modal');

        await expect(modal).toHaveCount(1);

        await expect(modal.getByTestId('ingredient-title')).toHaveText(
            await testIngredient1.getByTestId('ingredient-name').innerText()
        );

        await modal.locator('button').first().click();

        const testIngredient2 = page
            .getByTestId('mains-ingredients')
            .locator('li')
            .nth(1);

        await testIngredient2.locator('a').first().click();

        await expect(modal).toHaveCount(1);

        await expect(modal.getByTestId('ingredient-title')).toHaveText(
            await testIngredient2.getByTestId('ingredient-name').innerText()
        );
    });

    test('close modal window on close icon click', async ({ page }) => {
        await page.goto('/');

        const testIngredient = page
            .getByTestId('mains-ingredients')
            .locator('li')
            .first();

        await testIngredient.locator('a').first().click();

        const modal = page.getByTestId('modal');

        await expect(modal).toHaveCount(1);

        await modal.locator('button').first().click();

        await expect(modal).toHaveCount(0);
    });

    test('close modal window on overlay click', async ({ page }) => {
        await page.goto('/');

        const testIngredient = page
            .getByTestId('mains-ingredients')
            .locator('li')
            .first();

        await testIngredient.locator('a').first().click();

        const modal = page.getByTestId('modal');

        await expect(modal).toHaveCount(1);

        await page.getByTestId('modal-overlay').click({ position: { x: 0, y: 0 } });

        await expect(modal).toHaveCount(0);
    });
});

test('place order', async ({ context, page }) => {
    await page.addInitScript(() => {
        localStorage.setItem('refreshToken', 'refreshToken');
    });

    await context.addCookies([
        {
            name: 'accessToken',
            value: 'Bearer accessToken',
            domain: 'localhost',
            path: '/',
        },
    ]);

    await page.routeFromHAR('./tests/hars/place-order-user.har', {
        url: '**/auth/user',
        update: false,
        notFound: 'abort',
    });
    
    await page.routeFromHAR('./tests/hars/place-order.har', {
        url: '**/orders',
        update: false,
        notFound: 'fallback',
    });

    await page.goto('/');

    const testIngredient1 = page.getByTestId('mains-ingredients').locator('li').first();

    await testIngredient1.getByRole('button', { name: /добавить/i }).click();

    const testIngredient2 = page.getByTestId('bun-ingredients').locator('li').first();

    await testIngredient2.getByRole('button', { name: /добавить/i }).click();

    await page.getByTestId('order-summ').getByRole('button').click();

    const modal = page.getByTestId('modal');

    await expect(modal).toHaveCount(1);

    await expect(modal.getByTestId('order-number')).toContainText('200');

    await expect(page.getByTestId('constructor-bun-1')).toHaveCount(0);

    await expect(
        page.getByTestId('constructor-ingredients').locator('li').first()
    ).toContainText('Выберите начинку');

    await expect(page.getByTestId('constructor-bun-2')).toHaveCount(0);

    await modal.locator('button').first().click();

    await expect(modal).toHaveCount(0);
});
