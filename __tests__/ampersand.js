import test from 'ava'

const path = require('path')
const sass = require('node-sass')

const preamble = `
    @import 'settings';
    @import 'utilities/ampersand';
    $stack: Georgia, sans-serif;
`

test('typ-ampersand() mixin', async (t) => {
    let result = await sass.renderSync({
        data: `
            ${preamble}
            .s { @include typ-ampersand(Ampersand, $stack); }
        `,
        includePaths: ['../']
    })

    t.regex(
        result.css.toString(),
        /font-family: Ampersand, Georgia, sans-serif/,
        'generates a font-family stack'
    )
})
