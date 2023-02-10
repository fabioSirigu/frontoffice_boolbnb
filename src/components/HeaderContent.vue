<script>
export default {
    'name' : 'Header Content'
}
</script>

<template>
<div class="header_wrapper p-2">
    <div class="header_elements">
        <div class="row justify-content-around align-items-center">
            <div class="col-4 left">
                <div class="logo_wrapper">
                    <img class="header_logo" src="../assets/img/logoBnBlateral.png" alt="Header branding">
                </div>
            </div>
            <div class="col-4 center">
                <div class="search_wrapper">
                    <input class="search_header" type="text" placeholder="Cerca il tuo posto..">
                </div>
            </div>
            <div class="col-4 right">

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
    box-shadow: black;
}

.header_wrapper {
    position: fixed;
    width: 100%;
}
</style>