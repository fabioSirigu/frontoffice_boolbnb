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
      max: 30,
      cityName: ''
    };
  },
  props: [
      'filteredHomes'
  ],
  created() {
    this.results = this.$route.query.results;
    this.cityName = this.$route.params.cityName;
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
<div>
  <div class="search_results_wrapper">
    <div class="search_results_elements py-3">
      <div class="titles_wrapper">
        <div class="titles_elements text-center">
          <h1 class="main_title black">
              Affina la tua ricerca
          </h1>
          <!-- Button trigger modal -->
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Launch demo modal
          </button>

          <!-- Modal -->
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  ...
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
</div>
<!-- <div>
  <div class="titles_wrapper">
      <div class="titles_elements text-center">
        <h1 class="main_title black">
            Effettua la tua Ricerca
        </h1>
      </div>
  </div>
</div> -->
</template>

<style lang="scss">

</style>