module.exports = {
	root: true,
	parserOptions: {
		ecmaVersion: 2019,
		sourceType: 'module',
	},
	extends: 'eslint:recommended',
	env: {
		es6: true,
		browser: true,
		node: true,
	},
	plugins: ['svelte3'],
	overrides: [
		{
			files: ['**/*.svelte'],
			processor: 'svelte3/svelte3',
		},
	],
	rules: {
		'no-unused-vars': ['warn'],
	},
};
