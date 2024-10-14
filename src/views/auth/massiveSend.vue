<template>
    <div>
        <navbar />

        <div class="container" style="margin-top: 120px">
            <div class="row">
                <div class="col-lg-6">
                    <div class="form-group mb-3">
                        <input type="text" placeholder="თემა" v-model="subject" class="form-control">
                    </div>

                    <QuillEditor theme="snow" style="height: 200px" ref="text" v-model:content="text" contentType="html" />

                    <div class="d-grid mt-3 mt-lg-0 mb-2">
                        <button type="button" class="btn btn-success mt-2 mb-2" @click="send">გაგზავნა</button>
                    </div>

                    <div class="alert alert-danger" v-for="(item, index) in errors" :key="index">
                        <strong>{{ item[0] }}</strong>
                    </div>
                </div>
                <div class="col-lg-6 mt-3 mt-lg-0">
                    <div class="card mb-3">
                        <div class="card-header border-bottom d-flex justify-content-between align-items-center">
                            <label class="form-check-label">
                                <input type="checkbox" class="form-check-input" v-model="selectAll" @change="selectAllEmails">
                                &nbsp;ყველას მონიშვნა
                            </label>

                            <form method="POST" @submit.prevent="appendEmail()">
                                <input type="email" placeholder="ელ. ფოსტა" class="form-control" v-model="email">
                            </form>
                        </div>
                        <div class="card-body">
                            <div v-for="email in emails" :key="email.id" class="mb-3 d-flex justify-content-between">
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" v-model="selectedEmails" :value="email.email" :id="'emailCheckbox' + email.id">
                                    <label class="form-check-label" :for="'emailCheckbox' + email.id">
                                        {{ email.email }}
                                    </label>
                                </div>
                                <button type="button" class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#confirmationModal" @click="setEmail(email.email)">
                                    <svg style="pointer-events: none" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="confirmationModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">გთხოვთ დაადასტუროთ</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ნამდვილად გსურთ წაშლა?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">არა</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteMail">კი</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import navbar from '../../components/navbar.vue'
    import { QuillEditor } from '@vueup/vue-quill'
    import axios, { AxiosError } from 'axios';

    export default {
        data() {
            return {
                emails: [],
                selectedEmails: [],
                selectAll: false,

                errors : [],
                subject : "",

                email : "",
                storedEmail : ""
            }
        },

        components: {
            navbar,
            QuillEditor
        },

        methods : {
            selectAllEmails() {
                if (this.selectAll) {
                    this.selectedEmails = this.emails.map(email => email.email);
                } else {
                    this.selectedEmails = [];
                }
            },

            setEmail(email) {
                this.storedEmail = email;
            },

            deleteMail() {
                axios.get("/email/delete/massive/" + this.storedEmail, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                    }
                }).then(response => {
                    this.emails = response.data.data;
                }).catch(err => {
                    console.log(err);
                });
            },

            appendEmail() {
                axios.post("/email/add/massive", { email : this.email }, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                    }
                }).then(response => {
                    this.email = "";
                    this.emails = response.data.data;

                    this.$swal({
                        title : "თქვენი მოთხოვნა წარმატებით შესრულდა",
                        icon : "success",
                    });
                }).catch(err => console.log(err));
            },

            send() {
                axios.post("/email/send/massive", {
                    emails : this.selectedEmails,
                    text : this.$refs.text.getText(),
                    subject : this.subject
                }, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                    }
                }).then(response => {
                    this.$swal({
                        title : "თქვენი მოთხოვნა წარმატებით შესრულდა",
                        icon : "success",
                    });

                    this.errors = [];

                    setTimeout(() => {
                        this.$router.back()
                    }, 2000);
                }).catch(err => {
                    if(err instanceof AxiosError) {
                        this.errors = err?.response?.data?.errors;
                    }
                });
            }
        },

        mounted() {
            const _this_ = this;

            axios.get("/email/list/all", {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                }
            }).then(function(response) {
                _this_.emails = response.data;
            }).catch(err => {
                console.log(err);
            })
        }
    }
</script>

<style scoped>
    .container {
        font-family: firago-regular;
    }
    .btn_m:hover {
        background-color: rgb(224, 224, 224);
    }
    .dropdown-menu {
        text-align: center;     
    }
    .btn_m {
        border: 1px solid rgb(248, 248, 248);
    }
</style>
