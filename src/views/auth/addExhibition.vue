<template>
    <div>
        <navbar />

        <div class="container" style="margin-top: 120px">
            <div class="row justify-content-around">
                <div class="col-md-2 col-12 mb-3">
                    <button type="button" class="btn btn-secondary w-100" @click="$router.back()">&larr; უკან</button>
                </div>

                <div class="col-md-8 col-12">
                    <form @submit.prevent="addExhibition">
                        <div class="mb-3">
                            <label for="name" class="form-label">გამოფენის დასახელება</label>
                            <input type="text" id="name" class="form-control" v-model="name" placeholder="შეიყვანეთ დასახელება" autocomplete="off">
                        </div>

                        <div class="mb-3">
                            <label for="country" class="form-label">ქვეყანა</label>
                            <input type="text" id="country" class="form-control" v-model="country" placeholder="შეიყვანეთ ქვეყანა" autocomplete="off">
                        </div>

                        <div class="mb-3">
                            <label for="datetime-picker" class="form-label">ჩატარების თარიღი</label>
                            <flat-pickr class="form-control" id="datetime-picker" v-model="datetime" :config="flatpickrOptions"></flat-pickr>
                        </div>

                        <div class="mb-4">
                            <button type="submit" class="btn btn-success w-100" :disabled="disabled">
                                დამატება
                                <span class="spinner spinner-border spinner-border-sm ms-1" v-show="disabled"></span>
                            </button>
                        </div>

                        <div v-if="errors">
                            <div v-for="(item, index) in errors" :key="index" class="alert alert-danger">
                                {{ item[0] }}
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
        disabled : false,

        flatpickrOptions: {
            enableTime: false,
            dateFormat: 'Y-m-d',
        },
      }
    },

    methods : {
        addExhibition() {
            this.disabled = true;
        
            axios.post("/exhibition/add", {
                title : this.name,
                datetime : this.datetime,
                country : this.country,
            }, {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                }
            }).then(response => {
                this.name = "";
                this.datetime = new Date();
                this.country = "";

                this.errors = null;

                this.$swal({
                    title : "თქვენი მოთხოვნა წარმატებით შესრულდა",
                    icon : "success",
                });

                setTimeout(() => {
                    this.$router.back()
                }, 2000);

                this.disabled = false;

            }).catch(err => {
                if(err instanceof AxiosError) {
                    this.errors = err?.response?.data?.errors;
                }

                this.disabled = false;
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