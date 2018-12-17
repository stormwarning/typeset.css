const webpack = require('webpack')
const versionNum = JSON.stringify(require('../../package.json').version)

module.exports = {
    title: 'Typeset.css',
    description:
        'Typeset.css is a Sass library that provides some sensible default \
        styles, optional classes to use & extend as needed, and some utility \
        functions & mixins to make elevating your typography simpler.',
    head: [
        [
            'link',
            {
                rel: 'stylesheet',
                href: 'https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css',
            },
        ],
    ],
    ga: 'UA-58836125-2',
    plugins: [
        require('./plugins/downloads.js'),
        // '@vuepress/google-analytics': {
        //     ga: 'UA-58836125-2',
        // },
    ],
    configureWebpack: {
        plugins: [
            new webpack.DefinePlugin({
                'process.env.VERSION': versionNum,
            }),
        ],
    },
}
