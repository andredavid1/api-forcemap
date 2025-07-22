// @ts-check
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked, // Use recommendedTypeChecked for type-aware linting
  {
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.json"], // Point to your tsconfig for type checking
        tsconfigRootDir: import.meta.dirname,
      },
    },
  }
);
