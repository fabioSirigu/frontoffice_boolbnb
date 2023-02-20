<script>
import { main } from '@popperjs/core';
import axios from 'axios'
import HomeCard from '../components/HomeCard.vue';
import { store } from '../main.js';

export default {
    name: "SearchResults",
    data() {
        return {
            api_url: store.api_base_url,
            error: "",
            max: 30,
            services: [],
            rooms: "",
            beds: "",
            radius: "",
            selectedServices: [],
            searchFilteredHomes: [],
            filteredRoomServicesHomes: [],
            functionActive: false,
            latitude: this.$route.query.latitude,
            longitude: this.$route.query.longitude
        };
    },
    props: [
        'filteredHomes'
    ],
    methods: {
        imageConverter(way) {
            //console.log(way);
            if (way) {
                return this.api_url + "/storage/" + way;
            }
            return "https://htmlcolors.com/brand-image/airbnb.png";
        },
        trimBody(text) {
            if (text.length > this.max) {
                return text.slice(0, this.max) + "...";
            }
            return text;
        },
        async getServices() {
            try {
                const response = await axios.get(this.api_url + "/api/services");
                this.services = response.data;
            }
            catch (error) {
                console.error(error);
            }
        },
        async filterSearch() {
            try {
                const response = await axios.get(this.api_url + "/api/homes");
                let searchFilteredHomes = response.data.data;
                console.log(searchFilteredHomes);
                console.log(this.radius);
                this.functionActive = true;
                // Applica il filtro per il numero di stanze
                if (this.rooms) {
                    searchFilteredHomes = searchFilteredHomes.filter(home => home.rooms >= parseInt(this.rooms));
                }
                // Applica il filtro per il numero di letti
                if (this.beds) {
                    searchFilteredHomes = searchFilteredHomes.filter(home => home.beds >= parseInt(this.beds));
                }
                // Applica il filtro per i servizi
                if (this.selectedServices.length > 0) {
                    searchFilteredHomes = searchFilteredHomes.filter(home => {
                        for (let service of this.selectedServices) {
                            if (!home.services.some(s => s.slug === service)) {
                                return false;
                            }
                        }
                        return true;
                    });
                }
                // Applica il filtro per la distanza
                if (this.latitude && this.longitude && this.radius) {
                    const R = 6371; // radius of the earth in km
                    searchFilteredHomes = searchFilteredHomes.filter(home => {
                        const dLat = (home.latitude - this.latitude) * Math.PI / 180;
                        const dLon = (home.longitude - this.longitude) * Math.PI / 180;
                        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                            Math.cos(this.latitude * Math.PI / 180) * Math.cos(home.latitude * Math.PI / 180) *
                                Math.sin(dLon / 2) * Math.sin(dLon / 2);
                        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                        const distance = R * c;
                        return distance <= this.radius;
                    });
                }
                this.filteredRoomServicesHomes = searchFilteredHomes;
            }
            catch (error) {
                console.error(error);
            }
        },
        async filterHomess() {
            try {
                const params = {};
                if (this.rooms) {
                    params.rooms = this.rooms;
                }
                if (this.beds) {
                    params.beds = this.beds;
                }
                if (this.selectedServices.length > 0) {
                    params.services = this.selectedServices.join(",");
                }
                if (this.latitude && this.longitude && this.radius) {
                    params.latitude = this.latitude;
                    params.longitude = this.longitude;
                    params.radius = parseInt(this.radius);
                }
                const response = await axios.get(this.api_url + "/api/homes/filter/", { params });
                this.filteredRoomServicesHomes = response.data.data;
            }
            catch (error) {
                console.error(error);
            }
        }
    },
    mounted() {
        this.getServices();
    },
    components: {
      HomeCard
    }
}
</script>

