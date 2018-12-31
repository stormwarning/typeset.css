import test from 'ava'

const path = require('path')
const sass = require('node-sass')

const preamble = `
    @import 'settings';
    @import 'utilities/dropcap';
`

test('typ-dropcap() mixin', async (t) => {
    let result = await sass.renderSync({
        data: `
            ${preamble}
            .s { @include typ-dropcap(); }
        `,
        includePaths: ['../']
    })

    t.regex(
        result.css.toString(),
        /\.s::first-letter \{\s*float: left/,
        'generates basic dropcap styles'
    )
    t.regex(
        result.css.toString(),
        /\.s::after \{(.|\s)*clear: both/,
        'includes float clearing on parent element'
    )
})

test('mixin applies custom float direction', async (t) => {
    let result = await sass.renderSync({
        data: `
            ${preamble}
            .s { @include typ-dropcap(right); }
        `,
        includePaths: ['../']
    })

    t.regex(result.css.toString(), /\.s::first-letter \{\s*float: right/)
})
