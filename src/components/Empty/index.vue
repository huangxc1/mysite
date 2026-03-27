<template>
  <div class="empty-container">
    <Icon type="empty" />
    <span>{{ text }}</span>
  </div>
</template>

<script>
import Icon from '../Icon/index.vue';

export default {
    props: {
        text: {
            type: String,
            default: "无数据"
        }
    },
    components: {
       Icon
    }
}
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.empty-container {
    display: flex;
    flex-flow: column;
    text-align: center;
    color: @lightWords;
   .icon-container {
        font-size: 150px;
        color: @gray;
    } 
}
    
</style>