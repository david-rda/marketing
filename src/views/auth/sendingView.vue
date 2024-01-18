<template>
    <div>
        <navbar/>
        <div class="container row_position">
            <div class="row">
                <h4 class="main brand mt-3 mb-3">პირველი შეტყობინების გაგზავნა</h4>
            </div>
            <form @submit.prevent="addTemplate()" class=" form_bg" ref="sendForm">
                <div class="row justify-content-between">
                    <div class="col-md-9 text_email1">
                        <div class="row">
                            <div class="col-md-9">
                                <label class="form-label" for="exhibition">აირჩიეთ გამოფენა</label>
                                <v-select v-model="exhibition" class="input_form_add" :options="options" placeholder="აირჩიეთ გამოფენა" @change="fnc()"></v-select>
                            </div>
                            <div class="col-md-3">
                                <label class="form-label" for="exhibition">გაგზავნის თარიღი</label>
                                <flat-pickr class="form-control input_form_add" id="datetime-picker" v-model="picked" :config="flatpickrOptions"></flat-pickr>
                            </div>
                        </div>
                        
                        <label for="disabledTextInput" class="form-label mt-4 qui">გთხოვთ აკრიფოთ გასაგზავნი ტექსტი</label>
                        <QuillEditor theme="snow" class="input_form" v-model="text" ref="text" />
                        <input type="submit" class=" btn btn-success w-100 btn_manual mt-3 mb-3"  value="გაგზავნა">

                        <div v-if="show_alert" class="alert alert-success alert-dismissible">
                            <strong>ნიმუში დაემატა</strong>
                            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                        </div>
                        <div v-if="show_alert === false" class="alert alert-danger alert-dismissible">
                            <strong>ნიმუში ვერ დაემატა</strong>
                            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                        </div>
                    </div>
                    <div class="col-md-3" v-if="newObject != ''">
                        <div id="emailApp" class="card p-2">
                           
                            <label class="form-label" for="emailInput">ადრესატები:</label>

                            <ol class="list-group mt-2">
                                <li class="list-group-item d-flex justify-content-between align-items-center" style="font-size: 14px" v-for="(item, index) in newObject" :key="index">
                                    <span>{{ item.email }}</span>
                                    <button type="button" class="btn btn-danger" :data-email-id="item.id" :data-exhibition-id="item.exhibition_id" @click="deleteEmail($event)">
                                        <svg style="pointer-events: none" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                        </svg>
                                    </button>
                                </li>
                            </ol>
                            
                            <!-- <div class="input-group mb-3">
                                <input type="email" class="form-control input_form_add" v-model="newEmail">
                                <button type="button" class="btn btn-secondary" @click="addEmail()">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-person-plus" viewBox="0 0 16 16">
                                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                                        <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"/>
                                    </svg>
                                </button>
                            </div> -->
                           
                            <!-- <div class=" p-1 mt-2" v-if="emails.length">
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
                            </div> -->
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
    import Datepicker from 'vue3-datepicker'
    import vSelect from "vue-select"
    import "vue-select/dist/vue-select.css"
    import FlatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import axios from 'axios'

    export default {
        data() {
            return {
                newEmail: '',
                emails: [],
                picked: new Date(),
                exhibition : "",

                flatpickrOptions: {
                    enableTime: true,
                    dateFormat: 'Y-m-d H:i',
                },

                options: [],

                show_alert : "",

                newObject : ""
            }
        },

        components: {
            navbar,
            vSelect,
            FlatPickr,
            QuillEditor,
            Datepicker,
        },

        mounted() {
            const _this_ = this;

            axios.get("/exhibition/list").then(function(response) {
                _this_.options = response.data;
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

                console.log(email_id);
                console.log(exhibition_id);
            },

            addTemplate() {
                const _this_ = this;

                axios.post("/template/add", {
                    exhibition : this.exhibition,
                    datetime : this.picked,
                    text : this.$refs.text.getText(),
                    emails : this.emails
                }).then(function() {
                    _this_.show_alert = true;

                    _this_.exhibition = "";
                    _this_.datetime = "";
                    _this_.text = "";
                    _this_.emails = "";
                }).catch(function() {
                    _this_.show_alert = false;
                });
            }
        }
    }
</script>

<style scoped>

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
