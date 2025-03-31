<template>
	<div>
		<footer>
			<div class="container-fluid p-3">
				<div class="row align-items-center justify-content-center">
					<div class="col-md-3 col-12 justify-content-center align-items-center d-flex gap-3">
						<img class="footer_icon" src="./../assets/img/icon/logo_footer.svg">
						<h1 class="footer_brand m-0">სოფლის<br>განვითარების<br>სააგენტო</h1>
					</div>
					<div class="col-md-3 col-12">
						<ul class="list-unstyled text-decoration-none">
							<li>
								<a class="text-white text-decoration-none" href="tel:1501">
									<i class="fa fa-phone"></i>
									<span>&nbsp;1501</span>
								</a>
							</li>
							<li>
								<a class="text-white text-decoration-none" href="tel:+995322470101">
									<i class="fa fa-phone"></i>
									<span>&nbsp;+ (995 32) 2 47 01 01 (საერთაშორისო ზარებისთვის)</span>
								</a>
							</li>
							<li>
								<a class="text-white text-decoration-none" href="mailto:info@rda.gov.ge" title="info@rda.gov.ge">
									<i class="fa fa-envelope"></i>
									<span>&nbsp;info@rda.gov.ge</span>
								</a>
							</li>
							<li>
								<a class="text-white text-decoration-none" href="https://www.google.com/maps/place/%E1%83%A1%E1%83%9D%E1%83%A4%E1%83%9A%E1%83%98%E1%83%A1+%E1%83%92%E1%83%90%E1%83%9C%E1%83%95%E1%83%98%E1%83%97%E1%83%90%E1%83%A0%E1%83%94%E1%83%91%E1%83%98%E1%83%A1+%E1%83%A1%E1%83%90%E1%83%90%E1%83%92%E1%83%94%E1%83%9C%E1%83%A2%E1%83%9D+(RDA)/@41.7695849,44.7778914,17z/" title="location">
									<i class="fa fa-map-marker"></i>
									<span>&nbsp;სანდრო ახმეტელის 10ა, 0159 დიღომი, თბილისი</span>
								</a>
							</li>
						</ul>
					</div>
					<div class="col-md-3 col-12 justify-content-center align-items-center d-md-block d-none d-flex justify-content-center">
						<ul class="list-unstyled text-decoration-none">
							<li>
								<a class="text-white text-decoration-none" href="https://www.linkedin.com/company/rural-development-agency/?originalSubdomain=ge">
									<i class="fa fa-linkedin"></i> <span>Linkedin</span>
								</a>
							</li>
							<li>
								<a class="text-white text-decoration-none" href="https://www.facebook.com/rda.gov.ge">
									<i class="fa fa-facebook-official"></i> <span>Facebook</span>
								</a>
							</li>
							<li>
								<a class="text-white text-decoration-none" href="https://www.youtube.com/channel/UCultyl-yGIGph9SwqZhKFbw">
									<i class="fa fa-youtube"></i> <span>Youtube</span>
								</a>
							</li>
						</ul>
					</div>
					<div class="row mt-3 mb-4 d-flex justify-content-evenly d-md-none d-block">
						<div class="col-1">
							<a class="text-white text-decoration-none" href="https://www.linkedin.com/company/rural-development-agency/?originalSubdomain=ge"><i class="fa fa-linkedin"></i></a>
						</div>
						<div class="col-1">
							<a class="text-white text-decoration-none" href="https://www.facebook.com/rda.gov.ge"><i class="fa fa-facebook-official"></i></a>
						</div>
						<div class="col-1">
							<a class="text-white text-decoration-none" href="https://www.youtube.com/channel/UCultyl-yGIGph9SwqZhKFbw"><i class="fa fa-youtube"></i></a>
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
	}
	
	.footer_icon {
		width: 69px;
		height: 71px;
	}

	.footer_brand {
		color: #82be00;
		font-size: 14px;
		line-height: 21px;
	}

	li {
		margin-top: 15px;
	}

	a {
		font-size: 16px;
		width: 50px;
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
