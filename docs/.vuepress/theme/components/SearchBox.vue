<template>
    <div class="search-box">
        <input
            @input="query = $event.target.value"
            aria-label="Search"
            :value="query"
            :class="{ 'focused': focused }"
            autocomplete="off"
            spellcheck="false"
            @focus="focused = true"
            @blur="focused = false"
            @keyup.enter="go(focusIndex)"
            @keyup.up="onUp"
            @keyup.down="onDown"
        >
        <ul
            class="suggestions"
            v-if="showSuggestions"
            :class="{ 'align-right': alignRight }"
            @mouseleave="unfocus"
        >
            <li
                class="suggestion"
                v-for="(s, i) in suggestions"
                :class="{ focused: i === focusIndex }"
                @mousedown="go(i)"
                @mouseenter="focus(i)"
            >
                <a :href="s.path" @click.prevent>
                    <span class="page-title">{{ s.title || s.path }}</span>
                    <span v-if="s.header" class="header">&gt; {{ s.header.title }}</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            query: '',
            focused: false,
            focusIndex: 0,
        }
    },

    computed: {
        showSuggestions() {
            return this.focused && this.suggestions && this.suggestions.length
        },

        suggestions() {
            const query = this.query.trim().toLowerCase()
            if (!query) {
                return
            }

            const { pages, themeConfig } = this.$site
            const max = themeConfig.searchMaxSuggestions || 5
            const localePath = this.$localePath
            const matches = (item) =>
                item.title && item.title.toLowerCase().indexOf(query) > -1
            const res = []
            for (let i = 0; i < pages.length; i++) {
                if (res.length >= max) break
                const p = pages[i]
                // filter out results that do not match current locale
                if (this.getPageLocalePath(p) !== localePath) {
                    continue
                }
                if (matches(p)) {
                    res.push(p)
                } else if (p.headers) {
                    for (let j = 0; j < p.headers.length; j++) {
                        if (res.length >= max) break
                        const h = p.headers[j]
                        if (matches(h)) {
                            res.push(
                                Object.assign({}, p, {
                                    path: p.path + '#' + h.slug,
                                    header: h,
                                }),
                            )
                        }
                    }
                }
            }
            return res
        },

        // make suggestions align right when there are not enough items
        alignRight() {
            const navCount = (this.$site.themeConfig.nav || []).length
            const repo = this.$site.repo ? 1 : 0
            return navCount + repo <= 2
        },
    },

    methods: {
        getPageLocalePath(page) {
            for (const localePath in this.$site.locales || {}) {
                if (localePath !== '/' && page.path.indexOf(localePath) === 0) {
                    return localePath
                }
            }
            return '/'
        },

        onUp() {
            if (this.showSuggestions) {
                if (this.focusIndex > 0) {
                    this.focusIndex--
                } else {
                    this.focusIndex = this.suggestions.length - 1
                }
            }
        },

        onDown() {
            if (this.showSuggestions) {
                if (this.focusIndex < this.suggestions.length - 1) {
                    this.focusIndex++
                } else {
                    this.focusIndex = 0
                }
            }
        },

        go(i) {
            if (!this.showSuggestions) {
                return
            }
            this.$router.push(this.suggestions[i].path)
            this.query = ''
            this.focusIndex = 0
        },

        focus(i) {
            this.focusIndex = i
        },

        unfocus() {
            this.focusIndex = -1
        },
    },
}
</script>

<style lang="scss">
@import '../styles/abstracts/variables';

.search-box {
    position: relative;
    display: inline-block;
    margin-right: 1rem;

    input {
        display: inline-block;
        width: 10rem;
        padding: 0 0.5rem 0 2rem;
        font-size: 0.9rem;
        line-height: 2rem;
        color: lighten($color-text, 25%);
        cursor: text;
        background: #fff url('./search.svg') 0.6rem 0.5rem no-repeat;
        background-size: 1rem;
        border: 1px solid darken($color-border, 10%);
        border-radius: 2rem;
        outline: none;
        transition: all 0.2s ease;

        &:focus {
            cursor: auto;
            border-color: $color-accent;
        }
    }

    .suggestions {
        position: absolute;
        top: 1.5rem;
        width: 20rem;
        padding: 0.4rem;
        list-style-type: none;
        background: #fff;
        border: 1px solid darken($color-border, 10%);
        border-radius: 6px;

        &.align-right {
            right: 0;
        }
    }

    .suggestion {
        padding: 0.4rem 0.6rem;
        line-height: 1.4;
        cursor: pointer;
        border-radius: 4px;

        a {
            color: lighten($color-text, 35%);
            white-space: normal;

            .page-title {
                font-weight: 600;
            }

            .header {
                margin-left: 0.25em;
                font-size: 0.9em;
            }
        }

        &.focused {
            background-color: #f3f4f5;

            a {
                color: $color-accent;
            }
        }
    }
}

@media (max-width: $MQNarrow) {
    .search-box {
        input {
            position: relative;
            width: 0;
            cursor: pointer;
            border-color: transparent;

            &:focus {
                left: 0;
                width: 10rem;
                cursor: text;
            }
        }
    }
}

@media (max-width: $MQNarrow) and (min-width: $MQMobile) {
    .search-box {
        .suggestions {
            left: 0;
        }
    }
}

@media (max-width: $MQMobile) {
    .search-box {
        margin-right: 0;

        input {
            left: 1rem;
        }

        .suggestions {
            right: 0;
        }
    }
}

@media (max-width: $MQMobileNarrow) {
    .search-box {
        .suggestions {
            width: calc(100vw - 4rem);
        }

        input:focus {
            width: 8rem;
        }
    }
}
</style>
