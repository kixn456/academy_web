var path = require('path');

module.exports = {
    entry: {
        index: './app/index.js',
        userCenter:'./app/userCenter/index.js',
        teachCenter:'./app/teachCenter/index.js',
        password:'./app/password/index.js',
        courseDetail:'./app/courseCenter/courseDetail.js',
        courseList:'./app/courseCenter/courseList.js',
        studyCenter:'./app/studyCenter/index.js',
        videoPlayer:'./app/player/player.js',
        payCenter:'./app/payCenter/index.js'
    // path.resolve(__dirname, './src/index.js')
    },
    output: {
        path: path.resolve(__dirname, './build'),
       // filename: 'index.js',
        filename: "[name].js",
        chunkFilename: "[id].chunk.js"
    },
    module:{
        loaders:[
            { test: /\.less$/, loader: "style-loader!css-loader!less-loader"},
            { test: /\.css$/, loader: "style-loader!css-loader"},
            { test:/\.(png|jpg|gif)$/, loader: "url-loader?limit=8192!file-loader"},
            {
                test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/,
                loader: 'url-loader?limit=10000&name=fonts/[hash:8].[name].[ext]'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["es2015", "stage-0", "react"]
                }
            }
        ]
    }
};



//cnpm install file-loader css-loader style-loader sass-loader ejs-loader html-loader jsx-loader image-webpack-loader --save-dev
/**
 * module: {
    loaders: [
        {
            test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/,
            loaders: [
                // 小于10KB的图片会自动转成dataUrl
                'url?limit=10240&name=img/[hash:8].[name].[ext]',
                'image?{bypassOnDebug:true, progressive:true,optimizationLevel:3,pngquant:{quality:"65-80",speed:4}}'
            ]
        },
        {
            test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/,
            loader: 'url?limit=10000&name=fonts/[hash:8].[name].[ext]'
        },
        {test: /\.(tpl|ejs)$/, loader: 'ejs'},
        {test: /\.css$/, loader: 'style-loader!css-loader'},
        { test: /\.scss$/, loader: 'style!css!sass'}
    ]
},
 *
 * */