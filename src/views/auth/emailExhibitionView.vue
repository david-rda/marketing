<template>
    <div>
        <navbar/>
        <div class="container" style="margin-top: 90px;">
            <div class="row">
                <div class="col-md-4">
                    <h4 class="main head mt-4">ელ. ფოსტის დამატება</h4>
                </div>
            </div>
            <div class="row">
                <h4 class="main brand mt-3">{{ this.$route.params.label }}</h4>
                <h6 class="main mt-1 ">მიაბით ელ. ფოსტის მისამართები</h6>
            </div>
            <form @submit.prevent="addEmails()" class=" form_bg" ref="sendForm">
                <div class="row">
                    <div class="col-md-4">
                        <div id="emailApp" class="">
                            <label class="form-label mt-2" for="emailInput">დაამატეთ ელ. ფოსტა</label>  
                            <div class="input-group mb-3">
                                <input type="email" class="form-control input_form_add" v-model="newEmail">
                                <button type="button" class="btn btn-success" @click="addEmail()">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-person-plus" viewBox="0 0 16 16">
                                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                                        <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"/>
                                    </svg>
                                </button>
                            </div>
                            <div class=" p-1 mt-2" v-if="emails.length">
                                <ol>
                                    <li  v-for="(email, index) in emails" :key="index">
                                        {{ email }}
                                        <button class="btn btn_delete" type="button" @click="deleteEmail(index)">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x delete_icon" viewBox="0 0 16 16">
                                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                                            </svg>
                                        </button>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="form-group mb-3">
                    <input type="submit" value="შენახვა" class="btn btn-success btn_manual">
                </div>

                <div v-if="errors" class="col-3">
                    <div v-for="(item, index) in errors" :key="index" class="alert alert-danger alert-dismissible">
                        <strong>{{ item[0] }}</strong>
                        <button class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import navbar from '../../components/navbar.vue'
    import "vue-select/dist/vue-select.css"
    import 'flatpickr/dist/flatpickr.css';
    import axios, { AxiosError } from 'axios'

    export default {
        data() {
            return {
                newEmail: '',
                emails: [],
                picked: new Date(),
                exhibition : "",

                flatpickrOptions: {
                    enableTime: true,
                    dateFormat: 'Y-m-d',
                },

                options: [],

                errors : "",
            }
        },

        components: {
            navbar,
            
        },

        mounted() {
            const _this_ = this;

            axios.get("/exhibition/list").then(function(response) {
                _this_.options = response.data;
            });
        },

        methods: {
            addEmail() {
                if (this.newEmail) {
                    this.emails.push(this.newEmail);
                    this.newEmail = '';
                }
            },

            deleteEmail(index) {
                this.emails.splice(index, 1);
            },

            addEmails() {
                axios.post("/email/add/to", {
                    emails : this.emails,
                    exhibition_id : this.$route.params.id
                }).then(res => {
                    console.log(res.data);
                }).catch(err => {
                    if(err instanceof AxiosError) {
                        this.errors = err?.response?.data?.errors;
                    }
                });
            }
        }
    }
</script>

<style scoped>
.container {
    font-family: firago-regular;
}

.btn_delete {
    border: none !important;
    background-color: none !important;
}
.delete_icon {
    width: 30px !important;
    height: 30px !important;
}

</style>
