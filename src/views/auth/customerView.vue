<template>
    <div>
        <div class="container">
            <form @submit.prevent="submitForm()" action="#" class=" mt-4 form_bg ">
                <div class="row justify-content-md-between align-items-center">
                    <div class="col-md-2 col-12 text-center text-sm-start">
                        <img src="../../assets/img/RDA-Logo-Geo.55af0c58 (1).png" alt="icon" width="250">
                    </div>
                    <div class="col-md-10 col-12">
                        <h1 class="mt-5 mb-4 brand text-md-end text-sm-center ">სააპლიკაციო ფორმა</h1>
                    </div>
                </div>
                <div class="row mt-4 mb-4 justify-content-center">
                    <div class="col-md-8 col-6 border_man"></div>
                </div>

                <!-- საკონტაქტო ინფორმაცია -->

                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label for="name" class="form-label">სახელი, გვარი</label>
                            <input type="text" id="name" class="form-control input_form"
                                oninvalid="this.setCustomValidity('შეიყვანეთ სახელი') "
                                onchange="this.setCustomValidity('')" required v-model="formData.fullname">
                        </div>
                        <div class="mb-3">
                            <label for="Position" class="form-label">თანამდებობა</label>
                            <input type="text" id="Position" class="form-control input_form "
                                oninvalid="this.setCustomValidity('შეიყვანეთ თანამდებობა') "
                                onchange="this.setCustomValidity('')" required v-model="formData.position">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label for="number" class="form-label">ტელეფონის ნომერი</label>
                            <input type="number" id="number" class="form-control input_form"
                                oninvalid="this.setCustomValidity('შეიყვანეთ ტელეფონის ნოემრი') "
                                onchange="this.setCustomValidity('')" required min="0" v-model="formData.mobile">
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">ელ. ფოსტა</label>
                            <input type="email" id="email" class="form-control input_form"
                                oninvalid="this.setCustomValidity('შეიყვანეთ ელ. ფოსტა') "
                                onchange="this.setCustomValidity('')" required v-model="formData.email">
                        </div>
                    </div>
                </div>

                <!-- საქმიანი კავშირი -->

                <div class="row justify-content-center">
                    <div class="col-md-12">
                        <label for="drop" class="form-label ">გამოფენაზე შეძენილი საქმიანი კავშირები</label>
                        <select id="drop" v-model="formData.selected" class="form-select select_man opt">
                            <option class="opt" value="0">არ დაგვიმყარებია საქმიანი კავშირები</option>
                            <option class="opt" value="1">დავამყარეთ საქმიანი კავშირები</option>
                        </select>
                    </div>
                </div>

                <!-- საქმიანი კავშირი დამყარებულია -->

                <div class="row mt-5" v-if="formData.selected == 1">
                    <div class="row mb-4 justify-content-center">
                        <div class="col-md-8 col-6 border_man"></div>
                    </div>

                    <div class="col-md-12 mb-2 text-center">
                        <h6>ბიზნეს კონტაქტი</h6>
                    </div>

                    <div v-for="(items, index) in formData.dynamicData" :key="index" class="card p-3 mb-3">
                        <h4 class="card-title d-flex justify-content-between">
                            <span>#{{ index + 1 }}</span>
                            <button v-if="formData.dynamicData.length > 1" type="button" class="btn btn-danger" @click="removeField(index)">წაშლა</button>
                        </h4>
                        <div class="row">
                            <div class="col-md-6 col-12 mb-3">
                                <label for="activity" class="form-label">საქმიანობის სფერო</label>
                                <input type="text" id="activity" class="form-control input_form"
                                    oninvalid="this.setCustomValidity('შეიყვანეთ საქმიანობის სფერო') "
                                    onchange="this.setCustomValidity('')" required v-model="items.activity">
                            </div>
                            <div class="col-md-6 col-12 mb-3">
                                <label for="country" class="form-label">რომელ ქვეყანას წარმოადგენს</label>
                                <input type="text" id="country" class="form-control input_form"
                                    oninvalid="this.setCustomValidity('შეიყვანეთ რომელ ქვეყანას წარმოადგენს') "
                                    onchange="this.setCustomValidity('')" required v-model="items.country">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6 col-12 mb-3">
                                <label for="organization" class="form-label">ორგანიზაციის დასახელება</label>
                                <input type="text" id="organization" class="form-control input_form"
                                    oninvalid="this.setCustomValidity('შეიყვანეთ ორგანიზაციის დასახელება') "
                                    onchange="this.setCustomValidity('')" required v-model="items.organization">
                            </div>
                            <div class="col-md-6 col-12 mb-3">
                                <label for="export" class="form-label">ქვეყანა რომელშიც განხორციელდა ან იგეგმება ექსპორტი
                                </label>
                                <input type="text" id="export" class="form-control input_form"
                                    oninvalid="this.setCustomValidity('შეიყვანეთ ქვეყანა რომელშიც განხორციელდა ან იგეგმება ექსპორტი') "
                                    onchange="this.setCustomValidity('')" required v-model="items.exportLocation">
                            </div>
                        </div>
                        <div class="row mb-4">
                            <div class="col-md-12 mb-2">
                                <label for="disabledTextInput" class="form-label">რა ეტაპზეა საქმიანი ურთიერთობა? </label>
                                <textarea style="resize:none" class="h-100 form-control"
                                    oninvalid="this.setCustomValidity('შეიყვანეთ რა ეტაპზეა საქმიანი ურთიერთობა') "
                                    onchange="this.setCustomValidity('')" required v-model="items.activityLevel"></textarea>
                            </div>
                        </div>
                        <!-- <br> -->

                        <!-- ექსპორტი -->

                        <div class="row mt-5">
                            <div class="col-md-12 mt-3">
                                <label for="disabledTextInput" class="form-label qui mt-3">პროდუქციის გაგზავნის შესახებ
                                    ინფორმაცია</label>
                                <select id="disabledSelect" v-model="items.selected1" class="form-select select_man opt">
                                    <option class="opt" value="0">არ გაგზავნილა პროდუქცია</option>
                                    <option class="opt" value="1">გაგზავნილია პროდუქცია</option>
                                    <option class="opt" value="2">გაგზავნილია ნიმუში</option>
                                </select>
                            </div>
                        </div>

                        <!-- გაგზავინილია პროდუქცია -->

                        <div class="row mb-1 mt-3" v-if="items.selected1 == 1 && selected != 0">
                            <div class="col-md-6">
                                <div class="">
                                    <label for="product" class="form-label">გაგზავნილი პროდუქციის მოცულობა (მაგ: 100 -
                                        ცალი/კგ/ბოთლი...)</label>
                                    <input type="text" id="product" class="form-control input_form"
                                        oninvalid="this.setCustomValidity('შეიყვანეთ გაგზავნილი პროდუქციის მოცულობა ') "
                                        onchange="this.setCustomValidity('')" required v-model="items.sent_product_volume">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="">
                                    <label for="cost" class="form-label">გაგზავნილი პროდუქციის ღირებულება ლარში</label>
                                    <input type="number" id="cost" class="form-control input_form"
                                        oninvalid="this.setCustomValidity('შეიყვანეთ გაგზავნილი პროდუქციის ღირებულება ლარში') "
                                        onchange="this.setCustomValidity('')" required v-model="items.sent_product_price">
                                </div>
                            </div>
                        </div>

                        <!-- გაგზავინილია ნიმუში -->

                        <div class="row mb-1 mt-3" v-if="items.selected1 == 2 && formData.selected != 0">
                            <div class="col-md-6">
                                <div class="">
                                    <label for="sample" class="form-label">გაგზავნილი ნიმუშის მოცულობა (მაგ: 100 -
                                        ცალი/კგ/ბოთლი...)</label>
                                    <input type="text" id="sample" class="form-control input_form"
                                        oninvalid="this.setCustomValidity('შეიყვანეთ გაგზავნილი ნიმუშის მოცულობა') "
                                        onchange="this.setCustomValidity('')" required v-model="items.sent_example_volume">
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="">
                                    <label for="sampleCost" class="form-label">გაგზავნილი ნიმუშის ღირებულება ლარში</label>
                                    <input type="number" id="sampleCost" class="form-control input_form"
                                        oninvalid="this.setCustomValidity('შეიყვანეთ გაგზავნილი ნიმუშის ღირებულება ლარში') "
                                        onchange="this.setCustomValidity('')" required v-model="items.sent_example_price">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ახალი ბიზნეს კონტაქტის დამატება -->

                <div v-show="formData.selected == 1">
                    <div class="row mt-5  mb-3  justify-content-center">
                        <div class="col-md-8 col-6 border_man"></div>
                    </div>

                    <div class="row justify-content-center">
                        <div class="col-md-1  col-12 d-flex justify-content-center">
                            <button @click="addFields" type="button" class="btn btn-plus" data-bs-toggle="tooltip"
                                data-bs-custom-class="custom-tooltip" data-bs-placement="top"
                                data-bs-title="ახალი ბიზნეს კონტაქტის დამატება">
                                <img class="plus" src="../../assets/img/icon/plus-circle.svg" alt="plus">
                            </button>
                        </div>
                    </div>

                    <div class="row mb-4 mt-3  justify-content-center">
                        <div class="col-md-8 col-6 border_man"></div>
                    </div>
                </div>

                <div class="row mt-5 mb-4  justify-content-center" v-if="formData.selected==0">
                    <div class="col-md-8 col-6 border_man"></div>
                </div>

                <!-- რეკომენდაცია/დამატებითი ინფორმაცია -->

                <div class="row">
                    <div class="col-md-12">
                        <label for="disabledTextInput" class="form-label">რეკომენდაცია საერთაშორისო გამოფენის
                            შესახებ</label>
                        <QuillEditor theme="snow" class="input_form" v-model="formData.recomendation" ref="recomendation" />
                    </div>
                </div>
                <div class="row mt-5 mb-5">
                    <div class="col-md-12 mt-5 mb-4">
                        <label for="disabledTextInput" class="form-label mt-3 qui">დამატებითი ინფორმაცია</label>
                        <QuillEditor theme="snow" class="input_form" v-model="formData.additional_info" ref="additional_info" />
                    </div>
                </div>

                <div class="row mt-5   justify-content-center">
                    <div class="col-md-8 col-6 mt-5 border_man"></div>
                </div>

                <!-- გაგზავნის ღილაკი -->

                <div class="row mb-4 mt-4 justify-content-end">
                    <div class="col-md-2  qui mb-2">
                        <input type="submit" class=" btn btn-success w-100 float-end" value="გაგზავნა">
                    </div>
                </div>

            </form>
        </div>
        <Footer />
    </div>
