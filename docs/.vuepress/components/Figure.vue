<script>
export default {
    functional: true,
    render(h, { props, slots }) {
        return h(
            'figure',
            { class: ['figure', 'mv5', slots().caption ? 'has-caption' : ''] },
            [
                slots().default,
                slots().caption
                    ? h('figcaption', { class: 'caption' }, slots().caption)
                    : null,
            ],
        )
    },
}
</script>

<style lang="scss">
@import '../theme/styles/abstracts/variables';

.figure {
  &.has-caption {
    counter-increment: fignum;
  }
}

.caption {
  padding: 0.5em 1rem;
  font-size: 0.875rem;

  // @include media-query(large) {
  // //   position: absolute;
  // //   top: 0;
  // //   left: -40%;
  // //   width: 40%;
  // //   // padding-right: $layout-gutter;
  //   padding: 1rem ($layout-gutter * 2) 0;
  // }

  &::before {
    //   @include typ-tracking(50);

    float: left;
    padding: 0.125rem 0.5rem 0.25rem;
    margin-right: 0.5rem;
    font-weight: 600;
    line-height: 1rem;
    color: $oc-white;
    white-space: nowrap;
    vertical-align: middle;
    content: 'Fig.' counter(fignum);
    background-color: $oc-blue-9;
    border-radius: 0.125rem; // .br1
  }

  &::after {
    display: table;
    clear: both;
    content: '';
  }

  > p {
    overflow: hidden;
  }
}
</style>
