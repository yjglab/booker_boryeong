import { default as pt } from "puppeteer";
import dotenv from "dotenv";

async function launchApp() {
  const browser = await pt.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(process.env.RSV_MAIN_PAGE);
  await page.setViewport({ width: 600, height: 900 });

  const deckSltr = await page.waitForSelector(".btn-box .sbtn_1");
  const campSltr = await page.waitForSelector(".btn-box .sbtn_2");
  deckSltr.click();

  const nextMonthSltr = await page.waitForSelector('button[class="next"]');

  const getCurrentMonth = async () => {
    return await (
      await page.waitForSelector(".month")
    )?.evaluate((el) => el.textContent);
  };

  while ((await getCurrentMonth()) !== process.env.TG_MONTH) {
    await nextMonthSltr.click();
  }

  const stay2Sltr = await page.waitForSelector("#change_stay2");
  await stay2Sltr.click();

  const dayButtons = await page.$$(".facility_btn");
  for (const dayButton of dayButtons) {
    const dayButtonText = await dayButton.evaluate((el) => el.textContent);

    if (dayButtonText.includes(process.env.TG_DAY)) {
      if (!dayButtonText.includes("예약가능")) {
        alert("이 일정에 예약할 수 없음");
      } else {
        await dayButton.click();
      }
      break;
    }
  }

  return;
  await browser.close();
}

dotenv.config();
await launchApp();

// https://github.com/yjglab/camp-booker
