<script>
import axios from 'axios'

export default {
  name: 'SearchResults',
  data() {
    return {
      results: []
    };
  },
  created() {
    this.results = this.$route.query.results;
  }
};
</script>

<template>
<h1>
    Ciao
</h1>
</template>

<style lang="scss">

</style>