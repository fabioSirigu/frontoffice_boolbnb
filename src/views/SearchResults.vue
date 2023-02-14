<script>
import { main } from '@popperjs/core';
import axios from 'axios'
import { store } from '../main.js';

export default {
  name: 'SearchResults',
  data() {
    return {
      api_url: store.api_base_url,
      results: [],
      error: '',
      max: 30
    };
  },
  props: [
      'filteredHomes'
  ],
  created() {
    this.results = this.$route.query.results;
  },
  methods : {
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
  }
};
</script>

<template>
<div class="search_results_wrapper">
  <div class="search_results_elements py-3">
    <div class="row align-items-center align-content-start">
        <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-3 text-center" v-for="home in filteredHomes">
            <div class="single_home_contents p-2">
                <img class="home_image" :src="imageConverter(home.cover_image)">
                <div class="card-body justify-content-center mt-2">
                    <h5 class="card_title bold card-title text-center py-3">
                        {{ trimBody(home.title) }}
                    </h5>
                    <router-link class="home_link black" :to="{ name: 'single-home', params: { slug: home.slug } }">
                      SCOPRI ORA
                    </router-link>
                </div>
            </div>
          </div>
      </div>
  </div>
</div>
</template>

<style lang="scss">

</style>