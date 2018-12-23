<template>
    <div class="sidebar">
        <NavLinks/>
        <slot name="top"/>
        <ul class="sidebar-links" v-if="items.length">
            <li v-for="(item, i) in items" :key="i">
                <SidebarGroup
                    v-if="item.type === 'group'"
                    :item="item"
                    :first="i === 0"
                    :open="i === openGroupIndex"
                    :collapsable="item.collapsable || item.collapsible"
                    @toggle="toggleGroup(i)"
                />
                <SidebarLink v-else :item="item"/>
            </li>
        </ul>
        <slot name="bottom"/>
    </div>
</template>

<script>
import SidebarGroup from './SidebarGroup.vue'
import SidebarLink from './SidebarLink.vue'
import NavLinks from './NavLinks.vue'
import { isActive } from '../layouts/util'

export default {
    components: { SidebarGroup, SidebarLink, NavLinks },

    props: ['items'],

    data() {
        return {
            openGroupIndex: 0,
        }
    },

    created() {
        this.refreshIndex()
    },

    watch: {
        $route() {
            this.refreshIndex()
        },
    },

    methods: {
        refreshIndex() {
            const index = resolveOpenGroupIndex(this.$route, this.items)
            if (index > -1) {
                this.openGroupIndex = index
            }
        },

        toggleGroup(index) {
            this.openGroupIndex = index === this.openGroupIndex ? -1 : index
        },

        isActive(page) {
            return isActive(this.$route, page.regularPath)
        },
    },
}

function resolveOpenGroupIndex(route, items) {
    for (let i = 0; i < items.length; i++) {
        const item = items[i]
        if (
            item.type === 'group' &&
            item.children.some((c) => isActive(route, c.path))
        ) {
            return i
        }
    }
    return -1
}
</script>

<style lang="scss">
// stylelint-disable max-nesting-depth
@import '../styles/abstracts/variables';

.sidebar {
    ul {
        padding: 0;
        margin: 0;
        list-style-type: none;
    }

    a {
        display: inline-block;
    }

    .nav-links {
        display: none;
        padding: 0.5rem 0 0.75rem;
        border-bottom: 1px solid $color-border;

        a {
            font-weight: 600;
        }

        .nav-item,
        .repo-link {
            display: block;
            padding: 0.5rem 0 0.5rem 1.5rem;
            font-size: 1.1em;
            line-height: 1.25rem;
        }
    }

    .sidebar-links {
        padding: 1.5rem 0;
    }
}

@media (max-width: $width-small) {
    .sidebar {
        .nav-links {
            display: block;

            .dropdown-wrapper {
                .nav-dropdown {
                    .dropdown-item {
                        // stylelint-disable-next-line selector-max-compound-selectors
                        a.router-link-active::after {
                            top: calc(1rem - 2px);
                        }
                    }
                }
            }
        }

        .sidebar-links {
            padding: 1rem 0;
        }
    }
}
</style>
