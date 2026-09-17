// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  expoConfig,
  {
    // "example" is leftover create-expo-app scaffolding (untracked, see
    // .gitignore) and isn't part of this app's source.
    ignores: ["dist/*", "example/*"],
  },
  {
    // Runs under Jest, so the `jest` global (used for jest.mock) is defined
    // by the test environment even though this file isn't a *.test.* file.
    files: ["jest.setup.js"],
    languageOptions: {
      globals: { jest: "readonly" },
    },
  },
]);
