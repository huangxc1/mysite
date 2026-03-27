<template>
  <div class="image-loader-container">
    <img v-if="!isAllLoader" class="filter" :src="placeholder" />
    <img @load="getPicture" :style="{
      opacity: load,
      transition: `${duration}ms`,
    }" :src="src" />
  </div>
</template>

<script>

export default {
  data() {
    return {
      isLoader: false,
      isAllLoader: false,
    };
  },
  props: {
    src: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 500,
    },
  },
  computed: {
    load() {
      return this.isLoader ? 1 : 0;
    },
  },
  methods: {
    getPicture() {
      this.isLoader = true;
      setTimeout(() => {
        this.isAllLoader = true
        this.$emit("load");
      }, this.duration);
    },
  },
};
</script>

<style scoped lang="less">
@import "~@/styles/global.less";

.image-loader-container {
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    left: 0;
    top: 0;
  }

  .filter {
    filter: blur(1vw);
  }
}
</style>