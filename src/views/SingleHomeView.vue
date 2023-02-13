<script>
import axios from 'axios';

export default {
    name : 'Single Home View',
    data() {
        return {
            api_url: "http://127.0.0.1:8000",
            homes: '',
            error: "",
            loading: true
        }
    },
    methods: {
    imageConverter(way) {
        console.log(way);
        if (way) {
            return this.api_url + "/storage/" + way;
        }
        return "https://htmlcolors.com/brand-image/airbnb.png";
    }
    },
    mounted() {
        //console.log(this.$route.params.slug);
        const link = this.api_url + '/api/homes/' + this.$route.params.slug
        console.log(link)
        axios.get(link)
        .then(response => {
            if(response.data.success) {
                this.home = response.data;
                console.log(home)
                this.loading = false;
            }
            console.log(response)
        }).catch(error =>
            console.log(error)
    )}
}
</script>

<template>
<div class="single_project_wrapper vh-100 d-flex justify-content-center flex-column">
    <div class="single_project_elements py-4" v-if="!loading">
        <div class="container">
            <div class="single_project text-center mt-5 mb-5">
                <img class="project_image" :src="api_url + '/storage/' + project.data.image" :alt="project.data.title">
                <div class="project_contents py-4 text-center">
                    <p class="project_content text-white">
                        {{ project.data.content }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style lang="scss">
.project_image {
    width:500px;
}
.project_title {
    font-size: 30px;
}
.project_content {
    font-size: 15px;
}
</style>