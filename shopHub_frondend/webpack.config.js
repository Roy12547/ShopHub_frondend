const path=require('path')
const HtmlWebpackPlugin=require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');


module.exports={
    mode:'development',
    entry:'./src/index.jsx',
    output:{
        publicPath: '/',
        filename:'[name]_[contenthash].js',
        path:path.resolve(__dirname,'./dist'),
        clean:true,
        chunkFilename:'[name]_[contenthash]_chunk.js',
    },
    devServer:{
        static: {
            directory: path.resolve(__dirname, "dist"),
          },
          port: 3000,
          open: true,
          hot: true,
          compress: true,
          historyApiFallback: true,
    },
    module:{
        rules:[
            {
                test:/\.(js|jsx|mjs|cjs)$/i,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:[
                            ['@babel/preset-env'],
                            ['@babel/preset-react',{"runtime":"automatic"}]
                        ]
                    }
                }
            },
            {
                test:/\.css$/i,
                use:['style-loader','css-loader','postcss-loader']
            },
            {
                test:/\.scss$/,
                use:['style-loader','css-loader','sass-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            postcssOptions:{
                                plugins:['postcss-preset-env']
                            }
                        }
                    }
                ]
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            {
                 test: /\.(jpg|png|gif|jpeg)$/,
                 use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[hash].[ext]', 
                        outputPath: 'images/',
                        limit: 10240
                    }
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./public/index.html',
            filename:'index.html',
            inject:true,
            minify:true
        }),
        new ESLintPlugin()
    ],
    resolve:{
        extensions:[".jsx",".js",".json","..."]
    },

}