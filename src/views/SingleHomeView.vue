<script>
import axios from 'axios'
import { store } from '../main.js'
export default {
    name: 'SingleHomeView',
    data() {
        return {
            store,
            home: {},
            loading: true,
        }
    },
    mounted() {
        //console.log(this.$route.params.slug);
        const url = this.store.api_base_url + '/api/homes/' + this.$route.params.slug
        console.log(url);
        axios.get(url)
            .then(response => {
                if (response.data.success) {
                    this.home = response.data.data
                    this.loading = false
                } else {
                    this.$router.push({ name: 'not-found' })
                }
                console.log(response);
            }).catch(error => {
                console.log(error)
            })
    }

}
</script>

<template>

    <div class="container my-3">
        <div class="row align-items-center align-content-start">
            <div class="col-12 col-sm-12 text-center">
                <div class="single_home_contents p-2">
                    <img class="home_image" :src="this.home.cover_image">
                    <div class="card-body justify-content-center mt-2">
                        <h3 class="card_title bold card-title text-center py-3">
                            {{ this.home.title }}
                        </h3>
                        <h5>
                            Stanze:
                            {{ this.home.rooms }}
                        </h5>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">

</style>