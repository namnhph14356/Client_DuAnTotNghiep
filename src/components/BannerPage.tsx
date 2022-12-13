import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, Parallax, EffectCoverflow, EffectFade } from 'swiper';
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/bundle";
import '../css/banner.css';
import { Link, NavLink } from 'react-router-dom';

const BannerPage = () => {
  return (
    <div>
      <Swiper
        // style={{
        //   // "--swiper-pagination-color": "#fff",
        // }}
        speed={500}
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
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <section className="swiper-slide slide" style={{ backgroundImage: "url(https://res.cloudinary.com/chanh-thon/image/upload/v1670926803/home-slide-1_dkeweb.jpg)", backgroundRepeat: "no-repeat" }}>
            <div className="content-slide">
              <h3>Học tiếng anh một cách tốt nhất</h3>
              <p>Phương pháp học được tính toán khoa học, chặt chẽ, tạo động lực học tập và đo lường được tiến độ.</p>
              <NavLink className='btn cursor-pointer' to="/learning">Bắt đầu học</NavLink>
            </div>
          </section>
        </SwiperSlide>

        <SwiperSlide>
          <section className="swiper-slide slide" style={{ backgroundImage: "url(https://res.cloudinary.com/chanh-thon/image/upload/v1670926803/home-slide-2_lxo4jk.jpg)", backgroundRepeat: "no-repeat" }}>
            <div className="content-slide">
              <h3>Luyện phát âm xứ bản hoàn hảo</h3>
              <p>Luyện phát âm bản xứ theo phương pháp Đọc-Tách-Ghép-Âm độc quyền trên thế giới chỉ có tại Vian English.</p>
              <NavLink className='btn cursor-pointer' to="/learning">Bắt đầu học</NavLink>
            </div>
          </section>
        </SwiperSlide>

        <SwiperSlide>
          <section className="swiper-slide slide" style={{ backgroundImage: "url(https://res.cloudinary.com/chanh-thon/image/upload/v1670926803/home-slide-3_rjjowb.jpg)", backgroundRepeat: "no-repeat" }}>
            <div className="content-slide">
              <h3>Kiểm tra hàng ngày, tuần, tháng,...</h3>
              <p>Bài kiểm tra giúp bạn tự đánh giá được trình độ, đảm bảo chất lượng và tiến độ học tập hàng ngày, hàng tuần, hàng tháng và hàng quý.</p>
              <NavLink className='btn cursor-pointer' to="/learning">Bắt đầu học</NavLink>
            </div>
          </section>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default BannerPage