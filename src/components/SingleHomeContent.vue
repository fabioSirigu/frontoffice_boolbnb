<script>
import axios from 'axios'

export default {
    'name': 'Single Home Content',
    data() {
        return {
            api_url: "http://127.0.0.1:8000",
            homes: {},
            error: "",
            max: 30,
        };
    },
    methods: {
        getHomes(url) {
            axios.get(url)
                .then(response => {
                    console.log(response.data);
                    this.homes = response.data;
                })
                .catch(error => {
                    console.error(error);
                    this.error = error.message;
                });
        },
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
    mounted() {
        this.getHomes(this.api_url + "/api/homes");
    },
}
</script>

<template>
    <div class="row align-items-center align-content-start">
        <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-3 text-center " v-for="(home, index) in homes.data">
            <div v-if="index<4">
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