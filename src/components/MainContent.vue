<script>
import { store } from '../main.js';

import SingleHomeContent from '../components/SingleHomeContent.vue';

export default {
    name: "MainContent",
    components: {
        SingleHomeContent
    },
    props: [
        'filteredHomes'
    ],
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
    data() {
        return {
            store,
            api_url: store.api_base_url,
            loading: false,
            max: 30,
        }
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
                        Con <span class="bold">BoolBnb</span>, puoi affittare la tua casa ideale <span
                            class="bold">ovunque tu voglia</span>, <span class="bold">quando vuoi</span>. <br>
                        Siamo il primo sistema di affitto case al mondo che ti offre una gamma completa di opzioni, <br>
                        inoltre, siamo orgogliosi di offrire un'esperienza di prenotazione semplice e intuitiva, <br>
                        che ti permette di prenotare la tua casa ideale in pochi clic.
                    </p>
                </div>
            </div>
            <div class="search_wrapper">
                <div class="search_elements">
                    <div class="row align-items-center align-content-start">
                        <!-- <div>
                            <div class="alert alert-danger alert-dismissible fade show d-flex justify-content-between align-items-center"
                                role="alert">
                                <p class="p-0 m-0">
                                    Nessuna corrispondenza.
                                </p>
                                <button type="button" class="close btn close_button_alert" data-dismiss="alert"
                                    aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        </div> -->
                        <!-- <div class="row align-items-center align-content-start">
                            <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-3 text-center "
                                v-for="home in filteredHomes">
                                <div class="single_home_contents p-2">
                                    <img class="home_image" :src="imageConverter(home.cover_image)">
                                    <div class="card-body justify-content-center mt-2">
                                        <h5 class="card_title bold card-title text-center py-3">
                                            {{ trimBody(home.title) }}
                                        </h5>
                                        <router-link :to="{ name: 'single-home', params: { slug: home.slug } }">Leggi di
                                            più</router-link>

                                    </div>
                                </div>
                            </div>
                        </div> -->
                    </div>
                </div>
            </div>
            <div class="homes_wrapper">
                <h1 class="secondary_title text-center black p-4">
                    In primo piano
                </h1>
                <SingleHomeContent></SingleHomeContent>
                <div class="show_more_cta d-flex justify-content-center">
                    <a class="show_button" href="#">Tutte le case</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
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
    color: #ff5a5f;
}

.show_button {
    display: inline-block;
    color: white;
    background-color: #ff5a5f;
    padding: 10px;
    text-decoration: none;
    border-radius: 20px;
    width: 150px;
    height: 100%;
    text-align: center;
}

.show_button:hover {
    transition: 0.4s;
    color: #ff5a5f;
    background-color: white;
}

.close_button_alert {
    font-size: 30px;
}
</style>
