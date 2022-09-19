
import React from 'react'
import { useNavigate } from 'react-router-dom'
import BannerPage from '../components/BannerPage'
import Footer from '../components/Footer'
import HeaderComponent from '../components/HeaderHome'
// import Count from '../features/count/Count'
// import Product from '../features/product/Product'


const Home = () => {
    const navigate = useNavigate();
    const startLearning = () => {

        const existUser = localStorage.getItem("user") ? localStorage.getItem("user") : "";
        //    console.log(localStorage.getItem("user"));

        if (!existUser) {
            navigate('/login')
        } else {
            navigate('/learning')
        }
    }
    return (
        <div>
            <HeaderComponent />
            <BannerPage />
            {/* START: section */}
            <section className="probootstrap-section probootstrap-section-colored">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2 section-heading mb50 text-center probootstrap-animate">
                            <h2>More Benefits</h2>
                            <p className="lead">A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4 col-sm-6 col-xs-12 probootstrap-animate">
                            <h3 className="heading-with-icon"><i className="icon-heart2" /> <span>We bring emotion</span></h3>
                            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                        </div>
                        <div className="col-md-4 col-sm-6 col-xs-12 probootstrap-animate">
                            <h3 className="heading-with-icon"><i className="icon-rocket" /> <span>We guide companies</span></h3>
                            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                        </div>
                        <div className="clearfix visible-sm-block" />
                        <div className="col-md-4 col-sm-6 col-xs-12 probootstrap-animate">
                            <h3 className="heading-with-icon"><i className="icon-image" /> <span>We design extraordinary</span></h3>
                            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                        </div>
                        <div className="clearfix visible-md-block" />
                        <div className="col-md-4 col-sm-6 col-xs-12 probootstrap-animate">
                            <h3 className="heading-with-icon"><i className="icon-briefcase" /> <span>We bring emotion</span></h3>
                            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                        </div>
                        <div className="clearfix visible-sm-block" />
                        <div className="col-md-4 col-sm-6 col-xs-12 probootstrap-animate">
                            <h3 className="heading-with-icon"><i className="icon-chat" /> <span>We guide companies</span></h3>
                            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                        </div>
                        <div className="col-md-4 col-sm-6 col-xs-12 probootstrap-animate">
                            <h3 className="heading-with-icon"><i className="icon-colours" /> <span>We design extraordinary</span></h3>
                            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                        </div>
                        <div className="clearfix visible-sm-block" />
                    </div>
                </div>
            </section>
            {/* END: section */}

            <div>
                {/* START: section */}
                <section className="probootstrap-section probootstrap-section-extra last">
                    <div className="container-fluid probootstrap-absolute">
                        <div className="row">
                            <div className="col-md-7 col-md-push-6 probootstrap-animate" data-animate-effect="fadeInRight">
                                <img width={"100%"} src="https://megastudy.edu.vn/upload/tinymce/banner.png" alt="Free Bootstrap Template by uicookies.com" className="img-responsive shadow-left" />
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-5 col-md-5 section-heading probootstrap-animate">
                                <h2>We bring emotion to our product</h2>

                                <blockquote className="probootstrap-quote">
                                    <p>“ Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur laboriosam dolorem est numquam natus eum dolorum, quisquam id vel dolores repellendus cupiditate, exercitationem aut ducimus, reiciendis iusto eveniet quidem iure!
                                        A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.”</p>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </section>
                {/* END: section */}
                {/* START: section */}
                <section className="probootstrap-section probootstrap-section-extra ">
                    <div className="container-fluid probootstrap-absolute mt-[50px]">
                        <div className="row">
                            <div className="col-md-8 col-md-pull-2 probootstrap-animate" data-animate-effect="fadeInLeft">
                                <img src="https://telacademyvn.com/Uploads/7F147FD3915DD461E068B29F5C39353E/images/ti%E1%BA%BFng%20Anh%20giao%20ti%E1%BA%BFp%20trong%20l%E1%BB%9Bp%20h%E1%BB%8Dc.jpg" width={"100%"} alt='' className="img-responsive" />
                            </div>
                        </div>
                    </div>
                    <div className="container ">
                        <div className="row mt-[50px]">
                            <div className="col-lg-5 col-md-5 col-md-push-6 section-heading probootstrap-animate">
                                <h2>We design extraordinary</h2>
                                <p className="lead">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.</p>
                                <blockquote className="probootstrap-quote">
                                    <figure className="probootstrap-quote-logo facebook">
                                        <img src="img/facebook.png" alt="Free Bootstrap Template by uicookies.com" className="img-responsive" />
                                    </figure>
                                    <p>“A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.”</p>
                                    <p className="probootstrap-quote-author"><img src="img/person_5.jpg" alt="Free Bootstrap Template by uicookies.com" /> Janet Morris, Facebook</p>
                                </blockquote>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
            {/* teacher  */}
            <section className='box__teacher'>
                <h2 className="title__lecturers">
                    Giảng  Viên Của Vogue
                </h2>
                <div className="list__teacher">
                    <div className="item__teacher">
                        <div className="">
                            <img className='img__teacher' src="https://i.pinimg.com/564x/40/13/74/4013749a8693c2ac0e3a8a3326a99240.jpg" alt="" />

                        </div>
                        <h3 className="name__teacher">
                            Bùi Hồng Hạnh
                        </h3>
                        <p>
                            Thạc sỹ Giáo Dục
                            & Quản Trị Kinh Doanh từ Đại Học StanFord
                        </p>
                    </div>
                    <div className="item__teacher">
                        <div className="">
                            <img className='img__teacher' src="https://i.pinimg.com/564x/58/44/1a/58441a96ff4480dbae3779ec75ef87a4.jpg" alt="" />

                        </div>
                        <h3 className="name__teacher">
                            Bùi Hồng Hạnh
                        </h3>
                        <p>
                            Thạc sỹ Giáo Dục
                            & Quản Trị Kinh Doanh từ Đại Học StanFord
                        </p>
                    </div>
                    <div className="item__teacher">
                        <div className="">
                            <img className='img__teacher' src="https://i.pinimg.com/564x/cb/72/2c/cb722cc4a9a425e604c911957f9b2f93.jpg" alt="" />

                        </div>
                        <h3 className="name__teacher">
                            Bùi Hồng Hạnh
                        </h3>
                        <p>
                            Thạc sỹ Giáo Dục
                            & Quản Trị Kinh Doanh từ Đại Học StanFord
                        </p>
                    </div>
                </div>
            </section>

            {/* buy course  */}

            <section className='box__main__course'>
                <h2 className="title__course__main">
                    ĐĂNG KÝ KHÓA HỌC
                </h2>
                <div className='distance__course'>


                    <div className="box__course">
                        <h2 className="title__course__sale">
                            GÓI ƯU ĐÃI NHẤT
                        </h2>
                        <p className="title__course">
                            GÓI VOGUE PRO TRỌN ĐỜI
                        </p>
                        <p className="price__course__old">
                            2,435,500 vnd
                        </p>
                        <p className="price__course">
                            1,435,500 vnd
                        </p>
                        <ul className='nav__info__course'>
                            <li> <i className="fa-solid fa-circle-check"></i>Nội dung bài học cập nhật liên tục</li>
                            <li> <i className="fa-solid fa-circle-check"></i>Nội dung bài học cập nhật liên tục</li>
                            <li> <i className="fa-solid fa-circle-check"></i>Nội dung bài học cập nhật liên tục</li>
                            <li> <i className="fa-solid fa-circle-check"></i>Nội dung bài học cập nhật liên tục</li>
                        </ul>
                        <button className='btn__buy__course'>
                            Mua ngay
                        </button>
                        <div className='price__sale-off__course'>
                            <span>
                                Giảm
                            </span>
                            <span> 30%</span>
                        </div>
                    </div>
                    <div className="box__course item__sale__year">
                        <p className="title__course">
                            GÓI VOGUE PRO 1 NĂM
                        </p>
                        <p className="price__course__old">
                            2,435,500 vnd
                        </p>
                        <p className="price__course">
                            1,435,500 vnd
                        </p>
                        <ul className='nav__info__course'>
                            <li> <i className="fa-solid fa-circle-check"></i>Nội dung bài học cập nhật liên tục</li>
                            <li> <i className="fa-solid fa-circle-check"></i>Nội dung bài học cập nhật liên tục</li>
                            <li> <i className="fa-solid fa-circle-check"></i>Nội dung bài học cập nhật liên tục</li>
                            <li> <i className="fa-solid fa-circle-check"></i>Nội dung bài học cập nhật liên tục</li>
                        </ul>
                        <button className='btn__buy__course'>
                            Mua ngay
                        </button>
                        <div className='price__sale__year'>
                            <span>
                                Giảm
                            </span>
                            <span> 20%</span>
                        </div>
                    </div>
                    <div className="box__course item__sale__year">
                        <p className="title__course">
                            GÓI VOGUE PRO 6 THÁNG
                        </p>
                        <p className="price__course__old">
                            2,435,500 vnd
                        </p>
                        <p className="price__course">
                            1,435,500 vnd
                        </p>
                        <ul className='nav__info__course'>
                            <li> <i className="fa-solid fa-circle-check"></i>Nội dung bài học cập nhật liên tục</li>
                            <li> <i className="fa-solid fa-circle-check"></i>Nội dung bài học cập nhật liên tục</li>
                            <li> <i className="fa-solid fa-circle-check"></i>Nội dung bài học cập nhật liên tục</li>
                            <li> <i className="fa-solid fa-circle-check"></i>Nội dung bài học cập nhật liên tục</li>
                        </ul>
                        <button className='btn__buy__course'>
                            Mua ngay
                        </button>
                        <div className='price__sale__year'>
                            <span>
                                Giảm
                            </span>
                            <span> 10%</span>
                        </div>
                    </div>
                    <div className="box__course item__sale__year">
                        <p className="title__course">
                            GÓI VOGUE PRO 3 THÁNG
                        </p>
                        <p className="price__course__old">
                            2,435,500 vnd
                        </p>
                        <p className="price__course">
                            1,435,500 vnd
                        </p>
                        <ul className='nav__info__course'>
                            <li> <i className="fa-solid fa-circle-check"></i>Nội dung bài học cập nhật liên tục</li>
                            <li> <i className="fa-solid fa-circle-check"></i>Nội dung bài học cập nhật liên tục</li>
                            <li> <i className="fa-solid fa-circle-check"></i>Nội dung bài học cập nhật liên tục</li>
                            <li> <i className="fa-solid fa-circle-check"></i>Nội dung bài học cập nhật liên tục</li>
                        </ul>
                        <button className='btn__buy__course'>
                            Mua ngay
                        </button>
                        <div className='price__sale__year'>
                            <span>
                                Giảm
                            </span>
                            <span> 10%</span>
                        </div>
                    </div>


                </div>
            </section>





            {/*form by course  */}
            <section className='form__information'>
                <h2 className="title__form">
                    NHẬP THÔNG TIN ĐỂ ĐĂNG KÝ
                </h2>
                <form action="">
                    <div className='box__form'>
                        <div className='list__form'>
                            <div className='item__box__form'>
                                <label htmlFor="">
                                    <i className="fa-solid fa-user"></i>Họ và tên
                                </label>
                                <input type="text" name="" id="" />
                            </div>
                            <div className='item__box__form'>
                                <label htmlFor="">
                                    <i className="fa-solid fa-envelope"></i> Email
                                </label>
                                <input type="email" name="" id="" />
                            </div>
                        </div>
                        <div className='list__form'>
                            <div className='item__box__form'>
                                <label htmlFor="">
                                    <i className="fa-solid fa-phone"></i>   Số điện thoại
                                </label>
                                <input type="text" name="" id="" />
                            </div>
                            <div className='list__check__box'>
                                <div className='item__Check__box'>
                                    <label htmlFor=""> Gói trọn đời</label>
                                    <input type="checkbox" name="" id="" />
                                </div>
                                <div className='item__Check__box'>
                                    <label htmlFor=""> Gói 1 năm</label>
                                    <input type="checkbox" name="" id="" />
                                </div>
                                <div className='item__Check__box'>
                                    <label htmlFor=""> Gói 6 tháng</label>
                                    <input type="checkbox" name="" id="" />
                                </div>
                                <div className='item__Check__box'>
                                    <label htmlFor=""> Gói 3 tháng</label>
                                    <input type="checkbox" name="" id="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='box__btn__form'>
                        <button>
                            ĐĂNG KÝ NGAY
                        </button>
                    </div>
                </form>
            </section>

            <Footer />
        </div>
    )
}


export default Home