<template>
  <div
    class="dropdown-wrapper"
    :class="{ open }"
  >
    <a
      class="dropdown-title"
      @click="toggle"
    >
      <span class="title">{{ item.text }}</span>
      <span
        class="arrow"
        :class="open ? 'down' : 'right'"
      ></span>
    </a>

    <DropdownTransition>
      <ul
        class="nav-dropdown"
        v-show="open"
      >
        <li
          class="dropdown-item"
          :key="subItem.link || index"
          v-for="(subItem, index) in item.items"
        >
          <h4 v-if="subItem.type === 'links'">{{ subItem.text }}</h4>

          <ul
            class="dropdown-subitem-wrapper"
            v-if="subItem.type === 'links'"
          >
            <li
              class="dropdown-subitem"
              :key="childSubItem.link"
              v-for="childSubItem in subItem.items"
            >
              <NavLink :item="childSubItem"/>
            </li>
          </ul>

          <NavLink
            v-else
            :item="subItem"
          />
        </li>
      </ul>
    </DropdownTransition>
  </div>
</template>

<script>
import NavLink from './NavLink.vue'
import DropdownTransition from './DropdownTransition.vue'

export default {
    components: { NavLink, DropdownTransition },

    data() {
        return {
            open: false,
        }
    },

    props: {
        item: {
            required: true,
        },
    },

    methods: {
        toggle() {
            this.open = !this.open
        },
    },
}
</script>

<style lang="scss">
@import '../styles/abstracts/variables';

.dropdown-wrapper {
  cursor: pointer;

  .dropdown-title {
    display: block;

    &:hover {
      border-color: transparent;
    }

    .arrow {
      margin-top: -1px;
      margin-left: 0.4rem;
      vertical-align: middle;
    }
  }

  .nav-dropdown {
    .dropdown-item {
      line-height: 1.7rem;
      color: inherit;

      h4 {
        padding: 0.45rem 1.5rem 0 1.25rem;
        margin: 0.45rem 0 0;
        border-top: 1px solid #eee;
      }

      .dropdown-subitem-wrapper {
        padding: 0;
        list-style: none;

        .dropdown-subitem {
          font-size: 0.9em;
        }
      }

      a {
        position: relative;
        display: block;
        padding: 0 1.5rem 0 1.25rem;
        margin-bottom: 0;
        font-weight: 400;
        line-height: 1.7rem;
        border-bottom: none;

        &:hover {
          color: $color-accent;
        }

        &.router-link-active {
          color: $color-accent;

          &::after {
            position: absolute;
            top: calc(50% - 2px);
            left: 9px;
            width: 0;
            height: 0;
            content: '';
            border-top: 3px solid transparent;
            border-bottom: 3px solid transparent;
            border-left: 5px solid $color-accent;
          }
        }
      }

      &:first-child h4 {
        padding-top: 0;
        margin-top: 0;
        border-top: 0;
      }
    }
  }
}

@media (max-width: $width-small) {
  .dropdown-wrapper {
    &.open .dropdown-title {
      margin-bottom: 0.5rem;
    }

    .nav-dropdown {
      overflow: hidden;
      transition: height 0.1s ease-out;

      .dropdown-item {
        h4 {
          padding-top: 0;
          margin-top: 0;
          border-top: 0;
        }

        h4,
        & > a {
          font-size: 15px;
          line-height: 2rem;
        }

        .dropdown-subitem {
          padding-left: 1rem;
          font-size: 14px;
        }
      }
    }
  }
}

@media (min-width: $width-small) {
  .dropdown-wrapper {
    height: 1.8rem;

    &:hover .nav-dropdown {
      // override the inline style.
      display: block !important;
    }

    .dropdown-title .arrow {
      border-top: 6px solid $color-arrow;
      border-right: 4px solid transparent;
      border-bottom: 0;
      // make the arrow always down at desktop
      border-left: 4px solid transparent;
    }

    .nav-dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      box-sizing: border-box;
      display: none;
      // Avoid height shaked by clicking
      height: auto !important;
      max-height: calc(100vh - 2.7rem);
      padding: 0.6rem 0;
      margin: 0;
      overflow-y: auto;
      text-align: left;
      white-space: nowrap;
      background-color: #fff;
      border: 1px solid #ddd;
      border-bottom-color: #ccc;
      border-radius: 0.25rem;
    }
  }
}
</style>
