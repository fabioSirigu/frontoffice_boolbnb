<script>
import axios from 'axios'

export default {
    'name' : 'Single Home Content',
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
    <div class="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 col-xxl-4 text-center" v-for="home in homes.data">
            <img class="home_image" :src="imageConverter(home.cover_image)">
            <div class="card-body d-flex justify-content-center py-3">
                <h5 class="card-title text-center">
                    {{ home.title }}
                </h5>
            </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
.home_image {
    width: 300px;
    height: 300px;
    aspect-ratio: 1/1;
    border-radius: 25px;
}
</style>