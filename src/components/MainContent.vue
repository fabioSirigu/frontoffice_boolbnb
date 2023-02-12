<script>
import SingleHomeContent from '../components/SingleHomeContent.vue';

export default {
    "name": "Main Content",
    components: { SingleHomeContent }
}
</script>

<template>
<div class="main_wrapper p-3">
    <div class="main_elements">
        <div class="titles_wrapper">
            <div class="titles_elements py-4 text-center">
                <h1 class="main_title black">
                    Cerchi Casa? <br>
                    <span class="fancy">BoolBnb</span>.
                </h1>
            </div>
        </div>
        <div class="homes_wrapper">
            <SingleHomeContent></SingleHomeContent>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
.main_title {
    color: black;
    font-weight: 800;
    font-size: 75px;
}

.fancy {
    color: #ff5a5f;
}
</style>