</template>

<script>
    import { QuillEditor } from '@vueup/vue-quill'
    import Footer from '../../components/footer.vue'
    import axios from 'axios'
    
    export default {
        data() {
            return {
                formData : {
                    selected: '0',
                    fullname: "",
                    position : "",
                    mobile : "",
                    email : "",
                    recomendation : "",
                    additional_info : "",

                    dynamicData : [
                        {
                            selected1 : "0",

                            activity: "",
                            country: "",
                            organization: "",
                            exportLocation: "",
                            activityLevel : "",
                        }
                    ]
                }
            }
        },
        
        components: {
            QuillEditor,
            Footer,
        },

        mounted() {
            const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
            const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
        },

        methods : {
            submitForm() {
                axios.post("/detail/add", Object.assign(this.formData, { recomendation : this.$refs.recomendation.getText(), additional_info : this.$refs.additional_info.getText() })).then(function(response) {
                    console.log(response.data);
                }).catch(function(err) {
                    console.log(err);
                });
            },

            addFields() {
                this.formData.dynamicData.push({
                    selected1 : "0",

                    activity: "",
                    country: "",
                    organization: "",
                    exportLocation: "",
                    activityLevel : "",
                });
            },

            removeField(index) {
                this.formData.dynamicData.splice(index, 1);
            }
        }
    }
</script>

<style scoped>
    h4 {
        color: #005019;   
    }

    .btn-success {
        background-color: #005019 !important;
        /* height: 50px; */
        font-size: 20px;
        font-family: 'Regular';
    }

    .btn-warning {
        font-size: 20px;
        font-family: 'Regular';
    }

    form {
        margin: 0;
        padding: 0;
    }

    .row {
        margin: 0;
        padding: 0;
    }

    .plus {
        width: 30px;
        height: 30px;
        opacity: 0.6;
    }

    h6 {
        font-family: 'firago-regular';
        opacity: 0.3;
    }

    .fade {
        font-family: firago-regular;
    }
</style>
