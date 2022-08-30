module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:@typescript-eslint/strict",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  rules: {
    curly: "error",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": [
      "error",
      {
        functions: true,
        classes: true,
        variables: true,
        enums: true,
        typedefs: true,
      },
    ],
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/require-await": "warn",
    "@typescript-eslint/consistent-type-definitions": ["off", "type"],
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["tsconfig.json"], // Specify it only for TypeScript files
  },
  ignorePatterns: [".eslintrc.js", "webpack.config.js"],
};
