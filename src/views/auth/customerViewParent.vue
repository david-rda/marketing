<template>
    <div>
        <div class="container mt-5" v-if="blocked == 0">
            <div class="row justify-content-md-between align-items-center">
                <div class="col-md-2 col-12 text-center text-sm-start">
                    <img src="../../assets/img/RDA-Logo-Geo.55af0c58 (1).png" alt="icon" width="250">
                </div>
                <div class="col-md-10 col-12"> 
                    <h1 class="mt-5 brand text-md-end text-sm-center ">მომხმარებლის მიერ შევსებული ფორმა</h1>
                    <h4 class="main head float-end">{{ exhibition }}</h4>
                </div>
            </div>
            <div class="row mt-4 mb-4 justify-content-center">
                <div class="col-md-8 col-6 border_man"></div>
            </div>
            <button type="button" class="btn btn-success mb-5" @click="sendStatus">სიახლე არ გვაქვს</button>

            <!-- საკონტაქტო ინფორმაცია -->

            <form class="mt-4 form_bg" @submit.prevent="add()">
                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label for="name" class="form-label">კომპანიის დასახელება</label>
                            <input type="text" id="name" ref="company" class="form-control input_form" v-model="data.company">
                        </div>
                        <div class="mb-3">
                            <label for="name" class="form-label">სახელი, გვარი</label>
                            <input type="text" id="name" ref="fullname" class="form-control input_form" v-model="data.fullname">
                        </div>
                        <div class="mb-3">
                            <label for="Position" class="form-label">თანამდებობა</label>
                            <input type="text" id="Position" ref="position" class="form-control input_form" v-model="data.position">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label for="number" class="form-label">საკონტაქტო ტელეფონის ნომერი</label>
                            <input type="number" id="number" ref="email" class="form-control input_form" v-model="data.mobile">
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">ელ. ფოსტა</label>
                            <input type="email" id="email" ref="mobile" class="form-control input_form" v-model="data.email">
                        </div>
                    </div>
                </div>

                <!-- საქმიანი კავშირი -->

                <div class="row justify-content-center">
                    <div class="col-md-12">
                        <label for="drop" class="form-label ">გამოფენაზე შეძენილი საქმიანი კავშირები</label>
                        <select id="drop" class="form-select select_man opt" v-model="data.selected">
                            <option class="opt" value="1">დავამყარეთ საქმიანი კავშირები</option>
                            <option class="opt" value="0">არ დაგვიმყარებია საქმიანი კავშირები</option>
                        </select>
                    </div>
                </div>

                <!-- საქმიანი კავშირი დამყარებულია -->

                <div class="row  mt-5" v-if="data.selected == 1">
                    <div class="row  mb-4 justify-content-center">
                        <div class="col-md-8 col-6 border_man"></div>
                    </div>
                    <div v-for="(items, index) in data.organizations" :key="index" class="card p-3 mb-3">
                        <!-- <div v-if="items.activity_name != null && items.country != null && items.company_name != null && items.target_country_name != null"> -->
                            <h4 class="card-title d-flex justify-content-between">
                                <span>#{{ index + 1 }}</span>
                                <button v-if="data.organizations.length > 1" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#confirmationModal" @click="setId(index)">წაშლა</button>
                            </h4>
                            <div class="row">
                                <div class="col-md-6 col-12 mb-3">
                                    <label for="activity" class="form-label">საქმიანობის სფერო</label>
                                    <input type="text" id="activity" class="form-control input_form" required v-model="items.activity_name">
                                </div>
                                <div class="col-md-6 col-12 mb-3">
                                    <label for="country" class="form-label">რომელ ქვეყანას წარმოადგენს</label>
                                    <input type="text" id="country" class="form-control input_form" required v-model="items.country">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 col-12 mb-3">
                                    <label for="organization" class="form-label">ორგანიზაციის დასახელება</label>
                                    <input type="text" id="organization" class="form-control input_form" required v-model="items.company_name">
                                </div>
                                <div class="col-md-6 col-12 mb-3">
                                    <label for="export" class="form-label">ქვეყანა რომელშიც განხორციელდა ან იგეგმება ექსპორტი</label>
                                    <input type="text" id="export" class="form-control input_form" required v-model="items.target_country_name">
                                </div>
                            </div>
                            <div class="row mb-4">
                                <div class="col-md-12 mb-2">
                                    <label for="disabledTextInput" class="form-label">რა ეტაპზეა საქმიანი ურთიერთობა?</label>
                                    <textarea style="resize:none" class="h-100 form-control" required v-model="items.stage_name"></textarea>
                                </div>
                            </div>
                            <br>

                            <!-- ექსპორტი -->
                            <div class="row mt-3">
                                <div class="col-md-12">
                                    <label for="disabledTextInput" class="form-label qui">პროდუქციის გაგზავნის შესახებ ინფორმაცია</label>
                                    <select id="disabledSelect" class="form-select select_man opt" v-model="items.selected1">
                                        <option class="opt" value="0">პროდუქცია ან ნიმუში არაა გაგზავნილი</option>
                                        <option class="opt" value="1">გაგზავნილია პროდუქცია</option>
                                        <option class="opt" value="2">გაგზავნილია ნიმუში</option>
                                    </select>
                                </div>
                            </div>

                            <!-- გაგზავინილია პროდუქცია -->

                            <div class="row mb-1 mt-3" v-if="items.selected1 == 1 && data.selected != 0">
                                <div class="col-md-6">
                                    <div class="">
                                        <label for="product" class="form-label">გაგზავნილი პროდუქციის მოცულობა (მაგ: 100 - ცალი/კგ/ბოთლი...)</label>
                                        <input type="text" id="product" class="form-control input_form" required v-model="items.product_volume">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="">
                                        <label for="cost" class="form-label">გაგზავნილი პროდუქციის ღირებულება ლარში</label>
                                        <input type="number" id="cost" class="form-control input_form" required v-model="items.product_price">
                                    </div>
                                </div>
                            </div>

                            <!-- გაგზავინილია ნიმუში -->

                            <div class="row mb-1 mt-3" v-if="items.selected1 == 2 && data.selected != 0">
                                <div class="col-md-6">
                                    <div class="">
                                        <label for="sample" class="form-label">გაგზავნილი ნიმუშის მოცულობა (მაგ: 100 -
                                            ცალი/კგ/ბოთლი...)</label>
                                        <input type="text" id="sample" class="form-control input_form" required v-model="items.template_volume">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="">
                                        <label for="sampleCost" class="form-label">გაგზავნილი ნიმუშის ღირებულება ლარში</label>
                                        <input type="number" id="sampleCost" class="form-control input_form" required v-model="items.template_price">
                                    </div>
                                </div>
                            </div>

                            <!-- გაგზავინილია პროდუქცია -->

                            <div class="row mb-1 mt-3" v-if="selected1==1&&selected!=0">
                                <div class="col-md-6">
                                    <div class="">
                                        <label for="product" class="form-label">გაგზავნილი პროდუქციის მოცულობა  (მაგ: 100 - ცალი/კგ/ბოთლი...)</label>
                                        <input type="text" id="product" class="form-control input_form">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="">
                                        <label for="cost" class="form-label">გაგზავნილი პროდუქციის ღირებულება ლარში</label>
                                        <input type="number" id="cost" class="form-control input_form">
                                    </div>
                                </div>
                            </div>

                            <!-- გაგზავინილია ნიმუში -->

                            <div class="row mb-1  mt-3" v-if="selected1 == 2 && selected != 0">
                                <div class="col-md-6">
                                    <div class="">
                                        <label for="sample" class="form-label">გაგზავნილი ნიმუშის მოცულობა (მაგ: 100 - ცალი/კგ/ბოთლი...)</label>
                                        <input type="text" id="sample" class="form-control input_form">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="">
                                        <label for="sampleCost" class="form-label">გაგზავნილი ნიმუშის ღირებულება ლარში</label>
                                        <input type="number" id="sampleCost" class="form-control input_form">
                                    </div>
                                </div>
                            </div>
                        <!-- </div> -->
                    </div>
                </div>                
                <!-- ექსპორტი -->
                
                <!-- ახალი ბიზნეს კონტაქტის დამატება -->
                <div class="row mt-5  mb-3  justify-content-center">
                    <div class="col-md-8 col-6 border_man"></div>
                </div>

                <div class="row justify-content-center" >
                    <div class="col-md-1 col-12 d-flex justify-content-center">
                        <button @click="addFields" type="button" class="btn btn-plus" tooltip-inner data-bs-toggle="tooltip" data-bs-custom-class="custom-tooltip" data-bs-placement="top" data-bs-title="ახალი ბიზნეს კონტაქტის დამატება">
                        <img class="plus" src="../../assets/img/icon/plus-circle.svg" alt="plus">
                        </button>
                    </div> 
                </div>

                <!-- რეკომენდაცია/დამატებითი ინფორმაცია -->

                <div class="row mt-5 mb-4 justify-content-center">
                    <div class="col-md-8 col-6 border_man"></div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <label for="disabledTextInput" class="form-label">რეკომენდაცია საერთაშორისო გამოფენის შესახებ</label>
                        <textarea style="resize:none;height:150px" class="form-control" v-model="data.recomendation"></textarea>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-12 ">
                        <label for="disabledTextInput" class="form-label mt-3 qui">დამატებითი ინფორმაცია</label>
                        <textarea style="resize:none;height:150px" class="form-control" v-model="data.comment"></textarea>
                    </div>
                </div>


                <div class="row mt-5 justify-content-center">
                    <div class="col-md-8 col-6  border_man"></div>
                </div>

                <!-- გაგზავნის ღილაკი --> 

                <div class="row mb-4 mt-4 justify-content-end">
                    <div class="col-md-2 qui mb-2">
                        <input type="submit" class=" btn btn-success w-100 float-end" value="გაგზავნა">
                    </div>
                </div>

                <div v-for="(item, index) in errors" :key="index" class="alert alert-danger">
                    <strong>{{ item[0] }}</strong>
                </div>
            </form>
        </div>
        <div v-else>
            <div class="container mt-5">
                <div class="row">
                    <div class="alert alert-warning">
                        ლინკი აღარაა აქტიური
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
        <div class="modal fade" id="confirmationModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">გთხოვთ დაადასტუროთ</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ნამდვილად გსურთ მოცემული კონტაქტის წაშლა?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">არა</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="removeField">კი</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { QuillEditor } from '@vueup/vue-quill'
    import Footer from '../../components/footer.vue'
    import axios, { AxiosError } from 'axios'
    
    export default {
        data() {
            return {
                field_id : "",

                errors : [],
                blocked : "",

                data : [],
            }
        },
        
        components: {
            QuillEditor,
            Footer,
        },

        mounted() {
            const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
            const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

            const _this_ = this;

            axios.get("/detail/get/by/email/" + this.$route.query.email + "/" + this.$route.params.id).then(function(response) {
                _this_.data = response.data;
                console.log(response.data);
            }).catch(function(err) {
                console.log(err);
            });

            setTimeout(() => {
                if(this.blocked != 1) {
                    axios.get("/email/view/" + this.$route.params.id + "/" + this.$route.query.email).then(function(response) {
                        console.log(response.data);
                    }).catch(function(err) {
                        console.log(err);
                    });
                } 
            }, 1000);

            setTimeout(() => {
                if(this.data.organizations.length == 0) {
                    this.addFields();
                }
            }, 2000);

            axios.get("/email/block/check/" + this.$route.query.email + "/" + this.$route.params.id).then(res => {
                this.blocked = res.data;
            }).catch(err => {
                console.log(err);
            });
        },

        methods : {
            sendStatus() {
                if(this.$refs.company.value == "") {
                    this.$refs.company.style.border = "1px solid #f1aeb5";
                    return;
                }else {
                    this.$refs.company.style.border = "1px solid #000";
                }
                
                if(this.$refs.fullname.value == "") {
                    this.$refs.fullname.style.border = "1px solid #f1aeb5";
                    return;
                }else {
                    this.$refs.fullname.style.border = "1px solid #000";
                }
                
                if(this.$refs.position.value == "") {
                    this.$refs.position.style.border = "1px solid #f1aeb5";
                    return;
                }else {
                    this.$refs.position.style.border = "1px solid #000";
                }
                
                if(this.$refs.email.value== "") {
                    this.$refs.email.style.border = "1px solid #f1aeb5";
                    return;
                }else {
                    this.$refs.email.style.border = "1px solid #000";
                }
                
                if(this.$refs.mobile.value == "") {
                    this.$refs.mobile.style.border = "1px solid #f1aeb5";
                    return;
                }else {
                    this.$refs.mobile.style.border = "1px solid #000";
                }

                axios.post("/email/not/new/" + this.$route.params.id + "/" + this.$route.query.email + "/?detail_id=" + this.data.detail_id, this.data).then((res) => {
                    this.$swal({
                        title : "სტატუსი მიენიჭა",
                        icon : "success",
                    });

                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }).catch((err) => {
                    console.log(err);
                });
            },

            setId(id) {
                this.field_id = id;
            },

            add() {
                const __this__ = this;

                axios.post("/detail/add/" + this.$route.params.id + "/" + this.$route.params.parent_id, Object.assign(this.data, { status : 2 })).then(function() {
                    __this__.$swal({
                        title : "ინფორმაცია წარმატებით განახლდა",
                        icon : "success",
                    });

                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                }).catch(function(err) {
                    if(err instanceof AxiosError) {
                        __this__.errors = err?.response?.data?.errors;
                    }

                    __this__.success_message = false;
                });
            },

            addFields() {
                this.data.organizations.push({
                    selected1 : "0",

                    activity_name: "",
                    country: "",
                    company_name: "",
                    target_country_name: "",
                    stage_name : "",
                });
            },

            removeField() {
                this.data.organizations.splice(this.field_id, 1);
            }
        }
    }
</script>

<style scoped>
    h4 {
        color: #005019;   
    }

    .btn-success {
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
    @media only screen and (max-width: 768px) {
    .card {
        margin-top: 25px;
    }
    }
</style>
