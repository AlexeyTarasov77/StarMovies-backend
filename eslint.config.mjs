import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { ignores: ["node_modules/**", "dist/**", "build/**"] },
  { languageOptions: { globals: globals.browser } },
  {
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double", { avoidEscape: true }],
      indent: ["error", 4],
      "no-trailing-spaces": "error",
      "eol-last": ["error", "always"],
      "no-multi-spaces": "error",
      "comma-dangle": ["error", "always-multiline"],
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier
];
