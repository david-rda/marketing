<template>
    <div>
        <div class="container mt-5" v-if="blocked == 0">
            <div class="row justify-content-md-between align-items-center">
                <div class="col-md-2 col-12 text-center text-sm-start">
                    <img src="../../assets/img/RDA-Logo-Geo.55af0c58 (1).png" alt="icon" width="250">
                </div>
                <div class="col-md-10 col-12"> 
                    <h1 class="mt-5 brand text-md-end text-sm-center ">მომხმარებლის მიერ შევსებული ფორმა</h1>
                    <h4 class="main head float-end text-success">{{ exhibition }}</h4>
                </div>
            </div>
            <div class="row">
                <div class="alert alert-success border-0 border-0 user-select-none text-success text-center custom-info position-relative">
                    <i class="fa fa-info-circle position-absolute top-0 start-0 translate-middle pe-none"></i>
                    უკუკავშირის შევსება წარმოადგენს სააგენტოსა და თქვენს შორის გაფორმებული ხელშეკრულების (შემდგომში - ხელშეკრულება)  მე-2 პუნქტის 2.2 ქვეპუნქტის 2.2.6 ქვეპუნქტით  განსაზღვრულ ვალდებულებას. თუ უკუკავშირი არ იქნება დროულად წარმოდგენილი,  ხელშეკრულების მე - 3 პუნქტის 3.1 ქვეპუნქტის შესაბამისად,   თქვენს კომპანიას არ ექნება შესაძლებლობა მიიღოს მონაწილეობა მომდევნო გამოფენების შესარჩევ კონკურსში მომდევნო ორი წლის განმავლობაში.
                </div>
            </div>
            <div class="row mt-4 mb-4 justify-content-center">
                <div class="col-md-8 col-6 border_man"></div>
            </div>
            <button type="button" :disabled="disabled" class="btn btn-success mb-5" @click="sendStatus">სიახლე არ გვაქვს <span class="spinner spinner-border spinner-border-sm" v-show="disabled"></span></button>

            <!-- საკონტაქტო ინფორმაცია -->

            <form class="mt-4 form_bg" @submit.prevent="add()">
                <div class="row">
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label for="name" class="form-label">კომპანიის დასახელება</label>
                            <input type="text" id="name" ref="company" class="form-control" v-model="data.company" disabled>
                        </div>
                        <div class="mb-3">
                            <label for="name" class="form-label">სახელი, გვარი</label>
                            <input type="text" id="name" ref="fullname" class="form-control" v-model="data.fullname">
                        </div>
                        <div class="mb-3">
                            <label for="Position" class="form-label">თანამდებობა</label>
                            <input type="text" id="Position" ref="position" class="form-control" v-model="data.position">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label for="number" class="form-label">საკონტაქტო ტელეფონის ნომერი</label>
                            <input type="number" id="number" ref="email" class="form-control" v-model="data.mobile">
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">ელ. ფოსტა</label>
                            <input type="email" id="email" ref="mobile" class="form-control" v-model="data.email" disabled>
                        </div>
                    </div>
                </div>

                <!-- საქმიანი კავშირი -->

                <div class="row justify-content-center">
                    <div class="col-md-12">
                        <label for="drop" class="form-label">გამოფენაზე შეძენილი საქმიანი კავშირები</label>
                        <div class="alert alert-danger">
                            <strong>გთხოვთ მიუთითოთ მხოლოდ აღნიშნულ გამოფენაზე შეძენილი საქმიანი კავშირებისა და შედეგების შესახებ ინფორმაცია.</strong>
                        </div>
                        <select id="drop" class="form-select" v-model="data.selected" :disabled="isDynamicFormNew">
                            <option value="1">დავამყარეთ საქმიანი კავშირები</option>
                            <option value="0">არ დაგვიმყარებია საქმიანი კავშირები</option>
                        </select>
                    </div>
                </div>

                <!-- საქმიანი კავშირი დამყარებულია -->

                <div class="row mt-5" v-if="data.selected == 1">
                    <div class="col-12">
                        <div class="row mb-4 justify-content-center">
                            <div class="col-md-8 col-6 border_man"></div>
                        </div>
                        <div v-for="(items, outer_index) in data.organizations" :key="outer_index" class="card p-3 mb-3">
                            <h4 class="card-title text-success d-flex justify-content-between">
                                <span>#{{ outer_index + 1 }}</span>
                                <button v-if="data.organizations.length > 1" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#confirmationModal" @click="setId(outer_index)">წაშლა</button>
                            </h4>
                            <div class="row">
                                <div class="col-md-6 col-12 mb-3">
                                    <label :for="'activity' + outer_index" class="form-label">საქმიანობის სფერო</label>
                                    <input type="text" :id="'activity' + outer_index" class="form-control" v-model="items.activity_name" :disabled="items.completed">
                                </div>
                                <div class="col-md-6 col-12 mb-3">
                                    <label :for="'country' + outer_index" class="form-label">რომელ ქვეყანას წარმოადგენს</label>
                                    <input type="text" :id="'country' + outer_index" class="form-control" v-model="items.country" :disabled="items.completed">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 col-12 mb-3">
                                    <label :for="'organization' + outer_index" class="form-label">ორგანიზაციის დასახელება</label>
                                    <input type="text" :id="'organization' + outer_index" class="form-control" v-model="items.company_name" :disabled="items.completed">
                                </div>
                                <div class="col-md-6 col-12 mb-3">
                                    <label :for="'export' + outer_index" class="form-label">ქვეყანა რომელშიც განხორციელდა ან იგეგმება ექსპორტი</label>
                                    <input type="text" :id="'export' + outer_index" class="form-control" v-model="items.target_country_name" :disabled="items.completed">
                                </div>
                            </div>
                            <div class="row mb-4">
                                <div class="col-md-12 mb-2">
                                    <label for="disabledTextInput" class="form-label">რა ეტაპზეა საქმიანი ურთიერთობა?</label>
                                    <div v-if="items.completed">
                                        <div v-for="(item, index) in data?.field_histories" :key="index">
                                            <div v-for="(inner_item, inner_index) in item" :key="inner_index">
                                                <div class="alert alert-success border-0 user-select-none rounded-3 position-relative py-2 px-3" v-if="inner_item?.stage_name != null && inner_item.index == (outer_index + 1)">
                                                    <span class="bg-success bg-opacity-75 shadow text-white badge position-absolute top-0 start-0 translate-middle">{{ index + 1 }}</span>
                                                    <span>{{ inner_item?.stage_name }}</span>
                                                    <div class="position-absolute d-flex top-0 end-0 me-3 gap-2" style="transform: translateY(-50%)">
                                                        <div class="bg-primary rounded-3 user-select-none text-white bg-opacity-75 p-2 shadow" style="font-size: 12px;" v-if="data?.email_sent_date">
                                                            <strong>{{ moment(data?.email_sent_date) }}</strong>
                                                        </div>
                                                        <div class="bg-success rounded-3 user-select-none text-white bg-opacity-75 p-2 shadow" style="font-size: 12px;">
                                                            <strong>{{ moment(inner_item?.created_at) }}</strong>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <textarea style="resize:none" class="form-control" v-model="items.stage_name"></textarea>
                                </div>
                            </div>

                            <!-- ექსპორტი -->
                            <div class="row mt-3">
                                <div class="col-md-12">
                                    <label for="disabledTextInput" class="form-label qui">პროდუქციის გაგზავნის შესახებ ინფორმაცია</label>
                                    <div class="alert alert-danger">
                                        <strong>გთხოვთ წინა უკუკავშირისას მითითებული მონაცემი არ დააჯამოთ ახალ მონაცემთან.</strong>
                                    </div>
                                    <select id="disabledSelect" class="form-select" v-model="items.selected1">
                                        <option value="0">პროდუქცია ან ნიმუში არაა გაგზავნილი</option>
                                        <option value="1">გაგზავნილია პროდუქცია</option>
                                        <option value="2">გაგზავნილია ნიმუში</option>
                                    </select>
                                </div>
                            </div>

                            <!-- გაგზავინილია პროდუქცია -->

                            <div class="row mb-1 mt-3" v-if="items.selected1 == 1 && data.selected != 0">
                                <div class="col-md-6">
                                    <div class="">
                                        <label for="product" class="form-label">გაგზავნილი პროდუქციის მოცულობა (მაგ: 100 - ცალი/კგ/ბოთლი...)</label>
                                        <div v-if="items.completed">
                                            <div v-for="(item, index) in data?.field_histories" :key="index">
                                                <div v-for="(inner_item, inner_index) in item" :key="inner_index">
                                                    <div class="alert alert-success border-0 user-select-none rounded-3 py-2 px-3 position-relative" v-if="inner_item?.product_volume && inner_item.index == (outer_index + 1)">
                                                        <span class="bg-success bg-opacity-75 shadow text-white badge position-absolute top-0 start-0 translate-middle">{{ index + 1 }}</span>
                                                        <span>{{ inner_item?.product_volume }}</span>
                                                        <div class="position-absolute d-flex top-0 end-0 me-3 gap-2" style="transform: translateY(-50%)">
                                                            <div class="bg-primary rounded-3 user-select-none text-white bg-opacity-75 p-2 shadow" style="font-size: 12px;" v-if="data?.email_sent_date">
                                                                <strong>{{ moment(data?.email_sent_date) }}</strong>
                                                            </div>
                                                            <div class="bg-success rounded-3 user-select-none text-white bg-opacity-75 p-2 shadow" style="font-size: 12px;">
                                                                <strong>{{ moment(inner_item?.created_at) }}</strong>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <input type="text" id="product" class="form-control" v-model="items.product_volume">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="">
                                        <label for="cost" class="form-label">გაგზავნილი პროდუქციის ღირებულება ლარში</label>
                                        <div v-if="items.completed">
                                            <div v-for="(item, index) in data?.field_histories" :key="index">
                                                <div v-for="(inner_item, inner_index) in item" :key="inner_index">
                                                    <div class="alert alert-success border-0 user-select-none rounded-3 py-2 px-3 position-relative" v-if="inner_item?.product_price != '0.0' && inner_item.index == (outer_index + 1)">
                                                        <span class="bg-success bg-opacity-75 shadow text-white badge position-absolute top-0 start-0 translate-middle">{{ index + 1 }}</span>
                                                        <span>{{ inner_item?.product_price }}</span>
                                                        <div class="position-absolute d-flex top-0 end-0 me-3 gap-2" style="transform: translateY(-50%)">
                                                            <div class="bg-primary rounded-3 user-select-none text-white bg-opacity-75 p-2 shadow" style="font-size: 12px;" v-if="data?.email_sent_date">
                                                                <strong>{{ moment(data?.email_sent_date) }}</strong>
                                                            </div>
                                                            <div class="bg-success rounded-3 user-select-none text-white bg-opacity-75 p-2 shadow" style="font-size: 12px;">
                                                                <strong>{{ moment(inner_item?.created_at) }}</strong>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <input type="number" step=".01" id="cost" class="form-control" v-model="items.product_price">
                                    </div>
                                </div>
                            </div>

                            <!-- გაგზავინილია ნიმუში -->

                            <div class="row mb-1 mt-3" v-if="items.selected1 == 2 && data.selected != 0">
                                <div class="col-md-6">
                                    <div class="">
                                        <label for="sample" class="form-label">გაგზავნილი ნიმუშის მოცულობა (მაგ: 100 - ცალი/კგ/ბოთლი...)</label>
                                        <div v-if="items.completed">
                                            <div v-for="(item, index) in data?.field_histories" :key="index">
                                                <div v-for="(inner_item, inner_index) in item" :key="inner_index">
                                                    <div class="alert alert-success border-0 user-select-none rounded-3 py-2 px-3 position-relative" v-if="inner_item?.template_volume && inner_item.index == (outer_index + 1)">
                                                        <span class="bg-success bg-opacity-75 shadow text-white badge position-absolute top-0 start-0 translate-middle">{{ index + 1 }}</span>
                                                        <span>{{ inner_item?.template_volume }}</span>
                                                        <div class="position-absolute d-flex top-0 end-0 me-3 gap-2" style="transform: translateY(-50%)">
                                                            <div class="bg-primary rounded-3 user-select-none text-white bg-opacity-75 p-2 shadow" style="font-size: 12px;" v-if="data?.email_sent_date">
                                                                <strong>{{ moment(data?.email_sent_date) }}</strong>
                                                            </div>
                                                            <div class="bg-success rounded-3 user-select-none text-white bg-opacity-75 p-2 shadow" style="font-size: 12px;">
                                                                <strong>{{ moment(inner_item?.created_at) }}</strong>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <input type="text" id="sample" class="form-control" v-model="items.template_volume">
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="">
                                        <label for="sampleCost" class="form-label">გაგზავნილი ნიმუშის ღირებულება ლარში</label>
                                        <div v-if="items.completed">
                                            <div v-for="(item, index) in data?.field_histories" :key="index">
                                                <div v-for="(inner_item, inner_index) in item" :key="inner_index">
                                                    <div class="alert alert-success border-0 user-select-none rounded-3 py-2 px-3 position-relative" v-if="inner_item?.template_price != '0.0' && inner_item.index == (outer_index + 1)">
                                                        <span class="bg-success bg-opacity-75 shadow text-white badge position-absolute top-0 start-0 translate-middle">{{ index + 1 }}</span>
                                                        <span>{{ inner_item?.template_price }}</span>
                                                        <div class="position-absolute d-flex top-0 end-0 me-3 gap-2" style="transform: translateY(-50%)">
                                                            <div class="bg-primary rounded-3 user-select-none text-white bg-opacity-75 p-2 shadow" style="font-size: 12px;" v-if="data?.email_sent_date">
                                                                <strong>{{ moment(data?.email_sent_date) }}</strong>
                                                            </div>
                                                            <div class="bg-success rounded-3 user-select-none text-white bg-opacity-75 p-2 shadow" style="font-size: 12px;">
                                                                <strong>{{ moment(inner_item?.created_at) }}</strong>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <input type="number" step=".01" id="sampleCost" class="form-control" v-model="items.template_price">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                
                <!-- ექსპორტი -->
                
                <!-- ახალი ბიზნეს კონტაქტის დამატება -->
                <div class="row mt-5 mb-3 justify-content-center">
                    <div class="col-md-8 col-6 border_man"></div>
                </div>

                <div class="row justify-content-center">
                    <div class="col-12 d-flex justify-content-center">
                        <button @click="addFields" type="button" class="btn btn-success">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                            </svg>
                            ახალი ბიზნეს კონტაქტის დამატება
                        </button>
                    </div> 
                </div>

                <!-- რეკომენდაცია/დამატებითი ინფორმაცია -->

                <div class="row mt-3 mb-4 justify-content-center">
                    <div class="col-md-8 col-6 border_man"></div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <label for="disabledTextInput" class="form-label">რეკომენდაცია საერთაშორისო გამოფენის შესახებ</label>
                        <div v-for="(item, index) in data?.additional_history?.recomendation" :key="index">
                            <div class="alert alert-success border-0 user-select-none rounded-3 py-2 px-3 position-relative" v-if="item?.recomendation">
                                <span class="bg-success bg-opacity-75 shadow text-white badge position-absolute top-0 start-0 translate-middle">{{ index + 1 }}</span>
                                <span v-html="item?.recomendation"></span>
                                <div class="position-absolute d-flex top-0 end-0 me-3 gap-2" style="transform: translateY(-50%)">
                                    <div class="bg-primary rounded-3 user-select-none text-white bg-opacity-75 p-2 shadow" style="font-size: 12px;" v-if="data?.email_sent_date">
                                        <strong>{{ moment(data?.email_sent_date) }}</strong>
                                    </div>
                                    <div class="bg-success rounded-3 user-select-none text-white bg-opacity-75 p-2 shadow" style="font-size: 12px;">
                                        <strong>{{ moment(item?.created_at) }}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <textarea style="resize:none;height:150px" class="form-control" v-model="data.recomendation"></textarea>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-12 ">
                        <label for="disabledTextInput" class="form-label mt-3 qui">დამატებითი ინფორმაცია</label>
                        <div v-for="(item, index) in data?.additional_history?.comment" :key="index">
                            <div class="alert alert-success border-0 user-select-none rounded-3 py-2 px-3 position-relative" v-if="item?.comment">
                                <span class="bg-success bg-opacity-75 shadow text-white badge position-absolute top-0 start-0 translate-middle">{{ index + 1 }}</span>
                                <span v-html="item?.comment"></span>
                                <div class="position-absolute d-flex top-0 end-0 me-3 gap-2" style="transform: translateY(-50%)">
                                    <div class="bg-primary rounded-3 user-select-none text-white bg-opacity-75 p-2 shadow" style="font-size: 12px;" v-if="data?.email_sent_date">
                                        <strong>{{ moment(data?.email_sent_date) }}</strong>
                                    </div>
                                    <div class="bg-success rounded-3 user-select-none text-white bg-opacity-75 p-2 shadow" style="font-size: 12px;">
                                        <strong>{{ moment(item?.created_at) }}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <textarea style="resize:none;height:150px" class="form-control" v-model="data.comment"></textarea>
                    </div>
                </div>

                <!-- გაგზავნის ღილაკი --> 

                <div class="row mb-4 mt-4 justify-content-end">
                    <div class="col-md-2">
                        <input type="submit" class="btn btn-success w-100" :disabled="disabled" value="გაგზავნა">
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
                        თქვენი განაცხადი წარმატებით გაიგზავნა. ლინკი აღარაა აქტიური
                    </div>
                </div>
            </div>
        </div>
        <Footer />
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
    import moment from 'moment';
    
    export default {
        data() {
            return {
                field_id : "",

                errors : [],
                blocked : "",

                data : [],
                disabled : false,
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

        computed : {
            isDynamicFormNew() {
                var completeds = [];

                this.data?.organizations?.forEach(function(item, index) {
                    if(item?.completed) {
                        completeds.push(item?.completed);
                    }
                });

                return completeds.length;
            }
        },

        methods : {
            moment(data) {
                return moment(data).locale("ka").format("LL");
            },

            sendStatus() {
                if(this.$refs.company.value == "") {
                    this.$refs.company.classList.add("is-invalid");
                    return false;
                }

                if(this.$refs.fullname.value == "") {
                    this.$refs.fullname.classList.add("is-invalid");
                    return false;
                }

                if(this.$refs.position.value == "") {
                    this.$refs.position.classList.add("is-invalid");
                    return false;
                }

                if(this.$refs.email.value == "") {
                    this.$refs.email.classList.add("is-invalid");
                    return false;
                }

                if(this.$refs.mobile.value == "") {
                    this.$refs.mobile.classList.add("is-invalid");
                    return false;
                }

                this.disabled = true;

                axios.post("/email/not/new/" + this.$route.params.id + "/" + this.$route.query.email + "/?detail_id=" + this.data.detail_id + "&parent_id=" + this.$route.params.parent_id, Object.assign(this.data, { status : 2 })).then((res) => {
                    this.$swal({
                        title : "სტატუსი მიენიჭა",
                        icon : "success",
                    });

                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);

                    this.disabled = false;
                }).catch((err) => {
                    if(err instanceof AxiosError) {
                        this.errors = err?.response?.data?.errors;
                    }
                    this.disabled = false;
                });
            },

            setId(id) {
                this.field_id = id;
            },

            add() {
                const __this__ = this;

                this.disabled = true;

                axios.post("/detail/add/" + this.$route.params.id + "/" + this.$route.params.parent_id, Object.assign(this.data, { status : 2 })).then(function() {
                    __this__.$swal({
                        title : "ინფორმაცია წარმატებით განახლდა",
                        icon : "success",
                    });

                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);

                    __this__.disabled = false;
                }).catch(function(err) {
                    if(err instanceof AxiosError) {
                        __this__.errors = err?.response?.data?.errors;
                    }

                    __this__.success_message = false;
                    __this__.disabled = false;
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
    *:not(i) {
        font-family: 'firago-regular';
    }
</style>