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
    <div class="single_home_contents col-12 col-sm-12 col-md-6 col-lg-4 col-xl-4 col-xxl-3 p-2">
        <div>
            <router-link class="link-card" :to="{ name: 'single-home', params: { slug: home.slug } }">
                <div class="image text-center">
                    <img class="home_image" :src="imageConverter(home.cover_image)">
                </div>
                <div class="details_card">
                    <div class="text-center">
                        <div class="text-center">
                            <h5 class="card_title bold card-title py-3">
                                {{ trimBody(home.title) }}
                            </h5>
                            <h5>{{ home.address }}</h5>
                        </div>
                        <ul>
                            <li>{{ home.rooms }} stanze</li>
                            <li>{{ home.beds }} letti</li>
                            <li>{{ home.bathrooms }} bagni</li>
                            <li>{{ home.square_meters }} mq</li>
                        </ul>
                        <ul v-if="home.services.length > 0">
                            <li v-for="service in home.services">{{ service.title }}</li>
                        </ul>
                        <ul v-else>
                            <li class="italic">Nessun servizio extra</li>
                        </ul>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<style lang="scss">
@import "../assets/scss/style.scss";

.link-card {
    text-decoration: none;
    color: black;

    &:hover {
        transition: 0.4s;
        color: $primary;

        .home_image {
            filter: grayscale(0.6);
            transition: 0.4s;
        }
    }


    .card_title {
        font-size: 15px;
    }

    .home_image {
        width: 300px;
        height: 300px;
        aspect-ratio: 1/1;
        border-radius: 25px;
        margin-bottom: 5px;
        object-fit: cover;
    }

    .details_card {

        ul {
            display: flex;
            padding-left: 0;
            margin-bottom: 0;
            justify-content: center;

            li {
                list-style: disc;
                padding: 0, 5px;
                margin-right: 1.2rem;
                color: gray;
            }

            li:first-child {
                list-style: none;
            }
        }
    }
}
</style>