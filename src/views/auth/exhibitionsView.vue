<template>
    <div>
        <navbar/>
        <div class="container">
            <div class="row row_position">
                <p class="d-inline-flex gap-1">
                    <router-link to="/exhibitions/add" class="btn btn-secondary d-flex align-items-center gap-2">
                        დამატება
                        <b>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                        </svg>
                        </b>
                    </router-link>
                </p>
            </div>
            <div class="row mt-3">
                <div class="overflow-auto">
                    <table class="table border">
                        <thead class="text-center">
                            <tr>
                                <th scope="col">გამოფენა</th>
                                <th scope="col">ქვეყანა</th>
                                <th scope="col">ჩატარების თარიღი</th>
                                <th scope="col">ქმედება</th>
                            </tr>
                        </thead>
                        <tbody class="text-center">
                            <tr v-for="data in exhibitions" :key="data.id">
                                <td>{{ data.label }}</td>
                                <td>{{ data.country }}</td>
                                <td>{{ data.datetime }}</td>
                                <td>
                                    <router-link :to="'#/' + data.id" class="btn btn-info btn-sm">დათვალიერება</router-link>
                                    <button type="btn" class="btn btn-danger btn-sm ms-1" :data-id="data.id" v-on:click="deleteExhibition($event)">წაშლა</button>
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
    import FlatPickr from 'vue-flatpickr-component';
    import axios from 'axios';

    export default {
        data() {
            return {
                exhibitions : [],
            }
        },

        components: {
            navbar,
            FlatPickr
        },

        mounted() {
            axios.get("/exhibition/list").then(response => {
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
</style>
