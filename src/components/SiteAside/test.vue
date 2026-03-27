<template>
    <div class="test-container">
        <SiteAside />
    </div>
</template>

<script>
import SiteAside from "./"
console.log(14* 4 + 25);

export default {
    components: {
        SiteAside
    }
};
</script>

<style scoped lang="less">
.test-container {
    // position: fixed;
    // left: 0;
    // top: 0;
    width: 250px;
    height: 100vh;
}
</style>
