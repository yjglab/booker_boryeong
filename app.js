import dotenv from "dotenv";
import reserveDeck from "./reserveDeck.js";
import reserveCamp from "./reserveCamp.js";

dotenv.config();

async function launchApp() {
  const reservePromises = await Promise.allSettled([
    reserveDeck(),
    reserveCamp(),
  ]);
}

await launchApp();

// https://github.com/yjglab/camp-booker
