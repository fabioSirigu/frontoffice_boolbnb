<script>
export default {
    name: 'FooterContent'
}
</script>

<template>
    <footer>
        <div class="footer_contacts d-flex justify-content-between p-4">
            <div class="contacts">
                <a href="/">&copy; 2023 Boolbnb, Inc.</a> ·
                <a href="/">Privacy</a> ·
                <a href="/">Termini</a> ·
                <a href="/">Mappa del sito</a> ·
                <a href="/">Dettagli dell'azienda</a> ·
                <a href="/">Destinazioni</a>
            </div>
            <div class="languages">
                <a href="/">Italiano (IT)</a> ·
                <a href="/">€ EUR</a> ·
                <a href="/">Supporto e risorse</a>
            </div>
        </div>
    </footer>

</template>

<style lang="scss" scoped>
.footer_contacts {
    a {
        text-decoration: none;
        color: black;
    }
}
</style>