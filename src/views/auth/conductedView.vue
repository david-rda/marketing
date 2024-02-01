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
                        <h4 class="main brand">ჩატარებული გამოფენები</h4>
                    </div>
                </div>
            </div>
                <div class="d-md-block d-none" v-if="selectedValue">
                    <div class="row justify-content-end  align-items-center ">
                        <div class="col-md-2">
                            <div class="btn btn-warning btn-sm d-flex justify-content-between" @click="downloadExcel()"> 
                                <h6 class="m-0"><b>გადმოწერა</b></h6>
                                <img src="../../assets/img/icon/download-solid.svg" alt="download excel">
                            </div>
                        </div>
                    </div>
                </div>    
            <div class="row mt-3">
                <div class="col-md-12">
                    <div class="overflow-auto">
                        <table class="table table-hover border">
                            <thead class="text-center">
                                <tr>
                                <th scope="col">ID</th>
                                <th scope="col">გამოფენა</th>
                                <th scope="col">სახელი, გვარი</th>
                                <th scope="col">ელ. ფოსტა</th>
                                <th scope="col">ორგანიზაცია</th>
                                <th scope="col">ქმედება</th>
                                </tr>
                            </thead>
                            <tbody class="text-center">
                                <tr v-for="(item, index) in data" :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item.exhibition_name }}</td>
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.email }}</td>
                                    <td>
                                        <ol>
                                            <li v-for="data in item.organizations" :key="data.id">{{ data.company_name }}</li>
                                        </ol>
                                    </td>
                                    <td><router-link :to="'/view/' + item.id + '/' + item.exhibition_id" class="btn btn-success btn-sm">დათვალიერება</router-link></td>
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
      Line
    },
    
    data() {
      return {
        selectedValue: null,

        data : "",

        options: [],

        new_value : ""
      }
    },

    watch : {
        selectedValue(newValue, oldValue) {
            const __this__ = this;

            axios.get("/detail/list/" + newValue.id, {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                }
            }).then(function(response) {
                __this__.data = response.data;
                __this__.new_value = newValue.id;
            }).catch(function(err) {
                console.log(err);
            });
        }
    },

    mounted() {
        const __this__ = this;

        axios.get("/detail/list", {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                }
            }).then(function(response) {
            __this__.data = response.data;
        }).catch(function(err) {
            console.log(err);
        });

        axios.get("/exhibition/list", {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                }
            }).then(function(response) {
            __this__.options = response.data;
        });
    },

    methods : {
        downloadExcel() {
            window.open("https://survey.rda.gov.ge/api/exhibition/download/excel/" + this.new_value);
        }
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
   
</style>