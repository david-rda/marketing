<template>
    <div>
        <navbar/>

        <div class="container" style="margin-top: 90px;">
            <div class="row">
                <div class="col-md-4">
                    <h4 class="main head mt-4">გრაფიკები</h4>
                </div>
            </div>
            <div class="d-flex align-items-center justify-content-between">
                <h4 class="main brand mt-3">{{ this.$route.params.label }}</h4>

                <router-link :to="'/template/add/' + $route.params.id + '/' + $route.params.label" class="btn btn-success">
                    დამატება
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                    </svg>
                </router-link>
            </div>
            <div class="row">
                <table class="table border table-hover">
                    <thead class="text-center">
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">როდის გაგეგზავნება</th>
                            <th scope="col">ქმედება</th>
                        </tr>
                        </thead>
                    <tbody class="text-center">
                        <tr v-for="(item, index) in templates" :key="index">
                            <td>{{ item.id }}</td>
                            <td>{{ item.date }}</td>
                            <td class="d-flex justify-content-center gap-1">
                                <router-link :to="'/template/edit/' + item.id + '/' + $route.params.label" class="btn btn-primary btn-sm">რედაქტირება</router-link>
                                <button type="button" class="btn btn-danger btn-sm" :data-template-id="item.id" :data-exhibition-id="item.exhibition_id" data-bs-toggle="modal" data-bs-target="#confirmationModal" @click="setId(item.id)">წაშლა</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="modal fade" id="confirmationModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">გთხოვთ დაადასტუროთ</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ნამდვილად გსურთ წაშლა?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">არა</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteTemplate">კი</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import navbar from '../../components/navbar.vue'
    import { QuillEditor } from '@vueup/vue-quill'
    import FlatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
    import axios from 'axios'
    import line from '../../components/line.vue'

    export default {
        data() {
            return {
                flatpickrOptions: {
                    enableTime: true,
                    dateFormat: 'Y-m-d H:i',
                },

                errors : [],

                templates : [],

                template_id : "",
                exhibition_id : "",
            }
        },

        components: {
            navbar,
            FlatPickr,
            QuillEditor,
            line,
        },

        mounted() {
            const _this_ = this;

            axios.get("/template/list/" + this.$route.params.id, {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                }
            }).then(function(response) {
                _this_.templates = response.data;
            }).catch(err => {
                console.log(err);
            });

        },

        methods: {
            setId(id) {
                this.template_id = id;
                this.exhibition_id = this.$route.params.id;
            },

            deleteTemplate() {
                const _this_ = this;

                axios.get("/template/delete/" + this.template_id + "/" + this.exhibition_id, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                    }
                }).then(function(response) {
                    _this_.templates = response.data.data;
                }).catch(err => {
                    console.log(err);
                });
            }
        }
    }
</script>

<style scoped>
.container {
    font-family: firago-regular;
}
.text_email1 {
    height: 250px !important;
}
.plus {
    width: 30px;
    height: 30px;
    opacity: 0.6;
}
</style>
