<template>
    <div class="blog-container">
        <Layout>
            <div class="main">
                <BlogList>

                </BlogList>
            </div>
            <template #right>
                <div class="right">
                    <BlogCategory :limit="limit">

                    </BlogCategory>
                </div>
            </template>
        </Layout>
    </div>
</template>

<script>
import BlogCategory from "./components/BlogCategory.vue";
import BlogList from "./components/BlogList.vue";
import RightList from "./components/RightList.vue";
import Layout from "@/components/Layout";
export default {
    data() {
        return {
            blog: [],
            limit:10 //控制分类的显示数量
        }
    },
    components: {
        RightList,
        Layout,
        BlogCategory,
        BlogList
    },
    methods: {
        handleSelect(item) {


        }
    }
}


</script>
<style scoped lang="less">
.blog-container {
    width: 100%;
    height: 100%;

    .main {
        width: 100%;
        height: 100%;
    }
    .right {
        width: 300px;
        height: 100%;
    }
}
</style>