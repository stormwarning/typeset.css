import test from 'ava'

const path = require('path')
const sass = require('node-sass')

const preamble = `
    @import 'settings';
    @import 'utilities/opentype';
    $typ-ot-base:
        'kern' 1,
        'liga' 1,
        'dlig' 0;
`

test('opentype() function', async (t) => {
    let result = await sass.renderSync({
        data: `
            ${preamble}
            .s { font-feature-settings: opentype(); }
        `,
        includePaths: ['../']
    })
    // t.log(result.css.toString())
    t.regex(
        result.css.toString(),
        /font-feature-settings: "kern" 1, "liga" 1, "dlig" 0/,
        'returns a font-feature-settings stack'
    )

    let result2 = await sass.renderSync({
        data: `
            ${preamble}
            .s { font-feature-settings: opentype('dlig' 1, 'onum' 1); }
        `,
        includePaths: ['../']
    })
    // t.log(result.css.toString())
    t.regex(
        result2.css.toString(),
        /font-feature-settings: "kern" 1, "liga" 1, "dlig" 1, "onum" 1/,
        'updates keys that exist in the default list, & adds ones that don’t'
    )
})
