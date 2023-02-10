<script>
export default {
    name: 'FooterContent'
}
</script>

<template>
<div class="footer_wrapper p-4">
    <div class="footer_elements">
        <div class="row justify-content-center">
            <div class="col-12 left">
                <div class="contacts_elements d-flex justify-content-center flex-column align-items-center">
                    <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 d-flex justify-content-center">
                        <p class="p-0 m-0">
                           <strong>
                                &copy; 2023 Boolbnb, Inc.
                           </strong>
                        </p>
                    </div>
                    <div class="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 d-flex justify-content-center gap-3 mt-3">
                        <a href="/">Privacy</a>
                        <a href="/">Terms</a>
                        <a href="/">Site Map</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style lang="scss" scoped>
.footer_wrapper {
    border-top: 1px solid rgba(0, 0, 0, 0.099);
}
.contacts_elements {
    a {
        text-decoration: none;
        color: black;
    }

    a:hover {
        transition: 0.4s;
        color: #FF5A5F;
    }
}
</style>