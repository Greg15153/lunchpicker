module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended'
    ],
    overrides: [
        {
            files: ['*.js'],
            rules: {
                '@typescript-eslint/explicit-function-return-type': 'off'
            }
        },
        {
            files: ['src/app/pages/**/*.tsx'],
            rules: {
                'react/react-in-jsx-scope': 'off'
            }
        }
    ],
    rules: {
        'react/prop-types': 0,
        '@typescript-eslint/adjacent-overload-signatures': 'error',
        '@typescript-eslint/array-type': 'error',

        'camelcase': 'off',
        '@typescript-eslint/camelcase': ['error', { properties: 'never', allow: ['^[A-Za-z][a-zA-Za-z]+_[A-Za-z]+$'] }],

        '@typescript-eslint/class-name-casing': 'error',
        '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
        '@typescript-eslint/member-delimiter-style': [
            'error',
            { multiline: { delimiter: 'none' }, singleline: { delimiter: 'semi' } }
        ],
        '@typescript-eslint/interface-name-prefix': 'error',
        '@typescript-eslint/no-inferrable-types': 'error',
        '@typescript-eslint/no-misused-new': 'error',
        '@typescript-eslint/no-this-alias': 'error',
        '@typescript-eslint/prefer-for-of': 'error',
        '@typescript-eslint/prefer-function-type': 'error',
        '@typescript-eslint/prefer-namespace-keyword': 'error',

        'quotes': 'off',
        '@typescript-eslint/quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],

        'semi': 'off',
        '@typescript-eslint/semi': ['error', 'never'],

        '@typescript-eslint/triple-slash-reference': 'error',
        '@typescript-eslint/type-annotation-spacing': 'error',
        '@typescript-eslint/unified-signatures': 'error',

        // eslint
        'brace-style': ['error', '1tbs', { allowSingleLine: true }],
        'constructor-super': 'error',
        'curly': ['error', 'multi-line'],
        'dot-notation': 'error',
        'eqeqeq': 'error',
        'new-parens': 'error',
        'no-caller': 'error',
        'no-duplicate-case': 'error',
        'no-duplicate-imports': 'error',
        'no-empty': 'error',
        'no-eval': 'error',
        'no-extra-bind': 'error',
        'no-fallthrough': 'error',
        'no-new-func': 'error',
        'no-new-wrappers': 'error',
        'no-return-await': 'error',
        'no-restricted-globals': [
            'error',
            { name: 'setTimeout' },
            { name: 'clearTimeout' },
            { name: 'setInterval' },
            { name: 'clearInterval' },
            { name: 'setImmediate' },
            { name: 'clearImmediate' }
        ],
        'no-sparse-arrays': 'error',
        'no-template-curly-in-string': 'error',
        'no-throw-literal': 'error',
        'no-trailing-spaces': 'error',
        'no-undef-init': 'error',
        'no-unsafe-finally': 'error',
        'no-unused-expressions': ['error', { allowTernary: true }],
        'no-unused-labels': 'error',
        'no-var': 'error',
        'object-shorthand': 'error',
        'prefer-const': 'error',
        'prefer-object-spread': 'error',
        'quote-props': ['error', 'consistent-as-needed'],
        'space-in-parens': 'error',
        'unicode-bom': ['error', 'never'],
        'use-isnan': 'error'
    }
}
