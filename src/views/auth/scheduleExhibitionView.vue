<template>
    <div>
        <navbar/>

        <div class="container" style="margin-top: 90px;">
            <div class="row">
                <div class="col-md-4">
                    <h4 class="main head mt-4">შეტყობინების კალენდარი</h4>
                </div>
            </div>
            <div class="row">
                <h4 class="main brand mt-3">{{ this.$route.params.label }}</h4>
                <h6 class="main mt-1 mb-3 ">დაგმეთ მომდევნო შეტყობინებები</h6>
            </div>
            <div class="row">
                <div class="col-md-9">
                    <form @submit.prevent="addTemplate()" class="form_bg p-3" ref="sendForm">
                        <div class="row justify-content-center" v-for="(item, index) in templates" :key="index">
                            <div class="col-md-10 text_email1">
                                <div class="row justify-content-between align-items-center">
                                    <p>{{ item }}</p>
                                    <div class="col-md-1">#{{ index + 1 }}</div>
                                    <div class="col-md-3">
                                        <label class="form-label" for="exhibition">გაგზავნის თარიღი</label>
                                        <flat-pickr class="form-control input_form_add" id="datetime-picker" v-model="item.datetime" :config="flatpickrOptions"></flat-pickr>
                                    </div>
                                </div>
                                <label for="disabledTextInput" class="form-label mt-4 qui">გთხოვთ აკრიფოთ გასაგზავნი ტექსტი</label>
                                <QuillEditor theme="snow" class="input_form" v-model="item.text" ref="text" />
                            </div>
                        </div>
                    </form>
                    <div class="row justify-content-center mt-3">
                        <div class="col-md-2 col-12 d-flex justify-content-center">
                            <button @click="addFields" type="button" class="btn btn-plus">
                                <img class="plus" src="../../assets/img/icon/plus-circle.svg" alt="plus">
                            </button>
                        </div>
                    </div>
                    <input type="submit" class="btn btn-success w-100 btn_manual mt-5 mb-4"  value="შენახვა">

                    <div v-if="show_alert" class="alert alert-success alert-dismissible">
                        <strong>ნიმუში დაემატა</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                    <div v-if="show_alert === false" class="alert alert-danger alert-dismissible">
                        <strong>ნიმუში ვერ დაემატა</strong>
                        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                    </div>
                </div>
            </div>
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
    import line from '../../components/line.vue'

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

                show_alert : "",
                templates : []
            }
        },

        components: {
            navbar,
            vSelect,
            FlatPickr,
            QuillEditor,
            Datepicker,
            line,
        },

        mounted() {
            const _this_ = this;

            axios.get("/template/list/" + this.$route.params.id).then(function(response) {
                response.data.forEach((item, index) => {
                    _this_.templates.push({
                        datetime : item.datetime,
                        text : item.text
                    });
                })
            });

            if(this.templates.length == 0) {
                this.templates.push({
                    datetime : new Date(),
                    text : ""
                });
            }
        },

        methods: {
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
                }).catch(function() {
                    _this_.show_alert = false;
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
    height: 250px !important;
}
.plus {
        width: 30px;
        height: 30px;
        opacity: 0.6;
    }
form {
    border: 1px solid rgb(231, 231, 231) !important;
    /* overflow: hidden; */
    height: 460px;
    border-radius: 4px;
    width: 100%;
}
</style>
