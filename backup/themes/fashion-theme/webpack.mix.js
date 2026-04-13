const mix = require('laravel-mix');
const path = require('path');

mix.setPublicPath('public');

mix.webpackConfig({
    output: {
        // Use 'auto' to let webpack determine the public path at runtime
        publicPath: 'auto',
        chunkFilename: 'js/[name].js?id=[chunkhash]',
    },
    resolve: {

        extensions: ['.wasm', '.mjs', '.js', '.jsx', '.json', '.vue'],
        alias: {
            '@': path.resolve(__dirname, 'resources/js'),
        },
    },
    optimization: {
        splitChunks: { chunks: 'all' },
        minimize: true,
    },
});


mix.js('resources/js/main.js', 'public/js')
    .vue(); 