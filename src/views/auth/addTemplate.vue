<template>
    <div>
        <navbar />

        <div class="container" style="margin-top: 120px">
            <div class="row">
                <div class="col-12">
                    <h4 class="main head mt-4">{{ $route.params.label }}</h4>
                    <form @submit.prevent="addTemplate()">
                        <div class="justify-content-center card mb-3 p-3">
                            <div class="col-md-12">
                                <div class="row justify-content-between align-items-center">
                                    <div class="col-md-3 mb-3">
                                        <label class="form-label" for="datetime-picker">გაგზავნის თარიღი</label>
                                        <flat-pickr id="datetime-picker" class="form-control input_form_add" v-model="datetime" :config="flatpickrOptions"></flat-pickr>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="form-label" for="subject">ელ. ფოსტის თემა</label>
                                    <input type="text" placeholder="ელ. ფოსტის თემა" id="subject" v-model="subject" class="form-control">
                                </div>

                                <label for="disabledTextInput" class="form-label mt-3 qui">გთხოვთ აკრიფოთ გასაგზავნი ტექსტი</label>
                                <QuillEditor theme="snow" style="height: 200px" ref="text" v-model:content="text" contentType="html" />
                            </div>
                        </div>
                        <input type="submit" class="btn btn-success w-100 mb-4"  value="შენახვა">
                    </form>

                    <div class="alert alert-danger" v-for="(item, index) in errors" :key="index">
                        <strong>{{ item[0] }}</strong>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import navbar from '../../components/navbar.vue'
  import { QuillEditor } from '@vueup/vue-quill'
  import FlatPickr from 'vue-flatpickr-component';
  import axios, { AxiosError } from 'axios';

  export default {
    components: {
      navbar,
      QuillEditor,
      FlatPickr,
    },
    
    data() {
      return {
        datetime: new Date(),
        text : "",
        errors : [],

        subject : "",

        flatpickrOptions: {
            enableTime: false,
            dateFormat: 'Y-m-d',
        },
      }
    },

    methods : {
        addTemplate() {
            axios.post("/template/add", {
                datetime : this.datetime,
                text : this.$refs.text.getText(),
                exhibition_id : this.$route.params.id,
                subject : this.subject,
                status : 2
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
        },
    }
  }
</script>


<style scoped>
    .container{
        font-family: firago-regular;
    }
    .main {
        font-weight: 600;
    }
   .card-body{
    height: 560px;
   }
   .input_form_add {
    margin: auto;
   }
</style>