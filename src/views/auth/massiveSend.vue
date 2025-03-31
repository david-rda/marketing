<template>
    <div>
        <navbar />

        <div class="container" style="margin-top: 120px">
            <div class="row gy-5">
                <div class="col-md-6">
                    <div class="form-group mb-3">
                        <input type="text" placeholder="თემა" v-model="subject" class="form-control">
                    </div>

                    <QuillEditor theme="snow" style="height: 200px" ref="text" v-model:content="text" contentType="html" />

                    <div class="d-grid mt-3 mt-lg-0 mb-2">
                        <button type="button" class="btn btn-success mt-2 mb-2" :disabled="disabled" @click="send">
                            გაგზავნა
                            <span class="spinner spinner-border spinner-border-sm" v-if="disabled"></span>
                            <i v-else class="fa fa-send pe-none"></i>
                        </button>
                    </div>

                    <div class="alert alert-danger" v-for="(item, index) in errors" :key="index">
                        <strong>{{ item[0] }}</strong>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card mb-3">
                        <div class="card-header border-bottom d-flex justify-content-between align-items-center">
                            <label class="form-check-label">
                                <input type="checkbox" class="form-check-input" v-model="selectAll" @change="selectAllEmails">
                                &nbsp;ყველას მონიშვნა
                            </label>

                            <button class="btn btn-sm btn-success" v-on:click="copyEmailsToClipboard()" v-tippy="{ content: 'მონიშნული ელ. ფოსტების კოპირება' }">
                                <i class="fa fa-clipboard pe-none"></i>
                            </button>

                            <form method="POST" @submit.prevent="appendEmail()">
                                <input type="email" placeholder="ელ. ფოსტა" class="form-control" v-model="email">
                            </form>
                        </div>
                        <div class="card-body overflow-y-scroll" style="max-height: 70vh;">
                            <div v-for="email in emails" :key="email.id" class="mb-3 d-flex justify-content-between">
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input" v-model="selectedEmails" :value="email.email" :id="'emailCheckbox' + email.id">
                                    <label class="form-check-label" :for="'emailCheckbox' + email.id">{{ email.email }}</label>
                                </div>
                                <button type="button" class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#confirmationModal" @click="setEmail(email.email)">
                                    <i class="fa fa-trash-o pe-none"></i>
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
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
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
                storedEmail : "",
                disabled : false
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

            // მონიშნული ელ. ფოსტების კოპირების ფუნქცია
            copyEmailsToClipboard() {
                if(this.selectedEmails.length > 0) {
                    const copiedEmails = this.selectedEmails.join(";");
                    
                    navigator.clipboard.writeText(copiedEmails);
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
                this.disabled = true;

                axios.post("/email/send/massive", {
                    emails : this.selectedEmails,
                    text : this.$refs.text.getContents(),
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

                    this.disabled = false;
                }).catch(err => {
                    if(err instanceof AxiosError) {
                        this.errors = err?.response?.data?.errors;
                    }

                    this.disabled = false;
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
            });
        }
    }
</script>

<style scoped>
    .container {
        font-family: firago-regular;
    }
</style>
