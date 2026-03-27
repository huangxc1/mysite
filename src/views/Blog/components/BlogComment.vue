<template>
  <div class="blog-comment-container">
    <MessageArea
      title="评论列表"
      :subTitle="`${data.total}`"
      :list="data.rows"
      :isListLoading="isLoading"
      @submit="handleSubmit"
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import { getComments, postComment } from "@/api/blog.js";
export default {
  components: {
    MessageArea,
  },
  data() {
    return {
      page: 1,
      limit: 10,
      isLoading: true,
      data: {
        total: 0,
        rows: [],
      },
    };
  },
  computed: {
    hasMore() {
      return this.data.rows.length < this.data.total;
    },
  },
  async created() {
    this.$bus.$on("mainScroll", this.handleScroll);
    const result = await getComments(
      this.$route.params.id,
      this.page,
      this.limit
    );
    this.data.total = result.data.total;
    this.data.rows = result.data.rows;
    this.isLoading = false;
  },
   destroyed() {
    this.$bus.$off("mainScroll", this.handleScroll);
  },
  methods: {
    handleScroll(dom) {
      if (this.isLoading || !dom) {
        // 目前正在加载更多
        return;
      }
      const range = 100; // 顶一个可接受的范围，在这个范围内都算达到了底部
      const dec = Math.abs(dom.scrollTop + dom.clientHeight - dom.scrollHeight);
      if (dec <= range) {
        this.fetchMore();
      }
    },
    async handleSubmit(formData, callback) {
      const { data: resp } = await postComment({
        blogId: this.$route.params.id,
        ...formData,
      });
      this.data.rows.unshift(resp);
      this.data.total++;
      callback("评论成功"); // 告诉子组件，我这边处理完了，你继续
    },
    // 加载下一页
    async fetchMore() {
      if (!this.hasMore) {
        // 没有更多啦
        return;
      }
      this.isLoading = true;
      this.page++;
      const resp = await getComments(
        this.$route.params.id,
        this.page,
        this.limit
      );
      this.data.total = resp.data.total;
      this.data.rows = this.data.rows.concat(resp.data.rows);
      this.isLoading = false;
    },
  },
};
</script>

<style scoped lang="less">
.blog-comment-container {
  margin: 30px 0;
}
</style>
