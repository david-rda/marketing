<template>
    <div>
        <div class="container" style="margin-top: 90px;">
            <navbar />

            <div class="row justify-content-md-between align-items-center">
                <div class="col-md-2 col-12 text-center text-sm-start">
                    <img src="../../assets/img/RDA-Logo-Geo.55af0c58 (1).png" alt="icon" width="250">
                </div>
                <div class="col-md-10 col-12"> 
                    <h1 class="mt-5 brand text-md-end text-sm-center ">მომხმარებლის მიერ შევსებული ფორმა</h1>
                    <h4 class="main head float-end">{{ exhibition }}</h4>
                </div>
            </div>

            <span class="p-2 bg-success bg-opacity-25 rounded-2 user-select-none ms-3" v-if="data.has_news == '1'">
                <strong>არ აქვს სიახლე</strong>
            </span>
            
            <div class="row mt-4 mb-4 justify-content-center">
                <div class="col-md-8 col-6 border_man"></div>
            </div>

            <!-- საკონტაქტო ინფორმაცია -->

            <div class="row">
                <div class="col-md-6">
                    <div class="d-md-flex gap-3 d-block">
                        <div class="mb-3 w-md-50 w-100">
                            <label class="form-label">კომპანიის დასახელება</label>
                            <input disabled type="text" class="form-control input_form" :value="data.company">
                        </div>
                        <div class="mb-3 w-md-50 w-100">
                            <label  class="form-label">სახელი, გვარი</label>
                            <input disabled type="text" class="form-control input_form " :value="data.fullname">
                        </div>
                    </div>
                    <div class="mb-3">
                        <label class="form-label">თანამდებობა</label>
                        <input disabled type="text" class="form-control input_form " :value="data.position">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="mb-3">
                        <label class="form-label">საკონტაქტო ტელეფონის ნომერი</label>
                        <input disabled type="number" class="form-control input_form" :value="data.mobile">
                    </div>
                    <div class="mb-3">
                        <label class="form-label">ელ. ფოსტა</label>
                        <input disabled type="email" class="form-control input_form" :value="data.email">
                    </div>
                </div>
            </div>

            <!-- საქმიანი კავშირი -->

            <div class="row justify-content-center">
                <div class="col-md-12">
                    <label class="form-label ">გამოფენაზე შეძენილი საქმიანი კავშირები</label>
                    <select disabled class="form-select select_man opt">
                        <option class="opt" v-if="data.selected === '1'">დავამყარეთ საქმიანი კავშირები</option>
                        <option class="opt" v-else>არ დაგვიმყარებია საქმიანი კავშირები</option>
                    </select>
                </div>
            </div>

            <!-- საქმიანი კავშირი დამყარებულია -->

            <div class="row mt-5" v-if="data.selected">
                <div class="col-12">
                    <div class="row mb-4 justify-content-center">
                        <div class="col-md-8 col-6 border_man"></div>
                    </div>
                    <div v-for="(items, outer_index) in data.organizations" :key="outer_index" class="card p-3 mb-3">
                        <!-- <div v-if="items.activity_name != null && items.country != null && items.company_name != null && items.target_country_name != null"> -->
                            <h4 class="card-title d-flex justify-content-between">
                                <span>#{{ outer_index + 1 }}</span>
                            </h4>
                            <div class="row">
                                <div class="col-md-6 col-12 mb-3">
                                    <label class="form-label">საქმიანობის სფერო</label>
                                    <input disabled type="text" class="form-control input_form" :value="items.activity_name">
                                </div>
                                <div class="col-md-6 col-12 mb-3">
                                    <label class="form-label">რომელ ქვეყანას წარმოადგენს</label>
                                    <input disabled type="text" class="form-control input_form" :value="items.country">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 col-12 mb-3">
                                    <label class="form-label">ორგანიზაციის დასახელება</label>
                                    <input disabled type="text" class="form-control input_form" :value="items.company_name">
                                </div>
                                <div class="col-md-6 col-12 mb-3">
                                    <label class="form-label">ქვეყანა რომელშიც განხორციელდა ან იგეგმება ექსპორტი</label>
                                    <input disabled type="text" class="form-control input_form" :value="items.target_country_name">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-12">
                                    <label class="form-label">რა ეტაპზეა საქმიანი ურთიერთობა?</label>
                                    <div v-for="(item, index) in data?.field_histories" :key="index">
                                        <div v-for="(inner_item, inner_index) in item" :key="inner_index">
                                            <div class="alert alert-success border-0 user-select-none rounded-3 py-2 px-3 position-relative" v-if="inner_item?.stage_name != null && inner_item.index == (outer_index + 1)">
                                                <span>{{ inner_item?.stage_name }}</span>
                                                <div class="position-absolute d-flex top-0 end-0 me-3 gap-2" style="transform: translateY(-50%)">
                                                    <div class="bg-primary rounded-3 user-select-none text-white bg-opacity-75 p-2 shadow" title="ელ. ფოსტის ბოლო გაგზავნის თარიღი" style="font-size: 12px;" v-if="data?.email_sent_date">
                                                        <strong>{{ moment(data?.email_sent_date) }}</strong>
                                                    </div>
                                                    <div class="bg-success rounded-3 user-select-none text-white bg-opacity-75 p-2 shadow" title="შევსების გაგზავნის თარიღი" style="font-size: 12px;">
                                                        <strong>{{ moment(inner_item?.created_at) }}</strong>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="py-2 px-3 bg-dark-subtle rounded">{{ items.stage_name }}</div>
                                </div>
                            </div>
                            <!-- <br> -->

                            <!-- ექსპორტი -->

                            <div class="row mt-3">
                                <div class="col-md-12">
                                    <label class="form-label qui">პროდუქციის გაგზავნის შესახებ ინფორმაცია</label>
                                    <select disabled class="form-select select_man opt">
                                        <option class="opt" value="0" v-if="items.product_volume == '' && items.template_volume == ''">პროდუქცია ან ნიმუში არაა გაგზავნილი</option>
                                        <option class="opt" value="1" v-if="items.product_volume != ''">გაგზავნილია პროდუქცია</option>
                                        <option class="opt" value="2" v-else>გაგზავნილია ნიმუში</option>
                                    </select>
                                </div>
                            </div>

                            <!-- გაგზავინილია პროდუქცია -->

                            <!-- <div v-if="items.selected1 === '2'"> -->
                        <div class="row mb-1 mt-3" v-if="items.product_volume != ''">
                            <div class="col-md-6">
                                <label class="form-label">გაგზავნილი პროდუქციის მოცულობა (მაგ: 100 - ცალი/კგ/ბოთლი...)</label>
                                <div v-for="(item, index) in data?.field_histories" :key="index">
                                    <div v-for="(inner_item, inner_index) in item" :key="inner_index">
                                        <div class="alert alert-success border-0 user-select-none rounded-3 py-2 px-3 position-relative" v-if="inner_item?.product_volume && inner_item.index == (outer_index + 1)">
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
                                <input disabled type="text" class="form-control input_form" :value="items.product_volume">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">გაგზავნილი პროდუქციის ღირებულება ლარში</label>
                                <div v-for="(item, index) in data?.field_histories" :key="index">
                                    <div v-for="(inner_item, inner_index) in item" :key="inner_index">
                                        <div class="alert alert-success border-0 user-select-none rounded-3 py-2 px-3 position-relative" v-if="inner_item?.product_price != '0.0' && inner_item.index == (outer_index + 1)">
                                            <span>{{ inner_item?.product_price }}</span>
                                            <div class="position-absolute d-flex top-0 end-0 me-3 gap-2" style="transform: translateY(-50%)">
                                                <div class="bg-primary rounded-3 user-select-none text-white bg-opacity-75 p-2 shadow" title="ელ. ფოსტის ბოლო გაგზავნის თარიღი" style="font-size: 12px;" v-if="data?.email_sent_date">
                                                    <strong>{{ moment(data?.email_sent_date) }}</strong>
                                                </div>
                                                <div class="bg-success rounded-3 user-select-none text-white bg-opacity-75 p-2 shadow"title="შევსების გაგზავნის თარიღი" style="font-size: 12px;">
                                                    <strong>{{ moment(inner_item?.created_at) }}</strong>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <input disabled type="text" class="form-control input_form" :value="Number(items.product_price).toLocaleString()">
                            </div>
                        </div>

                        <!-- გაგზავინილია ნიმუში -->

                        <div class="row mb-1 mt-3" v-else>
                            <div class="col-md-6">
                                <label class="form-label">გაგზავნილი ნიმუშის მოცულობა (მაგ: 100 - ცალი/კგ/ბოთლი...)</label>
                                <div v-for="(item, index) in data?.field_histories" :key="index">
                                    <div v-for="(inner_item, inner_index) in item" :key="inner_index">
                                        <div class="alert alert-success border-0 user-select-none rounded-3 py-2 px-3 position-relative" v-if="inner_item?.template_volume && inner_item.index == (outer_index + 1)">
                                            <span>{{ inner_item?.template_volume }}</span>
                                            <div class="position-absolute d-flex top-0 end-0 me-3 gap-2" style="transform: translateY(-50%)">
                                                <div class="bg-primary rounded-3 user-select-none text-white bg-opacity-75 p-2 shadow" title="ელ. ფოსტის ბოლო გაგზავნის თარიღი" style="font-size: 12px;" v-if="data?.email_sent_date">
                                                    <strong>{{ moment(data?.email_sent_date) }}</strong>
                                                </div>
                                                <div class="bg-success rounded-3 user-select-none text-white bg-opacity-75 p-2 shadow" title="შევსების გაგზავნის თარიღი" style="font-size: 12px;">
                                                    <strong>{{ moment(inner_item?.created_at) }}</strong>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <input disabled type="text" class="form-control input_form" :value="items.template_volume">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">გაგზავნილი ნიმუშის ღირებულება ლარში</label>
                                <div v-for="(item, index) in data?.field_histories" :key="index">
                                    <div v-for="(inner_item, inner_index) in item" :key="inner_index">
                                        <div class="alert alert-success border-0 user-select-none rounded-3 py-2 px-3 position-relative" v-if="inner_item?.template_price != '0.0' && inner_item.index == (outer_index + 1)">
                                            <span>{{ inner_item?.template_price }}</span>
                                            <div class="position-absolute d-flex top-0 end-0 me-3 gap-2" style="transform: translateY(-50%)">
                                                <div class="bg-primary rounded-3 user-select-none text-white bg-opacity-75 p-2 shadow" title="ელ. ფოსტის ბოლო გაგზავნის თარიღი" style="font-size: 12px;" v-if="data?.email_sent_date">
                                                    <strong>{{ moment(data?.email_sent_date) }}</strong>
                                                </div>
                                                <div class="bg-success rounded-3 user-select-none text-white bg-opacity-75 p-2 shadow" title="შევსების გაგზავნის თარიღი" style="font-size: 12px;">
                                                    <strong>{{ moment(inner_item?.created_at) }}</strong>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <input disabled type="text" class="form-control input_form" :value="Number(items.template_price).toLocaleString()">
                            </div>
                        </div>
                    </div>
                </div>
            </div>                
            <!-- ექსპორტი -->
            
            <!-- რეკომენდაცია/დამატებითი ინფორმაცია -->

            <div class="row mt-5 mb-4 justify-content-center">
                <div class="col-md-8 col-6 border_man"></div>
            </div>
            <div class="row">
                <div class="col-md-12">
                    <label class="form-label">რეკომენდაცია საერთაშორისო გამოფენის შესახებ</label>
                    <div v-for="(item, index) in data?.additional_history?.recomendation" :key="index">
                        <div class="alert alert-success border-0 user-select-none rounded-3 py-2 px-3 position-relative" v-if="item?.recomendation">
                            <span v-html="item?.recomendation"></span>
                            <div class="position-absolute d-flex top-0 end-0 me-3 gap-2" style="transform: translateY(-50%)">
                                <div class="bg-primary rounded-3 user-select-none text-white bg-opacity-75 p-2 shadow" title="ელ. ფოსტის ბოლო გაგზავნის თარიღი" style="font-size: 12px;" v-if="data?.email_sent_date">
                                    <strong>{{ moment(data?.email_sent_date) }}</strong>
                                </div>
                                <div class="bg-success rounded-3 user-select-none text-white bg-opacity-75 p-2 shadow" title="შევსების გაგზავნის თარიღი" style="font-size: 12px;">
                                    <strong>{{ moment(item?.created_at) }}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="p-3 bg-dark-subtle rounded-4" v-html="data.recomendation"></div>
                </div>
            </div>
            <div class="row mt-3">
                <div class="col-md-12 ">
                    <label class="form-label mt-3">დამატებითი ინფორმაცია</label>
                    <div v-for="(item, index) in data?.additional_history?.comment" :key="index">
                        <div class="alert alert-success border-0 user-select-none rounded-3 py-2 px-3 position-relative" v-if="item?.comment">
                            <span v-html="item?.comment"></span>
                            <div class="position-absolute d-flex top-0 end-0 me-3 gap-2" style="transform: translateY(-50%)">
                                <div class="bg-primary rounded-3 user-select-none text-white bg-opacity-75 p-2 shadow" title="ელ. ფოსტის ბოლო გაგზავნის თარიღი" style="font-size: 12px;" v-if="data?.email_sent_date">
                                    <strong>{{ moment(data?.email_sent_date) }}</strong>
                                </div>
                                <div class="bg-success rounded-3 user-select-none text-white bg-opacity-75 p-2 shadow" title="შევსების გაგზავნის თარიღი" style="font-size: 12px;">
                                    <strong>{{ moment(item?.created_at) }}</strong>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="p-3 bg-dark-subtle rounded-4" v-html="data.comment"></div>
                </div>
            </div>

            <!-- გაგზავნის ღილაკი --> 

            <div class="row mb-5 mt-5 justify-content-between">
                <div class="col-md-3 mb-2">
                    <div class="d-flex gap-2">
                        <button class="btn btn-danger" type="button" v-on:click="doanloadPdf()">
                            <i class="fa fa-file-pdf-o pe-none me-2"></i> PDF
                        </button>
                    </div>
                </div>
                <div class="col-md-3 mb-2">
                    <button @click="$router.back()" type="button" class="btn btn-success w-100">უკან დაბრუნება</button>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
    import Footer from '../../components/footer.vue'
    import navbar from '../../components/navbar.vue'
    import axios from 'axios'
    import moment from 'moment';

    export default {
        data() {
            return {
                selected: '0',
                selected1: '0',
                exhibition: "",

                data: []
            }
        },
        components: {
            navbar,
            Footer,
        },

        methods: {
            moment(data) {
                return moment(data).locale("ka").format("LL");
            },

            // doanloadExcel() {
            //     window.open("https://survey.rda.gov.ge/api/detail/download/excel/" + this.$route.params.id + "/" + this.$route.params.exhibition_id);
            // },

            doanloadPdf() {
                window.open("https://survey.rda.gov.ge/api/detail/download/pdf/" + this.$route.params.id + "/" + this.$route.params.exhibition_id);
            }
        },

        mounted() {
            const _this_ = this;

            axios.get("/detail/get/" + this.$route.params.id).then(function (response) {
                _this_.data = response.data;
            }).catch(function (err) {
                console.log(err);
            });

            axios.get("/exhibition/show/" + this.$route.params.exhibition_id, {
                headers: {
                    "Authorization": "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                }
            }).then(function (response) {
                _this_.exhibition = response.data.label;
            }).catch(function (err) {
                console.log(err);
            });
        }
    }
</script>

<style scoped>
    h4 {
        color: #005019;   
    }

    *:not(i) {
        font-family:'firago-regular'
    }
</style>
