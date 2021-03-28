module.exports = {
    env: {
      browser: true,
      es2021: true
    },
    // extends: [
    //   'standard'
    // ],
    parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module'
    },
    rules: {
      "semi": "error",
      "no-constant-condition":"error",
      "no-debugger":"error",
      "no-unused-vars":"warn",
      "no-unused-expressions":"warn",
      "no-unused-labels":"warn",
      "no-empty":"error",
      "no-empty-function":"error",
      "no-regex-spaces":"error",
      "no-unreachable":"error",
      "block-spacing":"warn",
      "brace-style":["warn", "1tbs"],
      "no-extra-semi":"warn",
      "comma-style": [ "warn", "last" ],
      "no-duplicate-imports":"error",
      "no-const-assign":"error",
      "no-trailing-spaces":"error",
      "semi-spacing":["error"],
      "no-self-assign":"error",
      "no-confusing-arrow":"error",
    }
}