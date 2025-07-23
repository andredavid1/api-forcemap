import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";
import prettirPlugin from "eslint-plugin-prettier";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked, // Use recommendedTypeChecked for type-aware linting
  prettier,
  {
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json"], // Point to your tsconfig for type checking
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      prettier: prettirPlugin,
    },
    rules: {
      "prettier/prettier": "error",
      "prefer-const": "error",
      "no-var": "error",
    },
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/coverage/**",
    ],
  },
);
