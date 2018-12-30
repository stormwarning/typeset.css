import test from 'ava'

const path = require('path')
const sass = require('node-sass')

test('_strip-units() function', async (t) => {
    let result = await sass.renderSync({
        data: `
            @import 'utilities/_functions';
            .s { top: _strip-units(10px); }
        `,
        includePaths: ['../']
    })
    // t.log(result.css.toString())
    t.regex(
        result.css.toString(),
        /10(?!px)/,
        'returns a number without a unit string'
    )
})
