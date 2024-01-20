module.exports = {
	root: true,
	env: {
		es2021: true,
		browser: true,
		node: true
	},
	extends: [
		'eslint:recommended',
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended"
	],
	"parser": "@typescript-eslint/parser",
	"plugins": [
		"@typescript-eslint"
	],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	rules: {
		quotes: [
			'error',
			'single'
		],
		'quote-props': [
			'error',
			'as-needed'
		],
		semi: [
			'error',
			'never'
		],
		'no-console': 'off',
		'object-curly-spacing': [
			'error',
			'always'
		],
		'no-unused-vars': ["error", { "args": "none" }],
		'space-before-blocks': ['error', 'never'],
		indent: ['error', 2]
	}
}