<script>
import axios from 'axios'

export default {
    'name': 'Single Home Content',
    data() {
        return {
            api_url: "http://127.0.0.1:8000",
            homes: {},
            error: "",
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
        }
    },
    mounted() {
        this.getHomes(this.api_url + "/api/homes");
    },
}
</script>

<template>
    <div class="row justify-content-around align-items-center">
        <div class="col-12 col-sm-12 col-md-6 col-lg-2 col-xl-2 col-xxl-2 text-center" v-for="home in homes.data">
            <img class="home_image" :src="imageConverter(home.cover_image)">
            <div class="card-body justify-content-center mt-2">
                <h5 class="card-title text-center">
                    {{ home.title }}
                </h5>

                <p class="card-description text-center">
                    {{ home.address }}
                </p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.home_image {
    width: 350px;
    height: 350px;
    aspect-ratio: 1/1;
    border-radius: 25px;
}
</style>