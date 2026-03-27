<template>
  <div class="message-container" ref="messageContainer">
    <MessageArea
      title="留言板"
      :subTitle="`(${data.total})`"
      :isListLoading="isLoading"
      :list="data.rows"
      @submit="handleSubmit"
    
    />
  </div>
</template>

<script>
import MessageArea from "@/components/MessageArea";
import * as msgApi from "@/api/message.js";
export default {
  components: {
    MessageArea,
  },
  data() {
    return {
      page: 1,
      limit: 10,
      data: {
        total: 0,
        rows: [],
      },
      isLoading: true,
    };
  },
  async created() {
    this.$bus.$on("mainScroll", this.handleScroll);
    const resp = await msgApi.getMessages(this.page, this.limit);
    this.data = resp.data;
    this.isLoading = false;
  },
  mounted() {
    this.$refs.messageContainer.addEventListener(
      "scroll",
      this.handleMainScroll
    );
    this.$bus.$on("setMainScroll", this.handleSetMainScroll);
  },
  beforeDestroy() {
    this.$bus.$emit("mainScroll");
    this.$bus.$off("setMainScroll", this.handleSetMainScroll);
    this.$bus.$off("mainScroll", this.handleScroll);
    this.$refs.messageContainer.removeEventListener(
      "scroll",
      this.handleMainScroll
    );
  },
  computed: {
    hasMore() {
      return this.data.rows.length < this.data.total;
    },
  },
  methods: {
    handleSetMainScroll(scrollTop) {
      this.$refs.messageContainer.scrollTop = scrollTop;
    },
    handleMainScroll() {
      this.$bus.$emit("mainScroll", this.$refs.messageContainer);
    },
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
    // 加载下一页
    async fetchMore() {
      if (!this.hasMore) {
        // 没有更多啦
        return;
      }
      this.isLoading = true;
      this.page++;
      const { data: resp } = await msgApi.getMessages(this.page, this.limit);
      this.data.total = resp.total;
      this.data.rows = this.data.rows.concat(resp.rows);
      this.isLoading = false;
    },
    async handleSubmit(data, callback) {
      const {data:resp} = await msgApi.postMessage(data);
      callback("感谢您的留言");
      this.data.rows.unshift(resp);
      this.data.total++;
    },
  },
};
</script>

<style scoped>
.message-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 25px 0;
  box-sizing: border-box;
  scroll-behavior: smooth;
}
.message-area-container {
  width: 700px;
  margin: 0 auto;
}
</style>
