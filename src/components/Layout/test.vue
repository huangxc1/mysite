<template>
    <div class="test-container">
        <Layout>
            <template #left>
                <div class="left">
                    我是左边区域
                </div>
            </template>
            <template>
                <div class="main">
                    我是内容区域
                    我是内容区域
                    我是内容区域
                    我是内容区域
                    我是内容区域
                    我是内容区域
                    我是内容区域
                    我是内容区域
                    我是内容区域
                    我是内容区域
                    我是内容区域
                    我是内容区域
                    我是内容区域
                </div>
            </template>
            <template #right>
                <div class="right">
                    我是右边区域
                </div>
            </template>
        </Layout>
    </div>
</template>

<script>

import Layout from "./"
export default {
    components: {
        Layout
    }
};
</script>

<style scoped>
.test-container {
    width: 60%;
    height: 500px;
    border: 1px solid red;
    margin: 0 auto;
}
.left {
    width: 200px;
    height: 100%;
    background-color: aqua;
}
.main {
    width: 100%;
    height: 100%;
    background-color: red;
    white-space: nowrap;
}
.right {
    width: 100px;
    height: 100%;
}
</style>
