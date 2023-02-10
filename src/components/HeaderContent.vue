<script>
export default {
    'name' : 'Header Content'
}
</script>

<template>
<div class="header_wrapper p-4">
    <div class="header_elements">
        <div class="row justify-content-around align-items-center">
            <div class="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 left d-flex justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-start justify-content-xl-start justify-content-xxl-start">
                <div class="logo_wrapper px-5">
                    <img class="header_logo" src="../assets/img/logoBnBlateral.png" alt="Header branding">
                </div>
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 center">
                <div class="search_wrapper d-flex justify-content-center align-items-center gap-3">
                    <input class="search_header" type="text" placeholder="Dove ti porto?">
                    <a class="search_button" type="submit"><span><i class="fa-solid fa-magnifying-glass px-2"></i></span>Ricerca</a>
                </div>
            </div>
            <div class="col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 right d-flex justify-content-center justify-content-sm-center justify-content-md-center justify-content-lg-end justify-content-xl-end justify-content-xxl-end">
                <div class="user_elements d-flex justify-content-between align-items-center gap-1">
                    <a class="affitta_header" href="#">Affitta con BoolBnb</a>
                    <div class="user_dropdown_wrapper">
                        <div class="user_dropdown_elements">
                            <div class="btn-group">
                                <button type="button" class="btn user_header dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fa-regular fa-user px-2"></i>
                                    Il mio BoolBnb
                                </button>
                                <div class="dropdown-menu dropdown_user">
                                    <a class="dropdown-item dropdown_user_item" href="#">Login</a>
                                    <a class="dropdown-item dropdown_user_item" href="#">Registrati ora</a>
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
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.099);
}

.search_button {
    display: inline-block;
    color: white;
    background-color: #FF5A5F;
    padding: 10px;
    text-decoration: none;
    border-radius: 20px;
    width: 150px;
}

.search_button:hover {
    transition: 0.4s;
    color: #FF5A5F;
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
    color: #FF5A5F;
    background-color: rgba(255, 255, 255, 0.173);
}

.user_header {
    background-color: #FF5A5F;
    color: white;
    padding: 10px;
    border-radius: 20px;
}

.user_header:hover {
    transition: 0.4s;
    color: #FF5A5F;
    background-color: white;
}

.dropdown_user {
    position: relative;
}

.dropdown_user_elements{
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
    color: #FF5A5F;
    transition: 0.4s;
}

</style>