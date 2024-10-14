<template>
    <div>
        <navbar/>
        <div class="container" style="margin-top: 120px;">
            <div class="row justify-content-between">
                <div class="col-md-4 col-12">
                    <h4 class="main head mt-4"><span class="btn btn-secondary" @click="goBack">&larr;</span>&nbsp;&nbsp;ელ. ფოსტის დამატება</h4>
                    <div class="row">
                        <h4 class="main brand mt-3">{{ this.$route.params.label }}</h4>
                        <h6 class="main mt-1 ">მიაბით ელ. ფოსტის მისამართები</h6>
                    </div>

                    <form @submit.prevent="addEmails()" class=" form_bg" ref="sendForm">
                        <div class="row">
                            <div id="emailApp">
                                <div class="input-group mb-3">
                                    <input type="text" class="form-control input_form_add" v-model="newEmail">
                                </div>
                            </div>
                        </div>
                        <div class="form-group mb-3">
                            <input type="submit" value="შენახვა" class="btn btn-success btn_manual">
                        </div>

                        <div v-for="(item, index) in errors" :key="index" class="alert alert-danger">
                            <strong>{{ item[0] }}</strong>
                        </div>
                    </form>
                </div>
                <div class="col-md-5 col-12">
                    <ul class="list-group">
                        <li class="list-group-item d-flex justify-content-between align-items-center" v-for="(item, index) in added_emails" :key="index">
                            <span>
                                {{ item.email }}&nbsp;&nbsp;
                                <span class="badge bg-success user-select-none" v-tippy="{ content: 'ელ. ფოსტების გაგზავნის რაოდენობა' }">{{ item.email_send_count }}</span>
                            </span>
                            <button type="button" class="btn btn-danger" :data-email-id="item.id" :data-exhibition-id="item.exhibition_id" data-bs-toggle="modal" data-bs-target="#confirmationModal" @click="setId(item.id)">
                                <svg style="pointer-events: none" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                </svg>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="modal fade" id="confirmationModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">გთხოვთ დაადასტუროთ</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        ნამდვილად გსურთ წაშლა?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">არა</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="deleteEmails">კი</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import navbar from '../../components/navbar.vue'
    import axios, { AxiosError } from 'axios'

    export default {
        data() {
            return {
                newEmail: '',
                picked: new Date(),
                exhibition : "",

                options: [],

                errors : "",
                exhibition_id : "",
                email_id : "",

                added_emails : [],
            }
        },

        components: {
            navbar,
        },

        mounted() {
            const _this_ = this;

            axios.get("/exhibition/show/" + this.$route.params.id, {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                }
            }).then(function(response) {
                _this_.added_emails = response.data.emails;
            });
        },

        methods: {
            deleteEmails() {
                const _this_ = this;

                axios.get("/email/delete/" + this.email_id + "/" + this.exhibition_id, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                    }
                }).then(function(response) {
                    _this_.added_emails = response.data.data;
                }).catch(err => {
                    console.log(err);
                });
            },

            setId(id) {
                this.email_id = id;
                this.exhibition_id = this.$route.params.id;
            },

            goBack() {
                this.$router.back();
            },

            addEmails() {
                axios.post("/email/add/to", {
                    emails : this.newEmail,
                    exhibition_id : this.$route.params.id
                }, {
                    headers : {
                        "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                    }
                }).then(res => {
                    this.added_emails = res.data.emails;
                    this.newEmail = "";
                    this.errors = [];

                    this.$swal({
                        title : "ელ. ფოსტა დაემატა",
                        icon : "success",
                    });
                }).catch(err => {
                    if(err instanceof AxiosError) {
                        this.errors = err?.response?.data?.errors;
                    }
                });
            }
        }
    }
</script>

<style scoped>
.container {
    font-family: firago-regular;
}

.btn_delete {
    border: none !important;
    background-color: none !important;
}
.delete_icon {
    width: 30px !important;
    height: 30px !important;
}

</style>
