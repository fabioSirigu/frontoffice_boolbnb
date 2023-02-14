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
      rooms: '',
      services: [],
      selectedServices: [],
      searchFilteredHomes: []
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
        },
        async getServices() {
            try {
              const response = await axios.get(this.api_url + '/api/services')
              this.services = response.data
            } catch (error) {
              console.error(error)
            }
          },
          async filterHomes() {
            try {
              const response = await axios.get(this.api_url + '/api/homes/filter', {
                params: {
                  rooms: this.rooms,
                  services: this.selectedServices
                }
              })
              this.searchFilteredHomes = response.data
            } catch (error) {
              console.error(error)
            }
          }
        },
        mounted() {
          this.getServices()
        }
  }
</script>

<template>
<div>
  <div class="search_results_wrapper">
    <div class="search_results_elements py-3">
      <div class="titles_wrapper">
        <div class="titles_elements text-center">
          <h1 class="main_title search_title black">
              Affina la tua ricerca
          </h1>
          <div class="button_filter_wrapper py-3">
            <div class="button_filter_elements">
              <!-- Button trigger modal -->
              <button type="button" class="btn modal_filter" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Filtra i risultati
              </button>

              <!-- Modal -->
              <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">
                        Di cos'hai bisogno?
                      </h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <div class="filters_wrapper">
                        <div class="filters_elements p-3 d-flex justify-content-center flex-column">
                          <label class="mb-2" for="services">Di quante camere hai bisogno?</label>
                          <input class="search_header mb-4" type="text" placeholder="Quante camere?" v-model="rooms"/>
                          <label class="mb-2" for="services">Seleziona i servizi:</label>
                          <select class="multiple_filter" v-model="selectedServices" id="services" multiple>
                            <option v-for="service in services" :key="service.id" :value="service.slug">
                              {{ service.title }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn modal_button_close" data-bs-dismiss="modal">Annulla</button>
                      <button type="button" class="btn modal_button_salva">Scopri 22 risultati</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="homes_wrapper">
        <div class="homes_elements">
          <div class="row align-items-center align-content-start m-0">
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
.modal_filter_wrap {
  border-radius: 20px;
}

.multiple_filter {
  border: 1px solid rgba(0, 0, 0, 0.175);
  border-radius: 20px;
  padding: 10px;
  width: 100%;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.092);
  font-size: 13px;
}

.modal_filter {
  display: inline-block;
  color: white;
  background-color: #ff5a5f;
  padding: 10px;
  text-decoration: none;
  border-radius: 20px;
  width: 150px;
  height: 100%;
  font-size: 13px;
  text-align: center;
}
.modal_filter:hover {
  transition: 0.4s;
  color: #ff5a5f;
  background-color: white;
  cursor: pointer;
}

.modal_button_close {
  color: white;
  background-color: black;
  padding: 10px;
  text-decoration: none;
  border-radius: 20px;
  width: 100px;
  height: 100%;
  font-size: 13px;
  text-align: center;
}
.modal_button_close:hover {
  transition: 0.4s;
  background-color: white;
  cursor: pointer;
}

.modal_button_salva {
  color: white;
  background-color: #ff5a5f;
  padding: 10px;
  text-decoration: none;
  border-radius: 20px;
  width: 150px;
  height: 100%;
  font-size: 13px;
  text-align: center;
}
.modal_button_salva:hover {
  transition: 0.4s;
  color: black;
  background-color: white;
  cursor: pointer;
}
</style>