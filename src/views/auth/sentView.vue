<template>
    <div>
        <navbar/>
        <div class="container">
            <div class="row row_position justify-content-around">
                <div class="row p-0 align-items-center mb-5 flex-row-reverse">
                    <div class="col-md-6 col-12 ">
                        <v-select v-model="selectedValue" :options="options" placeholder="აირჩიეთ გამოფენა"> </v-select>
                    </div>
                    <div class="col-md-6 col-12 text-start d-md-block d-none">
                        <h4 class="main brand"><span class="btn btn-success" @click="$router.back()">&larr;</span>&nbsp;&nbsp;გაგზავნილი მეილები</h4>
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
                                    <th scope="col">გამოფენა</th>
                                    <th scope="col">კომპანია</th>
                                    <th scope="col">ელ. ფოსტა</th>
                                    <th scope="col">სტატუსი</th>
                                    <th scope="col">გაგზავნის თარიღი</th>
                                    <th scope="col">ხელახლა გაგზავნა</th>
                                </tr>
                            </thead>
                            <tbody class="text-center">
                                <tr v-for="(item, index) in emails" :key="index">
                                    <td>{{ item.exhibition_name }}</td>
                                    <td>{{ item.company }}</td>
                                    <td>{{ item.email }}</td>
                                    <td :class="(Math.floor((new Date() - new Date(item.send_date)) / (1000 * 60 * 60 * 24)) > 10) && !(item.filled_status === '1') ? 'table-danger' : ''">
                                        <span v-if="(item.filled_status == '1' && item.view == '1') || (item.filled_status == '1' && item.view == '0')">შევსებულია&nbsp;&nbsp;</span>
                                        <span v-else-if="item.filled_status == '0' && item.view == '1'">ნანახია&nbsp;&nbsp;</span>
                                        <span v-else-if="item.filled_status == '0'  && item.view == '0'">არაა შევსებული&nbsp;&nbsp;</span>
                                        &nbsp;&nbsp;
                                        <span v-if="item.hasnew == 1" v-tippy="{ content: 'სიახლე არაა' }">
                                            <i class="fa fa-newspaper-o"></i>
                                        </span>
                                    </td>
                                    <td>{{ item.send_date }}</td>
                                    <td>
                                        <!-- v-if="(Math.floor((new Date() - new Date(item.sent_date)) / (1000 * 60 * 60 * 24)) > 10) && !(item.filled_status === '1')" -->
                                        <button :data-exhibition-id="item.exhibition_id" :data-id="item?.detail_id" :data-email="item?.email" class="btn btn-warning btn-sm" ref="sendButton" type="button" v-on:click="sendEmail($event)" v-if="!((item.filled_status == '1' && item.view == '1') || (item.filled_status == '1' && item.view == '0'))">შეხსენება</button>

                                        <button v-if="item.filled_status === '1'" class="btn btn-info text-white btn-sm ms-1" :data-exhibition-id="item.exhibition_id" :data-id="item?.detail_id" type="button" v-on:click="sendForEdit($event, item.email)" v-tippy="{ content: 'ჩასასწორებლად გაგზავნა' }">
                                            <i class="fa fa-envelope pe-none"></i>
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

        axios.get("/exhibition/list", {
            headers : {
                "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
            }
        }).then(function(response) {
            _this_.options = response.data;
        });

        axios.get("/email/sent/list", {
            headers : {
                "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
            }
        }).then(response => {
            _this_.emails = response.data;
        });

        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    },

    watch : {
        selectedValue(newValue, oldValue) {
            const __this__ = this;

            axios.get("/email/sent/list/" + newValue.id, {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                }
            }).then(function(response) {
                __this__.emails = response.data;
            }).catch(function(err) {
                console.log(err);
            });
        }
    },
    
    data() {
      return {
        selectedValue: null,

        data : "",
        emails : [],

        options: [],

        current_date : new Date(),

        flatpickrOptions: {
            enableTime: true,
            dateFormat: 'Y-m-d H:i',
        },
      }
    },

    methods : {
        sendEmail(event) {
            const exhibition_id = Number(event.target.getAttribute("data-exhibition-id"));
            const id = Number(event.target.getAttribute("data-id"));
            const email = event.target.getAttribute("data-email");

            axios.post("/email/specific/send/to", {
                exhibition : exhibition_id,
                mail : email
            }, {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                }
            }).then(response => {
                this.$swal({
                    title : "ელ. ფოსტა გაიგზავნა",
                    icon : "success",
                });

                event.target.setAttribute("style", "display: none !important");
            }).catch(err => {
                console.log(err);
            });
        },

        sendForEdit(event, email) {
            const exhibition_id = Number(event.target.getAttribute("data-exhibition-id"));
            const id = Number(event.target.getAttribute("data-id"));

            axios.get("/email/send/to/edit/" + id + "/" + exhibition_id + "/" + email, {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                }
            }).then(response => {
                this.$swal({
                    title : "ელ. ფოსტა გაიგზავნა",
                    icon : "success",
                });
            }).catch(err => {
                console.log(err);
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
    width: 150px;
    margin: auto;
   }
</style>