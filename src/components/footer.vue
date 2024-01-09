<template>
  <div>
   <footer>
    <div class="container-fluid">
      <div class="row footer_row justify-content-center">
        <div class="col-md-3 col-12 footer_brand_ d-flex gap-3">
          <img class="footer_icon" src="./../assets/img/icon/logo_footer.svg" alt="">
          <h1 class="footer_brand">სოფლის<br>განვითარების<br>სააგენტო</h1>
        </div>
        <div class="col-md-3 col-12">
          <ul>
            <li>
              <a href="tel:1501">
                <span><img class="footer_icon_col" src="./../assets/img/icon/phone-solid.svg" alt="number"></span> 1501
              </a>
            </li>
            <li>
              <a href="tel:+995322470101">
                <span><img class="footer_icon_col" src="./../assets/img/icon/phone-solid.svg" alt="nimber"></span> + (995 32) 2 47 01 01 (საერთაშორისო ზარებისთვის)
              </a>
            </li>
            <li>
              <a href="mailto:info@rda.gov.ge" title="info@rda.gov.ge">
                <span><img class="footer_icon_col" src="./../assets/img/icon/envelope-solid.svg" alt="email"></span> info@rda.gov.ge
              </a>
            </li>
            <li>
              <a href="https://www.google.com/maps/place/%E1%83%A1%E1%83%9D%E1%83%A4%E1%83%9A%E1%83%98%E1%83%A1+%E1%83%92%E1%83%90%E1%83%9C%E1%83%95%E1%83%98%E1%83%97%E1%83%90%E1%83%A0%E1%83%94%E1%83%91%E1%83%98%E1%83%A1+%E1%83%A1%E1%83%90%E1%83%90%E1%83%92%E1%83%94%E1%83%9C%E1%83%A2%E1%83%9D+(RDA)/@41.7695849,44.7778914,17z/data=!4m6!3m5!1s0x40446d0b018ce5bf:0x83cbe0ffe80fd0db!8m2!3d41.7685035!4d44.7761586!16s%2Fg%2F11j34mq4j9?entry=ttu" title="location">
                <span><img class="footer_icon_col" src="./../assets/img/icon/location-dot-solid.svg" alt="location"></span> სანდრო ახმეტელის 10ა, 0159 დიღომი, თბილისი
              </a>
            </li>
          </ul>
        </div>
        <div class="col-md-3 col-12 footer_brand_ d-md-block d-none  d-flex justify-content-center">
          <ul>
            <li>
              <a href="https://www.linkedin.com/company/rural-development-agency/?originalSubdomain=ge">
                <span><img class="footer_soc" src="./../assets/img/icon/linkedin.svg" alt="in"></span> Linkedin
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/rda.gov.ge">
                  <span><img class="footer_soc" src="./../assets/img/icon/facebook.svg" alt="fb"></span> Facebook
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/channel/UCultyl-yGIGph9SwqZhKFbw">
                <span><img class="footer_soc" src="./../assets/img/icon/youtube.svg" alt="yt"></span> Youtube
              </a>
            </li>
          </ul>
        </div>
        <div class="row mt-3 mb-4 d-flex justify-content-evenly d-md-none d-block">
              <div class="col-1">
                <a href="https://www.linkedin.com/company/rural-development-agency/?originalSubdomain=ge">
                  <img class="footer_soc" src="./../assets/img/icon/linkedin.svg" alt="in">
              </a>
              </div>
              <div class="col-1">
                <a href="https://www.facebook.com/rda.gov.ge">
                  <img class="footer_soc" src="./../assets/img/icon/facebook.svg" alt="fb"> 
              </a>
              </div>
              <div class="col-1">
                <a href="https://www.youtube.com/channel/UCultyl-yGIGph9SwqZhKFbw">
                <img class="footer_soc" src="./../assets/img/icon/youtube.svg" alt="yt">  
              </a>
            </div>
          </div>
      </div>
    </div>
   </footer>
  </div>
</template>

<style scoped>
  .container-fluid {
    background-color: #104f27 !important;
    /* height: 250px !important; */
  }
  .footer_row {
    /* height: 250px !important; */
    align-items: center;
  }
  .footer_icon {
    width: 69px;
    height: 71px;
    cursor: pointer;
  }
  .footer_brand {
    color: #82be00;
    font-family: 'firago-regular';
    font-size: 14px;
    line-height: 21px;
    vertical-align: center;
    justify-content: center;
    margin: 0;
    padding: 0;
    cursor: pointer;
  }
  .footer_brand_ {
    align-items: center;
    justify-content: center;
    font-family: 'firago-regular';
  }
  ul {
    text-decoration: none;
    list-style-type: none;
  }
  li {
    margin-top: 15px;
  }
  a {
    text-decoration: none;
    color: #ffffff;
    font-size: 16px;
    width: 50px;
  }
  .footer_soc {
    width: 25px;
  }
  @media only screen and (max-width: 768px) {
    .footer_row {
      padding: 20px;

    }
    ul {
      padding: 0;
    }
  }


</style>

<script>
</script>