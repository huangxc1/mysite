<template>
  <Layout>
    <div class="main-container" ref="mainContainer" v-loading="isLoading">
      <BlogDetail :blog="tocList" v-if="tocList" />
      <BlogComment v-if="!isLoading"></BlogComment>
    </div>
    <template #right>
      <div class="right-container" v-loading="isLoading">
        <BlogTOC :toc="tocList.toc" v-if="tocList" />
      </div>
    </template>
  </Layout>
</template>

<script>
import { getBlogById } from "@/api/blog";
import Layout from "@/components/Layout";
import BlogDetail from "./components/BlogDetail";
import BlogTOC from "./components/BlogTOC";
import BlogComment from "./components/BlogComment.vue";
import titleController from "@/utils/titleController";
export default {
  data() {
    return {
      isLoading: true,
      tocList: null,
    };
  },
  components: {
    Layout,
    BlogDetail,
    BlogTOC,
    BlogComment,
  },
  async created() {
    const result = await getBlogById(this.$route.params.id);
    this.tocList = result.data;
    titleController.setRouteTitle(this.tocList.title);
    this.isLoading = false;
  },
  mounted() {
    this.$bus.$on("setMainScroll", this.handleSetMainScroll);
    this.$refs.mainContainer.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    this.$bus.$emit("mainScroll");
    this.$refs.mainContainer.removeEventListener("scroll", this.handleScroll);
    this.$bus.$off("setMainScroll", this.handleSetMainScroll);
  },
  updated() {
    const hash = location.hash;
    location.hash = "";
    setTimeout(() => {
      location.hash = hash;
    }, 50);
  },
  methods: {
    handleScroll() {
      this.$bus.$emit("mainScroll", this.$refs.mainContainer);
    },
    handleSetMainScroll(scrollTop) {
      this.$refs.mainContainer.scrollTop = scrollTop;
    },
  },
};
</script>

<style scoped lang="less">
.main-container {
  overflow-y: scroll;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  position: relative;
  width: 100%;
  overflow-x: hidden;
  scroll-behavior: smooth;
}
.right-container {
  width: 300px;
  height: 100%;
  overflow-y: scroll;
  box-sizing: border-box;
  position: relative;
  padding: 20px;
}
</style>
