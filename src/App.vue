<template>
  <div class="app-container">
    <Layout>
      <template #left>
        <div class="aside">
          <SiteAside />
        </div>
      </template>
      <template>
        <div class="main">
          <RouterView></RouterView>
        </div>
      </template>
    </Layout>
    <ToTop></ToTop>
  </div>
</template>

<script>
import Layout from '@/components/Layout'
import SiteAside from "@/components/SiteAside"
import ToTop from "./components/ToTop";



export default {
  name: "App",
  components: {
    Layout,
    SiteAside,
    ToTop
  }
};
</script>

<style scoped lang="less">
.app-container {
  // position: fixed;
  // left: 0;
  // top: 0;
  width: 100%;
  height: 100vh;
  .aside {
    width: 250px;
    height: 100%;
  }
  .main {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
}
</style>
