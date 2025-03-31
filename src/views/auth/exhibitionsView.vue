<template>
    <div>
        <navbar/>
        <div class="container">
            <div class="row row_position justify-content-between flex-row-reverse">
                <div class="col-md-3 d-flex justify-content-end">
                    <p class="d-inline-flex gap-1">
                        <router-link to="/exhibitions/add" class="btn btn-success d-flex align-items-center gap-2">
                            დამატება
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                            </svg>
                        </router-link>
                    </p>
                </div>
                <div class="col-md-4 col-12 d-md-block d-none">
                    <h4 class="main brand">გამოფენები</h4>
                </div>
            </div>
            <div class="row mt-3">
                <table class="table border table-hover">
                    <thead class="text-center">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">გამოფენა</th>
                            <th scope="col">ქვეყანა</th>
                            <th scope="col">ჩატარების თარიღი</th>
                            <th scope="col">ქმედება</th>
                        </tr>
                    </thead>
                    <tbody class="text-center">
                        <tr v-for="(data, index) in exhibitions" :key="data.id">
                            <td>{{ index + 1 }}</td>
                            <td>{{ data.label }}</td>
                            <td>{{ data.country }}</td>
                            <td>{{ data.date }}</td>
                            <td>
                                <div class="dropdown m-auto">
                                    <button class="btn btn-light btn-sm" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16" >
                                        <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
                                        </svg>
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li class="p-1"><router-link :to="'/exhibition/email/' + data.id + '/' + data.label"  class="btn btn_m btn-sm">ელ. ფოსტის დამატება</router-link></li>
                                        <li class="p-1"><router-link :to="'/exhibition/sending/' + data.id + '/' + data.label"  class="btn btn_m btn-sm">შეტყობინების გაგზავნა</router-link></li>
                                        <li class="p-1"><router-link :to="'/exhibition/schedule/' + data.id + '/' + data.label" class="btn btn_m btn-sm">გრაფიკის დაგეგმვა</router-link></li>
                                        <li class="p-1"><button type="btn" class="btn btn-danger btn-sm ms-2" :data-id="data.id" data-bs-toggle="modal" data-bs-target="#confirmationModal" @click="setId($event)">წაშლა</button></li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="modal fade" id="confirmationModal">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">გთხოვთ დაადასტუროთ</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ნამდვილად გსურთ მოცემული გამოფენის წაშლა?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">უარყოფა</button>
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteExhibition">წაშლა</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import navbar from '../../components/navbar.vue'
    import axios from 'axios';

    export default {
        data() {
            return {
                exhibitions : [],

                exhibition_id : ""
            }
        },

        components: {
            navbar,
        },

        methods : {
            setId(event) {
                const id = Number(event.target.getAttribute("data-id"));
                this.exhibition_id = id;
            },

            deleteExhibition(event) {
                axios.get("/exhibition/delete/" + this.exhibition_id, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                    }
                }).then(res => {
                    this.exhibitions = res.data.data;
                }).catch(err => {
                    console.log(err);
                });
            },
        },

        mounted() {
            axios.get("/exhibition/list", {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                }
            }).then(response => {
                this.exhibitions = response.data;
            }).catch(err => {
                console.log(err);
            });
        }
    }
</script>

<style scoped>
    .container {
        font-family: firago-regular;
    }
    .btn_m:hover {
        background-color: rgb(224, 224, 224);
    }
    .dropdown-menu {
        text-align: center;     
    }
    .btn_m {
        border: 1px solid rgb(248, 248, 248);
    }
</style>
