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

        axios.get(url)
            .then(response => {
                if (response.data.success) {
                    this.home = response.data.data
                    this.loading = false
                } else {
                    this.$router.push({ name: 'not-found' })
                }
                //console.log(response);
            }).catch(error => {
                console.log(error)
            })
    }

}
</script>

<template>

    <div class="container my-3">
        <div class="row align-items-center">
            <div class="col-12 col-sm-12">
                <div class="single_home_contents p-2">
                    <div class="title">
                        <h1 class="bold py-3">
                            {{ this.home.title }}
                        </h1>
                        <h4>
                            {{ this.home.address }}
                        </h4>
                    </div>
                    <div class="card-body justify-content-center my-2">
                        <img class="home-image" :src="store.api_base_url + '/storage/' + home.cover_image">
                    </div>

                    <div class="details">
                        <ul class="d-flex ">
                            <li>{{ this.home.rooms }} stanze</li>
                            <li>{{ this.home.beds }} letti</li>
                            <li>{{ this.home.bathrooms }} bagni</li>
                            <li>{{ this.home.square_meters }}mq</li>
                        </ul>
                    </div>
                    <div class="services">
                        <h3>Ecco i servizi disponibili</h3>
                        <ul class="d-flex ">
                            <li v-for="service in this.home.services">{{ service.title }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.home-image {
    width: 100%;
}

.details {
    width: 50%;
    border-bottom: 2px solid lightgrey;

    ul {
        padding-left: 0;


        li {
            list-style: disc;
            padding: 0, 5px;
            margin-right: 1.2rem;
        }

        li:first-child {
            list-style: none;
            padding-left: 0;
        }
    }

}

.services {
    margin-top: 0.75rem;
    width: 50%;
    border-bottom: 2px solid lightgrey;

    ul {
        padding-left: 0;


        li {
            list-style: disc;
            padding: 0, 5px;
            margin-right: 1.2rem;
        }

        li:first-child {
            list-style: none;
            padding-left: 0;
        }
    }

}
</style>