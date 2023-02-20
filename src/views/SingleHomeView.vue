<script>
import axios from 'axios'
import { store } from '../main.js'
export default {
    name: 'SingleHomeView',
    data() {
        return {
            store,
            home: {},
            services: [],
            success: false,
            loading: true,
            name: '',
            email: '',
            message: '',
            home_id: '',
            errors: {},
        }
    }, methods: {
        SubmitForm() {
            this.loading = true
            this.errors = {}
            const data = {
                home_id: this.home.id,
                name: this.name,
                email: this.email,
                message: this.message,
                timer: 0
            }
            console.log(data);
            axios.post(`${this.store.api_base_url}/api/messages`, data).then(response => {
                this.success = response.data.success
                console.log(response.data.success);
                if (this.success) {
                    this.name = ''
                    this.email = ''
                    this.message = ''
                    const duration = 5000;
                    this.timer = duration;
                    const interval = setInterval(() => {
                        this.timer -= 1000;
                        console.log(this.timer);
                        if (this.timer === 0) {
                            this.success = false;
                            clearInterval(interval); // Ferma l'intervallo quando il timer raggiunge lo zero
                            this.timer = this.duration; // Resetta il timer
                        }
                    }, 1000); // Imposta l'intervallo su un secondo
                    console.log("Timer impostato!");
                } else {
                    this.errors = response.data.errors
                }
                this.loading = false
            })
        }
    },
    mounted() {
        //console.log(this.$route.params.slug);
        const url = this.store.api_base_url + '/api/homes/' + this.$route.params.slug

        axios.get(url)
            .then(response => {
                if (response.data.success) {
                    this.home = response.data.data
                    this.services = this.home.services
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
    <div class="single_home_view">
        <div class="container">
            <router-link class="my-btn" :to="{ name: 'homes' }">Torna indietro</router-link>
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
                        <div class="row">
                            <div class="card-body col-12 col-sm-12 col-lg-6 justify-content-center my-2">
                                <img class="home-image" :src="store.api_base_url + '/storage/' + home.cover_image">
                            </div>

                            <div class="col-12 col-sm-12 col-lg-6">
                                <div class="details_services">
                                    <div class="details mb-3">
                                        <h2>Dettagli</h2>
                                        <ul class="d-flex">
                                            <li>{{ this.home.rooms }} stanze</li>
                                            <li>{{ this.home.beds }} letti</li>
                                            <li>{{ this.home.bathrooms }} bagni</li>
                                            <li>{{ this.home.square_meters }}mq</li>
                                        </ul>
                                    </div>
                                    <div v-show="this.services.length > 0" class="services mb-3">
                                        <h2>Servizi disponibili</h2>
                                        <ul class="d-flex ">
                                            <li v-for="service in this.home.services">{{ service.title }}</li>
                                        </ul>
                                    </div>
                                </div>
                                <div v-if="success && timer !== 0" class="alert alert-success text-start my-3" role="alert">
                                    Messaggio inviato con successo!
                                </div>
                                <div class="card">
                                    <div class="card-header">
                                        Contatta il proprietario
                                    </div>

                                    <div class="card-body">
                                        <form @submit.prevent="SubmitForm()">
                                            <div class="row">
                                                <div class="form-group col-4">
                                                    <label class="mb-2" for="name">Nome*</label>
                                                    <input type="text" class="form-control" id="name" v-model="name"
                                                        required>
                                                </div>
                                                <div class="form-group col-8">
                                                    <label class="mb-2" for="email">Email*</label>
                                                    <input type="email" class="form-control" id="email" v-model="email"
                                                        required>
                                                </div>
                                            </div>
                                            <div class="form-group">
                                                <label class="my-2" for="message">Messaggio*</label>
                                                <textarea class="form-control" id="message" v-model="message" rows="3"
                                                    required></textarea>
                                            </div>
                                            <p class="required mt-3">*campi obbligatori</p>
                                            <button type="submit" class="my-btn my-3" :disabled="loading">
                                                {{ loading ? 'Invio in corso..' : 'Invia messaggio' }}
                                            </button>
                                        </form>
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

.my-btn {
    margin-top: 10px;
    border: none;
    display: inline-block;
    color: white;
    background-color: $primary;
    padding: 10px 5px;
    text-decoration: none;
    border-radius: 20px;
    width: 150px;
    height: 100%;
    font-size: 13px;
    text-align: center;
    transition: 0.4s;

    &:hover {
        color: $primary;
        background-color: white;
        cursor: pointer;
    }
}

.home-image {
    width: 100%;
    aspect-ratio: 1/1;
    object-fit: cover;
    border-radius: 25px;
}

.details_services {
    .details,
    .services {
        margin-top: 0.75rem;
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
} 



.required {
    font-size: 12px;
}
</style>