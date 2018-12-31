import test from 'ava'

const path = require('path')
const sass = require('node-sass')

const preamble = `
    @import 'settings';
    @import 'utilities/blockquote';
`

test('typ-blockquote() mixin', async (t) => {
    let result = await sass.renderSync({
        data: `
            ${preamble}
            .s { @include typ-blockquote(); }
        `,
        includePaths: ['../']
    })

    t.regex(
        result.css.toString(),
        /text-indent: -0.41em/,
        'generates basic blockquote styles'
    )
    t.regex(
        result.css.toString(),
        /\.s \+ figcaption::before \{\s*content: "—"/,
        'includes a default flourish on a figcaption element'
    )
})

test('mixin applies custom flourish value', async (t) => {
    let result = await sass.renderSync({
        data: `
            ${preamble}
            .s { @include typ-blockquote('~'); }
        `,
        includePaths: ['../']
    })

    t.regex(
        result.css.toString(),
        /\.s \+ figcaption::before \{\s*content: "~"/
    )
})
