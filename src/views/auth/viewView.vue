<template>
    <div>
        <div class="container" style="margin-top: 90px;">
            <navbar/>

            <form class=" mt-4 form_bg">
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

                <!-- საკონტაქტო ინფორმაცია -->

                <div class="row">
                    <div class="col-md-6">
                        <div class="d-flex gap-3 additional">
                            <div class="mb-3 w-50 additional1">
                                <label for="company" class="form-label">კომპანიის დასახელება</label>
                                <input disabled type="text" id="company" class="form-control input_form" v-model="data.company">
                            </div>
                            <div class="mb-3 w-50 additional1">
                                <label  for="name" class="form-label">სახელი, გვარი</label>
                                <input disabled type="text" id="name" class="form-control input_form " v-model="data.fullname">
                            </div>
                        </div>
                        <div class="mb-3">
                            <label for="Position" class="form-label">თანამდებობა</label>
                            <input disabled type="text" id="Position" class="form-control input_form " v-model="data.position">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label for="number" class="form-label">საკონტაქტო ტელეფონის ნომერი</label>
                            <input disabled type="number" id="number" class="form-control input_form" v-model="data.mobile">
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">ელ. ფოსტა</label>
                            <input disabled type="email" id="email" class="form-control input_form" v-model="data.email">
                        </div>
                    </div>
                </div>

                <!-- საქმიანი კავშირი -->

                <div class="row justify-content-center">
                    <div class="col-md-12">
                        <label for="drop" class="form-label ">გამოფენაზე შეძენილი საქმიანი კავშირები</label>
                        <select id="drop" disabled class="form-select select_man opt">
                            <option class="opt" v-if="data.selected === '1'">დავამყარეთ საქმიანი კავშირები</option>
                            <option class="opt" v-else>არ დაგვიმყარებია საქმიანი კავშირები</option>
                        </select>
                    </div>
                </div>

                <!-- საქმიანი კავშირი დამყარებულია -->

                <div class="row  mt-5" v-if="data.selected">
                    <div class="row  mb-4 justify-content-center">
                        <div class="col-md-8 col-6 border_man"></div>
                    </div>
                    <div v-for="(items, index) in data.organizations" :key="index" class="card p-3 mb-3">
                        <!-- <div v-if="items.activity_name != null && items.country != null && items.company_name != null && items.target_country_name != null"> -->
                            <h4 class="card-title d-flex justify-content-between">
                                <span>#{{ index + 1 }}</span>
                            </h4>
                            <div class="row">
                                <div class="col-md-6 col-12 mb-3">
                                    <label for="activity" class="form-label">საქმიანობის სფერო</label>
                                    <input disabled type="text" id="activity" class="form-control input_form" required v-model="items.activity_name">
                                </div>
                                <div class="col-md-6 col-12 mb-3">
                                    <label for="country" class="form-label">რომელ ქვეყანას წარმოადგენს</label>
                                    <input disabled type="text" id="country" class="form-control input_form" required v-model="items.country">
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6 col-12 mb-3">
                                    <label for="organization" class="form-label">ორგანიზაციის დასახელება</label>
                                    <input disabled type="text" id="organization" class="form-control input_form" required v-model="items.company_name">
                                </div>
                                <div class="col-md-6 col-12 mb-3">
                                    <label for="export" class="form-label">ქვეყანა რომელშიც განხორციელდა ან იგეგმება ექსპორტი</label>
                                    <input disabled type="text" id="export" class="form-control input_form" required v-model="items.target_country_name">
                                </div>
                            </div>
                            <div class="row mb-4">
                                <div class="col-md-12 mb-2">
                                    <label for="disabledTextInput" class="form-label">რა ეტაპზეა საქმიანი ურთიერთობა?</label>
                                    <textarea style="resize:none" class="h-100 form-control" required v-model="items.stage_name" disabled></textarea>
                                </div>
                            </div>
                            <!-- <br> -->

                            <!-- ექსპორტი -->

                            <div class="row mt-3">
                                <div class="col-md-12">
                                    <label for="disabledTextInput" class="form-label qui">პროდუქციის გაგზავნის შესახებ ინფორმაცია</label>
                                    <select id="disabledSelect" disabled class="form-select select_man opt">
                                        <option class="opt" value="0" v-if="items.product_volume == '' && items.template_volume == ''">პროდუქცია ან ნიმუში არაა გაგზავნილი</option>
                                        <option class="opt" value="1" v-if="items.product_volume != ''">გაგზავნილია პროდუქცია</option>
                                        <option class="opt" value="2" v-else>გაგზავნილია ნიმუში</option>
                                    </select>
                                </div>
                            </div>

                            <!-- გაგზავინილია პროდუქცია -->

                            <div v-if="items.selected1 === '1'">
                                <div class="row mb-1 mt-3" v-if="items.product_volume != ''">
                                    <div class="col-md-6">
                                        <label for="product" class="form-label">გაგზავნილი პროდუქციის მოცულობა (მაგ: 100 - ცალი/კგ/ბოთლი...)</label>
                                        <input disabled type="text" id="product" class="form-control input_form" required v-model="items.product_volume">
                                    </div>
                                    <div class="col-md-6">
                                        <label for="cost" class="form-label">გაგზავნილი პროდუქციის ღირებულება ლარში</label>
                                        <input disabled type="number" id="cost" class="form-control input_form" required v-model="items.product_price">
                                    </div>
                                </div>

                                <!-- გაგზავინილია ნიმუში -->

                                <div class="row mb-1 mt-3" v-else>
                                    <div class="col-md-6">
                                        <label for="sample" class="form-label">გაგზავნილი ნიმუშის მოცულობა (მაგ: 100 -
                                            ცალი/კგ/ბოთლი...)</label>
                                        <input disabled type="text" id="sample" class="form-control input_form" required v-model="items.template_volume">
                                    </div>
                                    <div class="col-md-6">
                                        <label for="sampleCost" class="form-label">გაგზავნილი ნიმუშის ღირებულება ლარში</label>
                                        <input disabled type="number" id="sampleCost" class="form-control input_form" required v-model="items.template_price">
                                    </div>
                                </div>
                                

                                <!-- გაგზავინილია პროდუქცია -->

                                <div class="row mb-1 mt-3" v-if="selected1==1&&selected!=0">
                                    <div class="col-md-6">
                                        <label for="product" class="form-label">გაგზავნილი პროდუქციის მოცულობა  (მაგ: 100 - ცალი/კგ/ბოთლი...)</label>
                                        <input disabled type="text" id="product" class="form-control input_form">
                                    </div>
                                    <div class="col-md-6">
                                        <label for="cost" class="form-label">გაგზავნილი პროდუქციის ღირებულება ლარში</label>
                                        <input disabled type="number" id="cost" class="form-control input_form">
                                    </div>
                                </div>

                                <!-- გაგზავინილია ნიმუში -->

                                <div class="row mb-1  mt-3" v-if="selected1==2&&selected!=0">
                                    <div class="col-md-6">
                                        <label for="sample" class="form-label">გაგზავნილი ნიმუშის მოცულობა (მაგ: 100 - ცალი/კგ/ბოთლი...)</label>
                                        <input disabled type="text" id="sample" class="form-control input_form">
                                    </div>
                                    <div class="col-md-6">
                                        <label for="sampleCost" class="form-label">გაგზავნილი ნიმუშის ღირებულება ლარში</label>
                                        <input disabled type="number" id="sampleCost" class="form-control input_form">
                                    </div>
                                </div>
                            </div>
                        <!-- </div> -->
                    </div>
                </div>                
                <!-- ექსპორტი -->
                
                <!-- ახალი ბიზნეს კონტაქტის დამატება -->
                <div class="d-none" v-if="selected==1">
                    <div class="row mt-5  mb-3  justify-content-center">
                        <div class="col-md-8 col-6 border_man"></div>
                    </div>

                    <div class="row justify-content-center" >
                        <div class="col-md-1  col-12 d-flex justify-content-center">
                            <button type="button" class="btn btn-plus" tooltip-inner data-bs-toggle="tooltip" data-bs-custom-class="custom-tooltip" data-bs-placement="top" data-bs-title="ახალი ბიზნეს კონტაქტის დამატება">
                            <img class="plus" src="../../assets/img/icon/plus-circle.svg" alt="plus">
                            </button>
                        </div> 
                    </div>
                    
                    <div class="row mb-4 mt-3  justify-content-center">
                        <div class="col-md-8 col-6 border_man"></div>
                    </div>
                </div>

                <!-- რეკომენდაცია/დამატებითი ინფორმაცია -->

                <div class="row mt-5 mb-4 justify-content-center">
                    <div class="col-md-8 col-6 border_man"></div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        <label for="disabledTextInput" class="form-label">რეკომენდაცია საერთაშორისო გამოფენის შესახებ</label>
                        <textarea style="resize:none" disabled class="form-control" v-model="data.recomendation"></textarea>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-12 ">
                        <label for="disabledTextInput" class="form-label mt-3 qui">დამატებითი ინფორმაცია</label>
                        <textarea style="resize:none" disabled class="form-control" v-model="data.comment"></textarea>
                    </div>
                </div>


                <div class="row mt-5 justify-content-center">
                    <div class="col-md-8 col-6  border_man"></div>
                </div>

                <!-- გაგზავნის ღილაკი --> 

                <div class="row mb-5 mt-5 justify-content-between">
                    <div class="col-md-3  qui mb-2">
                        <div class="d-flex gap-2">
                            <div class="btn btn-warning btn-sm d-flex justify-content-between align-items-center d-md-block d-none" v-on:click="doanloadExcel()">
                                <img class="download_btn" src="../../assets/img/icon/download-solid.svg" alt="download excel"> Excel
                            </div>
                            <div class="btn btn-warning btn-sm d-flex justify-content-between align-items-center d-md-block d-none" v-on:click="doanloadPdf()">
                                <img class="download_btn" src="../../assets/img/icon/download-solid.svg" alt="download excel"> PDF
                            </div>
                        </div>
                    </div>
                    <div class="col-md-3  qui mb-2">
                        <button @click="back()" type="button" class=" btn btn-success w-100">უკან დაბრუნება</button>
                    </div>
                </div>
            </form>
        </div>
        <!-- <Footer/> -->
    </div>
