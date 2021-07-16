import path from 'path';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

console.log(path.join(__dirname, "demo"));
const config: Configuration = {
	context: __dirname,
	entry: './index.tsx',
	output: {
		path: path.join(__dirname, '../public'),
		filename: '[name]-[fullhash].js',
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
			},
			{
				test: /\.(png|jpg)$/,
				type: 'asset/resource'
			}
		],
	},
	mode: "production",
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Demo | Leaflet.MousePosition.ts',
			meta: {
				viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'
			}
		}),
	],
	devtool: "inline-source-map",
};

export default config;