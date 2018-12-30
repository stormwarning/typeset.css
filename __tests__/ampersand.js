import test from 'ava'

const path = require('path')
const sass = require('node-sass')

test('mixin generates a font-family stack', async (t) => {
    let result = await sass.renderSync({
        data: `
            @import 'settings';
            @import 'utilities/ampersand';
            $stack: Georgia, sans-serif;
            .s { @include typ-ampersand(Ampersand, $stack); }
        `,
        includePaths: ['../']
    })
    // t.log(result.css.toString())
    t.regex(
        result.css.toString(),
        /font-family: Ampersand, Georgia, sans-serif/
    )
})
