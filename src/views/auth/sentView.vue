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
            <div class="row mt-4 ">
                <div class="col-md-12">
                    <div class="overflow-auto">
                        <table class="table table-hover border">
                            <thead class="text-center">
                                <tr>
                                <th scope="col">ელ. ფოსტა</th>
                                <th scope="col">გაგზავნის თარიღი</th>
                                <th scope="col">მომდევნო შეტყობინება</th>
                                <th scope="col">გაგზავნა</th>
                                </tr>
                            </thead>
                            <tbody class="text-center">
                                <tr>
                                    <td>ferma@gmail.com</td>
                                    <td>01-01-24</td>
                                    <td>07-01-24</td>
                                    <td>
                                        <!-- Button trigger modal -->
                                        <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-exclamation" viewBox="0 0 16 16">
                                                <path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z"/>
                                                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1.5a.5.5 0 0 1-1 0V11a.5.5 0 0 1 1 0m0 3a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
                                            </svg>
                                        </button>

                                        <!-- Modal -->
                                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                            <div class="modal-header">
                                                <h1 class="modal-title fs-5" id="exampleModalLabel">
                                                    შეტყობინების განმეორებით გაგზავნა
                                                </h1>
                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div class="modal-body">
                                                დარწმუნებული ხართ, რომ გსურთ შეტყობინების გაგზავნა?                                            
                                            </div>
                                            <div class="modal-footer">
                                                <button type="button" class="btn btn-warning" data-bs-dismiss="modal">გაგზავნა</button>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
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
  import "vue-select/dist/vue-select.css"
  import Line from '../../components/line.vue'
  import axios from 'axios'

  export default {
    components: {
      navbar,
      vSelect,
    },
    
    data() {
      return {
        selectedValue: null,

        data : "",

        options: [
          { value: 'option1', label: 'ჩატარებული გამოფენა 1' },
          { value: 'option2', label: 'ჩატარებული გამოფენა 2' },
        ],
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
   
</style>