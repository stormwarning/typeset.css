import test from 'ava'

const path = require('path')
const sass = require('node-sass')

test('mixin generates basic dropcap styles', async (t) => {
    let result = await sass.renderSync({
        data: `
            @import 'settings';
            @import 'utilities/dropcap';
            .s { @include typ-dropcap(); }
        `,
        includePaths: ['../']
    })
    // t.log(result.css.toString())
    t.regex(result.css.toString(), /\.s::first-letter \{\s*float: left/)
    t.regex(
        result.css.toString(),
        /\.s::after \{(.|\s)*clear: both/,
        'includes float clearing on parent element'
    )
})

test('mixin applies custom float direction', async (t) => {
    let result = await sass.renderSync({
        data: `
            @import 'settings';
            @import 'utilities/dropcap';
            .s { @include typ-dropcap(right); }
        `,
        includePaths: ['../']
    })
    // t.log(result.css.toString())
    t.regex(result.css.toString(), /\.s::first-letter \{\s*float: right/)
})
