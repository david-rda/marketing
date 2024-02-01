<template>
    <div>
        <navbar/>
        <div class="container" style="margin-top: 120px;">
            <div class="row justify-content-between">
                <div class="col-md-4 col-12">
                    <h4 class="main head mt-4">ელ. ფოსტის დამატება</h4>
                    <div class="row">
                        <h4 class="main brand mt-3">{{ this.$route.params.label }}</h4>
                        <h6 class="main mt-1 ">მიაბით ელ. ფოსტის მისამართები</h6>
                    </div>

                    <form @submit.prevent="addEmails()" class=" form_bg" ref="sendForm">
                        <div class="row">
                            <div id="emailApp" class="">
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
                        <div class="form-group mb-3">
                            <input type="submit" value="შენახვა" class="btn btn-success btn_manual">
                        </div>

                        <div v-if="errors">
                            <div v-for="(item, index) in errors" :key="index" class="alert alert-danger alert-dismissible">
                                <strong>{{ item[0] }}</strong>
                                <button class="btn-close" data-bs-dismiss="alert"></button>
                            </div>
                        </div>
                        <div v-if="email_added">
                            <div class="alert alert-success alert-dismissible">
                                <strong>წარმატებით დაემატა</strong>
                                <button class="btn-close" data-bs-dismiss="alert"></button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="col-md-5 col-12">
                    <ul class="list-group">
                        <li class="list-group-item d-flex justify-content-between align-items-center" v-for="(item, index) in added_emails" :key="index">
                            <span>{{ item.email }}</span>
                            <button type="button" class="btn btn-danger" :data-email-id="item.id" :data-exhibition-id="item.exhibition_id" @click="deleteEmails($event)">
                                <svg style="pointer-events: none" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                </svg>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
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

                added_emails : [],

                email_added : false
            }
        },

        components: {
            navbar,
            
        },

        mounted() {
            const _this_ = this;

            axios.get("/exhibition/show/" + this.$route.params.id, {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                }
            }).then(function(response) {
                _this_.added_emails = response.data.emails;
            });
        },

        methods: {
            deleteEmails(event) {
                const email_id = Number(event.target.getAttribute("data-email-id"));
                const exhibition_id = Number(event.target.getAttribute("data-exhibition-id"));

                const _this_ = this;

                axios.get("/email/delete/" + email_id + "/" + exhibition_id, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                    }
                }).then(function(response) {
                    _this_.added_emails = response.data.data;
                }).catch(err => {
                    console.log(err);
                });
            },

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
                }, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                    }
                }).then(res => {
                    console.log(res.data);
                    this.email_added = true;
                }).catch(err => {
                    if(err instanceof AxiosError) {
                        this.errors = err?.response?.data?.errors;
                    }

                    this.email_added = false;
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
