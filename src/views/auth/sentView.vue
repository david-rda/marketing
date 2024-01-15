<template>
    <div>
        <navbar/>
        <div class="container">
            <div class="row row_position justify-content-around">
                <div class="row p-0 align-items-center mb-5">
                    <div class="col-md-6 col-12 ">
                        <v-select v-model="selectedValue" :options="options" placeholder="აირჩიეთ გამოფენა"> </v-select>
                    </div>
                    <div class="col-md-6 col-12 text-center d-md-block d-none">
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
                                    <!-- <th scope="col">გაფრთხილება</th> -->
                                    <!-- <th scope="col" v-if="warn_status == 1">გაფრხილების თარიღი</th>
                                    <th v-if="status == 1" scope="col">რედაქტირების შეტყობინება</th>
                                    <th v-if="status == 1" scope="col">რედაქტირების შეტყობინების თარიღი</th> -->
                                </tr>
                            </thead>
                            <tbody class="text-center">
                                <tr>
                                    <td>ferma@gmail.com</td>
                                    <td>არ არის შევსებული</td>
                                    <td>01-01-24</td>
                                    <td>
                                        <button class="btn btn-warning" type="button" >
                                            გაგზავნა
                                        </button>
                                    </td>
                                    <!-- <td>                                      -->
                                        <!-- <p class="d-inline-flex gap-1"> -->
                                        <!-- <router-link to="/warning">
                                            <button class="btn btn-warning" type="button" >
                                            გაფრთხილება
                                            </button>
                                        </router-link> -->
                                        <!-- </p> -->
                                        <!-- <div class="collapse" id="collapseExample">
                                            <div class="card card-body">
                                                <form action="">
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <label class="form-label" for="exhibition">გაგზავნის თარიღი</label>
                                                            <flat-pickr class="form-control input_form_add" id="datetime-picker" v-model="picked" :config="flatpickrOptions"></flat-pickr>
                                                            <label for="disabledTextInput" class="form-label mt-4 qui">გთხოვთ აკრიფოთ გასაგზავნი ტექსტი</label>
                                                            <QuillEditor theme="snow" class="input_form" v-model="text" ref="text" />
                                                            <input type="submit" class=" btn btn-success w-100 btn_manual mt-3 "  value="გაგზავნა">
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div> -->
                                    <!-- </td> -->
                                    <!-- <td  v-if="warn_status == 1">
                                        <ol>
                                            <li>01-02-23</li>
                                            <li>01-05-23</li>
                                        </ol>
                                    </td> -->
                                    <!-- <td v-if="status == 1">                                         -->
                                        <!-- <p class="d-inline-flex gap-1"> -->
                                        <!-- <button class="btn btn-success" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                           რედაქტირების შეტყობინება
                                        </button> -->
                                        <!-- </p> -->
                                        <!-- <div class="collapse" id="collapseExample">
                                            <div class="card card-body">
                                                <form action="">
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <label class="form-label" for="exhibition">გაგზავნის თარიღი</label>
                                                            <flat-pickr class="form-control input_form_add" id="datetime-picker" v-model="picked" :config="flatpickrOptions"></flat-pickr>
                                                            <label for="disabledTextInput" class="form-label mt-4 qui">გთხოვთ აკრიფოთ გასაგზავნი ტექსტი</label>
                                                            <QuillEditor theme="snow" class="input_form" v-model="text" ref="text" />
                                                            <input type="submit" class=" btn btn-success w-100 btn_manual mt-3 "  value="გაგზავნა">
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </div> -->
                                    <!-- </td> -->
                                    <!-- <td v-if="status == 1">
                                            01-02-23
                                    </td> -->
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
  import Line from '../../components/line.vue'
  import axios from 'axios'

  export default {
    components: {
      navbar,
      vSelect,
      QuillEditor,
      FlatPickr,
    },
    
    data() {
      return {
        selectedValue: null,

        data : "",

        options: [
          { value: 'option1', label: 'ჩატარებული გამოფენა 1' },
          { value: 'option2', label: 'ჩატარებული გამოფენა 2' },
        ],
        flatpickrOptions: {
            enableTime: true,
            dateFormat: 'Y-m-d H:i',
        },
        // status: 0,
        // warn_status : 1
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