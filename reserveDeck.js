import { default as pt } from "puppeteer";

export default async function reserveDeck() {
  const browser = await pt.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto(process.env.RSV_MAIN_PAGE);
  await page.setViewport({ width: 600, height: 900 });

  const deckSltr = await page.waitForSelector(".btn-box .sbtn_1");
  deckSltr.click();

  const nextMonthSltr = await page.waitForSelector('button[class="next"]');

  const getTableMonth = async () => {
    return await (
      await page.waitForSelector(".month")
    )?.evaluate((el) => el.textContent);
  };

  while (!(await getTableMonth()).includes(process.env.RSV_TG_MONTH)) {
    await nextMonthSltr.click();
  }

  const staySltr = await page.waitForSelector(
    `#change_stay${process.env.RSV_DECK_STAY}`
  );
  await staySltr.click();

  const dayButtons = await page.$$(".facility_btn");
  for (const dayButton of dayButtons) {
    const dayButtonText = await dayButton.evaluate((el) => el.textContent);

    if (dayButtonText.includes(process.env.RSV_TG_DAY)) {
      if (!dayButtonText.includes("예약가능")) {
        alert("이 일정에 예약할 수 없음");
      } else {
        await dayButton.click();
      }
      break;
    }
  }

  await page.waitForNavigation();

  const deckRsvRows = await page.$$("tr");
  for (const row of deckRsvRows) {
    const deckRsvRowText = await row.evaluate((el) => el.textContent);
    if (deckRsvRowText.includes(process.env.RSV_TG_DECK)) {
      const deckRsvButton = await row.$(".res_btn");
      await deckRsvButton.click();
      break;
    }
  }

  await page.waitForNavigation();

  const agreeCheckButtons = await page.$$(".agree_check");
  for (const agreeCheckButton of agreeCheckButtons) {
    await agreeCheckButton.click();
  }

  const rsvUserNameInput = await page.$("#res_name");
  await rsvUserNameInput.type(process.env.RSV_USER_NAME);

  const rsvPhoneMidInput = await page.$("#tel_2");
  await rsvPhoneMidInput.type(process.env.RSV_USER_PHONE_MID);

  const rsvPhoneLstInput = await page.$("#tel_3");
  await rsvPhoneLstInput.type(process.env.RSV_USER_PHONE_LST);

  await page.select(`select[name="res_add"`, process.env.RSV_USER_CITY);
  await page.select(`select[name="res_add_1"`, process.env.RSV_USER_LOCAL);

  (await page.$("#captchacode")).focus();

  // await browser.close();
}

// const rsvUserCountInput = await page.$("#res_qty");
// await rsvUserCountInput.click({ clickCount: 3 });
// await page.keyboard.press("Backspace");
// await rsvUserCountInput.type(process.env.RSV_USER_COUNT);
