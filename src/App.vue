<script>
import HeaderContent from './components/HeaderContent.vue'
import FooterContent from './components/FooterContent.vue'
import MainContent from './components/MainContent.vue'

export default {
  name : 'BoolBnb App',
  components : {
    HeaderContent,
    MainContent,
    FooterContent
  },
  data () {
    return {
      filteredHomes: []
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
  <MainContent :filteredHomes="filteredHomes"></MainContent>
  <FooterContent></FooterContent>
</template>

<style scoped>

</style>
