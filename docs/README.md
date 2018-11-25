---
home: true
tagline: <dfn title="transitive verb">tr.v</dfn> &nbsp;type&thinsp;·&thinsp;set&nbsp; To set (written material) into type; compose.

---

<p class="lede ampersand">Typeset.css is a Sass library that provides some
sensible default styles, optional classes to use & extend as needed, and some
utility functions & mixins to make elevating your typography simpler.</p>

## Installation

Install using either `npm` or `bower`, or download the
[latest release from GitHub](https://github.com/stormwarning/typeset.css)
and include it in your project manually.

<Figure>
```sh
npm install --save typeset.css
```
</Figure>

::: tip Note
Typeset.css includes no vendor-prefixed properties — use Autoprefixer or a
similar tool when compiling to ensure cross-browser support.
:::

After installing, `@import` the main Typeset file into your Sass as usual —
ideally _after_ any "resets", but before your custom styles.

## Configuring

Typeset's default variables are located in `_settings.scss`. Update and enable
different styles and functionality by defining new values for these before
including `_typeset`.

Some of Typeset's variable and mixin names can be prefixed with an optional
namespace string, in cases where the names cause a conflict.

<Figure>
```scss
$typ-namespace: null !default;

$typ-font-size:   16px !default;
$typ-line-height: 28px !default;

$typ-use-headings:  false !default;
$typ-use-opentype:  false !default;
$typ-use-ampersand: false !default;
```

::: slot caption
Notable default settings; overwrite any of these in your own Sass code.
:::
</Figure>

## Utilities

Use these mixins & functions for simple, fine-grained control over advanced
typography settings.

### Opentype control

Opentype settings provide a lot of control over typefaces that support them.
Browsers don't currently provide fine-grained control over the different
options; only `font-feature-settings` is widely-available, which doesn't allow
for inheriting settings.

Use the `opentype` function, in conjunction with a baseline array of Opentype
settings to cleanly adjust the settings you need on different elements.

<Figure>
```scss
$typ-ot-base: (
    "kern" 1,
    "liga" 1,
    "calt" 1,
    "pnum" 1,
    "tnum" 0,
    "onum" 1,
    "lnum" 0,
    "dlig" 0
) !default;
```

```scss
h1, h2, h3 {
    font-feature-settings: opentype("dlig" 1);
}
```

::: slot caption
Default Opentype settings and an example of using the Typeset function to
change a single option while maintaining the rest of the defaults.
:::
</Figure>

### Tracking

The `typ-tracking()` mixin provides an easy way to adjust `letter-spacing`.
Using the same tracking value from Photoshop as a parameter, the mixin converts
that to an em value.

<Figure>
```scss
.selector {
    @include typ-tracking(-10);
}
```

```css
.selector {
    letter-spacing: -0.01em;
    font-kerning: normal;
}
```

::: slot caption
Tracking mixin and <abbr>CSS</abbr> output. The font-kerning property is
included to prevent a bug in Chrome & Opera from disabling any Opentype
settings.
:::
</Figure>

There is also an optional parameter for text that will be centered. The
`letter-spacing` property will add space even after the last letter. The mixin
adds the same amount of space to the opposite side of the text, maintaining the
visual center alignment.

<Figure>
```scss
.selector {
    @include typ-tracking(50, center);
}
```

```css
.selector {
    margin-left: 0.05em;
    letter-spacing: 0.05em;
    font-kerning: normal;
}
```

::: slot caption        
Using the tracking mixin on centered text.
:::
</Figure>

### Measure

::: tip Note
The measure is the number of characters in a single line of a column of text.
Anything from 45 to 75 characters is a satisfactory length of line. A
66-character line (counting both letters and spaces) is widely regarded as
ideal.
:::

The `typ-measure()` applies a `max-width` property of the number passed to it
in ch units. It also applies some hyphenation properties, although these aren't
widely supported. The mixin accepts optional parameters for a `min-width`
property, as well as centering with auto left and right margins.

<Figure>
```scss
.selector {
    @include typ-measure(66);
}
```

```css
.selector {
    max-width: 66ch;
    hyphenate-limit-chars: 6 3 2;
    hyphenate-limit-lines: 3;
    hyphens: auto;
    word-break: break-word;
}
```

::: slot caption
Basic measure setting and output.
:::
</Figure>

::: tip Hyphenation expert-level
Manually modifying the DOM with a JS library like [Hypher](https://github.com/bramstein/hypher).
:::

### Ampersands

Occasionally, you may want to set ampersands in a different typeface for a
little extra flair. Set the `font-family` using the variables, and apply the
class or extend it onto the element you like.

### Dropcaps

The `typ-dropcap()` mixin gives a starting point for styling the initial letter
of a paragraph. Include it with your own styles in a class and apply the class
to a paragraph to see the effect.

<Figure>
```scss
.dropcap {
    @include typ-dropcap() {
        font-size: 5.5em;
        font-weight: 800;
        line-height: 1;
    }
}
```

```css
.dropcap::after {
    display: table;
    clear: both;
    content: "";
}

.dropcap::first-letter {
    float: left;
    font-size: 5.5em;
    font-weight: 800;
    line-height: 1;
}
```

::: slot caption
Basic usage of dropcap mixin.
:::
</Figure>

## Defaults

### Paragraphs

Base paragraph elements don't have much extra styling applied, besides a
single-direction margin, but there are a couple of related classes useful for
particular cases:

<dl>
    <dt><code>.lede</code></dt>
    <dd>Apply this to a paragraph — usually the first in an article — to have it stand out.</dd>
    <dt><code>.indented</code></dt>
    <dd>Apply this on an element containing paragraphs to change the paragraph separation style.</dd>
</dl>

<p class="lede">A lead, or lede, paragraph in literature is the opening paragraph of an article, essay, news story or book chapter. It precedes the main body of the article, and it gives the reader the main idea of the story. In both spellings, the word rhymes with the word need.</p>

<Figure>
```html
<p class="lede">...</p>
<p>...</p>
```
</Figure>

The function of a paragraph is to mark a pause, setting the paragraph apart from what precedes it. If a paragraph is preceded by a title or subhead, the indent is superfluous and can therefore be omitted. On the web, the most common method of separating paragraphs is using an extra leading or a blank line. Chunks of paragraphs make skimming online content easier.

<section class="indented">

In print, first-line indent is often used to denote a new paragraph without interrupting the flow of reading. First-line indent is appearing more online for long-form reading. Whichever method you prefer, stick with one but not both.

<cite>The Elements of Typographic Style</cite> states that <q>at least one en [space]</q> should be used to indent paragraphs after the first, noting that that is the <q>practical minimum</q>. An em space is the most commonly used paragraph indent.

</section>

<Figure>
```html
<section class="indented">
    <p>...</p>
    <p>...</p>
</section>
```
</Figure>

### Blockquotes

Default block quotation styles assume a particular semantic, accessible markup
style.

<Figure>
```html
<figure>
    <blockquote>
        <p>The future is already here — it's just not very evenly distributed.</p>
    </blockquote>
    <figcaption>
        <small>William Gibson, from an interview in <cite>Fresh Air</cite>, NPR (31 August 1993)</small>
    </figcaption>
</figure>
```
</Figure>

### Lists

All lists — `<ul>`, `<ol>`, and `<dl>` — have a single-direction margin
declaration. Nested lists have no `margin-bottom`.

Definition lists in particular, have updated styling. For simpler styling,
clear hierarchy, and better spacing, `<dt>`s have an increased `font-weight`
and `<dd>`s change `margin-left` to zero and a `margin-bottom` of half the base
line-height.

### Address

`<address>` elements are for presenting contact information for the nearest ancestor (or an entire body of work). The element is updated to match regular body copy; `font-style` from italic to normal, inherited `line-height`, and `margin-bottom` matching the base line-height.
