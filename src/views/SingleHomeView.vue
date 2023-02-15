<script>
import axios from 'axios'
import { store } from '../main.js'
export default {
    name: 'SingleHomeView',
    data() {
        return {
            store,
            home: {},
            loading: true,
            name: '',
            email: '',
            message: '',
            home_id: '',
            errors: {}
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
            }
            console.log(data);
            axios.post(this.store.api_base_url + '/Api/messages', data)
                .then(response => {
                    this.success = response.data.success
                    console.log(response.data.success);
                    if (this.success) {
                        this.home.id = ''
                        this.name = ''
                        this.email = ''
                        this.message = ''
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

    <div class="container my-3">
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
                    <div class="card-body justify-content-center my-2">
                        <img class="home-image" :src="store.api_base_url + '/storage/' + home.cover_image">
                    </div>

                    <div class="details">
                        <ul class="d-flex ">
                            <li>{{ this.home.rooms }} stanze</li>
                            <li>{{ this.home.beds }} letti</li>
                            <li>{{ this.home.bathrooms }} bagni</li>
                            <li>{{ this.home.square_meters }}mq</li>
                        </ul>
                    </div>
                    <div class="services">
                        <h3>Servizi disponibili</h3>
                        <ul class="d-flex ">
                            <li v-for="service in this.home.services">{{ service.title }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="card mt-5">
            <div class="card-header">
                Contatta il proprietario
            </div>
            <div class="card-body">
                <form @submit.prevent="SubmitForm()">
                    <div class="form-group">
                        <label class="mb-2" for="name">Nome*</label>
                        <input type="text" class="form-control" id="name" v-model="name" required>
                    </div>
                    <div class="form-group">
                        <label class="my-2" for="email">Email*</label>
                        <input type="email" class="form-control" id="email" v-model="email" required>
                    </div>
                    <div class="form-group">
                        <label class="my-2" for="message">Messaggio*</label>
                        <textarea class="form-control" id="message" v-model="message" rows="3" required></textarea>
                    </div>
                    <p class="required mt-3">*campi obbligatori</p>
                    <button type="submit" class="btn btn-primary my-3">Invia messaggio</button>
                </form>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.home-image {
    width: 100%;
}

.details {
    width: 50%;
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

.services {
    margin-top: 0.75rem;
    width: 50%;
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

.required {
    font-size: 12px;
}
</style>