var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: "./src/app/index.tsx",
  output: {
		filename: "bundle.js",
		path: path.resolve(__dirname, './dist')
  },
	
	plugins: [
		new HtmlWebpackPlugin({
			title: 'commits',
			template: "./src/index.html"
    }),
    new webpack.ProvidePlugin({
      'React': 'react',
      'ReactDom': 'react-dom',
      'Redux': 'redux',
      'ReactRedux': 'react-redux'
    }) 
	],


  devtool: "source-map",
  resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"]
  },

  module: {
		rules: [
			{
        test: /\.tsx$/,
        loader: "babel-loader"
      },
      {
        test: /\.ttf$/,
        loader: 'file-loader?name=./fonts/[name].[ext]'
      }
		]
  },

  externals: {
		"react": "React",
    "react-dom": "ReactDOM"
  	},

	watchOptions: {
    poll: true,
    ignored: /node_modules/
  },
	
	devServer: {
    contentBase: 'src',
    inline: true,
    hot: true,
    open: true,
    port: 3001
  }
};