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
                  <div class="nav-link active">გამოფენების მართვა</div>
              </router-link>
            </li>        
            <li class="nav-item cool-link m-auto">
              <router-link class="nav-link" to="/conducted">
                <div class="nav-link active">ჩატარებული გამოფენები</div>
              </router-link>
            </li>
            <li class="nav-item m-auto cool-link">
              <router-link class="nav-link" to="/sent">
                <div class="nav-link active">გაგზავნილი</div>
              </router-link>
            </li>

            <li class="nav-item m-auto cool-link">
              <router-link class="nav-link" to="/massive/send">
                <div class="nav-link active p-2 bg-success text-white rounded">მასიური გაგზავნა</div>
              </router-link>
            </li>
          </ul>
          <form class="d-flex" role="button">
            <div class="dropdown m-auto">
                <button class="btn btn_user dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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

      if(userData == null || typeof JSON.parse(window.localStorage.getItem("user")).token == "undefined") {
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