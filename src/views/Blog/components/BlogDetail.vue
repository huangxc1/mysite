<template>
  <div class="blog-detail-container">
    <h1>{{ blog.title }}</h1>
    <div class="aside">
      <span>日期: {{ getDateFormat(blog.createDate) }}</span>
      <span>浏览: {{ blog.scanNumber }}</span>
      <a href="#data-form-container">评论: {{ blog.commentNumber }}</a>
      <RouterLink
        :to="{
          name: 'CategoryBlog',
          params: {
            categoryId: blog.category.id,
          },
        }"
      >
        {{ blog.category.name }}
      </RouterLink>
    </div>
    <div v-html="blog.htmlContent" class="markdown-body"></div>
  </div>
</template>

<script>
import { getDateFormat } from "@/utils/dayjs.js";
import "highlight.js/styles/github.css";
import "@/styles/markdown.css";
export default {
  props: {
    blog: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getDateFormat,
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";
.aside {
  font-size: 12px;
  color: @gray;
  span,
  a {
    margin-right: 15px;
  }
}
.markdown-body {
  margin: 2em 0;
}
</style>
