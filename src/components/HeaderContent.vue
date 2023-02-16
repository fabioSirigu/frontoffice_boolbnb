<script>
import axios from 'axios';
import { store } from '../main.js';
export default {
  name: "Header Content",
  data() {
    return {
      store,
      api_url: store.api_base_url,
      query: '',
      addresses: [],
      latitude: '',
      longitude: '',
      radius: 20,
      filteredHomes: [],
      authenticated: false,
      loading: false,
      showError: false,
      name: ''
    };
  },
  methods: {
    async searchAddress() {
      if (this.query.length > 1) {
        try {
          const response = await axios.get(
            /* `https://api.tomtom.com/search/2/search/${this.query}.json?key=MkDmWSoUG13t3UpcLNV0AcyG6GRL8SlT` */
            /* https://{baseURL}/search/{versionNumber}/search/{query}.{ext}?key={Your_API_Key}&typeahead={typeahead}&limit={limit}&ofs={ofs}&countrySet={countrySet}&lat={lat}&lon={lon}&radius={radius}&topLeft={topLeft}&btmRight={btmRight}&language={language}&idxSet={idxSet}&extendedPostalCodesFor={extendedPostalCodesFor}&minFuzzyLevel={minFuzzyLevel}&maxFuzzyLevel={maxFuzzyLevel}&categorySet={categorySet}&brandSet={brandSet}&connectorSet={connectorSet}&fuelSet={fuelSet}&view={view}&openingHours={openingHours}&timeZone={timeZone}&mapcodes={mapcodes}&relatedPois={relatedPois}&minPowerKW={minPowerKW}&maxPowerKW={maxPowerKW}&entityTypeSet={entityTypeSet} */
            `https://api.tomtom.com/search/2/search/${this.query}.json?key=MkDmWSoUG13t3UpcLNV0AcyG6GRL8SlT&typeahead=true&countrySet=IT&language=it-IT`
            /* `https://api.tomtom.com/search/2/autocomplete/${this.query}.json?key=MkDmWSoUG13t3UpcLNV0AcyG6GRL8SlT&language=it-IT&countrySet=IT/ITA` */
          );
          this.addresses = response.data.results;
        } catch (error) {
          console.error(error);
        }
      }
    },
    selectAddress(address) {
      this.query = address.address.freeformAddress;
      this.addresses = [];
    },
    async searchAddress() {
      if (this.query.length > 1) {
        try {
          const response = await axios.get(
            /* https://{baseURL}/search/{versionNumber}/search/{query}.{ext}?key={Your_API_Key}&typeahead={typeahead}&limit={limit}&ofs={ofs}&countrySet={countrySet}&lat={lat}&lon={lon}&radius={radius}&topLeft={topLeft}&btmRight={btmRight}&language={language}&idxSet={idxSet}&extendedPostalCodesFor={extendedPostalCodesFor}&minFuzzyLevel={minFuzzyLevel}&maxFuzzyLevel={maxFuzzyLevel}&categorySet={categorySet}&brandSet={brandSet}&connectorSet={connectorSet}&fuelSet={fuelSet}&view={view}&openingHours={openingHours}&timeZone={timeZone}&mapcodes={mapcodes}&relatedPois={relatedPois}&minPowerKW={minPowerKW}&maxPowerKW={maxPowerKW}&entityTypeSet={entityTypeSet} */
            `https://api.tomtom.com/search/2/search/${this.query}.json?key=MkDmWSoUG13t3UpcLNV0AcyG6GRL8SlT&typeahead=true&countrySet=IT&language=it-IT`
          );
          this.addresses = response.data.results;
        } catch (error) {
          //console.error(error);
        }
      }
    },
    selectAddress(address) {
      this.query = address.address.freeformAddress;
      this.addresses = [];
    },
    async searchHomes() {
      if (this.query.length >= 0) {
        const tomtomApiKey = '1W1nNbKly7WXl6NvYnr7983RJJawL26E';
        const response = await axios.get(
          `https://api.tomtom.com/search/2/geocode/${this.query}.JSON?key=${tomtomApiKey}`
        );
        const data = response.data;
        if (data.results.length > 0) {
          this.latitude = data.results[0].position.lat;
          this.longitude = data.results[0].position.lon;
          console.log(this.latitude);
          console.log(this.longitude);
        }
        // Recupera le case tramite la chiamata API al backend
        try {
          const homesResponse = await axios.get(
            store.api_base_url + '/api/homes/' +
            this.latitude +
            '/' +
            this.longitude +
            '/' +
            this.radius
          );
          console.log(this.filteredhomes = homesResponse.data.data);
          this.$emit('search-homes-completed', homesResponse.data.data, this.loading = false);
        } catch (error) {
          console.error(error);
        }
      }
    },
    async search() {
      try {
        console.log('lat:', this.latitude, 'lon:', this.longitude);
        const response = await axios.get(
          store.api_base_url + '/api/search/' +
          this.latitude +
          '/' +
          this.longitude +
          '/' +
          this.radius
        );
        this.$router.replace({ name: 'search', query: { results: response.data } });
      } catch (error) {
        console.error(error);
      }
    },
    async searchHomesAndSearch() {
      await this.searchHomes();
      this.search();
    }
  }
}
</script>

