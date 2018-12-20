<template>
  <div class="home">
    <header class="header relative pv6 bg-grey-9">
      <div class="bg-blue-6 absolute absolute--fill o-05"></div>
      <div class="relative mw7 center ph5-ns">
        <img v-if="data.heroImage" :src="$withBase(data.heroImage)" alt="hero">

        <div class="header-title ph3 ph0-ns">
          <h1 class="cyan-4 f-subheadline fw3 ma0 relative pl6-l">
            <span class="logo absolute dn db-l">&#8212;&#8212;
              <!--&#9997;&#xFE0E;-->
            </span>
            {{ data.heroText || $title || 'Hello' }}
          </h1>
          <h4
            class="cyan-7 f3 fw3 o-70 ma0 mt3 pl6-l measure-narrow"
            v-html="data.tagline || $description || 'Welcome to your VuePress site'"
          ></h4>
        </div>

        <p class="action" v-if="data.actionText && data.actionLink">
          <NavLink class="action-button" :item="actionLink"/>
        </p>
      </div>
    </header>

    <aside class="project-meta bb b--grey-3 bg-grey-1 pv3">
      <div class="mw8 center flex items-center justify-center">
        <iframe
          src="http://ghbtns.com/github-btn.html?user=stormwarning&amp;amp;repo=typeset.css&amp;amp;type=star&amp;amp;count=false"
          frameborder="0"
          scrolling="0"
          width="51px"
          height="20px"
        ></iframe>
        <span class="flex items-center h2 ml3 pl3 bl b--black-20">
          <a
            class="f6 lh-solid"
            href="https://github.com/stormwarning/typeset.css/blob/master/CHANGELOG.md"
          >
            Version:
            <var class="f5 fw6 fs-normal">{{ version }}</var>
          </a>
        </span>
        <span class="flex items-center h2 ml3 pl3 bl b--black-20" v-if="downloads > 1">
          <a class="f6" href="#">
            Downloads:
            <var class="f5 fw6 fs-normal">{{ downloads }}</var>
          </a>
        </span>
      </div>
    </aside>

    <div class="features" v-if="data.features && data.features.length">
      <div class="feature" v-for="(feature, index) in data.features" :key="index">
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.details }}</p>
      </div>
    </div>

    <main class="mw7 center ph3 pv5 pv6-ns ph5-ns">
      <Content custom class/>
    </main>

    <div class="footer" v-if="data.footer">{{ data.footer }}</div>
  </div>
</template>

<script>
import NavLink from "./NavLink.vue";

export default {
  components: { NavLink },

  computed: {
    data() {
      return this.$page.frontmatter;
    },

    actionLink() {
      return {
        link: this.data.actionLink,
        text: this.data.actionText
      };
    },

    version: () => process.env.VERSION,

    downloads() {
      console.log("$page", this.$page);
      return this.$page.downloadCount;
    }
  }
};
</script>

<style lang="scss">
main {
  counter-reset: fignum;
}

.header {
  font-family: "adelle", serif;
}

.header-title {
  .f-subheadline {
    @media (max-width: 380px) {
      font-size: 4.25rem;
    }
  }
}

.logo {
  left: -8rem;
}
</style>
