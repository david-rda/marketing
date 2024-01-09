<template>
  <div>
  
      <div class="container">
        <div class="row aling-items-center row_height">
          <div class="col-md-5 col-12 .col-lg-12 m-auto ">
            <center>    
              <img class="brand_img mb-2" src="../assets/img/RDA-Logo-Geo.55af0c58 (1).png" alt="brand">
            </center>    
            <div class="card">
              <form>
                <div class="row mt-5 mx-2">
                  <div class="col-md-4">
                    <h3 class="log_h">ავტორიზაცია</h3>
                  </div>
                </div>
                <div class="row mb-3 mt-4">
                  <div class="col-md-11 col-11 m-auto">
                    <label for="exampleInputEmail1" class="form-label"><b>ელ. ფოსტა</b></label>
                    <input type="email" class="form-control input_height inp_color" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="ელ. ფოსტა">
                  </div>
                </div>
                <div class="row mb-4 mt-4">
                  <div class="col-md-11 col-11 m-auto">
                    <label for="exampleInputPassword1" class="form-label"><b>პაროლი</b></label>
                    <input type="password" class="form-control input_height inp_color" id="exampleInputPassword1" placeholder="პაროლი">
                  </div>
                </div>
                <div class="row mt-4 justify-content-end">
                  <div class="col-md-4 col-11 mx-4 mb-5">
                    <button on-click="/dashboard" type="submit" class="btn btn-success btn_login input_height  w-100"><b>შესვლა</b></button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <img class="back_img" src="../assets/img/Asset.png" alt="logo">
      </div>
  </div>
</template>

<script>
  

</script>
