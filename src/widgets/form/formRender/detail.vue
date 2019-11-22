<script>
export default {
    methods: {
        r () {
            return this.$parent.renderComponent((getDom, data) => {
                return <div class={'myCardDetaile'}><label {...data.label}>{data.label.name}</label>：<span>{getDom()}</span></div>;
            });
        }
    },
    render () {
        return <div>{this.r()}</div>;
    }
};
</script>
<style lang="less">
.myCardDetaile {
    display: inline-block;
    line-height: 3;
    width: 33%;
    label {
        width: 33%;
        text-align: right;
        display: inline-block;
    }
    > span {
        display: inline-block;
        width: 63%;
    }
}
</style>