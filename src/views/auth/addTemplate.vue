<template>
    <div>
        <navbar />

        <div class="container" style="margin-top: 120px">
            <div class="row">
                <div class="col-md-8">
                    <form @submit.prevent="addTemplate()">
                        <div class="justify-content-center card mb-3 p-3">
                            <h4 class="head mt-4 fw-bold">{{ $route.params.label }}</h4>
                            <div class="col-md-12">
                                <div class="row justify-content-between align-items-center">
                                    <div class="col-md-3 mb-3">
                                        <label class="form-label" for="datetime-picker">გაგზავნის თარიღი</label>
                                        <flat-pickr id="datetime-picker" class="form-control input_form_add" v-model="datetime" :config="flatpickrOptions"></flat-pickr>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="form-label" for="subject">ელ. ფოსტის თემა</label>
                                    <input type="text" placeholder="ელ. ფოსტის თემა" id="subject" v-model="subject" class="form-control">
                                </div>

                                <label for="disabledTextInput" class="form-label mt-3 qui">გთხოვთ აკრიფოთ გასაგზავნი ტექსტი</label>
                                <QuillEditor theme="snow" style="height: 200px" ref="text" v-model:content="text" contentType="html" />
                            </div>
                        </div>
                        <input type="submit" class="btn btn-success w-100 mb-4" :disabled="disabled" value="შენახვა">
                    </form>

                    <div class="alert alert-danger" v-for="(item, index) in errors" :key="index">
                        <strong>{{ item[0] }}</strong>
                    </div>
                </div>
                <div class="col-md-4">
                    <div id="emailApp" class="card">
                        <div class="card-header">
                            <h5 class="card-title">ადრესატები</h5>
                        </div>
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center mb-3" style="font-size: 14px" v-for="(item, index) in emails" :key="index">
                                <span>{{ item.email }}</span>
                                <button type="button" class="btn btn-success ms-1 btn-sm" @click="sendReminder($event, item.email)">
                                    <i class="fa fa-send-o pe-none"></i>
                                    <span class="ms-1 pe-none">შეხსენება</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import navbar from '../../components/navbar.vue'
  import { QuillEditor } from '@vueup/vue-quill'
  import FlatPickr from 'vue-flatpickr-component';
  import axios, { AxiosError } from 'axios';

  export default {
    components: {
      navbar,
      QuillEditor,
      FlatPickr,
    },
    
    data() {
      return {
        datetime: new Date(),
        text : "",

        errors : [],
        emails : [],

        subject : "",

        flatpickrOptions: {
            enableTime: false,
            dateFormat: 'Y-m-d',
        },

        disabled : false,
      }
    },

    mounted() {
        const _this_ = this;

        axios.get("/exhibition/show/" + this.$route.params.id, {
            headers : {
                "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
            }
        }).then(function(response) {
            _this_.emails = response.data.emails;
        });
    },

    methods : {
        addTemplate() {
            this.disabled = true;

            axios.post("/template/add", {
                datetime : this.datetime,
                text : this.$refs.text.getContents(),
                exhibition_id : this.$route.params.id,
                subject : this.subject,
                status : 2
            }, {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                }
            }).then(response => {
                this.$swal({
                    title : "თქვენი მოთხოვნა წარმატებით შესრულდა",
                    icon : "success",
                });

                this.errors = [];
                this.disabled = false;

                setTimeout(() => {
                    this.$router.back()
                }, 2000);
            }).catch(err => {
                if(err instanceof AxiosError) {
                    this.errors = err?.response?.data?.errors;
                }

                this.disabled = false;
            });
        },

        sendReminder(event, email) {
            const _this_ = this;

            event.target.setAttribute("disabled", "true");

            axios.post("/schedule/reminder", {
                exhibition_id : this.$route.params.id,
                target_email : email
            }, {
                headers : {
                    "Authorization" : "Bearer " + JSON.parse(window.localStorage.getItem("user")).token
                }
            }).then(function(response) {
                _this_.$swal({
                    title : response.data.success,
                    icon : "success",
                });
                event.target.removeAttribute("disabled");
            }).catch(function(err) {
                if(err instanceof AxiosError) {
                    _this_.$swal({
                        title : err?.response?.data?.errors?.error[0],
                        icon : "warning",
                    });
                }
                event.target.removeAttribute("disabled");
            });
        }
    }
}
</script>


<style scoped>
    .container{
        font-family: firago-regular;
    }
</style>