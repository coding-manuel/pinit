const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require("interpolate-html-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const config = {
	mode: "production",
	entry: "./src/index.js", //This property defines where the application starts
	output: {
		path: path.join(__dirname, "/build"),
		filename: "bundle.js",
	}, //This property defines the file path and the file name which will be used for deploying the bundled file
	target: "web",
	devServer: {
		port: "3000",
        open: true,

	},
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
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
		],
	},

	// Setup plugin to use a HTML file for serving bundled js files
	plugins: [
		new HtmlWebpackPlugin({
            template: './public/index.html',
            inject: true,
            favicon: "./public/favicon.ico"
        }),
        new InterpolateHtmlPlugin(HtmlWebpackPlugin),
	],

    optimization: {
        minimizer: [new UglifyJsPlugin()],
      },
};
module.exports = config;
