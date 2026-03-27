<template>
  <div
    class="home-item-container"
    ref="containerSize"
    @mousemove="handleMousemove"
    @mouseleave="handleMouseleave"
  >
    <div class="image" :style="imageLocation" ref="imageSize">
      <ImageLoader
        @load="handleLoad"
        :placeholder="homeItemData.midImg"
        :src="homeItemData.bigImg"
      />
    </div>
    <h2 class="title" ref="title">{{ homeItemData.title }}</h2>
    <h3 class="description" ref="des">{{ homeItemData.description }}</h3>
  </div>
</template>

<script>
import ImageLoader from "@/components/ImageLoader";
export default {
  data() {
    return {
      titletWidth: 0,
      desWidth: 0,
      containerWidth: 0, //容器的宽度
      containerHeight: 0,
      innerWidth: 0, //里层图片的宽度
      innerHeight: 0,
      mouseX: 0, //鼠标x轴位置
      mouseY: 0, //鼠标y轴位置
      containerClientLeft: 0, //容器距离视口的左边距离
      containerClientTop: 0, //容器距离视口的上边距离
      extraWidth: 0, //图片额外的宽度
      extraHeight: 0, //图片额外的高度
    };
  },
  computed: {
    imageLocation() {
      if (!this.mouseX && !this.containerWidth) {
        return;
      }
      const left = (this.mouseX / this.containerWidth) * this.extraWidth;
      const top = (this.mouseY / this.containerHeight) * this.extraHeight;
      return {
        transform: `translate(${left}px,${top}px)`,
      };
    },
    center() {
      return {
        x: this.containerWidth / 2,
        y: this.containerHeight / 2,
      };
    },
  },
  components: {
    ImageLoader,
  },
  props: ["homeItemData"],
  mounted() {
    this.titletWidth = this.$refs.title.clientWidth;
    this.desWidth = this.$refs.des.clientWidth;
    //鼠标移动效果代码
    this.handleResize();
    this.handleMouseleave();
    //改变尺寸重新获取
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleLoad() {
      //标题动画
      this.$refs.title.style.opacity = 1;
      this.$refs.title.style.width = 0;
      this.$refs.title.clientWidth; //强制渲染
      this.$refs.title.style.transition = "1s";

      this.$refs.title.style.width = this.titletWidth + "px";

      //描述动画
      this.$refs.des.style.opacity = 1;
      this.$refs.des.style.width = 0;
      this.$refs.des.clientWidth;
      this.$refs.des.style.transition = "2s 1s";

      this.$refs.des.style.width = this.desWidth + "px";
    },
    handleResize() {
      //记录容器宽高
      this.containerWidth = this.$refs.containerSize.clientWidth;
      this.containerHeight = this.$refs.containerSize.clientHeight;
      //记录图片宽高
      this.innerWidth = this.$refs.imageSize.clientWidth;
      this.innerHeight = this.$refs.imageSize.clientHeight;
      //容器和图片差
      this.extraWidth = this.containerWidth - this.innerWidth;
      this.extraHeight = this.containerHeight - this.innerHeight;
    },
    handleMousemove(e) {
      this.containerClientLeft =
        this.$refs.containerSize.getBoundingClientRect().left;
      this.containerClientTop =
        this.$refs.containerSize.getBoundingClientRect().top;
  
      this.mouseX = e.clientX - this.containerClientLeft;
      this.mouseY = e.clientY - this.containerClientTop;
    },
    handleMouseleave() {
      this.mouseX = this.center.x;
      this.mouseY = this.center.y;
    },
  },
};
</script>

<style lang="less" scoped>
.home-item-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;

  //
  .image {
    position: absolute;
    top: 0;
    left: 0;
    width: 110%;
    height: 110%;
    z-index: -1;
    transition: all 0.2s;
  }

  .title,
  .description {
    position: absolute;
    left: 8%;
    color: #ffffff;
  }

  .title {
    top: calc(50% - 25px);
    overflow: hidden;
    opacity: 0;
    white-space: nowrap;
    letter-spacing: 5px;
  }

  .description {
    top: calc(50% + 25px);
    opacity: 0;
    overflow: hidden;
    white-space: nowrap;
    letter-spacing: 5px;
  }
}
</style>