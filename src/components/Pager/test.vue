<template>
  <div>
    <Pager @changePage="handleChangePage($event)" :current="current" :total="205" />
    <Pager @changePage="handleChangePage($event)" :current="current" :total="205" />
  </div>
</template>

<script>
import Pager from './';


export default {
  data() {
    return {
      url1 : "https://img2.baidu.com/it/u=2814429148,2262424695&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1729875600&t=dbb775cc03789fef60b9d06d52face4c",
      current : 5,
    }
  },  
  components: {
    Pager
  }, 
  methods: {
    handleChangePage(newPage) {
      this.current = newPage
      console.log("数据加载中");
    }
   },  
}
</script>

<style scoped>

</style>
