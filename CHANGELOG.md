# Change Log

[![Keep a Changelog](https://img.shields.io/badge/keep%20a-changelog-ef5e39.svg?style=flat-square)](https://keepachangelog.com)
[![Semantic Versioning](https://img.shields.io/badge/semantic-versioning-333333.svg?style=flat-square)](https://semver.org)

All notable changes to this project will be documented in this file.

## 0.6.1 — 2017-01-25

### Fixed

- Fix undefined variable error in tracking mixin

## 0.6.0 — 2017-01-25

### Changed

- Allow passing specific unit values to tracking mixin

## 0.5.19 — 2016-10-21

### Changed

- Use native system fonts as the default stack

## 0.5.18 — 2016-09-27

### Added

- Add a "leading" var for margins; fixes [#16](https://github.com/stormwarning/typeset.css/issues/16) \
  Keeps `line-height`s unitless.

## 0.5.17 — 2016-08-20

### Fixed

- Don't define ampersand mixin within a conditional

## 0.5.16 — 2016-02-01

### Other updates

- Update homepage URL

## 0.5.15 — 2015-12-31

### Fixed

- Fix blockquote `quotes` display in Firefox

## 0.5.14 — 2015-12-21

### Fixed

- Add `font-kerning` property to tracking mixin output \
  Prevents Chrome & Opera from disabling any Opentype settings.

### Added

- Add tracking to default `abbr` styles

## 0.5.12 — 2015-12-13

### Added

- Add `false` option for measure mixin

## 0.5.11 — 2015-12-13

### Fixed

- Clean up `blockquote` quotation style \
  Also adds `text-indent` for punctuation hanging.

## 0.5.10 — 2015-12-01

### Fixed

- Add `!default` flags on colour variables

## 0.5.8 — 2015-11-22

### Added

- Add centering parameter to tracking mixin

## 0.5.7 — 2015-11-06

### Changed

- Set a shorter `line-height` for headings
- Set specific margins on paragraphs
- Move misc block elements styles to new partial

### Added

- Add margin reset to blockquote mixin
- Add default `body` text colour

## 0.5.1 — 2015-10-29

### Changed

- 🔥 Reorganize project structure 

### Other updates

- Add Sache extension manifest

## 0.4.1 — 2015-10-26

### Added

- Add center param to measure mixin

## 0.4.0 — 2015-09-18

### Added

- Adds control for measure
- Adds base quotation styling

## 0.3.1 — 2015-09-01

### Removed

- Remove `@imports` of non-existent files

## 0.3.0 — 2015-09-01

### Added

- Add `letter-spacing` mixin

## 0.2.4 — 2015-09-01

### Added

- Add a clearfix to Dropcap mixin

### Fixed

- Bug fixes with variable names & functions

## 0.2.0 — 2015-08-27

### Removed

- Option flag for dropcaps \
  Not needed for mixins.

### Changed

- Simplify dropcap mixin

### Added

- Add `line-height` output to calc-size mixin
- Add default heading settings
- Add dropcap documentation

### Fixed

- Corrected paths to partials

## 0.1.0-pre — 2015-08-18

### Added

- Opentype settings partial and features function
- Responsive font-size mixin
- Default styles for `pre` and `code` elements
- Custom ampersand utility

## 0.0.2 — 2015-07-28

### Added

- Base element styles
- Default settings & mixins

## 0.0.1 - 2014-11-30

### 🎉 Project created
