<template>
    <div>
        <navbar />

        <div class="container" style="margin-top: 120px">
            <div class="row">
                <div class="col-12">
                    <h4 class="main head mt-4">{{ $route.params.label }}</h4>
                    <form @submit.prevent="editTemplate()">
                        <div class="justify-content-center card mb-3 p-3">
                            <div class="col-md-12">
                                <div class="row justify-content-between align-items-center">
                                    <div class="col-md-3">
                                        <label class="form-label" for="datetime-picker">გაგზავნის თარიღი</label>
                                        <flat-pickr id="datetime-picker" class="form-control input_form_add" v-model="date" :config="flatpickrOptions"></flat-pickr>
                                    </div>
                                </div>
                                <label for="disabledTextInput" class="form-label mt-4 qui">გთხოვთ აკრიფოთ გასაგზავნი ტექსტი</label>
                                <QuillEditor theme="snow" style="height: 200px" v-model:content="text" ref="text" contentType="html" />
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
        date: new Date(),
        text : "",
        errors : [],

        flatpickrOptions: {
            enableTime: false,
            dateFormat: 'Y-m-d',
        },
      }
    },

    mounted() {
        const _this_ = this;

        axios.get("/template/get/" + this.$route.params.id, {
            headers : {
                "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
            }
        }).then(function(response) {
            _this_.date = response.data.date;
            _this_.text = response.data.text;
            console.log(response);
        }).catch(err => {
            console.log(err);
        });
    },

    methods : {
        editTemplate() {
            axios.post("/template/edit/" + this.$route.params.id, {
                date : this.date,
                text : this.$refs.text.getText(),
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