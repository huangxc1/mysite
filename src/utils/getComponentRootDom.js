import Vue from "vue";
export default function getComponentRootDom(component,props) {
    const vm = new Vue({
        render: (h) => h(component,{props})
    })
    vm.$mount()
    return vm.$el
}