import test from 'ava'

const path = require('path')
const sass = require('node-sass')

const preamble = `
    @import 'settings';
    @import 'utilities/_functions';
    @import 'utilities/font-size';
    @import 'utilities/calc-size';
`

test('font-size() mixin', async (t) => {
    let result = await sass.renderSync({
        data: `
            ${preamble}
            .s { @include typ-font-size(12px); }
        `,
        includePaths: ['../']
    })
    // t.log(result.css.toString())
    t.regex(
        result.css.toString(),
        /font-size: 12px/,
        'returns the supplied pixel font-size'
    )
    t.regex(
        result.css.toString(),
        /font-size: 0.75rem/,
        'returns the font-size converted to a rem-based value'
    )
})

test('calc-size() mixin', async (t) => {
    let result = await sass.renderSync({
        data: `
            ${preamble}
            .s { @include typ-calc-size(14px, 18px, 320px, 1280px); }
        `,
        includePaths: ['../']
    })
    // t.log(result.css.toString())
    t.regex(
        result.css.toString(),
        /font-size: 14px/,
        'returns a minimum font-size'
    )
    t.regex(
        result.css.toString(),
        /font-size: calc\(14px \+ \(18 - 14\) \* \(\(100vw - 320px\) \/ \(1280 - 320\)\)\)/,
        'returns a calc function font-size at the small breakpoint'
    )
    t.regex(
        result.css.toString(),
        /@media \(min-width: 1280px\) \{\s*\.s \{\s*font-size: 18px/,
        'returns a maximum font-size at the large breakpoint'
    )
})
