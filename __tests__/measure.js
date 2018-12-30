import test from 'ava'

const path = require('path')
const sass = require('node-sass')

test('mixin generates max-/min-width values', async (t) => {
    let result = await sass.renderSync({
        data: `
            @import 'settings';
            @import 'utilities/measure';
            .s { @include typ-measure($min:30); }
        `,
        includePaths: ['../']
    })
    // t.log(result.css.toString())
    t.regex(result.css.toString(), /max-width: 70ch/)
    t.regex(result.css.toString(), /min-width: 30ch/)
})
