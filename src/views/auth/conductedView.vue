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
                    <p class="text-center">ფილტრაცია გაგზავნის თარიღით</p>
                    <ul class="nav nav-pills flex-column">
                        <li class="nav-item mb-2" v-for="items in dates" :key="items">
                            <a href="#" :class="(this.newdate !== items) ? 'nav-link bg-success text-dark bg-opacity-25' : 'nav-link bg-success text-white'" :data-date="items" @click="filterDetails($event)">{{ items }}</a>
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
                                    <td>
                                        <span v-if="(item.filled_status == '1' && item.viewstatus == '1') || (item.filled_status == '1' && item.viewstatus == '0')">შევსებულია&nbsp;&nbsp;</span>
                                        <span v-else-if="item.filled_status == '0' && item.viewstatus == '1'">ნანახია&nbsp;&nbsp;</span>
                                        <span v-else-if="item.filled_status == '0'  && item.viewstatus == '0'">არაა შევსებული&nbsp;&nbsp;</span>

                                        <span v-if="item.newstatus == '1'" v-tippy="{ content: 'სიახლე არაა' }">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-newspaper" viewBox="0 0 16 16">
                                                <path d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5z"/>
                                                <path d="M2 3h10v2H2zm0 3h4v3H2zm0 4h4v1H2zm0 2h4v1H2zm5-6h2v1H7zm3 0h2v1h-2zM7 8h2v1H7zm3 0h2v1h-2zm-3 2h2v1H7zm3 0h2v1h-2zm-3 2h2v1H7zm3 0h2v1h-2z"/>
                                            </svg>
                                        </span>
                                    </td>
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
        selectedValue: window.sessionStorage.getItem("newItem") != null ? window.sessionStorage.getItem("newItem") : "",
        data : "",

        newId : Number(window.sessionStorage.getItem("newItemId")) > 0 ? Number(window.sessionStorage.getItem("newItemId")) : null,
        newdate : (typeof window.sessionStorage.getItem("date") != "undefined" || window.sessionStorage.getItem("date") != null) ? window.sessionStorage.getItem("date") : "",

        options: [],
        filterdate : "",

        new_value : "",

        dates : [],
      }
    },

    watch : {
        selectedValue(newValue, oldValue) {
            const __this__ = this;

            window.sessionStorage.setItem("newItem", (typeof newValue?.label == "undefined" ? "" : newValue.label));
            window.sessionStorage.setItem("newItemId", (typeof newValue?.id == "undefined" ? "" : newValue.id));

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

                axios.get("/detail/dates/" + newValue.id, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                    }
                }).then(function(response) {
                    __this__.dates = response.data;
                });
            }

        }
    },

    mounted() {
        const __this__ = this;

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
            window.open("https://survey.rda.gov.ge/api/exhibition/download/pdf/" + window.sessionStorage.getItem("newItemId") + "/" + window.sessionStorage.getItem("date"));
        },

        goBack() {
            this.$router.back();
        },

        filterDetails(event) {
            window.sessionStorage.setItem("date", event.target.getAttribute("data-date"));

            axios.get("/detail/filter/" + Number(window.sessionStorage.getItem("newItemId")) + "/" + event.target.getAttribute("data-date")).then(res => {
                this.data = res.data;
                this.newdate = event.target.getAttribute("data-date");
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