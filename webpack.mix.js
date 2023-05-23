let mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.webpackConfig({
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015'] // default = env
                    }
                }
            },
            {
                test: /\.scss$/,
                loader: "import-glob-loader"
            },
        ]
    }
});
mix.js("htdocs/src/ui/00_global/main.js","htdocs/dist/js/main.js")
    .sass('htdocs/src/ui/00_global/main.scss', 'htdocs/dist/css');
// BABEL config
mix.options({processCssUrls:false});