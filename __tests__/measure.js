import test from 'ava'

const path = require('path')
const sass = require('node-sass')

const preamble = `
    @import 'settings';
    @import 'utilities/measure';
`

test('typ-measure() mixin', async (t) => {
    let result = await sass.renderSync({
        data: `
            ${preamble}
            .s { @include typ-measure($min:30); }
        `,
        includePaths: ['../']
    })

    t.regex(
        result.css.toString(),
        /max-width: 70ch/,
        'generates a max-width value'
    )
    t.regex(
        result.css.toString(),
        /min-width: 30ch/,
        'generates a min-width value'
    )
})
