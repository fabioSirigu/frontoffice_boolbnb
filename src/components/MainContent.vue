<script>
import SingleHomeContent from '../components/SingleHomeContent.vue';

export default {
    "name": "Main Content",
    components: { SingleHomeContent }
}
</script>

<template>
<div class="main_wrapper p-5">
    <div class="main_elements">
        <div class="titles_wrapper">
            <div class="titles_elements">

            </div>
        </div>
        <div class="homes_wrapper">
            <SingleHomeContent></SingleHomeContent>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>

</style>
