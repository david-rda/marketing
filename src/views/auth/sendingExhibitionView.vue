<template>
    <div>
        <navbar/>
        <div class="container" style="margin-top: 90px;">
            <div class="row">
                <div class="col-md-4">
                    <h4 class="main head mt-4"><span class="btn btn-success" @click="$router.back()">&larr;</span>&nbsp;&nbsp;შეტყობინების გაგზავნა</h4>
                </div>
            </div>
            <form @submit.prevent="addTemplate()" class="form_bg" ref="sendForm">
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
                                        <button type="button" class="btn btn-success ms-1 btn-sm text-white" ref="sendbtn" @click="sendToSpecific(item.exhibition_id, item.email, index)">
                                            <i class="fa fa-send pe-none"></i>
                                        </button>
                                        <button type="button" class="btn btn-danger text-white btn-sm ms-1" :data-email-id="item.id" :data-exhibition-id="item.exhibition_id" @click="deleteEmail($event)">
                                            <i class="fa fa-trash pe-none"></i>
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

                disabled : false,
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

            sendToSpecific(exhibition_id, email, index) {
                const _this_ = this;
                
                this.$refs.sendbtn[index].setAttribute("disabled", "true");

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
                    
                    this.$refs.sendbtn[index].removeAttribute("disabled");
                }).catch(err => {
                    this.$refs.sendbtn[index].removeAttribute("disabled");
                });
            },

            addTemplate() {
                const _this_ = this;

                this.disabled = true;

                axios.post("/template/add", {
                    exhibition_id : this.$route.params.id,
                    datetime : this.picked,
                    subject : this.subject,
                    text : this.$refs.text.getContents(),
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
</style>
