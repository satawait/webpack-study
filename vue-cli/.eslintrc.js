module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
    // eslint-config-prettier 的缩写
    'prettier',
    './.eslintrc-auto-import.json'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2021,
    ecmaFeatures: {
      jsx: true
    },
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
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
    'vue/html-indent': 'off',
    'vue/html-self-closing': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/attributes-order': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/attribute-hyphenation': 'warn',
    // vue2上会有副作用，本规则仅支持 vue3
    'vue/v-on-event-hyphenation': ['warn', 'always', { autofix: true }],
    'vue/multi-word-component-names': 'off',
    // 'vue/no-multiple-template-root': 'off',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-var-requires': 0,
    // 'no-undef': 'error',
    semi: ['warn', 'never']
  }
}
