<script>
import HeaderContent from './components/HeaderContent.vue'
import FooterContent from './components/FooterContent.vue'

export default {
  name: 'BoolBnb App',
  components: {
    HeaderContent,
    FooterContent
  },
  data() {
    return {
      filteredHomes: {}
    }
  },
  methods: {
    searchHomesCompleted(homes) {
      this.filteredHomes = homes;
    }
  }
}
</script>

<template>
  <HeaderContent @search-homes-completed="searchHomesCompleted"></HeaderContent>
  <router-view :filteredHomes="filteredHomes"></router-view>
  <FooterContent></FooterContent>
</template>

<style scoped></style>
