<template>
    <div>
        <RightList :list="list" />
    </div>
</template>

<script>
import RightList from "./RightList.vue"
export default {
    data() {
        return {
            list: [
                { name: "a", isSelected: false },
                { name: "b", isSelected: false },
                {
                    name: "c", isSelected: true, children: [
                        { name: "a", isSelected: false },
                        { name: "a", isSelected: false },
                    ]
                }
                , { name: "d", isSelected: false }
            ]
        }
    },
    components: {
        RightList
    }
}


</script>
<style scoped lang="less">

</style>