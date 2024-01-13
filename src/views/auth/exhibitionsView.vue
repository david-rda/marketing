<template>
    <div>
        <navbar/>
        <div class="container">
            <div class="row row_position">
                <p class="d-inline-flex gap-1">
                <button class="btn btn-secondary d-flex align-items-center gap-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    დამატება
                    <b>
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                    </svg>
                    </b>
                </button>
                </p>
                <div class="collapse mt-3" id="collapseExample">
                <div class="card card-body">
                    <form action="" class="d-flex justify-content-evenly align-items-center">
                        <div class="mb-3 mx-3">
                            <label for="name" class="form-label">გამოფენის დასახელება</label>
                            <input type="text" id="name" class="form-control input_form">
                        </div>
                        <div class="mb-3 mx-3">
                            <label for="name" class="form-label">ქვეყანა</label>
                            <input type="text" id="name" class="form-control input_form">
                        </div>
                        <div class="mb-3 mx-3">
                            <label for="name" class="form-label">ჩატარების თარიღი</label>
                            <flat-pickr class="form-control input_form_add" id="datetime-picker" v-model="picked" :config="flatpickrOptions"></flat-pickr>
                        </div>
                        <div class="mb-3 mx-3 mt-4">
                            <input type="submit" value="დამატება" class="form-control input_form mt-1 btn_manual">
                        </div>

                    </form>
                </div>
                </div>
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
                                <tr>
                                    <td>ჩინეთის საერთაშორისო გამოფენა</td>
                                    <td>ჩინეთი</td>
                                    <td>20-04-24</td>
                                    <td>
                                        <button type="btn" class="btn btn-danger btn-sm">წაშლა</button>
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

    export default {
        data() {
            return {
                picked: new Date(),
                flatpickrOptions: {
                    enableTime: true,
                    dateFormat: 'd-m-y',
                },
            }
        },
        components: {
            navbar,
            FlatPickr
        },
        
      
    }
</script>

<style scoped>

</style>
