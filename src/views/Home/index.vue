<template>
  <div class="home-container" ref="containerHeight" v-loading="loading">
    <ul
      @transitionend="handeleTransitionend"
      @wheel="handleWheel"
      class="content"
      :style="{
        marginTop,
      }"
      v-if="data.length > 0"
    >
      <li v-for="item in data" :key="item.id">
        <home-item :homeItemData="item"></home-item>
      </li>
    </ul>
    <div v-show="index !== 0" @click="switchIndex(index - 1)" class="arrowUp">
      <Icon type="arrowUp" />
    </div>
    <div
      v-show="index < data.length - 1"
      @click="switchIndex(index + 1)"
      class="arrowDown"
    >
      <Icon type="arrowDown" />
    </div>
    <ul class="point">
      <li
        @click="switchIndex(i)"
        v-for="(item, i) in data"
        :class="{
          active: i === index,
        }"
        :key="i"
      ></li>
    </ul>
  </div>
</template>

<script>
import HomeItem from "./HomeItem";
import Icon from "@/components/Icon";
import { mapState } from "vuex";
export default {
  data() {
    return {
      index: 0, // 当前轮播图显示的第几个
      clientH: 0, //切换轮播显示的高度
      switching: false,
    };
  },
  mounted() {
    this.clientH = this.$refs.containerHeight.clientHeight;
    window.addEventListener("resize", this.handleResize);
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
  },
  components: {
    HomeItem,
    Icon,
  },
  async created() {
    this.$store.dispatch("banner/fetchBanner");
  },
  computed: {
    marginTop() {
      return -this.index * this.clientH + "px";
    },
    ...mapState("banner", ["data", "loading"]),
  },
  methods: {
    switchIndex(i) {
      this.index = i;
    },
    handleWheel(e) {
      if (this.switching) {
        return;
      }
      if (e.deltaY > 0 && this.index < this.data.length - 1) {
        this.switching = true;
        this.index++;
      } else if (e.deltaY < 0 && this.index > 0) {
        this.switching = true;
        this.index--;
      }
    },
    handeleTransitionend() {
      this.switching = false;
    },
    handleResize() {
      this.clientH = this.$refs.containerHeight.clientHeight;
    },
  },
};
</script>
<style scoped lang="less">
.home-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .content {
    width: 100%;
    height: 100%;
    transition: all 0.8s;

    li {
      width: 100%;
      height: 100%;
      // background-color: aqua;
    }
  }

  .arrowUp {
    // width: 35px;
    // height: 35px;
    // text-align: center;
    // line-height: 35px;
    // background-color: rgba(0, 0, 0, 0.2);
    cursor: pointer;
    position: absolute;
    top: 30px;
    left: 50%;
    border-radius: 0 0 50% 50%;
    font-size: 25px;
    animation: upMove 2.5s infinite;
  }

  .arrowDown {
    // width: 35px;
    // height: 35px;
    // text-align: center;
    // line-height: 35px;
    // background-color: rgba(0, 0, 0, 0.2);
    cursor: pointer;
    position: absolute;
    bottom: 30px;
    left: 50%;
    border-radius: 50% 50% 0 0;
    font-size: 25px;
    animation: downMove 2.5s infinite;
  }

  .point {
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);

    li {
      width: 13px;
      height: 13px;
      border: 1px solid rgba(255, 255, 255, 0.7);
      border-radius: 50%;
      margin-bottom: 5px;
    }
  }

  .active {
    background-color: rgba(255, 255, 255, 0.7);
  }
}

@keyframes upMove {
  0% {
    transform: translate(-50%, -50%) translateY(0);
  }

  50% {
    transform: translate(-50%, -50%) translateY(-10px);
  }

  100% {
    transform: translate(-50%, -50%) translateY(0);
  }
}

@keyframes downMove {
  0% {
    transform: translate(-50%, -50%) translateY(0);
  }

  50% {
    transform: translate(-50%, -50%) translateY(10px);
  }

  100% {
    transform: translate(-50%, -50%) translateY(0);
  }
}
</style>