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
                <h6 class="main mt-1 mb-3 ">დაგეგმეთ მომდევნო შეტყობინებები</h6>
            </div>
            <div class="row">
                <div class="col-md-7 col-12">
                    <form @submit.prevent="addTemplate()">
                        <div class="justify-content-center card mb-3 p-3">
                           <div class="col-md-12">
                                <div class="row justify-content-between align-items-center">
                                    <div class="col-md-3">
                                        <label class="form-label" for="datetime-picker">გაგზავნის თარიღი</label>
                                        <flat-pickr id="datetime-picker" class="form-control input_form_add" v-model="datetime" :config="flatpickrOptions"></flat-pickr>
                                    </div>
                                </div>
                                <label for="disabledTextInput" class="form-label mt-4 qui">გთხოვთ აკრიფოთ გასაგზავნი ტექსტი</label>
                                <QuillEditor theme="snow" style="height: 200px" v-model:content="text" contentType="html" />
                            </div>
                        </div>

                        <input type="submit" class="btn btn-success w-100 mb-4"  value="შენახვა">
                    </form>

                    <div v-if="errors">
                        <div v-for="(item, index) in errors" :key="index" class="alert alert-danger alert-dismissible">
                            <strong>{{ item[0] }}</strong>
                            <button class="btn-close" data-bs-dismiss="alert"></button>
                        </div>
                    </div>

                    <div v-if="edited" class="alert alert-success alert-dismissible">
                        <strong>ნიმუში დარედაქტირდა</strong>
                        <button type="button" class="btn btn-close" data-bs-dismiss="alert"></button>
                    </div>
                </div>
                <!-- მეილების ადგილი -->
                <!-- <div class="col-md-3"> -->
                    
                <!-- </div> -->
                <!-- გაგზავნის ისტორია -->
                <!-- <div class="col-md-2">
                    <h6 class="main">გაგზავნის ისტორია</h6>
                    <ol>
                        <li>24-01-2024 12:30</li>
                        <li>24-01-2024 12:30</li>
                        <li>24-01-2024 12:30</li>
                        <li>24-01-2024 12:30</li>
                        <li>24-01-2024 12:30</li>
                    </ol>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
    import navbar from '../../components/navbar.vue'
    import { QuillEditor } from '@vueup/vue-quill'
    import FlatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import axios from 'axios'
    import line from '../../components/line.vue'

    export default {
        data() {
            return {
                flatpickrOptions: {
                    enableTime: true,
                    dateFormat: 'Y-m-d H:i',
                },

                datetime: "",
                text: '',

                errors : [],
                edited : false
            }
        },

        components: {
            navbar,
            FlatPickr,
            QuillEditor,
            line,
        },

        mounted() {
            const _this_ = this;

            axios.get("/template/get/" + this.$route.params.id, {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                }
            }).then(function(response) {
                _this_.datetime = response.data.datetime;
                _this_.text = response.data.text;
            }).catch(err => {
                console.log(err);
            });

        },

        methods: {
            addTemplate() {
                axios.post("/template/edit/" + this.$route.params.id, {
                    datetime : this.datetime,
                    text : this.text,
                }, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                    }
                }).then(response => {
                    this.edited = true;
                }).catch(err => {
                    if(err instanceof AxiosError) {
                        this.errors = err?.response?.data?.errors;
                    }

                    this.edited = false;
                });
            },

            addNewTemplate() {
                this.templates.push({ datetime: new Date(), text: '' });
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
</style>
