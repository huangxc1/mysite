<template>
  <div class="blog-category-container" v-loading="isLoading">
    <div class="cate" v-if="categoryList.length > 0">
      <h2 class="title">文章分类</h2>
      <RightList @select="handleSelect" :list="list"></RightList>
    </div>
  </div>
</template>

<script>
import RightList from "./RightList";
import { getBlogType } from "@/api/blog.js";
export default {
  data() {
    return {
      isLoading: true,
      categoryList: [],
    };
  },
  props: { 
    //分类控制显示文章的数量
    limit: {
      type: Number,
      default: 10,
    },
  },
  computed: {
    categoryId() {
      return this.$route.params.id || -1;
    },
    list() {
      const newCategoryList = this.categoryList.map((item) => {
        return {
          ...item,
          isSelected: item.id === this.categoryId,
        };
      });
      return newCategoryList;
    },
  },
  async created() {
    const result = await getBlogType();
    
    
    const articleCount = result.data.reduce((sum, item) => {
      return sum + item.articleCount;
    }, 0);
    result.data.unshift({
      name: "全部",
      id: -1,
      articleCount,
    });
    this.categoryList = result.data;
    this.isLoading = false;
  },
  components: {
    RightList,
  },
  methods: {
    handleSelect(item) {
    
      
      const query = {
        page: 1,
        limit: this.limit,
      };
      //没有分类
      if (item.id === -1) {
        this.$router.push({
          name: "Blog",
          query,
        });
        return;
      }
      //有分类
      this.$router.push({
        name: "CategoryBlog",
        query,
        params: {
          id: item.id,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.blog-category-container {
  width: 100%;
  height: 100%;
  position: relative;
  padding: 20px;
  overflow-y: auto;
  .title {
    font-size: 1em;
    letter-spacing: 2px;
    margin-bottom: 10px;
  }
  .cate {
    width: 100%;
    height: 100%;
  }
}
</style>