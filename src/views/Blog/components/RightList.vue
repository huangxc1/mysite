<template>
  <div class="right-list-container">
    <ul>
      <li class="ul-li" v-for="item in list" :key="item.id">
        <span
          @click="handleClick(item)"
          class="cate-left"
          :class="{
            active: item.isSelected,
          }"
          >{{ item.name }}</span
        >
        <span
          v-if="item.articleCount"
          @click="handleClick(item)"
          class="cate-right"
          :class="{
            active: item.isSelected,
          }"
          >{{ item.articleCount + "篇" }}</span
        >
        <RightList
          v-if="item.children"
          :list="item.children"
          @select="handleClick($event)"
        />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "RightList",
  data() {
    return {};
  },
  props: {
    //带有层级的列表数据[{name：xxx,isSelected:true|false,children：[{name:xxx,isSelect,}]}]
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    handleClick(item) {
      if (!item.isSelected) {
        this.$emit("select", item);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.right-list-container {
  .right-list-container {
    padding-left: 20px;
  }

  .ul-li {
    cursor: pointer;
    line-height: 40px;
    .cate-left {
      font-size: 14px;
      margin-right: 15px;
    }
    .cate-right {
      font-size: 12px;
      color: #b4b8bc;
    }
    .active {
      color: #dc6a12;
      font-weight: bold;
    }
  }
}
</style>