<template>
  <div>
    <div class="search_results_wrapper">
      <div class="search_results_elements">
        <div class="titles_wrapper">
        </div>
        <div class="homes_wrapper">
          <div class="homes_elements vh-100">
            <div v-if="this.filteredHomes.length === 0">
              <h1 class="main_title search_title text-center black py-3">
                Fai una ricerca
              </h1>
            </div>
            <div v-else-if="functionActive">
              <div v-if="filteredRoomServicesHomes.length > 0">
                <div class="titles_elements text-center">
                  <h1 class="main_title search_title black py-3">
                    Affina la tua ricerca
                  </h1>
                  <div class="button_filter_wrapper py-3">
                    <div class="button_filter_elements">
                      <!-- Button trigger modal -->
                      <button type="button" class="btn modal_filter primary" data-bs-toggle="modal"
                        data-bs-target="#exampleModal">
                        Filtra i risultati
                      </button>

                      <!-- Modal -->
                      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
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
                                  <label class="mb-2" for="rooms">Seleziona un raggio</label>
                                  <input class="search_header mb-4" type="number" placeholder="In che raggio?"
                                    v-model="radius" />
                                  <label class="mb-2" for="rooms">Di quante camere hai bisogno?</label>
                                  <input class="search_header mb-4" type="number" placeholder="Quante camere?"
                                    v-model="rooms" />
                                  <label class="mb-2" for="beds">Quanti letti servono?</label>
                                  <input class="search_header mb-4" type="number" placeholder="Quante letti?"
                                    v-model="beds" />
                                  <label class="mb-2" for="services">Seleziona i servizi:</label>
                                  <select class="multiple_filter" v-model="selectedServices" id="services" multiple>
                                    <option v-for="service in services.data" :key="service.id" :value="service.slug">
                                      {{ service.title }}
                                    </option>
                                  </select>
                                </div>
                              </div>
                              <div class="modal-footer">
                                <button type="button" class="btn modal_button_close"
                                  data-bs-dismiss="modal">Annulla</button>
                                <button type="button" class="btn modal_button_salva" data-bs-dismiss="modal"
                                  @click="filterSearch">Scopri i risultati</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="home_results_elements">
                    <div class="row align-items-center align-content-start">
                      <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-3 text-center"
                        v-for="home in filteredRoomServicesHomes">
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
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>
                <div class="titles_elements text-center">
                  <h1 class="main_title search_title black py-3">
                    Nessun risultato... Affina la tua ricerca
                  </h1>
                  <div class="button_filter_wrapper py-3">
                    <div class="button_filter_elements">
                      <!-- Button trigger modal -->
                      <button type="button" class="btn modal_filter primary" data-bs-toggle="modal"
                        data-bs-target="#exampleModal">
                        Filtra i risultati
                      </button>

                      <!-- Modal -->
                      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                        aria-hidden="true">
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
                                  <label class="mb-2" for="rooms">Seleziona un raggio</label>
                                  <input class="search_header mb-4" type="number" placeholder="In che raggio?"
                                    v-model="radius" />
                                  <label class="mb-2" for="rooms">Di quante camere hai bisogno?</label>
                                  <input class="search_header mb-4" type="number" placeholder="Quante camere?"
                                    v-model="rooms" />
                                  <label class="mb-2" for="beds">Quanti letti servono?</label>
                                  <input class="search_header mb-4" type="number" placeholder="Quante letti?"
                                    v-model="beds" />
                                  <label class="mb-2" for="services">Seleziona i servizi:</label>
                                  <select class="multiple_filter" v-model="selectedServices" id="services" multiple>
                                    <option v-for="service in services.data" :key="service.id" :value="service.slug">
                                      {{ service.title }}
                                    </option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn modal_button_close"
                                data-bs-dismiss="modal">Annulla</button>
                              <button type="button" class="btn modal_button_salva" data-bs-dismiss="modal"
                                @click="filterSearch">Scopri i risultati</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="titles_elements text-center">
                <h1 class="main_title search_title black py-3">
                  Affina la tua ricerca
                </h1>
                <div class="button_filter_wrapper py-3">
                  <div class="button_filter_elements">
                    <!-- Button trigger modal -->
                    <button type="button" class="btn modal_filter primary" data-bs-toggle="modal"
                      data-bs-target="#exampleModal">
                      Filtra i risultati
                    </button>

                    <!-- Modal -->
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
                      aria-hidden="true">
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
                                <label class="mb-2" for="rooms">Seleziona un raggio</label>
                                <input class="search_header mb-4" type="number" placeholder="In che raggio?"
                                  v-model="radius" />
                                <label class="mb-2" for="rooms">Di quante camere hai bisogno?</label>
                                <input class="search_header mb-4" type="number" placeholder="Quante camere?"
                                  v-model="rooms" />
                                <label class="mb-2" for="beds">Quanti letti servono?</label>
                                <input class="search_header mb-4" type="number" placeholder="Quante letti?"
                                  v-model="beds" />
                                <label class="mb-2" for="services">Seleziona i servizi:</label>
                                <select class="multiple_filter" v-model="selectedServices" id="services" multiple>
                                  <option v-for="service in services.data" :key="service.id" :value="service.slug">
                                    {{ service.title }}
                                  </option>
                                </select>
                              </div>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn modal_button_close" data-bs-dismiss="modal">Annulla</button>
                            <button type="button" class="btn modal_button_salva" data-bs-dismiss="modal"
                              @click="filterSearch">Scopri i risultati</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="home_results_elements">
                <div class="row align-items-center align-content-start">
                  <div class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-3 text-center py-3"
                    v-for="home in filteredHomes">
                    <router-link class="link-card" :to="{ name: 'single-home', params: { slug: home.slug } }">  
                      <div class="single_home_contents p-2">
                        <img class="home_image" :src="imageConverter(home.cover_image)">
                        <div class="card-body justify-content-center mt-2">
                          <h5 class="card_title bold card-title text-center py-3">
                            {{ trimBody(home.title) }}
                          </h5>
                          <h5>
                            {{ home.address }}
                          </h5>
                        </div>
                        <div class="details_card">
                          <ul>
                            <li>{{ home.rooms }} stanze</li>
                            <li>{{ home.beds }} letti</li>
                            <li>{{ home.bathrooms }} bagni</li>
                            <li>{{ home.square_meters }} mq</li>
                          </ul>
                          <li v-for="service in home.services">{{ service.title }}</li>
                        </div>
                      </div>
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
</template>

<style lang="scss">
@import "../assets/scss/style.scss";

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

.home_image {
  width: 300px;
  height: 300px;
  aspect-ratio: 1/1;
  border-radius: 25px;
  margin-bottom: 5px;
}

.details_card {

ul {
    display: flex;
    padding-left: 0;
    margin-bottom: 0;
    justify-content: center;

    li {
        list-style: none;
        padding: 0, 5px;
        margin-right: 1.2rem;
        color: gray;
    }

    li:first-child {
        list-style: none;
    }
}
}
</style>