<script>
export default {
    functional: true,
    props: {
        type: {
            type: String,
            default: 'tip',
        },
        text: String,
        vertical: {
            type: String,
            default: 'top',
        },
    },
    render(h, { props, slots }) {
        return h(
            'span',
            {
                class: ['badge', props.type, props.vertical],
            },
            props.text || slots().default,
        )
    },
}
</script>

<style lang="scss" scoped>
// @import '~@app/style/config';

.badge {
    display: inline-block;
    height: 18px;
    padding: 0 6px;
    margin-right: 5px;
    font-size: 14px;
    line-height: 18px;
    color: #fff;
    background-color: #42b983;
    border-radius: 3px;

    &.middle {
        vertical-align: middle;
    }

    &.top {
        vertical-align: top;
    }

    &.tip,
    &.green {
        background-color: #42b983;
    }

    &.error {
        background-color: #da5961; // #f66
    }

    &.warning,
    &.warn,
    &.yellow {
        background-color: darken(#ffe564, 35%);
    }
}
</style>
