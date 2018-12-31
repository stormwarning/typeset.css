import test from 'ava'

const path = require('path')
const sass = require('node-sass')

const preamble = `@import 'utilities/_functions';`

test('_strip-units() function', async (t) => {
    let result = await sass.renderSync({
        data: `
            ${preamble}
            .s { top: _strip-units(10px); }
        `,
        includePaths: ['../']
    })

    t.regex(
        result.css.toString(),
        /10(?!px)/,
        'returns a number without a unit string'
    )
})
