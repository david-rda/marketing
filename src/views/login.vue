<template>
  <div>
  
      <div class="container">
        <div class="row aling-items-center row_height">
          <div class="col-md-5 col-12 .col-lg-12 m-auto ">
            <center>    
              <img class="brand_img mb-2" src="../assets/img/RDA-Logo-Geo.55af0c58 (1).png" alt="brand">
            </center>    
            <div class="card">
              <form method="POST" @submit.prevent="signin()">
                <div class="row mt-5 mx-2">
                  <div class="col-md-4">
                    <h3 class="log_h">ავტორიზაცია</h3>
                  </div>
                </div>
                <div class="row mb-3 mt-4">
                  <div class="col-md-11 col-11 m-auto">
                    <label for="exampleInputEmail1" class="form-label"><b>ელ. ფოსტა</b></label>
                    <input type="email" v-model="email" class="form-control input_height inp_color" id="exampleInputEmail1" placeholder="ელ. ფოსტა">
                  </div>
                </div>
                <div class="row mb-4 mt-4">
                  <div class="col-md-11 col-11 m-auto">
                    <label for="exampleInputPassword1" class="form-label"><b>პაროლი</b></label>
                    <input type="password" v-model="password" class="form-control input_height inp_color" id="exampleInputPassword1" placeholder="პაროლი">
                  </div>
                </div>
                <div class="row mt-4 justify-content-end">
                  <div class="col-md-4 col-11 mx-4 mb-3">
                    <button type="submit" class="btn btn-success btn_login input_height w-100">
                      <b>შესვლა&nbsp;&nbsp;</b>
                      <span class="spinner spinner-border spinner-border-sm" v-if="loader"></span>
                    </button>
                  </div>
                </div>
              </form>
              <div v-if="this.error_messages" class="p-4">
                <div class="alert alert-danger mb-2" v-for="(item, index) in this.error_messages" :key="index">
                  <strong>{{ item[0] }}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- <img class="back_img" src="../assets/img/Asset.png" alt="logo"> -->
      </div>
  </div>
</template>

<script>
  import axios, { AxiosError } from 'axios'

  export default {
    data() {
      return {
        email : "",
        password : "",

        error_messages : "",

        loader : false
      }
    },

    mounted() {
      const userData = JSON.parse(window.localStorage.getItem("user"));
      const _this_ = this;

      if(userData != null) {
        _this_.$router.push("/dashboard");
      }
    },

    methods : {
      signin() {
        const _this_ = this;

        this.loader = true;

        axios.post("/signin", {
          email : this.email,
          password : this.password
        }).then(function(response) {
          window.localStorage.setItem("user", JSON.stringify(response.data));

          _this_.$router.push("/dashboard");

          _this_.loader = false;
        }).catch(function(err) {
          if(err instanceof AxiosError) {
            _this_.error_messages = err.response.data?.errors;
          }
          
          _this_.loader = false;
        });
      }
    }
  }
</script>
