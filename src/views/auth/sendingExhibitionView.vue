<template>
    <div>
        <navbar/>
        <div class="container" style="margin-top: 90px;">
            <div class="row">
                <div class="col-md-4">
                    <h4 class="main head mt-4"><span class="btn btn-success" @click="goBack">&larr;</span>&nbsp;&nbsp;შეტყობინების გაგზავნა</h4>
                </div>
            </div>
            <form @submit.prevent="addTemplate()" class=" form_bg" ref="sendForm">
                <div class="row justify-content-between">
                    <div class="col-md-8 text_email1">
                        <div class="row">
                            <div class="col-md-9">
                                <h4 class="main brand mt-3">{{ this.$route.params.label }}</h4>
                                <h6 class="main mt-1 mb-3">აკრიფეთ გასაგზავნი ტექსტი</h6>
                            </div>
                            <div class="col-md-3">
                                <label class="form-label" for="exhibition">გაგზავნის თარიღი</label>
                                <flat-pickr class="form-control input_form_add" id="datetime-picker" v-model="picked" :config="flatpickrOptions"></flat-pickr>
                            </div>
                        </div>

                        <div class="form-group mb-3">
                            <label class="form-label" for="subject">ელ. ფოსტის თემა</label>
                            <input type="text" placeholder="ელ. ფოსტის თემა" id="subject" v-model="subject" class="form-control">
                        </div>

                        <QuillEditor theme="snow" class="input_form" v-model:content="text" ref="text" contentType="html" style="height: 300px" />
                        <input type="submit" class="btn btn-success w-100 mt-3 mb-3" :disabled="disabled"  value="გაგზავნა">

                        <div v-for="(item, index) in errors" class="alert alert-danger" :key="index">
                            <strong>{{ item[0] }}</strong>
                        </div>
                    </div>
                    <div class="col-md-4" v-if="options != ''">
                        <div id="emailApp" class="card">
                            <div class="card-header">
                                <h5 class="card-title">ადრესატები</h5>
                            </div>
                            <div class="card-body">
                                <div class="d-flex justify-content-between align-items-center mb-3" style="font-size: 14px" v-for="(item, index) in emails" :key="index">
                                    <span>{{ item.email }}</span>
                                    <div>
                                        <button type="button" class="btn btn-success ms-1 btn-sm" @click="sendToSpecific(item.exhibition_id, item.email)">
                                            <svg fill="#fff" height="16" width="16" version="1.1" id="Layer_1" style="pointer-events: none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve">
                                                <g>
                                                    <g>
                                                        <path d="M508.645,18.449c-2.929-2.704-7.133-3.51-10.826-2.085L6.715,204.446c-3.541,1.356-6.066,4.515-6.607,8.264
                                                            c-0.541,3.75,0.985,7.496,3.995,9.796l152.127,116.747c-0.004,0.116-0.575,0.224-0.575,0.342v83.592
                                                            c0,3.851,2.663,7.393,6.061,9.213c1.541,0.827,3.51,1.236,5.199,1.236c2.026,0,4.181-0.593,5.931-1.756l56.12-37.367
                                                            l130.369,99.669c1.848,1.413,4.099,2.149,6.365,2.149c1.087,0,2.186-0.169,3.248-0.516c3.27-1.066,5.811-3.672,6.786-6.974
                                                            L511.571,29.082C512.698,25.271,511.563,21.148,508.645,18.449z M170.506,321.508c-0.385,0.36-0.7,0.763-1.019,1.163
                                                            L31.659,217.272L456.525,54.557L170.506,321.508z M176.552,403.661v-48.454l33.852,25.887L176.552,403.661z M359.996,468.354
                                                            l-121.63-93.012c-1.263-1.77-2.975-3.029-4.883-3.733l-47.29-36.163L480.392,60.86L359.996,468.354z" />
                                                    </g>
                                                </g>
                                            </svg>
                                        </button>
                                        <button type="button" class="btn btn-danger btn-sm ms-1" :data-email-id="item.id" :data-exhibition-id="item.exhibition_id" @click="deleteEmail($event)">
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
            </form>
        </div>
    </div>
</template>

<script>
    import navbar from '../../components/navbar.vue'
    import { QuillEditor } from '@vueup/vue-quill'
    import FlatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import axios, { AxiosError } from 'axios'

    export default {
        data() {
            return {
                newEmail: '',
                emails: [],
                picked: new Date(),
                subject: "",
                exhibition_id : "",

                flatpickrOptions: {
                    enableTime: false,
                    dateFormat: 'Y-m-d',
                },

                options: [],

                show_alert : "",

                newObject : "",

                errors : [],

                disabled : false
            }
        },

        components: {
            navbar,
            FlatPickr,
            QuillEditor,
        },

        mounted() {
            const _this_ = this;

            axios.get("/exhibition/show/" + this.$route.params.id, {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                }
            }).then(function(response) {
                _this_.options = response.data;
                _this_.emails = response.data.emails;
            });
        },

        watch : {
            exhibition : function(newValue, prevValue) {
                this.newObject = newValue.emails;
            }
        },

        methods: {
            deleteEmail(event) {
                const email_id = Number(event.target.getAttribute("data-email-id"));
                const exhibition_id = Number(event.target.getAttribute("data-exhibition-id"));

                const _this_ = this;

                axios.get("/email/delete/" + email_id + "/" + exhibition_id, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                    }
                }).then(function(response) {
                    _this_.emails = response.data.data;
                }).catch(err => {
                    console.log(err);
                });
            },

            sendToSpecific(exhibition_id, email) {
                const _this_ = this;

                axios.post("/email/specific/send/to", {
                    exhibition : exhibition_id,
                    mail : email,
                }, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                    }
                }).then(response => {
                    _this_.$swal({
                        title : "თქვენი მოთხოვნა წარმატებით შესრულდა",
                        icon : "success",
                    });
                }).catch(err => console.log(err));
            },

            goBack() {
                this.$router.back();
            },

            addTemplate() {
                const _this_ = this;

                this.disabled = true;

                axios.post("/template/add", {
                    exhibition_id : this.$route.params.id,
                    datetime : this.picked,
                    subject : this.subject,
                    text : this.$refs.text.getText(),
                    status : 1
                }, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                    }
                }).then(function() {
                    _this_.$swal({
                        title : "თქვენი მოთხოვნა წარმატებით შესრულდა",
                        icon : "success",
                    });

                    _this_.errors = [];
                    _this_.disabled = false;

                    setTimeout(() => {
                        _this_.$router.back();
                    }, 2000);
                }).catch(function(err) {
                    if(err instanceof AxiosError) {
                        _this_.errors = err?.response?.data?.errors;
                    }
                    _this_.disabled = false;
                });
            }
        }
    }
</script>

<style scoped>
.container {
    font-family: firago-regular;
}
.text_email1 {
    height: 350px !important;
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
