<template>
    <div>
        <div class="container">
            <form @submit.prevent="" action="#" class=" mt-4 form_bg">
                <div class="row justify-content-md-between align-items-center">
                    <div class="col-md-2 col-12 text-center text-sm-start">
                        <img src="../../assets/img/RDA-Logo-Geo.55af0c58 (1).png" alt="icon" width="250">
                    </div>
                    <div class="col-md-10 col-12"> 
                        <h1 class="mt-5 mb-4 brand text-md-end text-sm-center ">მომხმარებლის მიერ შევსებული სააპლიკაციო ფორმა</h1>
                    </div>
                </div>
                <div class="row mt-4 mb-4 justify-content-center">
                    <div class="col-md-8 col-6 border_man"></div>
                </div>

                <!-- საკონტაქტო ინფორმაცია -->

                <div class="row">
                <div class="col-md-6">
                    <div class="mb-3">
                        <label  for="name" class="form-label">სახელი, გვარი</label>
                        <input disabled type="text" id="name" class="form-control input_form " v-model="data.name">
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
                        <select id="drop" v-model="selected" disabled class="form-select select_man opt">
                            <option class="opt" value="0">არ დაგვიმყარებია საქმიანი კავშირები</option>
                            <option class="opt" value="1">დავამყარეთ საქმიანი კავშირები</option>
                        </select>
                    </div>
                </div>

                <!-- საქმიანი კავშირი დამყარებულია -->

                <div class="row  mt-5" v-if="data.organizations">
                    <div class="row  mb-4  justify-content-center">
                    <div class="col-md-8 col-6 border_man"></div>
                </div>
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label for="activity" class="form-label">საქმიანობის სფერო</label>
                            <input disabled type="text" id="activity" class="form-control input_form ">
                        </div>
                        <div class="mb-3">
                            <label for="country" class="form-label">რომელ ქვეყანას წარმოადგენს</label>
                            <input disabled type="text" id="country" class="form-control input_form">
                        </div>
                    </div>     
                    <div class="col-md-6">
                        <div class="mb-3">
                            <label for="organization" class="form-label">ორგანიზაციის დასახელება</label>
                            <input disabled type="text" id="organization" class="form-control input_form ">
                        </div>
                        <div class="mb-3 mt-2">
                            <label for="export" class="form-label">ქვეყანა რომელშიც განხორციელდა ან იგეგმება ექსპორტი </label>
                            <input disabled type="text" id="export" class="form-control input_form">
                        </div>
                    </div>
                    <div class="row ">
                        <div class="col-md-12">
                            <label for="disabledTextInput" class="form-label">რა ეტაპზეა საქმიანი ურთიერთობა? </label>
                        <textarea disabled class="form-control" name="" id="" ></textarea>
                        </div>
                    </div>
                    
                <!-- ექსპორტი -->

                    <div class="row ">
                        <div class="col-md-12">
                            <label for="disabledTextInput" class="form-label qui mt-3">პროდუქციის გაგზავნის შესახებ ინფორმაცია</label>
                            <select id="disabledSelect" v-model="selected1" class="form-select select_man opt">
                                <option class="opt" value="0">არ გაგზავნილა პროდუქცია</option>
                                <option class="opt" value="1">გაგზავნილია პროდუქცია</option>
                                <option class="opt" value="2">გაგზავნილია ნიმუში</option>  
                            </select>
                        </div>
                    </div>

                <!-- გაგზავინილია პროდუქცია -->

                    <div class="row mb-1 mt-3" v-if="selected1==1&&selected!=0">
                        <div class="col-md-6">
                            <div class="">
                                <label for="product" class="form-label">გაგზავნილი პროდუქციის მოცულობა  (მაგ: 100 - ცალი/კგ/ბოთლი...)</label>
                                <input disabled type="text" id="product" class="form-control input_form">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="">
                                <label for="cost" class="form-label">გაგზავნილი პროდუქციის ღირებულება ლარში</label>
                                <input disabled type="number" id="cost" class="form-control input_form">
                            </div>
                        </div>
                    </div>

                <!-- გაგზავინილია ნიმუში -->

                    <div class="row mb-1  mt-3" v-if="selected1==2&&selected!=0">
                        <div class="col-md-6">
                            <div class="">
                                <label for="sample" class="form-label">გაგზავნილი ნიმუშის მოცულობა (მაგ: 100 - ცალი/კგ/ბოთლი...)</label>
                                <input disabled type="text" id="sample" class="form-control input_form">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="">
                                <label for="sampleCost" class="form-label">გაგზავნილი ნიმუშის ღირებულება ლარში</label>
                                <input disabled type="number" id="sampleCost" class="form-control input_form">
                            </div>
                        </div>
                    </div>
                </div>
                
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

                    <div class="row mt-5  mb-4  justify-content-center">
                        <div class="col-md-8 col-6 border_man"></div>
                    </div>
                <div class="row">
                    <div class="col-md-12">
                        <label for="disabledTextInput" class="form-label">რეკომენდაცია საერთაშორისო გამოფენის შესახებ</label>
                        <textarea disabled class="form-control" name="" id="" ></textarea>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-12 ">
                        <label for="disabledTextInput" class="form-label mt-3 qui">დამატებითი ინფორმაცია</label>
                        <textarea disabled class="form-control" name="" id="" ></textarea>
                    </div>
                </div>


                <div class="row mt-5 justify-content-center">
                    <div class="col-md-8 col-6  border_man"></div>
                </div>

                <!-- გაგზავნის ღილაკი --> 

                <div class="row mb-5 mt-5 justify-content-between">
                    <div class="col-md-3  qui mb-2">
                        <div class="btn btn-warning btn-sm  d-flex justify-content-between align-items-center d-md-block d-none"> <h6 class="m-0"></h6><img class="download_btn" src="../../assets/img/icon/download-solid.svg" alt="download excel"></div>
                    </div>
                    <div class="col-md-3  qui mb-2">
                        <input type="submit" class=" btn btn-success w-100 "  value="უკან დაბრუნება">
                    </div>
                </div>

            </form>
        </div>
                        <!-- <Footer/> -->
    </div>
</template>

<script>
  import Footer from '../../components/footer.vue'
  import axios from 'axios'

  export default {
    data() {
      return {
        selected: '0',
        selected1: '0',

        data : []
      }
    },
    components: {
      Footer,
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

</style>
