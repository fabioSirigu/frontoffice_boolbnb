<script>
import axios from 'axios'

export default {
  name: "Header Content",
  data() {
    return {
        api_url: "http://127.0.0.1:8000",
        query: '',
        latitude: '',
        longitude: '',
        radius: 20,
        filteredHomes: [],
        authenticated: false,
        loading : false,
        name: ''
    };
  },
  methods: {
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
                'http://127.0.0.1:8000/api/homes/' +
                this.latitude +
                '/' +
                this.longitude +
                '/' +
                this.radius
            );
            console.log(this.filteredhomes = homesResponse.data.data);
            this.loading = true
            this.$emit('search-homes-completed', homesResponse.data.data);

            } catch (error) {
            console.error(error);
            }
        }
    }
  },
  mounted() {
    axios.get(this.api_url + '/api/user')
      .then(response => {
        this.authenticated = true;
        this.name = response.data.name;
      })
      .catch(error => {
        this.authenticated = false;
        this.name = '';
        console.log(this.name)
      });
  }
};
</script>

<template>
  <div class="header_wrapper">
    <div class="header_elements p-4">
      <div class="row justify-content-around align-items-center">
        <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-4 col-xxl-4 left d-flex justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-start justify-content-xxl-start left">
          <div class="logo_wrapper px-5">
            <img
              class="header_logo"
              src="../assets/img/logoBnBlateral.png"
              alt="Header branding"
            />
          </div>
        </div>
        <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-4 col-xxl-4 justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-start justify-content-xxl-start center">
          <div
            class="search_wrapper d-flex justify-content-center align-items-center gap-3"
          >
            <input class="search_header" type="text" placeholder="Dimmi una Città o un Indirizzo.." v-model="query" @keyup.enter="searchHomes()"
            />
            <a class="search_button" @click="searchHomes()"
              ><span><i class="fa-solid fa-magnifying-glass px-2"></i></span
              >Ricerca</a
            >
          </div>
        </div>
        <div
          class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-4 col-xxl-4 right d-flex justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-center justify-content-xl-end justify-content-xxl-end"
        >
          <div
            class="user_elements d-flex justify-content-between align-items-center gap-1"
          >
            <a class="affitta_header" href="#">Affitta con BoolBnb</a>
            <div class="user_dropdown_wrapper">
              <div class="user_dropdown_elements">
                <div v-if="authenticated" class="btn-group">
                  <button
                    type="button"
                    class="btn user_header dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="fa-regular fa-user px-2"></i>
                    {{ name }}
                  </button>
                  <div class="dropdown-menu dropdown_user">
                    <a
                      class="dropdown-item dropdown_user_item"
                      href="http://127.0.0.1:8000/admin/homes"
                      >Le mie Case</a
                    >
                  </div>
                </div>
                <div v-else class="btn-group">
                  <button
                    type="button"
                    class="btn user_header dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i class="fa-regular fa-user px-2"></i>
                    Il mio BoolBnb
                  </button>
                  <div class="dropdown-menu dropdown_user">
                    <a
                      class="dropdown-item dropdown_user_item"
                      href="http://127.0.0.1:8000/login"
                      >Login</a
                    >
                    <a
                      class="dropdown-item dropdown_user_item"
                      href="http://127.0.0.1:8000/register"
                      >Registrati ora</a
                    >
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

<style lang="scss" scoped>
.header_logo {
  width: 100px;
}

.search_header {
  border: 1px solid rgba(0, 0, 0, 0.175);
  border-radius: 20px;
  padding: 10px;
  width: 100%;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.092);
}

.header_wrapper {
  border-bottom: 1px solid rgba(0, 0, 0, 0.099);
}

.search_button {
  display: inline-block;
  color: white;
  background-color: #ff5a5f;
  padding: 10px;
  text-decoration: none;
  border-radius: 20px;
  width: 150px;
  height: 100%;
}

.search_button:hover {
  transition: 0.4s;
  color: #ff5a5f;
  background-color: white;
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
  color: #ff5a5f;
  background-color: rgba(255, 255, 255, 0.173);
}

.user_header {
  background-color: #ff5a5f;
  color: white;
  padding: 10px;
  border-radius: 20px;
}

.user_header:hover {
  transition: 0.4s;
  color: #ff5a5f;
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
  color: #ff5a5f;
  transition: 0.4s;
}
</style>
