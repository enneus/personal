const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack           = require('webpack');

module.exports = {
    entry: './src/app.jsx',
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/dist/',
      filename: 'js/app.js'
    },
    resolve: {
    alias : {  
      component : path.resolve(__dirname, 'src/component'),      
      util      : path.resolve(__dirname, 'src/util'),      
      service   : path.resolve(__dirname, 'src/service'),
      layout    : path.resolve(__dirname, 'src/component/layout'), 
      page      : path.resolve(__dirname, 'src/page/')
      
    }
  },

     module: {
        rules: [
        //react(jsx)语法的处理
          {
            test: /\.jsx$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['env','react']
              }
            }
          },

          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: "css-loader"
                 })
                  
          },

          {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'sass-loader']
        })
      },

        {
            test: /\.(png|jpg|gif)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192,
                  name: 'resource/[name].[ext]'
                }
              }
            ]
      },

       {
            test: /\.(woff|woff2|eot|ttf|svg|otf)$/i,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192,
                  name: 'resource/[name].[ext]'
                }
              }
            ]
      },


//sass文件的处理
          
        ]  
    },
    plugins: [
          //处理html文件
         new HtmlWebpackPlugin({
            template: './src/index.html'
         }),
          //处理css文件
          new ExtractTextPlugin("css/[name].css"),
          //公共模块
          new webpack.optimize.CommonsChunkPlugin({
              name : 'common',
              filename : 'js/base.js'
          })

    ],

     devServer: {
         proxy : {
                 '/manage'        :{
                      target: 'http://admintest.happymmall.com',
                      changeOrigin : true
                 },
                 '/user/logout.do':{
                      target: 'http://admintest.happymmall.com',
                      changeOrigin : true
                 }
              }     
   }

};