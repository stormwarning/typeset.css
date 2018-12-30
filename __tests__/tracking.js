import test from 'ava'

const path = require('path')
const sass = require('node-sass')

test('mixin generates letter-spacing value', async (t) => {
    let result = await sass.renderSync({
        data: `
            @import 'settings';
            @import 'utilities/tracking';
            .s { @include typ-tracking(30); }
        `,
        includePaths: ['../']
    })
    // t.log(result.css.toString())
    t.regex(result.css.toString(), /letter-spacing: 0.03em/)
    t.regex(
        result.css.toString(),
        /font-kerning: normal/,
        'includes a fix for Opentype settings'
    )
})
