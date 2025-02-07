import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import prettier from "eslint-plugin-prettier";
import eslintImport from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports"; 
import reactHooks from "eslint-plugin-react-hooks";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url"; 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {ignores:["**/config.{js}"]},
  {languageOptions: { 
    parser: tsParser,
    parserOptions: {
        project: './tsconfig.json',  // Ensure this points to your TypeScript config file
        tsconfigRootDir: __dirname,
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    globals: globals.browser,
   },
  settings: {
    react: {
      version: 'detect',  // Automatically detects the React version
    },
  },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs.flat.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
        },
        parser: tsParser,
        ecmaVersion: 2020,
        sourceType: "module",
        parserOptions: {
            project: "./tsconfig.json",
            ecmaFeatures: {
                jsx: true, // Enable JSX parsing for React
            },
        },
    },

    plugins: {
        "@typescript-eslint": typescriptEslint,
        "react": react,
        "react-hooks": reactHooks,
        "prettier": prettier, // Prettier plugin
        "import": eslintImport,
        "unused-imports": unusedImports,
    },

    rules: {
        // Enforce new lines for HTML attributes
        "react/jsx-props-no-multi-spaces": "error",
        // Enforce consistent spacing around boolean attributes
        'react/jsx-boolean-value': ['error', 'always'],

        // Enforce new lines for object properties
        "object-curly-newline": [
            "error",
            {
                ObjectExpression: { multiline: true, consistent: true },
                ObjectPattern: { multiline: true, consistent: true },
                ImportDeclaration: { multiline: true, consistent: true },
                ExportDeclaration: { multiline: true, consistent: true },
            },
        ],

        // Disable ESLint's max-len in favor of Prettier
        "max-len": "off",
        // Enforce spaces around keys in object literals
        "key-spacing": ["error", { beforeColon: false, afterColon: true }],
        // Prettier integration to handle formatting
        "prettier/prettier": ["error"],

        // General Code Quality Rules
        "arrow-body-style": ["error", "as-needed"],
        "brace-style": ["error", "1tbs"],
        "curly": "error",
        "eol-last": "error",
        "eqeqeq": ["error", "smart"],
        "id-match": "error",
        "linebreak-style": "off",
        "no-console": [
            "error",
            {
                "allow": [
                    "warn",
                    "dir",
                    "info",
                    "timeLog",
                    "assert",
                    "clear",
                    "count",
                    "countReset",
                    "group",
                    "groupEnd",
                    "table",
                    "dirxml",
                    "error",
                    "groupCollapsed",
                    "Console",
                    "profile",
                    "profileEnd",
                    "timeStamp",
                    "context"
                ]
            }
        ],
        "prefer-const": "error",
        "no-var": "error",
  
        // React Specific Rules
        "react/jsx-no-bind": ["warn", {
            ignoreDOMComponents: true,
            allowArrowFunctions: true,
            allowFunctions: false,
            allowBind: false,
        }],
        "react/prop-types": "off",
        "react/react-in-jsx-scope": "off",
        "react/jsx-uses-react": "off",

        // React Hooks Rules
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        // Import Rules
        "import/order": ["warn", {
            groups: [["builtin", "external", "internal"]],
            "newlines-between": "always",
        }],
        "import/no-duplicates": "error",
        "import/no-cycle": "error",
        "import/first": "error",
        "new-parens": "error",
        "prettier/prettier": ["error", {
            "printWidth": 120, // Override Prettier print width
        }],
        "newline-per-chained-call": "off", // Enforce newlines after chained calls
        "no-caller": "error",
        "no-duplicate-imports": "error",
        "no-empty": "warn",
        "no-eval": "error",
        "no-fallthrough": "off",
        "no-new-wrappers": "error",
        "no-shadow": [
            "off",
            {
                "hoist": "all"
            }
        ],
        "no-throw-literal": "error",
        "no-trailing-spaces": "error",
        "no-var": "error",
        "object-property-newline": "warn",
        "prefer-arrow-callback": "error",
        "prefer-const": "error",
        "spaced-comment": [
            "off",
            "always",
            {
                "markers": [
                    "/"
                ]
            }
        ],
        // Unused Imports Plugin
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": [
            "warn",
            { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" },
        ],
        "no-unused-expressions": [
            "error",
            {
                "allowShortCircuit": true,
                "allowTernary": true,
                "allowTaggedTemplates": true
            }
        ],
        "no-multi-spaces": ["error", {
            "exceptions": {
                "VariableDeclarator": true,
                "ImportDeclaration": true
            }
        }],

        // Enforce space after `=` in conditional expressions
        "space-before-blocks": ["error", "always"],
        "space-before-function-paren": "off",
        "@typescript-eslint/explicit-member-accessibility": [
            "error",
            {
                "accessibility": "no-public"
            }
        ],
        "@typescript-eslint/explicit-function-return-type": "off",

    },
},
];