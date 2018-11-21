<template>
    <div class="home">
        <header class="header relative pv6">
            <div class="header-bg absolute absolute--fill o-100"></div>
            <div class="relative mw8 center ph6-ns">
                <img
                    v-if="data.heroImage"
                    :src="$withBase(data.heroImage)"
                    alt="hero"
                >

                <div class="header-title">
                    <h1 class="f-headline fw3 ma0 relative pl6">
                        <span class="logo absolute">&#8212;&#8212;<!--&#9997;&#xFE0E;--></span>
                        {{ data.heroText || $title || 'Hello' }}
                    </h1>
                    <h4 class="f2 fw3 o-70 ma0 mt3 pl6" v-html="data.tagline || $description || 'Welcome to your VuePress site'"></h4>
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

        <aside class="project-meta bb b--black-20 bg-light-gray pv3">
            <div class="mw8 center flex items-center justify-center">
                <iframe src="http://ghbtns.com/github-btn.html?user=stormwarning&amp;amp;repo=typeset.css&amp;amp;type=star&amp;amp;count=false" frameborder="0" scrolling="0" width="51px" height="20px"></iframe>
                <span class="ml3">
                    <a class="f6" href="#">Version: <var class="fw6 fs-normal">0.6.1</var></a>
                </span>
                <span class="ml3 pl3 bl b--black-20">
                    <a class="f6" href="#">Downloads: <var class="fw6 fs-normal">2k</var></a>
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

        <div class="mw8 center ph3 pv4 ph6-ns bg-black-05">
            <Content custom class="bg-black-05"/>
        </div>

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

<style lang="postcss">
.header {
  font-family: 'adelle', serif;
  background-color: #228be6;
}

.header-bg {
  background-color: #212529;
}

.header-title h1 {
  color: #3bc9db;
}

.header-title h4 {
  color: #1098ad;
}

.logo {
  left: -8rem;
}
</style>
