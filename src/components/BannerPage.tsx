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
          <img width={"100%"} height={400} style={{ height: "600px", backgroundSize: "cover" }} src="https://dy7oszgl9a56g.cloudfront.net/wp-content/uploads/2020/04/09100810/100online-Banner-english.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img width={"100%"} height={400} style={{ height: "600px", backgroundSize: "cover" }} src="https://images.unsplash.com/photo-1542856391-010fb87dcfed?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img width={"100%"} height={400} style={{ height: "600px", backgroundSize: "cover" }} src="https://images.unsplash.com/photo-1542866530-1c8b35a57ca7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1856&q=80" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img width={"100%"} height={400} style={{ height: "600px", backgroundSize: "cover" }} src="https://images.unsplash.com/photo-1542891973-afee23ae9770?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default BannerPage