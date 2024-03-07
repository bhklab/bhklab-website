module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:react/recommended',
		'airbnb',
	],
	overrides: [
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		'react',
	],
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
		'no-tabs': 0,
		'react/jsx-indent': [2, 'tab'],
		'react/jsx-indent-props': [2, 'tab'],
		'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
		"react/prop-types": "off"
	},
};
