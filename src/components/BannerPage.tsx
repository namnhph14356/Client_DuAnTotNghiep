import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, Parallax, EffectCoverflow, EffectFade } from 'swiper';
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/bundle";

const BannerPage = () => {
  return (
    <div>
      <Swiper
        // style={{
        //   // "--swiper-pagination-color": "#fff",
        // }}
        speed={1000}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        // effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}

        effect={"fade"}
        modules={[EffectCoverflow, EffectFade,Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img width={"100%"} style={{ height: "660px", backgroundSize: "cover" }} src="https://dy7oszgl9a56g.cloudfront.net/wp-content/uploads/2020/04/09100810/100online-Banner-english.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img width={"100%"} style={{ height: "660px", backgroundSize: "cover" }} src="https://img.freepik.com/free-vector/education-horizontal-typography-banner-set-with-learning-knowledge-symbols-flat-illustration_1284-29493.jpg?w=1380&t=st=1669396650~exp=1669397250~hmac=b622748b74f57e28f49793b733bccaac048b304c21f909484663ae449fe40138" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img width={"100%"} style={{ height: "660px", backgroundSize: "cover" }} src="https://img.freepik.com/free-vector/isometric-online-education-template-with-students-sitting-standing-books-globe-laptop-tablet-magnifier-certificate-graduation-cap-illustration_1284-51176.jpg?w=1480&t=st=1669396683~exp=1669397283~hmac=2b30e2b83e653278761759b8707cde1344f5b66a633f28b0fb1baeeab1c777d3" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img width={"100%"} style={{ height: "660px", backgroundSize: "cover" }} src="http://theme-stall.com/edupress/demos/wp-content/uploads/2016/10/demo.jpg" alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default BannerPage