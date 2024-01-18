<template>
    <div>
        <navbar />

        <div class="container" style="margin-top: 120px">
            <div class="row justify-content-center">
                <div class="col-md-6 col-12">
                    <form @submit.prevent="addExhibition">
                        <div class="mb-3 mx-3">
                            <label for="name" class="form-label">გამოფენის დასახელება</label>
                            <input type="text" id="name" class="form-control input_form" v-model="name" autocomplete="off">
                        </div>
                        <div class="mb-3 mx-3">
                            <label for="country" class="form-label">ქვეყანა</label>
                            <input type="text" id="country" class="form-control input_form" v-model="country" autocomplete="off">
                        </div>
                        <div class="mb-3 mx-3">
                            <label for="datetime-picker" class="form-label">ჩატარების თარიღი</label>
                            <flat-pickr class="form-control input_form_add" id="datetime-picker" v-model="datetime" :config="flatpickrOptions"></flat-pickr>
                        </div>
                        <div class="mb-3 mx-3 mt-4">
                            <input type="submit" value="დამატება" class="form-control input_form mt-1 btn_manual">
                        </div>
                        
                        <div class="mx-3" v-if="errors != ''">
                            <div v-for="(item, index) in errors" :key="index" class="alert alert-dismissible alert-danger">
                                <strong>{{ item[0] }}</strong>
                                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                            </div>
                        </div>

                        <div class="mx-3" v-if="errors == null">
                            <div class="alert alert-dismissible alert-success">
                                <strong>გამოფენა დაემატა</strong>
                                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import navbar from '../../components/navbar.vue'
  import vSelect from "vue-select"
  import { QuillEditor } from '@vueup/vue-quill'
  import FlatPickr from 'vue-flatpickr-component';
  import "vue-select/dist/vue-select.css"
  import axios, { AxiosError } from 'axios';

  export default {
    components: {
      navbar,
      vSelect,
      QuillEditor,
      FlatPickr,
    },
    
    data() {
      return {
        datetime: new Date(),
        country: "",
        name: "",

        errors : "",

        flatpickrOptions: {
            enableTime: false,
            dateFormat: 'Y-m-d',
        },
      }
    },

    methods : {
        addExhibition() {
            axios.post("/exhibition/add", {
                title : this.name,
                datetime : this.datetime,
                country : this.country,
            }).then(response => {
                this.name = "";
                this.datetime = new Date();
                this.country = "";

                this.exhibitions = response.data.data;

                this.errors = null;

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