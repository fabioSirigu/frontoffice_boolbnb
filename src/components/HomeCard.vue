<script>
import { store } from '../main.js';

export default {
    name: 'HomeCard',
    props: {
        home: Object,
    },
    data() {
        return {
            store,
            api_url: store.api_base_url,
            error: "",
            max: 30,
        };
    },
    methods: {
        imageConverter(way) {
            console.log(way);
            if (way) {
                return this.api_url + "/storage/" + way;
            }
            return "https://htmlcolors.com/brand-image/airbnb.png";
        },
        trimBody(text) {
            if (text.length > this.max) {
                return text.slice(0, this.max) + '...'
            }
            return text
        }
    },
}
</script>

<template>
    <div class="single_home_contents col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-3 text-center p-2">
        <img class="home_image" :src="imageConverter(home.cover_image)">
        <div class="card-body justify-content-center mt-2">
            <h5 class="card_title bold card-title text-center py-3">
                {{ trimBody(home.title) }}
            </h5>
            <router-link :to="{ name: 'single-home', params: { slug: home.slug } }">Leggi di
                più</router-link>
        </div>
    </div>
</template>

<style lang="scss">
.card_title {
    font-size: 15px;
}

.home_image {
    width: 300px;
    height: 300px;
    aspect-ratio: 1/1;
    border-radius: 25px;
}
</style>