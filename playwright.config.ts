import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  timeout: 1000 * 60 * 60,
  webServer: {
    command: "npm run build && npm run preview",
    port: 4173,
    timeout: 1000 * 60 * 60
  },
  testDir: "tests"
};

export default config;
