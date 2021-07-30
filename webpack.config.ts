import { Configuration } from 'webpack';

const config: Configuration = {
	entry: {
		'bundle': ["./src/index.ts"]
	},
	output: {
		filename: 'bundle.js',
		library: {
			type: "window"
		},
		libraryTarget: 'umd',
		globalObject: 'this'
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		],
	},
	mode: "production",
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	}
};

export default config;