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
		"plugin:@typescript-eslint/recommended",
		'plugin:svelte/recommended'
	],
	"parser": "@typescript-eslint/parser",
	"plugins": [
		"@typescript-eslint"
	],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	"overrides": [
		{
			"files": ["*.svelte"],
			"parser": "svelte-eslint-parser",
			"parserOptions": {
				"parser": "@typescript-eslint/parser" // <-- you HAVE TO say typescript here again
			}
		}
	],
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
		'svelte/no-at-html-tags': 'off',
		'object-curly-spacing': [
			'error',
			'always'
		],
		'no-unused-vars': ["error", { "argsIgnorePattern": "^_" }],
		'space-before-blocks': ['error', 'never'],
		indent: ['error', 2]
	}
}