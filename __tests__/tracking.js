import test from 'ava'

const path = require('path')
const sass = require('node-sass')

const preamble = `
    @import 'settings';
    @import 'utilities/tracking';
`

test('typ-tracking() mixin', async (t) => {
    let result = await sass.renderSync({
        data: `
            ${preamble}
            .s { @include typ-tracking(30); }
        `,
        includePaths: ['../']
    })

    t.regex(
        result.css.toString(),
        /letter-spacing: 0.03em/,
        'generates a letter-spacing value'
    )
    t.regex(
        result.css.toString(),
        /font-kerning: normal/,
        'includes a fix for Opentype settings'
    )
})
