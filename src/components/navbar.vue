<template>
  <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top">
      <div class="container">
        <router-link to="/"><img src="../assets/img/RDA-Logo-Geo.55af0c58 (1).png" width="160" height="70" alt="logo"></router-link>
        <button class="navbar-toggler float-end" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-between" id="navbarTogglerDemo01">
          <ul class="navbar-nav m-start mb-2 mb-lg-0">  
            <li class="nav-item cool-link m-auto">
                <router-link class="nav-link" to="/exhibitions">
                <div class="nav-link active" aria-current="page">გამოფენები</div>
              </router-link>
            </li>        
            <li class="nav-item cool-link m-auto">
              <router-link class="nav-link" to="/conducted">
                <div class="nav-link active" aria-current="page">ჩატარებული</div>
              </router-link>
            </li>
            <!-- <li class="nav-item cool-link m-auto">
              <router-link class="nav-link" to="/sending">
                <div class="nav-link active" aria-current="page">გაგზავნა</div>
              </router-link>
            </li> -->
            <li class="nav-item m-auto cool-link">
              <router-link class="nav-link" to="/sent">
                <div class="nav-link active" aria-current="page" href="#">გაგზავნილი</div>
              </router-link>
            </li>
            <li class="nav-item cool-link m-auto">
<!--                <div class="nav-link" to="/govDocument">-->
<!--                  <div class="nav-link active cool-link" aria-current="page" href="#">დადგენილება</div>-->
<!--                </div>-->
              <!-- <div class="dropdown nav-link">
                <a class="nav-link active dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  დადგენილება
                </a>
                <ul class="dropdown-menu ">
                  <li><a class="dropdown-item" href="./src/assets/dadgenileba/dadgenileba202010aprili_1.pdf" download="dadgenileba202010aprili_1.pdf">დადგენილება 10.04.2020</a></li>
                  <li><a class="dropdown-item" href="./src/assets/dadgenileba/dadg.cvlileba2004.04.pdf" download="dadg.cvlileba2004.04.pdf">დადგენილების ცვლილება 04.04.2023</a></li>
                </ul>
              </div> -->
            </li>
          </ul>
          <form class="d-flex" role="button">
            <div class="dropdown m-auto">
                <button class="btn btn_user dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <!-- <img style="width: 25px" src="" alt=""> -->
                  <span v-if="user">&nbsp;&nbsp;{{ user.user.name }}</span>
                </button> 
                <ul class="dropdown-menu">
                    <li><a class="dropdown-item" href="#" @click="signout()">გამოსვლა</a></li>
                </ul>
            </div>
          </form>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
  import axios, { AxiosError } from "axios";

  export default {
    data() {
      return {
        user : JSON.parse(window.localStorage.getItem("user"))
      }
    },

    mounted() {
      const userData = JSON.parse(window.localStorage.getItem("user"));
      const _this_ = this;

      if(userData == null) {
        _this_.$router.push("/");
      }
    },

    methods : {
      signout() {
        const _this_ = this;

        axios.post("/signout").then(function(response) {
          if(response.data) {
            window.localStorage.clear();

            _this_.$router.push("/");
          }
        }).catch(function(err) {
          if(err instanceof AxiosError) {
            window.alert(err.response.data);
          }
        });
      }
    }
  }
</script>


<style scope>
  .navbar {
    background-color: #ffffff !important;
    font-family: firago-regular;
  }
  
  .dropdown-item:hover {
    background-color: #e8e8e8 !important;
  }
  .btn_user {
    border: none;
  }
</style>