module.exports = {
  env: {
    es6: true,
    node: true
  },
  extends: [
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
    'no-use-before-define': 'off',
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-unused-vars': [2, { args: 'none' }]
  }
}
