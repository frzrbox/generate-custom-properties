import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
	input: 'src/index.js',
	output: [
		{
			file: 'index.js',
			format: 'umd',
			name: 'generate-custom-properties',
		},
	],
	plugins: [
		babel({
			exclude: 'node_modules/**',
			extensions,
		}),
		resolve(),
		commonjs(),
		terser(),
	],
};
