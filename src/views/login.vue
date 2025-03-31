<template>
    <div class="container">
        <div class="row align-items-center justify-content-center vh-100">
            <div class="col-lg-5 col-md-6 col-12">
                <center>
                    <img class="mb-3" src="../assets/img/RDA-Logo-Geo.55af0c58 (1).png" alt="brand" style="max-width: 200px;">
                </center>
                <div class="card p-4">
                    <form @submit.prevent="signin">
                        <div class="col-md-4 mb-3">
                            <h3 class="log_h">ავტორიზაცია</h3>
                        </div>
                        <div class="mb-3 form-floating">
                          <input type="email" v-model="email" class="form-control" id="email" placeholder="ელ. ფოსტა">
                          <label for="email" class="form-label"><b>ელ. ფოსტა</b></label>
                        </div>
                        <div class="mb-3 form-floating">
                          <input type="password" v-model="password" class="form-control" id="password" placeholder="პაროლი">
                          <label for="password" class="form-label"><b>პაროლი</b></label>
                        </div>
                        <div class="mb-3 d-grid">
                            <button type="submit" class="btn btn-success" :disabled="loader">
                                შესვლა&nbsp;&nbsp;
                                <span v-if="loader" class="spinner-border spinner-border-sm"></span>
                                <i class="fa fa-sign-in" v-else></i>
                            </button>
                        </div>
                    </form>
                    <div v-if="error_messages" class="mt-3">
                        <div class="alert alert-danger border-0" v-for="(item, index) in error_messages" :key="index">
                            <strong>{{ item[0] }}</strong>
                        </div>
                    </div>
                </div>
                <p class="text-center mt-3">
                    <span class="user-select-none">
                        Copyright&nbsp;&copy;&nbsp;{{ '2023 - ' + new Date().getFullYear() }}&nbsp;.&nbsp;სოფლის განვითარების სააგენტო
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import axios, { AxiosError } from 'axios'

    export default {
        data() {
            return {
                email: "",
                password: "",

                error_messages: "",

                loader: false
            }
        },

        mounted() {
            const userData = JSON.parse(window.localStorage.getItem("user"));
            const _this_ = this;

            if (userData != null) {
                _this_.$router.push("/exhibitions");
            }
        },

        methods: {
            signin() {
                const _this_ = this;

                this.loader = true;

                axios.post("/signin", {
                    email: this.email,
                    password: this.password
                }).then(function (response) {
                    window.localStorage.setItem("user", JSON.stringify(response.data));

                    _this_.$router.push("/exhibitions");

                    _this_.loader = false;
                }).catch(function (err) {
                    if (err instanceof AxiosError) {
                        _this_.error_messages = err.response.data?.errors;
                    }

                    _this_.loader = false;
                });
            }
        }
    }
</script>

<style scoped>
    input, button, div, strong, b, h3 {
        font-family: 'firago-regular';
    }
</style>