import { defineConfig } from "cypress";

export default defineConfig({
  viewportHeight: 1000,
  viewportWidth: 1280,
  e2e: {
    baseUrl: process.env.CY_BASE_URL,
    chromeWebSecurity: false,
  },

  watchForFileChanges: true,
  env: {
    NEXT_MONTH: true,
    VIEWPORT_WIDTH_BP_MOBILE: 414,
    USER_NAME: process.env.CY_USER_NAME,
    USER_PHONE_MID: process.env.CY_USER_PHONE_MID,
    USER_PHONE_END: process.env.CY_USER_PHONE_END,
    USER_CITY: process.env.CY_USER_CITY,
    USER_DISTRICT: process.env.CY_USER_DISTRICT,
    STAY: process.env.CY_STAY,
    DAY: process.env.CY_DAY,
  },
});
