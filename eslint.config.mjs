import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config({
  ignores: ["app/src/graphql/generated.ts"],
  extends: [eslint.configs.recommended, tseslint.configs.recommended],
  rules: {
    "no-warning-comments": [
      "error",
      {
        terms: ["todo", "fixme"],
        location: "anywhere",
      },
    ],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
  },
});
