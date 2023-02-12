<script>
import SingleHomeContent from '../components/SingleHomeContent.vue';

export default {
    "name": "Main Content",
    components: { SingleHomeContent }
}
</script>

<template>
<div class="main_wrapper p-3">
    <div class="main_elements">
        <div class="titles_wrapper">
            <div class="titles_elements text-center">
                <h1 class="main_title black">
                    Cerchi Casa? <br>
                    <span class="fancy">BoolBnb</span>.
                </h1>
                <p>
                    Con <span class="bold">BoolBnb</span>, puoi affittare la tua casa ideale <span class="bold">ovunque tu voglia</span>, <span class="bold">quando vuoi</span>. <br>
                    Siamo il primo sistema di affitto case al mondo che ti offre una gamma completa di opzioni, <br> inoltre, siamo orgogliosi di offrire un'esperienza di prenotazione semplice e intuitiva, <br>
                    che ti permette di prenotare la tua casa ideale in pochi clic.
                </p>
            </div>
        </div>
        <div class="homes_wrapper">
            <h1 class="secondary_title text-center black p-4">
                In primo piano
            </h1>
            <SingleHomeContent></SingleHomeContent>
            <div class="show_more_cta d-flex justify-content-center">
                <a class="show_button" href="#">Tutte le case</a>
            </div>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
.main_title {
    color: black;
    font-weight: 800;
    font-size: 75px;
}

.secondary_title {
    color: black;
    font-weight: 800;
    font-size: 55px;
}

.fancy {
    color: #ff5a5f;
}

.show_button {
    display: inline-block;
    color: white;
    background-color: #ff5a5f;
    padding: 10px;
    text-decoration: none;
    border-radius: 20px;
    width: 150px;
    height: 100%;
    text-align: center;
}

.show_button:hover {
  transition: 0.4s;
  color: #ff5a5f;
  background-color: white;
}
</style>
