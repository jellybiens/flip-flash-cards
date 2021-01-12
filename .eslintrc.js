module.exports = {
  plugins: ['@typescript-eslint', 'prettier', 'import', 'node'],
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    // Allows for the parsing of modern ECMAScript features
    sourceType: 'module',
    // Allows for the use of imports
    allowImportExportEverywhere: true,
    project: './tsconfig.json',
    tsconfigRootDir: '.',
  },
  rules: {
    'import/no-unresolved': 'error',
    'import/named': 'error',
    'no-console': 'warn',
    'comma-dangle': ['warn', 'always-multiline'],
    '@typescript-eslint/no-unused-vars': 'warn',
    'prettier/prettier': 'warn',
    '@typescript-eslint/no-unsafe-assignment': 'off',
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'default',
        format: ['camelCase'],
        filter: {
          regex: '^(_id|Query|Subscription|Mutation)$',
          match: false,
        },
      },
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
      },
      {
        selector: 'parameter',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      {
        selector: 'memberLike',
        modifiers: ['private'],
        format: ['camelCase'],
        leadingUnderscore: 'require',
      },
      {
        selector: 'typeLike',
        format: ['PascalCase'],
      },
    ],
  },
  settings: {
    'import/ignore': ['node_modules\\/(?!@storybook)', 'cypress'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
        paths: ['node_modules/', 'node_modules/@types/'],
      },
      alias: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.d.ts'],
        map: [['@ui-kit', './packages/ui-kit/src'], 
              ["@types", "./packages/types"],
              ["@gql-schema", "./packages/gql-schema"]],
      },
    },
    'html/html-extensions': ['.html'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
};
