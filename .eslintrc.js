module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  extends: ['next', 'next/core-web-vitals', 'plugin:prettier/recommended', 'eslint:recommended'],
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'react-hooks', 'prettier'],
  rules: {
    indent: 'off',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'no-invalid-this': 'off',
    'eslint-no-use-before-defining': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['off'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
    'import/prefer-default-export': ['off'],
    'react/no-unescaped-entities': 'off',
    semi: ['error', 'always'],
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        component: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
    'react/jsx-props-no-spreading': [
      'error',
      {
        html: 'ignore',
        custom: 'ignore',
        explicitSpread: 'enforce',
        exceptions: ['Image', 'img'],
      },
    ],
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    'lines-around-comment': [
      'error',
      {
        beforeBlockComment: true,
        afterBlockComment: false,
        beforeLineComment: true,
        afterLineComment: false,
        allowBlockStart: true,
        allowBlockEnd: true,
        allowObjectStart: true,
        allowObjectEnd: true,
        allowArrayStart: true,
        allowArrayEnd: true,
      },
    ],
    'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
    'no-console': 'error',
    'no-eval': 'error',
    'import/first': 'error',
    'max-len': ['error', { code: 120, ignoreUrls: true }],
    'no-confusing-arrow': ['error', { allowParens: false }],
    'no-unexpected-multiline': 'error',
    'prefer-promise-reject-errors': ['off'],
    'no-return-assign': ['off'],
    'no-unused-vars': ['error', { args: 'none' }],
    '@typescript-eslint/no-unused-vars': 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'function-paren-newline': ['error', 'consistent'],
    'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    'prefer-const': 'error',
    'no-case-declarations': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'compat/compat': 'off',
    'react/display-name': 'warn',
    'import/no-extraneous-dependencies': 'off',
    'no-trailing-spaces': ['error', { ignoreComments: true }],
    'no-restricted-syntax': ['error', 'WithStatement', "BinaryExpress[operator='in']"],
    'import/no-unresolved': [2, { caseSensitive: false, ignore: ['uuid$'] }],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/newline-after-import': ['error', { count: 1 }],
    'import/no-cycle': ['error', { maxDepth: '???' }],
    '@next/next/no-document-import-in-page': 'off',
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {
        alwaysTryTypes: true,
        project: './tsconfig.json',
      },
    },
  },
  globals: {
    JSX: 'readonly',
  },
};
