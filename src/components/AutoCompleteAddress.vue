<script>
import axios from 'axios';

export default {
    name: 'AutoCompleteAddress',
    data() {
        return {
            query: '',
            addresses: [],
        };
    },
    methods: {
        async searchAddress() {
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
        },
        selectAddress(address) {
            this.query = address.address.freeformAddress;
            this.addresses = [];
        },
    },
};
</script>

<template>
    <div>
        <input type="text" v-model="query" @input="searchAddress" />
        <ul v-if="addresses.length > 0">
            <li v-for="address in addresses" @click="selectAddress(address)">
                {{ address.address.freeformAddress }}
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
input {
    width: 410px;
    margin: 32px 0 0 16px;
}
</style>

