import React from "react";
import { useNavigate } from "react-router-dom";
import BannerPage from "../components/BannerPage";
import Message from "../components/Message";

// import Count from '../features/count/Count'
// import Product from '../features/product/Product'
import "./../css/home.css";

const Home = () => {
  const navigate = useNavigate();
  const startLearning = () => {
    const existUser = localStorage.getItem("user")
      ? localStorage.getItem("user")
      : "";
    //    console.log(localStorage.getItem("user"));

    if (!existUser) {
      navigate("/login");
    } else {
      navigate("/learning");
    }
  };
  return (
    <div>
      <BannerPage />
      {/* START: section */}
      
      
      <section className="our-product">
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-md-offset-2 section-heading mb50 text-center probootstrap-animate pt-8 mb-8">
              <h2 className="text-xl text-white">Nhiều lợi ích hơn</h2>
              <p className="lead text-white">
                Trong khi bạn đang nghĩ mình nên học tiếng Anh ở đâu hay mình
                nên đăng ký khóa học nào thì bạn cũng muốn...{" "}
              </p>
            </div>
          </div>
          <div className=" grid grid-cols-3 gap-4 pt-8 pb-8">
            <div className=" probootstrap-animate">
              <h3 className="heading-with-icon">
                <i className="icon-heart2" />{" "}
                <span className="text-white text-lg">
                Tạo sự chủ động
                </span>
              </h3>
              <p>
              Học trực tuyến đồng nghĩa với việc phải tự học, tự khai thác thông tin kiến thức. Với những trẻ yêu thích tiếng Anh, sự say mê tìm tòi sẽ kích thích bé sáng tạo và chủ động tiếp nhận các kiến thức.
              </p>
            </div>
            <div className=" probootstrap-animate ">
              <h3 className="heading-with-icon">
                <i className="icon-rocket" />{" "}
                <span className="text-white text-lg">Bài tập, đề kiểm tra, tài liệu chọn lọc</span>
              </h3>
              <p>
              Các bài tập của khóa tiếng Anh 360 trực tuyến luôn được chọn lọc kỹ trước khi ra mắt đảm bảo theo trình độ
               và nhu cầu mong muốn của người học. Bên cạnh đó là hệ thống ngân hàng bài kiểm
                tra, bài thi đa dạng, cho phép các em trau dồi kiến thức liên tục.
              </p>
            </div>
            <div className=" probootstrap-animate">
              <h3 className="heading-with-icon">
                <i className="icon-image" />{" "}
                <span className="text-white text-lg">Chi phí phù hợp</span>
              </h3>
              <p>
                Chỉ với 360.000 đ bạn đã có thể đăng ký được khóa học Online của 360 VianEnglish
                gồm rất nhiều bài học đa dạng cho bạn thỏa sức lựa chọn mà không sợ chán. Đặc biệt là các
                bài thi sau mỗi tuần giúp bạn có thể kiểm tra lại kiến thức.
              </p>
            </div>


            <div className=" probootstrap-animate">
              <h3 className="heading-with-icon">
                <i className="icon-briefcase" />
                <span className="text-white text-lg">Có thể theo dõi quá trình học</span>
              </h3>
              <p>
              Với khóa học 360 của chúng tôi, phụ huynh, học sinh có thể đăng nhập vào tài khoản để theo dõi quá trình học tập
               của con thông qua việc giao bài tập, tự động chấm điểm và đọc báo 
               cáo kết quả bài làm mà có sự điều chỉnh, động viên, tác động phù hợp.
              </p>
            </div>
            <div className=" probootstrap-animate">
              <h3 className="heading-with-icon">
                <i className="icon-chat" />{" "}
                <span className="text-white text-lg">Kiểm tra hàng tuần</span>
              </h3>
              <p>
                Mỗi tuần bạn sẽ có một bài kiểm tra để ôn lại hết những kiến thức đã học trong một tuần, với đa dạng các câu hỏi, kiến thức trong tuần đó
              </p>
            </div>
            <div className=" probootstrap-animate">
              <h3 className="heading-with-icon">
                <i className="icon-colours" />{" "}
                <span className="text-white text-lg">Học mãi không chán</span>
              </h3>
              <p>
                Với vô vàn bài tập, bài học cùng những các dạng bài khác nhau, hiệu ứng đa dạng giúp học sinh có được sự thích thú, lôi cuốn.
              </p>
            </div>
            
            <div className="clearfix visible-sm-block" />
          </div>
        </div>
      </section>
      {/* END: section */}

      <div>
        {/* START: section */}
        <section className="probootstrap-section probootstrap-section-extra last grid grid-cols-2 mt-8">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-md-5 section-heading probootstrap-animate ml-8">
                <h2 className="text-lg">
                  Lợi Ích Khi Học Tiếng Anh Tại VianEnglish
                </h2>

                <blockquote className="probootstrap-quote">
                  <p className="text-black">
                    “ VianEnglish là website học tiếng Anh giao tiếp online cung
                    cấp rất nhiều tài liệu tự học tiếng Anh trực tuyến hoàn toàn
                    miễn phí, giúp bạn nâng cao vốn tiếng Anh của mình. Nguồn
                    tài liệu tự học tiếng Anh online bao gồm video, các ứng dụng
                    dành cho điện thoại di động, bài luyện nghe và các bài tập
                    ngữ pháp.”
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
          <div className="container-fluid probootstrap-absolute">
            <div className="row">
              <div
                className="col-md-7 col-md-push-6 probootstrap-animate"
                data-animate-effect="fadeInRight"
              >
                <img
                  src="https://megastudy.edu.vn/upload/tinymce/banner.png"
                  alt="Free Bootstrap Template by uicookies.com"
                  width={"100%"}
                  className="img-responsive"
                />
              </div>
            </div>
          </div>
        </section>
        {/* END: section */}
        {/* START: section */}
        <section className="probootstrap-section probootstrap-section-extra grid grid-cols-2">
          <div className="container-fluid probootstrap-absolute mt-[50px]">
            <div className="row">
              <div
                className="col-md-8 col-md-pull-2 probootstrap-animate"
                data-animate-effect="fadeInLeft"
              >
                <img
                  w-full
                  src="https://wallstreetenglish.edu.vn/wp-content/uploads/2021/06/Img1869-1024x683-1-768x512.jpg"
                  width={"100%"}
                  alt=""
                  className="img-responsive"
                />
              </div>
            </div>
          </div>
          <div className="container ">
            <div className="row ">
              <div className="col-lg-5 col-md-5 col-md-push-6 section-heading probootstrap-animate ml-8">
                <h2 className="text-lg">Giao Tiếp Hiệu Quả</h2>
                <blockquote className="probootstrap-quote">
                  <p className="text-black">
                    “ Miễn phí học thử và kiểm tra trình độ. Cùng VianEnglish
                    chinh phục tiếng Anh,nói tiếng Anh cũng sẽ giúp bạn gặp gỡ
                    rất nhiều người nước ngoài và từ đó kết bạn với họ, trở nên
                    cởi mở hơn trong các mối quan hệ xã hội ,nói tiếng Anh cũng
                    sẽ giúp bạn gặp gỡ rất nhiều người nước ngoài và từ đó kết
                    bạn với họ, trở nên cởi mở hơn trong các mối quan hệ xã
                    hội.”
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* teacher  */}
      <section className="box__teacher">
        <h2 className="title__lecturers mt-8 mb-8">Giảng Viên Của Vogue</h2>
        <div className="list__teacher">
          <div className="item__teacher">
            <div className="">
              <img
                className="img__teacher"
                src="https://i.pinimg.com/564x/40/13/74/4013749a8693c2ac0e3a8a3326a99240.jpg"
                alt=""
              />
            </div>
            <h3 className="name__teacher">Bùi Hồng Hạnh</h3>
            <p>Thạc sỹ Giáo Dục & Quản Trị Kinh Doanh từ Đại Học StanFord</p>
          </div>
          <div className="item__teacher">
            <div className="">
              <img
                className="img__teacher"
                src="https://i.pinimg.com/564x/58/44/1a/58441a96ff4480dbae3779ec75ef87a4.jpg"
                alt=""
              />
            </div>
            <h3 className="name__teacher">Bùi Hồng Hạnh</h3>
            <p>Thạc sỹ Giáo Dục & Quản Trị Kinh Doanh từ Đại Học StanFord</p>
          </div>
          <div className="item__teacher">
            <div className="">
              <img
                className="img__teacher"
                src="https://i.pinimg.com/564x/cb/72/2c/cb722cc4a9a425e604c911957f9b2f93.jpg"
                alt=""
              />
            </div>
            <h3 className="name__teacher">Bùi Hồng Hạnh</h3>
            <p>Thạc sỹ Giáo Dục & Quản Trị Kinh Doanh từ Đại Học StanFord</p>
          </div>
        </div>
      </section>

      {/* buy course  */}

      <section className="box__main__course">
        <h2 className="title__course__main">ĐĂNG KÝ KHÓA HỌC</h2>
        <div className="distance__course">
          <div className="box__course">
            <h2 className="title__course__sale">GÓI ƯU ĐÃI NHẤT</h2>
            <p className="title__course">GÓI VOGUE PRO TRỌN ĐỜI</p>
            <p className="price__course__old">2,435,500 vnd</p>
            <p className="price__course">1,435,500 vnd</p>
            <ul className="nav__info__course">
              <li>
                {" "}
                <i className="fa-solid fa-circle-check"></i>Nội dung bài học cập
                nhật liên tục
              </li>
              <li>
                {" "}
                <i className="fa-solid fa-circle-check"></i>Nội dung bài học cập
                nhật liên tục
              </li>
              <li>
                {" "}
                <i className="fa-solid fa-circle-check"></i>Nội dung bài học cập
                nhật liên tục
              </li>
              <li>
                {" "}
                <i className="fa-solid fa-circle-check"></i>Nội dung bài học cập
                nhật liên tục
              </li>
            </ul>
            <button className="btn__buy__course">Mua ngay</button>
            <div className="price__sale-off__course">
              <span>Giảm</span>
              <span> 30%</span>
            </div>
          </div>
          <div className="box__course item__sale__year">
            <p className="title__course">GÓI VOGUE PRO 1 NĂM</p>
            <p className="price__course__old">2,435,500 vnd</p>
            <p className="price__course">1,435,500 vnd</p>
            <ul className="nav__info__course">
              <li>
                {" "}
                <i className="fa-solid fa-circle-check"></i>Nội dung bài học cập
                nhật liên tục
              </li>
              <li>
                {" "}
                <i className="fa-solid fa-circle-check"></i>Nội dung bài học cập
                nhật liên tục
              </li>
              <li>
                {" "}
                <i className="fa-solid fa-circle-check"></i>Nội dung bài học cập
                nhật liên tục
              </li>
              <li>
                {" "}
                <i className="fa-solid fa-circle-check"></i>Nội dung bài học cập
                nhật liên tục
              </li>
            </ul>
            <button className="btn__buy__course">Mua ngay</button>
            <div className="price__sale__year">
              <span>Giảm</span>
              <span> 20%</span>
            </div>
          </div>
          <div className="box__course item__sale__year">
            <p className="title__course">GÓI VOGUE PRO 6 THÁNG</p>
            <p className="price__course__old">2,435,500 vnd</p>
            <p className="price__course">1,435,500 vnd</p>
            <ul className="nav__info__course">
              <li>
                {" "}
                <i className="fa-solid fa-circle-check"></i>Nội dung bài học cập
                nhật liên tục
              </li>
              <li>
                {" "}
                <i className="fa-solid fa-circle-check"></i>Nội dung bài học cập
                nhật liên tục
              </li>
              <li>
                {" "}
                <i className="fa-solid fa-circle-check"></i>Nội dung bài học cập
                nhật liên tục
              </li>
              <li>
                {" "}
                <i className="fa-solid fa-circle-check"></i>Nội dung bài học cập
                nhật liên tục
              </li>
            </ul>
            <button className="btn__buy__course">Mua ngay</button>
            <div className="price__sale__year">
              <span>Giảm</span>
              <span> 10%</span>
            </div>
          </div>
          <div className="box__course item__sale__year">
            <p className="title__course">GÓI VOGUE PRO 3 THÁNG</p>
            <p className="price__course__old">2,435,500 vnd</p>
            <p className="price__course">1,435,500 vnd</p>
            <ul className="nav__info__course">
              <li>
                {" "}
                <i className="fa-solid fa-circle-check"></i>Nội dung bài học cập
                nhật liên tục
              </li>
              <li>
                {" "}
                <i className="fa-solid fa-circle-check"></i>Nội dung bài học cập
                nhật liên tục
              </li>
              <li>
                {" "}
                <i className="fa-solid fa-circle-check"></i>Nội dung bài học cập
                nhật liên tục
              </li>
              <li>
                {" "}
                <i className="fa-solid fa-circle-check"></i>Nội dung bài học cập
                nhật liên tục
              </li>
            </ul>
            <button className="btn__buy__course">Mua ngay</button>
            <div className="price__sale__year">
              <span>Giảm</span>
              <span> 10%</span>
            </div>
          </div>
        </div>
      </section>

      {/*form by course  */}
      <section className="form__information">
        <h2 className="title__form">NHẬP THÔNG TIN ĐỂ ĐĂNG KÝ</h2>
        <form action="">
          <div className="box__form">
            <div className="list__form">
              <div className="item__box__form">
                <label htmlFor="">
                  <i className="fa-solid fa-user"></i>Họ và tên
                </label>
                <input type="text" name="" id="" />
              </div>
              <div className="item__box__form">
                <label htmlFor="">
                  <i className="fa-solid fa-envelope"></i> Email
                </label>
                <input type="email" name="" id="" />
              </div>
            </div>
            <div className="list__form">
              <div className="item__box__form">
                <label htmlFor="">
                  <i className="fa-solid fa-phone"></i> Số điện thoại
                </label>
                <input type="text" name="" id="" />
              </div>
              <div className="list__check__box">
                <div className="item__Check__box">
                  <label htmlFor=""> Gói trọn đời</label>
                  <input type="checkbox" name="" id="" />
                </div>
                <div className="item__Check__box">
                  <label htmlFor=""> Gói 1 năm</label>
                  <input type="checkbox" name="" id="" />
                </div>
                <div className="item__Check__box">
                  <label htmlFor=""> Gói 6 tháng</label>
                  <input type="checkbox" name="" id="" />
                </div>
                <div className="item__Check__box">
                  <label htmlFor=""> Gói 3 tháng</label>
                  <input type="checkbox" name="" id="" />
                </div>
              </div>
            </div>
          </div>
          <div className="box__btn__form">
            <button>ĐĂNG KÝ NGAY</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Home;
