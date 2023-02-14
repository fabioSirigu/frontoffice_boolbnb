<script>

export default {
    name: 'single-home',

}
</script>

<template>
    <div class="container">
        <div class="row align-items-center align-content-start">
            <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-3 text-center " v-for="home in homes.data">
                <div>
                    <div class="single_home_contents p-2">
                        <img class="home_image" :src="imageConverter(home.cover_image)">
                        <div class="card-body justify-content-center mt-2">
                            <h5 class="card_title bold card-title text-center py-3">
                                {{ trimBody(home.title) }}
                            </h5>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">

</style>