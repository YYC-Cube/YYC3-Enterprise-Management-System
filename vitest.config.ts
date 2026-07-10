import { defineConfig } from "vitest/config"
import path from "path"

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    include: [
      "__tests__/**/*.test.{ts,tsx}",
      "app/**/*.test.{ts,tsx}",
      "components/**/*.test.{ts,tsx}",
      "lib/**/*.test.{ts,tsx}",
      "hooks/**/*.test.{ts,tsx}",
      "store/**/*.test.{ts,tsx}",
    ],
    setupFiles: ["./__tests__/setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
})
