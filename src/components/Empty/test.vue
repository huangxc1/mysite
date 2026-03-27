<template>
    <div class="test-container">
        <Empty />
    </div>
</template>

<script>
import Empty from "./"
export default {
    components: {
        Empty
    }
}
</script>

<style>
    .test-container {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 550px;
        height: 550px;
        border: 1px solid red;
    }
</style>