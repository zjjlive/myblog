<template>
    <div class="user-center">
        <Header/>
        <router-view></router-view>
    </div>
</template>
<script>
import Header from "@/components/Header.vue";
export default {
    components:{
        Header
    }
}
</script>
<style scoped>

</style>
