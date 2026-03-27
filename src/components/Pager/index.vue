<template>
  <div class="pager-container" v-if="this.totalPage > 1">
    <a @click="handlePage(1)" :class="{ disable: current === 1 }">|&lt;&lt;</a>
    <a @click="handlePage(current - 1)" :class="{ disable: current === 1 }"
      >&lt;&lt;</a
    >
    <a
      @click="handlePage(item)"
      v-for="(item, i) in pageArr"
      :key="i"
      :class="{ active: current === item }"
      >{{ item }}</a
    >
    <a
      @click="handlePage(current + 1)"
      :class="{ disable: current === totalPage }"
      >&gt;&gt;</a
    >
    <a
      @click="handlePage(totalPage)"
      :class="{ disable: current === totalPage }"
      >&gt;&gt;|</a
    >
  </div>
</template>

<script>
export default {
  props: {
    current: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
    limit: {
      type: Number,
      default: 10,
    },
    visibleNumber: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    //总页码数
    totalPage() {
      return Math.ceil(this.total / this.limit);
    },
    //最小页码数
    min() {
      let min = this.current - Math.floor(this.visibleNumber / 2);
      if (min < 1) {
        min = 1;
      }
      return min;
    },
    //最大页码数
    max() {
      let max = this.min + this.visibleNumber - 1;
      if (max > this.totalPage) {
        max = this.totalPage;
      }
      return max;
    },
    //生成页码数组
    pageArr() {
      let arr = [];
      for (let i = this.min; i <= this.max; i++) {
        arr.push(i);
      }
      return arr;
    },
  },
  methods: {
    handlePage(newPage) {
      if (newPage < 1) {
        newPage = 1;
      }
      if (newPage > this.totalPage) {
        newPage = this.totalPage;
      }
      if (newPage === this.current) {
        return;
      }
      //抛出事件
      this.$emit("changePage", newPage);
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/styles/var.less";
.pager-container {
  display: flex;
  justify-content: center;
  a {
    margin: 5px;
    color: @primary;
    cursor: pointer;
  }
  .disable {
    color: @lightWords;
    cursor: not-allowed;
  }
  .active {
    color: @dark;
    cursor: text;
  }
}
</style>