</template>

<script>
  import Footer from '../../components/footer.vue'
  import navbar from '../../components/navbar.vue'
  import axios from 'axios'

  export default {
    data() {
      return {
        selected: '0',
        selected1: '0',
        exhibition : "",

        data : []
      }
    },
    components: {
        navbar,
        Footer,
    },

    methods : {
        back() {
            this.$router.back();
        },

        doanloadExcel() {
            window.open("https://survey.rda.gov.ge/api/detail/download/excel/" + this.$route.params.id + "/" + this.$route.params.exhibition_id);
        },

        doanloadPdf() {
            window.open("https://survey.rda.gov.ge/api/detail/download/pdf/" + this.$route.params.id + "/" + this.$route.params.exhibition_id);
        }
    },

    mounted() {
      const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
      const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

      const _this_ = this;

      axios.get("/detail/get/" + this.$route.params.id).then(function(response) {
        _this_.data = response.data;
      }).catch(function(err) {
        console.log(err);
      });

      axios.get("/exhibition/show/" + this.$route.params.exhibition_id, {
            headers : {
                "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
            }
        }).then(function(response) {
        _this_.exhibition = response.data.label;
      }).catch(function(err) {
        console.log(err);
      });
    }
  }
</script>

<style scoped>

h4 {
    color: #005019;   
}
.download_btn {
    width: 30px;
    height: 30px;
}
.btn-success {
    background-color: #005019 !important;
    height: 50px;
    font-size: 20px;
    font-family:'Regular';
}
.btn-warning{
    height: 50px;
    font-size: 20px;
    font-family:'Regular';
    /* color: #ffffff; */
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
}

@media screen and (max-width: 768px) {
    .additional {
        display: block !important;
    }

    .additional1 {
        width: 100% !important;
    }
}
</style>
