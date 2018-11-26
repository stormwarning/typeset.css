<template>
    <div class="home">
        <header class="header relative pv6 bg-grey-9">
            <div class="bg-blue-6 absolute absolute--fill o-05"></div>
            <div class="relative mw8 center ph6-ns">
                <img
                    v-if="data.heroImage"
                    :src="$withBase(data.heroImage)"
                    alt="hero"
                >

                <div class="header-title">
                    <h1 class="cyan-4 f-headline fw3 ma0 relative pl6">
                        <span class="logo absolute">&#8212;&#8212;<!--&#9997;&#xFE0E;--></span>
                        {{ data.heroText || $title || 'Hello' }}
                    </h1>
                    <h4 class="cyan-7 f2 fw3 o-70 ma0 mt3 pl6" v-html="data.tagline || $description || 'Welcome to your VuePress site'"></h4>
                </div>

                <p
                    class="action"
                    v-if="data.actionText && data.actionLink"
                >
                    <NavLink
                        class="action-button"
                        :item="actionLink"
                    />
                </p>
            </div>
        </header>

        <aside class="project-meta bb b--grey-3 bg-grey-1 pv3">
            <div class="mw8 center flex items-center justify-center">
                <iframe src="http://ghbtns.com/github-btn.html?user=stormwarning&amp;amp;repo=typeset.css&amp;amp;type=star&amp;amp;count=false" frameborder="0" scrolling="0" width="51px" height="20px"></iframe>
                <span class="ml3">
                    <a class="f6" href="#">Version: <var class="f5 fw6 fs-normal">0.6.1</var></a>
                </span>
                <span class="ml3 pl3 bl b--black-20">
                    <a class="f6" href="#">Downloads: <var class="f5 fw6 fs-normal">2k</var></a>
                </span>
            </div>
        </aside>

        <div
            class="features"
            v-if="data.features && data.features.length"
        >
            <div
                class="feature"
                v-for="(feature, index) in data.features"
                :key="index">
                <h2>{{ feature.title }}</h2>
                <p>{{ feature.details }}</p>
            </div>
        </div>

        <main class="mw7 center ph3 pv4 ph5-ns">
            <Content custom class=""/>
        </main>

        <div
            class="footer"
            v-if="data.footer"
        >
            {{ data.footer }}
        </div>
    </div>
</template>

<script>
import NavLink from './NavLink.vue'

export default {
    components: { NavLink },

    computed: {
        data() {
            return this.$page.frontmatter
        },

        actionLink() {
            return {
                link: this.data.actionLink,
                text: this.data.actionText,
            }
        },
    },
}
</script>

<style lang="scss">
main {
  counter-reset: fignum;
}

.header {
  font-family: 'adelle', serif;
}

.logo {
  left: -8rem;
}
</style>
