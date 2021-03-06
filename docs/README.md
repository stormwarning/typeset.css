---
home: true
navbar: false
tagline: <dfn title="transitive verb">tr.v</dfn> &nbsp;type&thinsp;·&thinsp;set&nbsp; To set (written material) into type; compose.

---

<p class="lede ampersand">Typeset.css is a Sass library that provides some
sensible default styles, optional classes to use & extend as needed, and some
utility functions & mixins to make elevating your typography simpler.</p>

## Installation

Install using either `npm` or `bower`, or download the
[latest release from GitHub](https://github.com/stormwarning/typeset.css)
and include it in your project manually.

<VFigure>
```sh
npm install --save typeset.css
```
</VFigure>

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

<VFigure>
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
</VFigure>

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

<VFigure>
```scss
$typ-ot-base: (
    'kern' 1,
    'liga' 1,
    'calt' 1,
    'pnum' 1,
    'tnum' 0,
    'onum' 1,
    'lnum' 0,
    'dlig' 0
) !default;
```

```scss
h1, h2, h3 {
    font-feature-settings: opentype('dlig' 1);
}
```

::: slot caption
Default Opentype settings and an example of using the Typeset function to
change a single option while maintaining the rest of the defaults.
:::
</VFigure>

### Tracking

The `typ-tracking()` mixin provides an easy way to adjust `letter-spacing`.
Using the same tracking value from Photoshop as a parameter, the mixin converts
that to an em value.

<VFigure>
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
Tracking mixin and <abbr>CSS</abbr> output. The `font-kerning` property is
included to prevent a bug in Chrome & Opera from disabling any Opentype
settings.
:::
</VFigure>

There is also an optional parameter for text that will be centered. The
`letter-spacing` property will add space even after the last letter. The mixin
adds the same amount of space to the opposite side of the text, maintaining the
visual center alignment.

<VFigure>
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
</VFigure>

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

<VFigure>
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
</VFigure>

Take hyphenation to the next level by manually modifying the DOM with a JS
library like [Hypher](https://github.com/bramstein/hypher).

### Ampersands

Occasionally, you may want to set ampersands in a different typeface for a
little extra flair. Set the `font-family` using the variables, and apply the
class or extend it onto the element you like.

### Dropcaps

The `typ-dropcap()` mixin gives a starting point for styling the initial letter
of a paragraph. Include it with your own styles in a class and apply the class
to a paragraph to see the effect.

<VFigure>
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
    content: '';
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
</VFigure>

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

<VFigure>
```html
<p class="lede">...</p>
<p>...</p>
```
</VFigure>

The function of a paragraph is to mark a pause, setting the paragraph apart from what precedes it. If a paragraph is preceded by a title or subhead, the indent is superfluous and can therefore be omitted. On the web, the most common method of separating paragraphs is using an extra leading or a blank line. Chunks of paragraphs make skimming online content easier.

<section class="indented">

In print, first-line indent is often used to denote a new paragraph without interrupting the flow of reading. First-line indent is appearing more online for long-form reading. Whichever method you prefer, stick with one but not both.

<cite>The Elements of Typographic Style</cite> states that <q>at least one en [space]</q> should be used to indent paragraphs after the first, noting that that is the <q>practical minimum</q>. An em space is the most commonly used paragraph indent.

</section>

<VFigure>
```html
<section class="indented">
    <p>...</p>
    <p>...</p>
</section>
```
</VFigure>

### Blockquotes

Default block quotation styles assume a particular semantic, accessible markup
style.

<VFigure>
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
</VFigure>

### Lists

All lists — `<ul>`, `<ol>`, and `<dl>` — have a single-direction margin
declaration. Nested lists have no `margin-bottom`.

Definition lists in particular, have updated styling. For simpler styling,
clear hierarchy, and better spacing, `<dt>`s have an increased `font-weight`
and `<dd>`s change `margin-left` to zero and a `margin-bottom` of half the base
line-height.

### Address

`<address>` elements are for presenting contact information for the nearest ancestor (or an entire body of work). The element is updated to match regular body copy; `font-style` from italic to normal, inherited `line-height`, and `margin-bottom` matching the base line-height.

### Phrasing elements

<dl>
    <dt>a</dt>
    <dd>Anchors de­fine <a href="#destination">a hy­per­link</a>, <a id="destination">a des­ti­na­tion of a hy­per­link</a>, or both.</dd>
    <dt>abbr</dt>
    <dd>Used for ab­bre­vi­a­tions <abbr title="Doctor">Dr</abbr>. or ini­tialisms like <dfn><abbr title="HyperText Markup Language"><span class="small-caps">HTML</span></abbr></dfn>. Combine with a <code>title</code> at­tribute or con­tain­ing <code>dfn</code> el­e­ment on the first in­stance to pro­vide de­f­i­n­i­tion.</dd>
    <dt>cite</dt>
    <dd>According to the <cite><abbr><span class="small-caps">HTML</span></abbr> 5 Specification</cite>, the <code>cite</code> el­e­ment rep­re­sents a ref­er­ence to a cre­ative work.</dd>
    <dt>code</dt>
    <dd>When rep­re­sent­ing <abbr><span class="small-caps">HTML</span></abbr> code, re­mem­ber to en­code the re­served char­ac­ters &lt; and &gt; with their <abbr><span class="small-caps">HTML</span></abbr> en­tity equiv­a­lents (<code>&#38;lt;</code> and <code>&#38;gt;</code>, re­spec­tively).</dd>
    <dt>del</dt>
    <dd>While <code>s</code> and <code>del</code> ap­pear to per­form the same func­tion <del>mark­ing ob­so­lete con­tent</del> they dif­fer in <s>pen­dantry</s>se­man­tics.</dd>
    <dt>dfn</dt>
    <dd>The <dfn title="Definition">dfn</dfn> el­e­ment in­di­cates the defin­ing in­stance of a term.</dd>
    <dt>em</dt>
    <dd>Use the <code>em</code> el­e­ment to <em>em­pha­size</em> text.</dd>
    <dt>i</dt>
    <dd>For­eign words used in Eng­lish are some­times ital­i­cized, some­times not, de­pend­ing on how com­mon they are. For in­stance, you would ital­i­cize your <i lang="fr">bête noire</i> and your <i lang="de">Weltan­schau­ung</i>, but not your crois­sant or your ré­sumé.</dd>
    <dt>ins</dt>
    <dd>The <code>ins</code> el­e­ment rep­re­sents a range of text that has been <del>added</del><ins>in­serted</ins> into a doc­u­ment.</dd>
    <dt>kbd</dt>
    <dd>Denotes user in­put, typ­i­cally key­board in­put, such as <kbd><kbd>⌘</kbd> + <kbd>S</kbd></kbd>.</dd>
    <dt>mark</dt>
    <dd>Denotes the rel­e­vance of a span of text, <mark>as op­posed to its im­por­tance</mark>, such as text that has been marked or high­lighted.</dd>
</dl>
