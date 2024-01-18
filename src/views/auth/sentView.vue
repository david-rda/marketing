<template>
    <div>
        <navbar/>
        <div class="container">
            <div class="row row_position justify-content-around">
                <div class="row p-0 align-items-center mb-5">
                    <div class="col-md-6 col-12 ">
                        <v-select v-model="selectedValue" :options="options" placeholder="აირჩიეთ გამოფენა"> </v-select>
                    </div>
                    <div class="col-md-6 col-12 text-end d-md-block d-none">
                        <h4 class="main brand">გაგზავნილი მეილები</h4>
                    </div>
                </div>
            </div> 
        </div>
        <div class="container">
            <div class="row mt-4 ">
                <div class="col-md-12">
                    <div class="overflow-auto">
                        <table class="table table-hover border ">
                            <thead class="text-center">
                                <tr>
                                    <th scope="col">ელ. ფოსტა</th>
                                    <th scope="col">სტატუსი</th>
                                    <th scope="col">გაგზავნის თარიღი</th>
                                    <th scope="col">ხელახლა გაგზავნა</th>
                                </tr>
                            </thead>
                            <tbody class="text-center">
                                <tr v-for="(item, index) in emails" :key="index">
                                    <td>{{ item.email }}</td>
                                    <td>{{ item.status }}</td>
                                    <td>{{ new Date(item.updated_at).toISOString().split('T')[0] }}</td>
                                    <td>
                                        <button class="btn btn-warning" type="button" >
                                            გაგზავნა
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
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
  import axios from 'axios'

  export default {
    components: {
      navbar,
      vSelect,
      QuillEditor,
      FlatPickr,
    },

    mounted() {
        const _this_ = this;

        axios.get("/exhibition/list").then(function(response) {
            _this_.options = response.data;
        });

        axios.get("/email/sent/list").then(response => {
            _this_.emails = response.data;
        });
    },
    
    data() {
      return {
        selectedValue: null,

        data : "",
        emails : [],

        options: [],

        flatpickrOptions: {
            enableTime: true,
            dateFormat: 'Y-m-d H:i',
        },
      }
    },
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
    width: 150px;
    margin: auto;
   }
   /* button {
    margin-top: 14px;
   } */
</style>