import eslint from "@eslint/js";
import sonarjs from "eslint-plugin-sonarjs";
import tseslint from "typescript-eslint";
import unicorn from "eslint-plugin-unicorn";

const createRule = ({ module, disallowedModules }) => ({
  files: [`**/${module}/**/*.ts`],
  rules: {
    "no-restricted-imports": [
      "error",
      {
        patterns: [
          {
            group: disallowedModules.flatMap((outer) => [
              `~/${outer}`,
              `~/${outer}/**`,
            ]),
            message:
              "Import violates architectural boundaries. Dependencies must point inward.",
          },
        ],
      },
    ],
  },
});

export default tseslint.config(
  {
    ignores: ["**/out/*"],
    extends: [
      eslint.configs.recommended,
      sonarjs.configs.recommended,
      tseslint.configs.recommended,
      unicorn.configs.recommended,
    ],
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

      // Some files use camelCase if
      "unicorn/filename-case": "off",

      // `null` is not always a replacement for `undefined`
      "unicorn/no-null": "off",

      // Needed to stop apps
      "unicorn/no-process-exit": "off",

      // We turn this off instead of keeping a long list of exceptions
      "unicorn/prevent-abbreviations": "off",
    },
  },

  // Rules to enforce the Onion Architecture model
  // Application layer depends on domain
  createRule({
    module: "application",
    disallowedModules: ["infrastructure", "presentation"],
  }),

  // Domain layer depends on no other layer
  createRule({
    module: "domain",
    disallowedModules: ["application", "infrastructure", "presentation"],
  }),

  // Infrastructure layer can depend on other layers execept presentation
  createRule({
    module: "infrastructure",
    disallowedModules: ["presentation"],
  }),

  // Presentation layer depnds on application layer
  createRule({
    module: "presentation",
    disallowedModules: ["domain", "infrastructure"],
  }),
);
