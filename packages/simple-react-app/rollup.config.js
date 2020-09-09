import React from 'react';
import ReactDOM from 'react-dom';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';

export default {
	input: 'src/index.js',
	output: {
		file: 'dist/index.js',
		format: 'cjs',
	},
	plugins: [
		resolve({browser: true}),
		replace({
			'process.env.NODE_ENV': JSON.stringify('development'),
		}),
		commonjs({
			include: /node_modules/,
			namedExports: {
				react: Object.keys(React),
				'react-dom': Object.keys(ReactDOM),
			},
		}),
		babel({
			babelHelpers: 'bundled',
			exclude: /node_modules/,
		}),
	],
};
