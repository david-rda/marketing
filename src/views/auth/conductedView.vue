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
                        <h4 class="main brand"><span class="btn btn-success" @click="$router.back()">&larr;</span>&nbsp;&nbsp;ჩატარებული გამოფენები</h4>
                    </div>
                </div>
            </div>
            <div v-if="selectedValue">
                <div class="row justify-content-end">
                    <div class="col-md-2">
                        <div class="btn-group-vertical w-100">
                            <button type="button" class="btn btn-danger btn-sm text-white" @click="downloadPdf()">
                                <i class="fa fa-file-pdf-o pe-none"></i>
                                <b class="ms-2">გადმოწერა</b>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row mt-3">
                <div class="col-md-2 col-12" v-if="selectedValue">
                    <!-- <div class="form-group mb-3">
                        <label class="form-label">სტატუსით გაფილტვრა</label>
                        <select v-model="status" v-tippy="{ content: 'მუშაობს სატესტო რეჟიმში' }" class="form-select" @change="statusFilter()">
                            <option selected disabled value="">აირჩიეთ სტატუსი</option>
                            <option value="0">არაა შევსებული</option>
                            <option value="1">შევსებულია</option>
                            <option value="2">ნანახია</option>
                        </select>
                    </div> -->
                    <label class="form-label">ფილტრაცია გაგზავნის თარიღით</label>
                    <ul class="nav nav-pills overflow-y-scroll" style="max-height: 250px;">
                        <li class="nav-item mb-2 w-100" v-for="items in filteredDate" :key="items">
                            <div v-if="!(['2024-10-21', '2024-10-22', '2024-10-23', '2024-10-24','2024-10-27'].includes(items))">
                                <a href="#" :class="(this.newdate !== items) ? 'nav-link bg-success text-dark bg-opacity-25' : 'nav-link bg-success text-white'" :data-date="items" @click="filterDetails($event)">{{ items }}</a>
                            </div>
                        </li>
                    </ul>
                </div>
                <div :class="selectedValue ? 'col-md-10' : 'col-md-12'">
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
                                <td>
                                    <!-- {{
                                        (new Date(item?.updated_at).toISOString().split('T')[0] < new Date(item?.email_updated_at).toISOString().split('T')[0]) ?
                                        new Date(item?.email_updated_at).toISOString().split('T')[0]
                                        : new Date(item?.updated_at).toISOString().split('T')[0]
                                    }} -->
                                    {{ new Date(item?.updated_at).toISOString().split('T')[0] }}
                                </td>
                                <td>
                                    <span v-if="(item.filled_status == '1' && item.viewstatus == '1') || (item.filled_status == '1' && item.viewstatus == '0')">შევსებულია&nbsp;&nbsp;</span>
                                    <span v-else-if="item.filled_status == '0' && item.viewstatus == '1'">ნანახია&nbsp;&nbsp;</span>
                                    <span v-else-if="item.filled_status == '0'  && item.viewstatus == '0'">არაა შევსებული&nbsp;&nbsp;</span>

                                    <span v-if="item.has_news == '1'" v-tippy="{ content: 'სიახლე არაა' }">
                                        <i class="fa fa-newspaper-o"></i>
                                    </span>
                                </td>
                                <td>
                                    <div class="d-flex">
                                        <router-link :to="'/view/' + item.id + '/' + item.exhibition_id + '/' + item.email" class="btn btn-success btn-sm" v-tippy="{ content: 'დათვალიერება' }" target="_blank">
                                            <i class="fa fa-eye pe-none"></i>
                                        </router-link>
                                        <button :data-item-id="item.id" type="button" @click="deleteDetail($event)" class="btn btn-danger btn-sm ms-1" v-tippy="{ content: 'წაშლა' }">
                                            <i class="fa fa-trash-o pe-none"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import navbar from '../../components/navbar.vue'
    import vSelect from "vue-select"
    import "vue-select/dist/vue-select.css"
    import axios from 'axios'

    export default {
        components: {
            navbar,
            vSelect,
        },

        data() {
            return {
                selectedValue: window.sessionStorage.getItem("newItem") != null ? window.sessionStorage.getItem("newItem") : "",
                data: "",

                newId: Number(window.sessionStorage.getItem("newItemId")) > 0 ? Number(window.sessionStorage.getItem("newItemId")) : null,
                newdate: (typeof window.sessionStorage.getItem("date") != "undefined" || window.sessionStorage.getItem("date") != null) ? window.sessionStorage.getItem("date") : "",

                options: [],
                filterdate: "",

                new_value: "",

                dates: [],

                // status : "",
            }
        },

        watch: {
            selectedValue(newValue, oldValue) {
                const __this__ = this;

                window.sessionStorage.setItem("newItem", (typeof newValue?.label == "undefined" ? "" : newValue.label));
                window.sessionStorage.setItem("newItemId", (typeof newValue?.id == "undefined" ? "" : newValue.id));

                var url = "/detail/list";

                if (newValue == null) {
                    window.sessionStorage.clear();

                    url = "/detail/list";
                } else {
                    url = "/detail/list/" + newValue.id;

                    axios.get("/detail/dates/" + newValue.id, {
                        headers: {
                            "Authorization": "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                        }
                    }).then(function (response) {
                        __this__.dates = response.data;
                    });
                }

                axios.get(url, {
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                    }
                }).then(function (response) {
                    __this__.data = response.data;
                    __this__.new_value = newValue.id;
                }).catch(function (err) {
                    console.log(err);
                });

            }
        },

        computed: {
            filteredDate() {
                return this.dates.filter(item => !(['2024-10-21', '2024-10-22', '2024-10-23', '2024-10-24', '2024-10-27'].includes(item)));
            }
        },

        mounted() {
            const __this__ = this;

            if (this.newId != null) {
                axios.get("/detail/list/" + this.newId, {
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                    }
                }).then(function (response) {
                    __this__.data = response.data;
                }).catch(function (err) {
                    console.log(err);
                });

                axios.get("/detail/dates/" + this.newId, {
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                    }
                }).then(res => {
                    this.dates = res.data;
                });
            } else {
                axios.get("/detail/list", {
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                    }
                }).then(function (response) {
                    __this__.data = response.data;
                }).catch(function (err) {
                    console.log(err);
                });
            }

            axios.get("/exhibition/list", {
                headers: {
                    "Authorization": "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                }
            }).then(function (response) {
                __this__.options = response.data;
            });
        },

        methods: {
            deleteDetail(event) {
                axios.get("/detail/delete/" + Number(event.target.getAttribute("data-item-id")), {
                    headers: {
                        "Authorization": "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                    }
                }).then(res => {
                    this.$swal({
                        title: "წაშლა განხორციელდა",
                        icon: "success",
                    });
                });
            },

            // downloadExcel() {
            //     window.open("https://survey.rda.gov.ge/api/exhibition/download/excel/" + this.new_value);
            // },

            downloadPdf() {
                window.open("https://survey.rda.gov.ge/api/exhibition/download/pdf/" + window.sessionStorage.getItem("newItemId") + "/" + window.sessionStorage.getItem("date"));
            },

            filterDetails(event) {
                window.sessionStorage.setItem("date", event.target.getAttribute("data-date"));

                axios.get("/detail/filter/" + Number(window.sessionStorage.getItem("newItemId")) + "/" + event.target.getAttribute("data-date")).then(res => {
                    this.data = res.data;
                    this.newdate = event.target.getAttribute("data-date");
                });
            },

            // statusFilter() {
            //     const date = window.sessionStorage.getItem("date");

            //     if(date == null) {
            //         window.alert("აირციეთ თარიღი");
            //         return;
            //     }

            //     var url = "/detail/filter/" + Number(window.sessionStorage.getItem("newItemId")) + "/" + date + "/" + this.status;

            //     axios.get(url).then(res => {
            //         this.data = res.data;
            //     });
            // }
        }
    }
</script>

<style scoped>
    .container{
        font-family: firago-regular;
    }

    ::-webkit-scrollbar {
        width: 8px;
    }
    ::-webkit-scrollbar-track {
        background: transparent;
    }
    ::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.3);
        border-radius: 4px;
    }
    :hover::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.6);
    }
</style>