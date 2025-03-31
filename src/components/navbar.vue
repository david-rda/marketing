<template>
    <nav class="navbar navbar-expand-lg bg-white p-0 fixed-top border-bottom">
        <div class="container">
            <router-link to="/" class="navbar-brand">
                <img src="@/assets/img/RDA-Logo-Geo.55af0c58 (1).png" width="160">
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-between" id="nav">
                <ul class="navbar-nav m-start mb-2 mb-lg-0">
                    <li class="nav-item m-auto">
                        <router-link class="nav-link active" to="/exhibitions">გამოფენების მართვა</router-link>
                    </li>
                    <li class="nav-item m-auto">
                        <router-link class="nav-link active" to="/conducted">ჩატარებული გამოფენები</router-link>
                    </li>
                    <li class="nav-item m-auto">
                        <router-link class="nav-link active" to="/sent">გაგზავნილი</router-link>
                    </li>
                    <li class="nav-item m-auto">
                        <router-link class="btn btn-success p-2 text-white rounded text-decoration-none" to="/massive/send">მასიური გაგზავნა</router-link>
                    </li>
                </ul>
                <div class="dropdown">
                    <button class="btn border-0 dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        <i class="fa fa-user-circle-o"></i><span v-if="user">&nbsp;&nbsp;{{ user.user.name }}</span>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#" @click="signout()"><i class="fa fa-sign-out me-2"></i>ამოსვლა</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
	import axios, { AxiosError } from "axios";

	export default {
		data() {
			return {
				user: JSON.parse(window.localStorage.getItem("user"))
			};
		},

		mounted() {
			const userData = JSON.parse(window.localStorage.getItem("user"));

			if (userData == null || typeof JSON.parse(window.localStorage.getItem("user")).token == "undefined") {
				this.$router.push("/");
			}
		},

		methods: {
			signout() {
				const _this_ = this;

				axios.post("/signout").then(function(response) {
					if (response.data) {
						window.localStorage.clear();
						_this_.$router.push("/");
					}
				}).catch(function(err) {
					if (err instanceof AxiosError) {
						window.alert(err.response.data);
					}
				});
			}
		}
	};
</script>

<style scope>
	.navbar {
		font-family: firago-regular;
	}
</style>