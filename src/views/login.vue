<template>
    <div class="container">
        <div class="row align-items-center justify-content-center vh-100">
            <div class="col-lg-6 col-md-8 col-12">
                <center>
                    <img class="mb-3" src="../assets/img/RDA-Logo-Geo.55af0c58 (1).png" alt="brand" style="max-width: 200px;">
                </center>
                <div class="card p-4">
                    <form @submit.prevent="signin">
                        <div class="col-md-4 mb-3">
                            <h3 class="log_h">ავტორიზაცია</h3>
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label"><b>ელ. ფოსტა</b></label>
                            <input type="email" v-model="email" class="form-control" id="email" placeholder="ელ. ფოსტა">
                        </div>
                        <div class="mb-4">
                            <label for="password" class="form-label"><b>პაროლი</b></label>
                            <input type="password" v-model="password" class="form-control" id="password" placeholder="პაროლი">
                        </div>
                        <button type="submit" class="btn btn-success w-100" :disabled="loader">
                            <span v-if="loader" class="spinner-border spinner-border-sm me-2"></span>
                            <b>შესვლა</b>
                        </button>
                    </form>
                    <div v-if="error_messages" class="mt-3">
                        <div class="alert alert-danger" v-for="(item, index) in error_messages" :key="index">
                            <strong>{{ item[0] }}</strong>
                        </div>
                    </div>
                    <div v-if="incorrect" class="mt-3">
                        <div class="alert alert-danger">
                            <strong>ელ. ფოსტა ან პაროლი არასწორია</strong>
                        </div>
                    </div>
                </div>
            </div>
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
        incorrect : "",

        error_messages : "",

        loader : false
      }
    },

    mounted() {
      const userData = JSON.parse(window.localStorage.getItem("user"));
      const _this_ = this;

      if(userData != null) {
        _this_.$router.push("/exhibitions");
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

          _this_.$router.push("/exhibitions");

          _this_.loader = false;
        }).catch(function(err) {
          if(err instanceof AxiosError) {
            _this_.error_messages = err.response.data?.errors;

            if(err.response.data?.error) {
              _this_.incorrect = true;
            }
          }
          
          _this_.loader = false;
        });
      }
    }
  }
</script>

<style scoped>
    input {
        font-family: 'firago-regular';
    }
</style>