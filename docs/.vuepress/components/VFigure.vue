<template>
    <figure class="figure mv5" :class="{ 'has-caption': hasCaption }">
        <slot></slot>
        <figcaption class="caption" v-if="hasCaption">
            <slot name="caption"></slot>
        </figcaption>
    </figure>
</template>

<script>
export default {
    computed: {
        hasCaption() {
            return !!this.$slots.caption
        },
    },
}
</script>


<style lang="scss">
@import '../theme/styles/abstracts/variables';
@import '../../../utilities/tracking';

.figure {
    display: flex;
    flex-direction: column;

    @media (max-width: $width-small) {
        margin-right: -1rem;
        margin-left: -1rem;
    }

    &.has-caption {
        counter-increment: fignum;
    }
}

.caption {
    padding: $s3 $s3 0;
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
        @include typ-tracking(50);

        float: left;
        padding: 0.125rem $s2 $s1;
        margin-right: $s2;
        font-size: 0.875em;
        font-weight: 600;
        line-height: 1rem;
        color: $oc-white;
        white-space: nowrap;
        vertical-align: middle;
        content: 'Fig.' counter(fignum);
        background-color: $oc-blue-9;
        border-radius: $br1;
    }

    &::after {
        display: table;
        clear: both;
        content: '';
    }

    > :last-child {
        margin-bottom: 0;
    }

    > p {
        overflow: hidden;
    }
}
</style>
