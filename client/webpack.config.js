const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const config = {
	mode: "development",
	entry: [
		"webpack-dev-server/client?http://localhost:3000/",
		"babel-polyfill",
		"./src/index.js",
	],
	//This property defines where the application starts
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "scripts/[name].js",
		publicPath: "/",
	}, //This property defines the file path and the file name which will be used for deploying the bundled file
	target: "web",
	devServer: {
		open: true,
		hot: true,
		port: 3000,
		historyApiFallback: true,
	},
	//devtool: "source-map",

	resolve: {
		extensions: [".js", ". jsx", ". json"],
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				test: /.s?css$/,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					{
						loader: "file-loader",
					},
				],
			},
			{
				test: /\.svg$/,
				use: ["@svgr/webpack"],
			},
		],
	},

	optimization: {
		minimize: false,
		minimizer: [new TerserPlugin()],
	},

	// Setup plugin to use a HTML file for serving bundled js files
	plugins: [
		new HtmlWebpackPlugin({
			template: "./public/index.html",
			inject: true,
			favicon: "./public/favicon.ico",
		}),
		new InterpolateHtmlPlugin(HtmlWebpackPlugin),
		new CleanWebpackPlugin(),
	],
};
module.exports = config;
