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
            return "https://upload.wikimedia.org/wikipedia/commons/c/cd/Immagine_non_disponibile.JPG";
        }
    },
    mounted() {
        this.getHomes(this.api_url + "/api/homes");
    },
}
</script>

<template>
<div class="row justify-content-between align-items-center">
    <div class="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-3 col-xxl-3 m-2 p-0" v-for="home in homes">
        <div class="card_minimal_wrapper">
        <img :src="imageConverter(home.cover_image)" alt="{{ home.title }}">
            <div class="card_minimal_elements d-flex justify-content-center flex-column text-white">
                <h5 class="card-title">
                    <strong>{{ home.title }}</strong>
                </h5>
            </div>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
</style>