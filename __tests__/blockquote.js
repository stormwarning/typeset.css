import test from 'ava'

const path = require('path')
const sass = require('node-sass')

test('mixin generates basic blockquote styles', async (t) => {
    let result = await sass.renderSync({
        data: `
            @import 'settings';
            @import 'utilities/blockquote';
            .s { @include typ-blockquote(); }
        `,
        includePaths: ['../']
    })
    // t.log(result.css.toString())
    t.regex(result.css.toString(), /text-indent: -0.41em/)
    t.regex(
        result.css.toString(),
        /\.s \+ figcaption::before \{\s*content: "—"/,
        'includes a default flourish on a figcaption element'
    )
})

test('mixin applies custom flourish value', async (t) => {
    let result = await sass.renderSync({
        data: `
            @import 'settings';
            @import 'utilities/blockquote';
            .s { @include typ-blockquote('~'); }
        `,
        includePaths: ['../']
    })
    // t.log(result.css.toString())
    t.regex(
        result.css.toString(),
        /\.s \+ figcaption::before \{\s*content: "~"/
    )
})
