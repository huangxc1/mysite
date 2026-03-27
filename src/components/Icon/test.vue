<script>
import Vue from "vue";
import Icon from "./"
function getComponentRootDom(comp, props) {
    const vm = new Vue({
        render: h => h(comp, { props })
    })
    vm.$mount();
    return vm.$el;
}

getComponentRootDom(Icon, { type: "home" })
// console.log(getComponentRootDom(Icon, { type: "home" }));

</script>