<template>
  <div class="header_wrapper">
    <div class="header_elements">
      <div class="row justify-content-around align-items-center mx-0">
        <div
          class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-4 col-xxl-4 left d-flex justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-start justify-content-xxl-start left p-3">
          <div class="logo_wrapper px-5">
            <a href="/">
              <img class="header_logo" src="../assets/img/logoBnBlateral.png" alt="Header branding" />
            </a>
          </div>
        </div>
        <div
          class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-4 col-xxl-4 justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-start justify-content-xxl-start center p-4">
          <div class="search_wrapper d-flex justify-content-center align-items-center gap-3">
            <input class="search_header" type="text" placeholder="Dimmi una Città o un Indirizzo.." v-model="query"
              @input="searchAddress" />
            <div class="dropdown_menu_search d-flex flex-column justify-content-start">
              <ul v-if="addresses.length > 0">
                <li class="dropdown_list_element" v-for="address in addresses" @click="selectAddress(address)">
                  {{ address.address.freeformAddress }}
                </li>
              </ul>
            </div>
            <a class="search_button" v-if="this.query.length < 1"><span><i
                  class="fa-solid fa-magnifying-glass px-1"></i></span>Ricerca</a>
            <a class="search_button" v-else @click="searchHomesAndSearch()"><span><i
                  class="fa-solid fa-magnifying-glass px-1"></i></span>Ricerca</a>
          </div>
        </div>
        <div
          class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-4 col-xxl-4 right d-flex justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-end justify-content-xxl-end py-0">
          <div class="user_elements d-flex justify-content-between align-items-center gap-1">
            <a class="affitta_header" :href="this.api_url + '/admin/homes/create'">Affitta con BoolBnb</a>
            <div class="user_dropdown_wrapper">
              <div class="user_dropdown_elements">
                <div class="dropdown">
                  <div class="dropdown">
                    <button class="btn user_header dropdown-toggle" type="button" data-bs-toggle="dropdown"
                      aria-expanded="false">
                      <i class="fa-regular fa-user px-2"></i>
                      Il mio BoolBnb
                    </button>
                    <ul class="dropdown-menu dropdown dropdown_user">
                      <li>
                        <a class="dropdown-item dropdown_user_item" :href="`${this.api_url}/login`">Accedi</a>
                      </li>
                      <li>
                        <a class="dropdown-item dropdown_user_item" :href="`${this.api_url}/register`">Registrati
                          ora</a>
                      </li>
                    </ul>
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

.header_logo {
  width: 100px;
}

.search_header {
  border: 1px solid rgba(0, 0, 0, 0.175);
  border-radius: 20px;
  padding: 10px;
  width: 100%;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.092);
  font-size: 13px;
}

.header_wrapper {
  border-bottom: 1px solid rgba(0, 0, 0, 0.099);

}

.search_button {
  display: inline-block;
  color: white;
  background-color: $primary;
  padding: 10px;
  text-decoration: none;
  border-radius: 20px;
  width: 150px;
  height: 100%;
  font-size: 13px;
  text-align: center;
}

.search_button:hover {
  transition: 0.4s;
  color: $primary;
  background-color: white;
  cursor: pointer;
}

.affitta_header {
  display: inline-block;
  color: rgb(255, 255, 255);
  background-color: #000000;
  padding: 10px;
  text-decoration: none;
  border-radius: 20px;
  width: 200px;
  text-align: center;
}

.affitta_header:hover {
  transition: 0.4s;
  color: $primary;
  background-color: rgba(255, 255, 255, 0.173);
}

.user_header {
  background-color: $primary;
  color: white;
  padding: 10px;
  border-radius: 20px;
}

.user_header:hover {
  transition: 0.4s;
  color: $primary;
  background-color: white;
}

.dropdown_user {
  position: relative;
}

.dropdown_user_elements {
  position: absolute;
}

.dropdown_user {
  border: 1px solid rgba(0, 0, 0, 0.081);
  border-radius: 20px;
  padding: 10px;
  width: 100%;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.033);
}

.dropdown_user_item:hover {
  background-color: white;
  color: $primary;
  transition: 0.4s;
}

.search_wrapper {
  position: relative;
  background-color: white;
  z-index: 1000;
}

.dropdown_menu_search {
  position: absolute;
  background-color: white;
  top: 0;
  left: 0;
  right: 0;
  margin-top: 55px;
}

.dropdown_list_element {
  list-style-type: none;
  padding-top: 5px;
}

.dropdown_list_element:hover {
  cursor: pointer;
}
</style>