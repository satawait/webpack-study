module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'eslint:recommended',
    'plugin:prettier/recommended',
    // eslint-config-prettier 的缩写
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2021,
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'prettier'],
  globals: {
    ApiResponse: true,
    ApiRequest: true,
    __DEV__: true
  },
  rules: {
    eqeqeq: 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'space-before-function-paren': 'off',
    'object-curly-spacing': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    'no-useless-concat': 'off',
    'no-void': 'off',
    'no-new': 'off',
    'no-new-func': 'off',
    'accessor-pairs': 'off',
    'spaced-comment': 'off',
    camelcase: 'warn',
    'no-useless-escape': 'warn',
    'new-cap': [
      'warn',
      {
        capIsNewExceptions: ['ElMessage', 'Notify', 'Message', 'Toast'],
        properties: false
      }
    ],
    'no-useless-call': 'warn',
    'no-unused-expressions': ['warn', { allowShortCircuit: true, allowTernary: true }],
    'no-new-wrappers': 'warn',
    'no-array-constructor': 'warn',
    'no-plusplus': 'off',
    'no-nested-ternary': 'off',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-var-requires': 0,
    // 'no-undef': 'error',
    semi: ['warn', 'never'],
    'prefer-const': [
      'error',
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false
      }
    ]
  }
}
