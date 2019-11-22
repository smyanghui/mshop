// 地址选择器
import AreaStreet from '@/components/areaStreet/areaSelect';
import _ from '@/widgets/tool';
export default {
    // input框
    input (data) {
        return <a-input {...data}/>;
    },
    // select选择器
    select (data) {
        return <a-select {...data}></a-select>;
    },
    // 带select选择器的input框
    selectInput (data) {
        return <a-input-group {...data.group}>
            <a-select {...data.select}></a-select>
            <a-input {...data.input}/>
        </a-input-group>;
    },
    // 日期选择器
    rangePicker (data) {
        return <a-range-picker {...data} />;
    },
    // 带2个的input框-最小值-最大值
    inputInput (data) {
        return <a-input-group {...data.group}>
            <a-input {...data.inputLeft}/>
            <a-input {...data.inputMiddle}/>
            <a-input {...data.inputRight}/>
        </a-input-group>;
    },
    // 地址选择器
    areaStreet (data) {
        return <AreaStreet {...data}/>;
    },
    // 单项选择器
    radio (data) {
        return <a-radio-group {...data}/>;
    },
    // 文本框
    textarea (data) {
        return <a-textarea {...data}/>;
    },
    span (data) {
        return <span {...data}>{data.value}</span>;
    },
    spanButton (data) {
        var b = {
            on: data.on
        };

        delete data.on;
        return <span {...data}>{data.value}<a-button {...b}>修改</a-button></span>;
    }
};