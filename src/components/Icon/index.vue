<template>

  <i class="iconfont" :class="fontClass"></i>

</template>

<script>
const classMap = {
  home: "icon-home",
  success: "icon-success-fill",
  error: "icon-error-fill",
  close: "icon-close",
  warn: "icon-warnfill",
  info: "icon-info",
  blog: "icon-blog",
  code: "icon-code",
  about: "icon-set_about_hov",
  weixin: "icon-weixin",
  mail: "icon-mail",
  github: "icon-github",
  qq: "icon-QQ-circle-fill",
  arrowUp: "icon-arrowup",
  arrowDown: "icon-arrowdown",
  empty: "icon-empty",
  chat: "icon-chat",
};

export default {
  name: "Icon",
  props: {
    type: {
      type: String,
      required: true,
    }
  },
  computed: {
    fontClass() {
      return classMap[this.type];
    },
  },
};
</script>

<style scoped>
@import "~@/styles/font-size.css";
/* @import "//at.alicdn.com/t/c/font_4722756_b6h4i46gczg.css";  */

.iconfont {
  color: inherit;
  font-size: inherit;
}
</style>