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
        test: /\.(ts|tsx)$/,
        loader: "babel-loader"
      },
      {
        test: /\.png$/,
        loader: 'file-loader?name=../../public/img/[name].[ext]'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
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
    contentBase: '/src/app',
    inline: true,
    hot: true,
    open: true,
    port: 3001,
    proxy: {
      '/github': {
        target: 'https://github.com',
        pathRewrite: {'^/github' : ''},
        changeOrigin: true
      }
    }
  }
};