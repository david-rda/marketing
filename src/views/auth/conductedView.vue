<template>
    <div>
        <navbar/>
        <div class="container">
            <div class="row row_position justify-content-around">
                <div class="row p-0 align-items-center mb-5 flex-row-reverse">
                    <div class="col-md-6 col-12">
                        <v-select v-model="selectedValue" :options="options" placeholder="აირჩიეთ გამოფენა"></v-select>
                    </div>
                    <div class="col-md-6 col-12 text-start d-md-block d-none">
                        <h4 class="main brand"><span class="btn btn-success" @click="goBack">&larr;</span>&nbsp;&nbsp;ჩატარებული გამოფენები</h4>
                    </div>
                </div>
            </div>
            <div class="d-md-block d-none" v-if="selectedValue">
                <div class="row justify-content-end align-items-center">
                    <div class="col-md-2">
                        <div class="btn-group-vertical w-100">
                            <button type="button" class="btn btn-success btn-sm d-flex justify-content-between align-items-center" @click="downloadExcel()">
                                <span class="me-2"><b>Excel გადმოწერა</b></span>
                                <img src="../../assets/img/icon/download-solid.svg" alt="download excel" width="20" height="20">
                            </button>
                            <button type="button" class="btn btn-danger btn-sm d-flex justify-content-between align-items-center" @click="downloadPdf()">
                                <span class="me-2"><b>PDF გადმოწერა</b></span>
                                <img src="../../assets/img/icon/download-solid.svg" alt="download pdf" width="20" height="20">
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row mt-3">
                <div class="col-md-2" v-if="selectedValue">
                    <ul class="nav nav-pills flex-column">
                        <li class="nav-item mb-2" v-for="items in dates" :key="items">
                            <a href="#" class="nav-link bg-success text-dark bg-opacity-25" :data-date="items" @click="filterDetails($event)">{{ items }}</a>
                        </li>
                    </ul>
                </div>
                <div :class="selectedValue ? 'col-md-10' : 'col-md-12'">
                    <div class="overflow-auto">
                        <table class="table table-hover border">
                            <thead class="text-center">
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">გამოფენა</th>
                                    <th scope="col">პოტენციური პარტნიორები</th>
                                    <th scope="col">კომპანია</th>
                                    <th scope="col">კომპანიის წარმომადგენელი</th>
                                    <th scope="col">ელ. ფოსტა</th>
                                    <th scope="col">შევსების თარიღი</th>
                                    <th scope="col">სტატუსი</th>
                                    <th scope="col">ქმედება</th>
                                </tr>
                            </thead>
                            <tbody class="text-center">
                                <tr v-for="(item, index) in data" :key="index">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ item.exhibition_name }}</td>
                                    <td>
                                        <ol>
                                            <li v-for="data in item.organizations" :key="data">{{ data?.company_name }}</li>
                                        </ol>
                                    </td>
                                    <td>{{ item?.company }}</td>
                                    <td>{{ item?.fullname }}</td>
                                    <td>{{ item?.email }}</td>
                                    <td>{{ new Date(item?.updated_at).toISOString().split('T')[0] }}</td>
                                    <td>{{ (item.filled_status === "1") ? 'შევსებულია' : 'არ არის შევსებული' }}</td>
                                    <td>
                                        <router-link :to="'/view/' + item.id + '/' + item.exhibition_id + '/' + item.email" class="btn btn-success btn-sm">დათვალიერება</router-link>
                                        <button :data-item-id="item.id" @click="deleteDetail($event)" class="btn btn-danger btn-sm mt-1">წაშლა</button>
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
      Line
    },
    
    data() {
      return {
        selectedValue: window.sessionStorage.getItem("newItem") != null ? window.sessionStorage.getItem("newItem") : null,
        newId : Number(window.sessionStorage.getItem("newItemId")) > 0 ? Number(window.sessionStorage.getItem("newItemId")) : null,

        data : "",
        newdate : "",

        options: [],
        filterdate : "",

        new_value : "",

        dates : [],

        from : new Date(),
        to : new Date(),
      }
    },

    watch : {
        selectedValue(newValue, oldValue) {
            const __this__ = this;

            if(newValue == null) {
                window.sessionStorage.clear();

                axios.get("/detail/list", {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                    }
                }).then(function(response) {
                    __this__.data = response.data;
                }).catch(function(err) {
                    console.log(err);
                });
            }else {
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

            window.sessionStorage.setItem("newItem", (typeof newValue?.label == "undefined" ? "" : newValue.label));
            window.sessionStorage.setItem("newItemId", (typeof newValue?.id == "undefined" ? "" : newValue.id));
        }
    },

    mounted() {
        const __this__ = this;

        axios.get("/detail/dates", {
            headers : {
                "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
            }
        }).then(function(response) {
            __this__.dates = response.data;
        });

        if(this.newId != null) {
            axios.get("/detail/list/" + this.newId, {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                }
            }).then(function(response) {
                __this__.data = response.data;
            }).catch(function(err) {
                console.log(err);
            });

            axios.get("/detail/dates/" + this.newId, {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                }
            }).then(res => {
                this.dates = res.data;
            });
        }else {
            axios.get("/detail/list", {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                }
            }).then(function(response) {
                __this__.data = response.data;
            }).catch(function(err) {
                console.log(err);
            });
        }

        axios.get("/exhibition/list", {
            headers : {
                "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
            }
        }).then(function(response) {
            __this__.options = response.data;
        });
    },

    methods : {
        deleteDetail(event) {
            axios.get("/detail/delete/" + Number(event.target.getAttribute("data-item-id")), {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                }
            }).then(res => {
                this.$swal({
                    title : "წაშლა განხორციელდა",
                    icon : "success",
                });
            });
        },

        downloadExcel() {
            window.open("https://survey.rda.gov.ge/api/exhibition/download/excel/" + this.new_value);
        },

        downloadPdf() {
            window.open("https://survey.rda.gov.ge/api/exhibition/download/pdf/" + this.new_value + "/" + this.newdate);
        },

        goBack() {
            this.$router.back();
        },

        filterDetails(event) {
            axios.get("/detail/filter/" + Number(window.sessionStorage.getItem("newItemId")) + "/" + event.target.getAttribute("data-date")).then(res => {
                this.data = res.data;
                this.newdate =  event.target.getAttribute("data-date");
            });
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