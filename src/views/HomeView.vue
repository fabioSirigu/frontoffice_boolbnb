<script>
import { store } from '../main.js';
import axios from 'axios';

import HomeCard from '../components/HomeCard.vue';

export default {
    name: "HomeView",
    components: {
        HomeCard
    },
    props: [
        'filteredHomes'
    ],
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
    data() {
        return {
            store,
            api_url: store.api_base_url,
            loading: false,
            max: 30,
            homes: {},
        }
    }, mounted() {
        this.getHomes(this.api_url + "/api/homes");
    }
}
</script>

<template>
    <div class="main_wrapper p-3">
        <div class="main_elements">
            <div class="titles_wrapper">
                <div class="titles_elements text-center">
                    <h1 class="main_title black">
                        Cerchi Casa? <br>
                        <span class="fancy">BoolBnb</span>.
                    </h1>
                    <p>
                        Con <span class="bold">BoolBnb</span>, puoi affittare la tua casa ideale <span class="bold">ovunque
                            tu voglia</span>, <span class="bold">quando vuoi</span>. <br>
                        Siamo il primo sistema di affitto case al mondo che ti offre una gamma completa di opzioni, <br>
                        inoltre, siamo orgogliosi di offrire un'esperienza di prenotazione semplice e intuitiva, <br>
                        che ti permette di prenotare la tua casa ideale in pochi clic.
                    </p>
                </div>
            </div>
            <div class="search_wrapper">
                <div class="search_elements">
                    <div class="row align-items-center align-content-start">

                    </div>
                </div>
            </div>
            <div class="homes_wrapper">
                <div class="single_home_wrapper">
                    <div class="container px-4 single_home_elements">
                        <div class="row g-5 align-items-center align-content-start">
                            <HomeCard v-for="home in homes.data" :home="home"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
@import "../assets/scss/style.scss";

.main_title {
    color: black;
    font-weight: 800;
    font-size: 50px;
}

.secondary_title {
    color: black;
    font-weight: 800;
    font-size: 50px;
}

.fancy {
    color: $primary;
}

.show_button {
    display: inline-block;
    color: white;
    background-color: $primary;
    padding: 10px;
    text-decoration: none;
    border-radius: 20px;
    width: 150px;
    height: 100%;
    text-align: center;
}

.show_button:hover {
    transition: 0.4s;
    color: $primary;
    background-color: white;
}

.close_button_alert {
    font-size: 30px;
}
</style>