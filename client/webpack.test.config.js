const webpack = require('webpack');
const path = require('path');module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: path.resolve(__dirname, "node_modules")
            },
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                    },
                    'angular2-template-loader'
                ],
                exclude: [/\.e2e\.ts$/]
            },
            {
                test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
                parser: { system: true },
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loaders: ['raw-loader', 'sass-loader']
            },
            {
                test: /\.html$/,
                loader: 'raw-loader',
                exclude: [('/src/index.html')]
            },
            {
                enforce: 'post',
                test: /\.(ts)$/,
                loader: 'istanbul-instrumenter-loader',
                query: {
                    esModules: true
                },
                include: '/src',
                exclude: [/\.(e2e|spec)\.ts$/, /node_modules/]
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'test')
        }),
        new webpack.ContextReplacementPlugin(
            /\@angular(\\|\/)core(\\|\/)f?esm5/, path.join(__dirname, './src')
        )
    ],
    performance: {
        hints: false
    },
    node: {
        global: true,
        crypto: 'empty',
        process: false,
        module: false,
        clearImmediate: false,
        setImmediate: false,
        fs: 'empty'
    }
};