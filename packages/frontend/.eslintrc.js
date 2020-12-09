module.exports = {
  extends: ['react-app', '../../.eslintrc.js', './eslintrc.react.js', 'plugin:cypress/recommended'],
  rules: {
    '@typescript-eslint/no-use-before-define': 'off',
  },
};
