<template>
  <div class="app">
    <ImageLoader 
      v-loading="1"
    placeholder="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?w=100" 
    src="https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?fit=crop&crop=entropy&w=3456&h=2304" 
    @load="getPicture"
    :duration="3000"
    />
  </div>
</template>

<script>
import ImageLoader from "./";

export default {
  components: {
    ImageLoader,
  },
  directives: {
    loading: {

    }
  },
  methods: {
    getPicture() {
      console.log("图片加载完成",);
    },
  }
};
</script>

<style>
</style>