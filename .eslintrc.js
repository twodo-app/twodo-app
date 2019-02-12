module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "@vue/prettier", "@vue/typescript"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "comma-dangle": ["error", "always-multiline"],
    "max-len": [
      "error",
      {
        code: 100,
        tabWidth: 2,
        ignoreTrailingComments: true,
      },
    ],
    "no-trailing-spaces": ["error"],
  },
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
};
