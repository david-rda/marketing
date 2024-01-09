<template>
    <div>
        <navbar/>
        <div class="container">
            <div class="row row_position justify-content-around">
                <div class="row p-0 align-items-center mb-5">
                    <div class="col-md-6 col-12 ">
                        <v-select v-model="selectedValue" :options="options" placeholder="აირჩიეთ გამოფენა"> </v-select>
                    </div>
                    <div class="col-md-6 col-12 text-center d-md-block d-none">
                        <h4 class="main">ჩატარებული გამოფენები</h4>
                    </div>
                </div>
            </div>
                <div class="d-md-block d-none">
                    <Line/>
                        <div class="row justify-content-center mt-2 mb-2 align-items-center ">
                                <div class="col-md-3 mx-4">
                                    <div class="btn btn-warning btn-sm  d-flex justify-content-between"> <h6 class="m-0">გადმოწერა</h6><img src="../../assets/img/icon/download-solid.svg" alt="download excel"></div>
                                </div>
                        </div>
                    <Line/>
                </div>    
            <div class="row mt-4 ">
                <div class="col-md-12">
                    <div class="overflow-auto">
                    <table class="table table-hover border">
                    <thead class="text-center">
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">სახელი, გვარი</th>
                        <th scope="col">ელ. ფოსტა</th>
                        <th scope="col">ორგანიზაცია</th>
                        <th scope="col">ქმედება</th>
                        </tr>
                    </thead>
                    <tbody class="text-center">
                        <tr>
                            <td>1</td>
                            <td>გიგი დოლმაზაშვილი</td>
                            <td>gigi@gmail.com</td>
                            <td>RDA</td>
                            <td><div class="btn btn-success btn-sm">დათვალიერება</div></td>
                        </tr>
                        <tr>
                            <td>1</td>
                            <td>გიგი დოლმაზაშვილი</td>
                            <td>gigi@gmail.com</td>
                            <td>RDA</td>
                            <td><div class="btn btn-success btn-sm">დათვალიერება</div></td>
                        </tr><tr>
                            <td>1</td>
                            <td>გიგი დოლმაზაშვილი</td>
                            <td>gigi@gmail.com</td>
                            <td>RDA</td>
                            <td><div class="btn btn-success btn-sm">დათვალიერება</div></td>
                        </tr><tr>
                            <td>1</td>
                            <td>გიგი დოლმაზაშვილი</td>
                            <td>gigi@gmail.com</td>
                            <td>RDA</td>
                            <td><div class="btn btn-success btn-sm">დათვალიერება</div></td>
                        </tr><tr>
                            <td>1</td>
                            <td>გიგი დოლმაზაშვილი</td>
                            <td>gigi@gmail.com</td>
                            <td>RDA</td>
                            <td><div class="btn btn-success btn-sm">დათვალიერება</div></td>
                        </tr><tr>
                            <td>1</td>
                            <td>გიგი დოლმაზაშვილი</td>
                            <td>gigi@gmail.com</td>
                            <td>RDA</td>
                            <td><div class="btn btn-success btn-sm">დათვალიერება</div></td>
                        </tr><tr>
                            <td>1</td>
                            <td>გიგი დოლმაზაშვილი</td>
                            <td>gigi@gmail.com</td>
                            <td>RDA</td>
                            <td><div class="btn btn-success btn-sm">დათვალიერება</div></td>
                        </tr><tr>
                            <td>1</td>
                            <td>გიგი დოლმაზაშვილი</td>
                            <td>gigi@gmail.com</td>
                            <td>RDA</td>
                            <td><div class="btn btn-success btn-sm">დათვალიერება</div></td>
                        </tr><tr>
                            <td>1</td>
                            <td>გიგი დოლმაზაშვილი</td>
                            <td>gigi@gmail.com</td>
                            <td>RDA</td>
                            <td><div class="btn btn-success btn-sm">დათვალიერება</div></td>
                        </tr><tr>
                            <td>1</td>
                            <td>გიგი დოლმაზაშვილი</td>
                            <td>gigi@gmail.com</td>
                            <td>RDA</td>
                            <td><div class="btn btn-success btn-sm">დათვალიერება</div></td>
                        </tr><tr>
                            <td>1</td>
                            <td>გიგი დოლმაზაშვილი</td>
                            <td>gigi@gmail.com</td>
                            <td>RDA</td>
                            <td><div class="btn btn-success btn-sm">დათვალიერება</div></td>
                        </tr><tr>
                            <td>1</td>
                            <td>გიგი დოლმაზაშვილი</td>
                            <td>gigi@gmail.com</td>
                            <td>RDA</td>
                            <td><div class="btn btn-success btn-sm">დათვალიერება</div></td>
                        </tr>
                    </tbody>
                    </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
   import navbar from '../../components/navbar.vue'
   import vSelect from "vue-select"
   import "vue-select/dist/vue-select.css"
   import Line from '../../components/line.vue'

   export default {
    components: {
        navbar,
        vSelect,
        Line
    },
    data() {
    return {
      selectedValue: null,
      options: [
        { value: 'option1', label: 'ჩატარებული გამოფენა 1' },
        { value: 'option2', label: 'ჩატარებული გამოფენა 2' },
        { value: 'option3', label: 'ჩატარებული გამოფენა 3' },
        { value: 'option4', label: 'ჩატარებული გამოფენა 4' },
        { value: 'option5', label: 'ჩატარებული გამოფენა 5' },
        { value: 'option6', label: 'ჩატარებული გამოფენა 6' },
        { value: 'option7', label: 'ჩატარებული გამოფენა 7' },
        { value: 'option8', label: 'ჩატარებული გამოფენა 8' },
        { value: 'option9', label: 'ჩატარებული გამოფენა 9' },
        { value: 'option10', label: 'ჩატარებული გამოფენა 10' },
        { value: 'option11', label: 'ჩატარებული გამოფენა 11' },
        { value: 'option12', label: 'ჩატარებული გამოფენა 12' },
        { value: 'option13', label: 'ჩატარებული გამოფენა 13' },
        { value: 'option14', label: 'ჩატარებული გამოფენა 14' },
        { value: 'option15', label: 'ჩატარებული გამოფენა 15' },
        // Add more options as needed
      ],
    };
  },
   }
   
</script>
<style scoped>
    .container{
        font-family: firago-regular;
    }
    .main {
        font-weight: 500;
    }
   
</style>
