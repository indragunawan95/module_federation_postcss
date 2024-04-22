const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const Dotenv = require('dotenv-webpack');
const deps = require("./package.json").dependencies;
module.exports = (_, argv) => ({
	output: {
		uniqueName: "pdp",
		publicPath: "http://localhost:3001/",
	},

	resolve: {
		extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
	},

	devServer: {
		port: 3001,
		historyApiFallback: true,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods":
				"GET, POST, PUT, DELETE, PATCH, OPTIONS",
			"Access-Control-Allow-Headers":
				"X-Requested-With, content-type, Authorization",
		},
		hot: true,
	},

	module: {
		rules: [
			{
				test: /\.m?js/,
				type: "javascript/auto",
				resolve: {
					fullySpecified: false,
				},
			},
			{
				test: /\.(css|s[ac]ss)$/i,
				use: ["style-loader", "css-loader", "postcss-loader"],
			},
			{
				test: /\.(ts|tsx|js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
		],
	},

	plugins: [
		new ModuleFederationPlugin({
			name: "pdp",
			filename: "remoteEntry.js",
			remotes: {
				homeMFE: "home@http://localhost:3000/remoteEntry.js",
			},
			exposes: {},
			shared: {
				...deps,
				react: {
					singleton: true,
					requiredVersion: deps.react,
				},
				"react-dom": {
					singleton: true,
					requiredVersion: deps["react-dom"],
				},
			},
		}),
		new HtmlWebPackPlugin({
			template: "./src/index.html",
		}),
		new Dotenv(),
	],
});
