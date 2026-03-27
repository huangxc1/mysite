<template>
  <div class="blog-list-container" v-loading="isLoading" ref="mainContainer">
    <ul>
      <li v-for="item in blogList" :key="item.id">
        <div class="thumb" v-if="item.thumb">
          <RouterLink :to="{
            name: 'DetailBlog',
            params: {
              id: item.id,
            },
          }">
            <img v-lazy="item.thumb" :alt="item.title" :title="item.title" />
          </RouterLink>
        </div>
        <div class="main">
          <RouterLink :to="{
            name: 'DetailBlog',
            params: {
              id: item.id,
            },
          }">
            <h2>{{ item.title }}</h2>
          </RouterLink>
          <div class="aside">
            <span>日期：{{ item.createDate }}</span>
            <span>浏览：{{ item.scanNumber }}</span>
            <span>评论{{ item.commentNumber }}</span>
            <RouterLink :to="{
              name: 'CategoryBlog',
              params: {
                id: item.category.id,
              },
            }" class="">{{ item.category.name }}
            </RouterLink>
          </div>
          <div class="desc">
            {{ item.description }}
          </div>
        </div>
      </li>
    </ul>
    <!-- 分页放到这里 -->
    <Pager v-if="total" :total="total" :current="current" @changePage="handlePage">
    </Pager>
  </div>
</template>

<script>
import { getBlogList } from "@/api/blog.js";
import { getDateFormat } from "@/utils/dayjs.js";
import Pager from "@/components/Pager";
export default {
  data() {
    return {
      blogList: [],
      isLoading: true,
      total: 0,
      current: 1,
    };
  },
  components: {
    Pager,
  },
  computed: {
    getRouteInfo() {
      const page = +this.$route.query.page || 1;
      const limit = +this.$route.query.limit || 10;
       const cate = this.$route.params.id || -1
      return {
        page,
        limit,
        cate
      };
    },
  },
  async created() {
    const { page, limit, cate } = this.getRouteInfo;
    const result = await getBlogList(page, limit, cate);
    const newRes = result.data.rows.map((item) => {
      return {
        ...item,
        createDate: getDateFormat(item.createDate),
      };
    });
    this.blogList = newRes;
    this.total = result.data.total;
    this.isLoading = false;
  },
  methods: {
    handlePage(newPage) {
      this.current = newPage;
      const query = {
        page: newPage,
        limit: this.getRouteInfo.limit,
      };
      //有分类
      if (this.getRouteInfo.cate !== -1) {
        this.$router.push({
          name: "CategoryBlog",
          query,
          params: {
            id: this.getRouteInfo.cate,
          },
        });
        return;
      }

      //没有分类
      this.$router.push({
        name: "Blog",
        query,
      });
    },
    handleScroll() {
      this.$bus.$emit("mainScroll", this.$refs.mainContainer);
    },
    handleSetMainScroll(scrollTop) {
      this.$refs.mainContainer.scrollTop = scrollTop;
    },
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
  watch: {
    async $route() {
      this.isLoading = true;
      this.$refs.mainContainer.scrollTop = 0;

      const { page, limit, cate } = this.getRouteInfo;

      const result = await getBlogList(page, limit, cate);
      this.blogList = result.data.rows;
      this.total = result.data.total;
      this.isLoading = false;
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/var.less";

.blog-list-container {
  line-height: 1.7;
  position: relative;
  padding: 20px;
  overflow-y: scroll;
  scroll-behavior: smooth;
  width: 100%;
  height: 100%;
  box-sizing: border-box;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}

li {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid @gray;

  .thumb {
    flex: 0 0 auto;
    margin-right: 15px;

    img {
      display: block;
      max-width: 200px;
      border-radius: 5px;
    }
  }

  .main {
    flex: 1 1 auto;

    h2 {
      margin: 0;
    }
  }

  .aside {
    font-size: 12px;
    color: @gray;

    span {
      margin-right: 15px;
    }
  }

  .desc {
    margin: 15px 0;
    font-size: 14px;
  }
}
</style>
