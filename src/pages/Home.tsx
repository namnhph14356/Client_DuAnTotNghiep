import React from "react";
import { useNavigate } from "react-router-dom";
import BannerPage from "../components/BannerPage";
import Message from "../components/Message";
import { Helmet } from "react-helmet";
import * as yup from "yup";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


import "./../css/home.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { ContactType } from "../types/contact";
import { SubmitHandler, useForm } from "react-hook-form";
import { message } from "antd";
import { addContactSlide } from "../features/Slide/contact/ContactSlide";
import { useAppDispatch } from "../app/hooks";

const phoneRegex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;

const schema = yup.object({
  email: yup.string().email("Vui lòng nhập đúng định dạng email").required("Không được để trống"),
  message: yup.string().required("Không được để trống").min(5, "Nhập ít nhất 5 ký tự"),
  name: yup.string().required("Không được để trống").min(5, "Nhập ít nhất 5 ký tự"),
  phone: yup.string().required("Không được để trống").matches(phoneRegex, 'Số điện thoại không hợp lệ'),
}).required();
const Home = () => {
  const navigate = useNavigate();
  const startLearning = () => {
    const existUser = localStorage.getItem("user")
      ? localStorage.getItem("user")
      : "";

    if (!existUser) {
      navigate("/login");
    } else {
      navigate("/learning");
    }
  };
  const dispath = useAppDispatch();
  const {
    register,
    resetField,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactType>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<ContactType> = async (values: ContactType) => {
    dispath(addContactSlide(
      {
        surname: values.surname,
        name: values.name,
        address: values.address,
        birthday: values.birthday,
        email: values.email,
        phone: values.phone,
        message: values.message,
        status: 0,
        sendAds: values.sendAds || 0
      }
    ))
    toast.success("Cảm ơn bạn đã gửi thông tin, chúng tôi sẽ liên hệ với bạn sớm nhất có thể", {
      position: toast.POSITION.TOP_CENTER
    });
    reset()
  }

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Vian English</title>
      </Helmet>
      <BannerPage />


      <div>

        {/* START: section */}
        <section className="w-10/12 m-auto probootstrap-section probootstrap-section-extra grid grid-cols-2">
          <div className="container-fluid probootstrap-absolute mt-[50px]">
            <div className="row">
              <div
                className="col-md-8 col-md-pull-2 probootstrap-animate"
                data-animate-effect="fadeInLeft"
              >
                <img
                  w-full
                  src="http://unicoach.wgl-demo.net/wp-content/uploads/2020/10/home1_1.jpg"
                  width={"90%"}
                  alt=""
                  className="img-learning img-responsive "
                />
              </div>
            </div>
          </div>
          <div className="my-auto ">
            <div className="row ">
              <div className="col-lg-5 col-md-5 col-md-push-6 section-heading probootstrap-animate">
                <h2 className="text-3xl font-bold">Giao Tiếp Hiệu Quả</h2>
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

        {/* START: section */}
        <section className="grid grid-cols-2 mt-16 gap-16 w-10/12 m-auto">
          <div className="my-auto">
            <div className=" row my-auto">
              <div className="col-lg-5 col-md-5 section-heading probootstrap-animate float-right ">
                <h2 className="text-3xl font-bold ">Lợi Ích Khi Học Tiếng Anh</h2>

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
                className="col-md-7 col-md-push-6 probootstrap-animate truncate rounded-lg"
                data-animate-effect="fadeInRight"
              >
                <img
                  src="http://unicoach.wgl-demo.net/wp-content/uploads/2020/10/courses_14-970x570.jpg"
                  alt="Free Bootstrap Template by uicookies.com"
                  width={"100%"}
                  className="img-responsive  img-learning2"
                />
              </div>
            </div>
          </div>
        </section>
        {/* END: section */}

      </div>

      <section className="our-product mt-16">
        <div className="w-10/12 m-auto">
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
    
      {/*form by course  */}
      <section className="form__information">
        <h2 className="title__form">LIÊN HỆ VỚI CHÚNG TÔI</h2>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="box__form">
            <div className="list__form">
              <div className="item__box__form">
                <label htmlFor="">
                  <i className="fa-solid fa-user"></i>Họ và tên
                </label>
                <input type="text" {...register('name')} id="" />
                <p className='text-red-500 text-sm'>{errors.name?.message}</p>
              </div>
              <div className="item__box__form">
                <label htmlFor="">
                  <i className="fa-solid fa-envelope"></i> Email
                </label>
                <input type="email" {...register('email')} id="" />
                <p className='text-red-500 text-sm'>{errors.email?.message}</p>
              </div>
            </div>
            <div className="list__form">
              <div className="item__box__form">
                <label htmlFor="">
                  <i className="fa-solid fa-phone"></i> Số điện thoại
                </label>
                <input type="text" {...register('phone')} id="" />
                <p className='text-red-500 text-sm'>{errors.phone?.message}</p>
              </div>
              <div className="item__box__form">
                <label htmlFor="">
                  <i className="fa-solid fa-message"></i> Lời nhắn
                </label>
                <input type="text" {...register('message')} id="" />
                <p className='text-red-500 text-sm'>{errors.message?.message}</p>
              </div>
            </div>
          </div>
          <div className="box__btn__form">
            <button type="submit">LIÊN HỆ NGAY</button>
          </div>
          <ToastContainer />
        </form>
      </section>
    </div>
  );
};

export default Home;
