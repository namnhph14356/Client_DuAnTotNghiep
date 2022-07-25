
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../Component/Footer'
import HeaderComponent from '../Component/HeaderHome'
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
            <div>

                {/* end header */}
                <section className="banner">
                    <div className="image">
                        <a ><img src="https://i.pinimg.com/originals/5b/83/ef/5b83ef5ba73ca499f556bce1859dd9ab.gif" className='home__img__banner' /></a>
                    </div>
                    <div className="start">
                        <p className="start-title">Cách học ngôn ngữ miễn phí, vui nhộn và hiệu quả</p>
                        <button onClick={() => startLearning()} className="btn-start-1 btn__start__learning">Bắt đầu học</button>
                        <button className="btn-start-2 btn__join__learning">Tôi đã có tài khoản</button>
                    </div>
                </section>
                {/* end banner  */}
                <section className="vougue">
                    <p className="title">VOUGE là gì ?</p>
                    <p className="title-content">VOGUE là website tốt nhất trên thế giới giúp bạn học nói tiếng Anh thành thạo như người
                        bản xứ
                        một cách hiệu quả hơn, dễ dàng hơn, tiết kiệm hơn</p>
                    <div className="content">
                        <div className="image">
                            <a ><img src="../image/image 2.png" /></a>
                        </div>
                        <p className="content2">Công nghệ Trí Tuệ Nhân Tạo (A.I.) của VOGUE là độc quyền được phát triển riêng cho mục
                            đích hướng dẫn người dùng phát âm tiếng Anh.
                        </p>
                    </div>
                    <div className="content">
                        <div className="image">
                            <a ><img src="../image/image 3.png" /></a>
                        </div>
                        <p className="content2">VOGUE như là gia sư bản địa trực tuyến của riêng bạn,luôn sẵn sàng giúp bạn luyện tập
                            24/7 với phản hồi tức thì và hướng dẫn chính xác tuyệt dối.</p>
                    </div>
                </section>
                {/* end vougue */}
                <section className="box__info__home">
                    <div className='reason'>
                        <p className="title">Lý do bạn nên học cùng VOGUE</p>
                        <div className="content">
                            <div className="box">
                                <p className="title-box">Truyền động lực học</p>
                                <p className="title-box2">Chúng tôi giúp người học dễ dàng xây dựng
                                    thói quen học tập, qua những tính năng mô
                                    phỏng trò chơi, các thử thách vui vẻ.</p>
                            </div>
                            <div className="box">
                                <p className="title-box">Học thật vui</p>
                                <p>Học hiệu quả mà không nhàm chán! Xây dựng kỹ
                                    năng mỗi ngày với các bài học thú vị cùng các
                                    nhân vật ngộ nghĩnh.</p>
                            </div>
                        </div>
                        <div className="content">
                            <div className="box">
                                <p className="title-box">Học mọi lúc mọi nơi</p>
                                <p className="title-box2">Truy cập vào website và trải nghiệm mọi thứ mà
                                    VOGUE mạng lại để đạt danh hiệu xuất sắc</p>
                            </div>
                            <div className="box">
                                <p className="title-box">Thực sự hiệu quả</p>
                                <p>Các khóa học của chúng tôi giảng dạy một
                                    cách hiệu quả các kỹ năng nghe, đọc và viết. Bạn có thể xem nghiên cứu khoa học
                                    mới nhất của chúng tôi!</p>
                            </div>
                        </div>
                    </div>
                </section>
                {/* end reason */}
                <section className="studyRoute">
                    <p className="title">LỘ TRÌNH HỌC VỚI VOGUE</p>
                    <div className="row">
                        <div className="col">
                            <div className="col-box">
                                <p className="col-title">Kiểm tra đầu vào</p>
                                <p className="col-content">Thiết lập lộ trình học phù hợp riêng của bạn</p>
                            </div>
                            <div className="col-number">
                                1
                            </div>
                        </div>
                        <div className="col">
                            <div className="col-box">
                                <p className="col-title">Lựa chọn chủ đề yêu thích</p>
                                <p className="col-content">Giao tiếp trong các tình huống đơn giản tại nơi làm việc, tình huống cơ bản.
                                </p>
                            </div>
                            <div className="col-number">
                                2
                            </div>
                        </div>
                        <div className="col">
                            <div className="col-box">
                                <p className="col-title">Mỗi ngày một bài học</p>
                                <p className="col-content">Hiểu và tự tin vận dụng các cấu trúc thông dụng trong một số lĩnh vực và diễn
                                    đạt rõ ràng những vấn đề thường gặp trong cuộc sống.</p>
                            </div>
                            <div className="col-number">
                                3
                            </div>
                        </div>
                        <div className="col">
                            <div className="col-box">
                                <p className="col-title">Cảm nhận sự tự tin hoàn toàn mới</p>
                                <p className="col-content">Tự tin giao tiếp trong các tình huống xã hội. Đối phó với những tình huống
                                    tương đối phức tạp trong công việc. Tự tin hoàn toàn tin tưởng vào bản thân, nhận biết được giá
                                    trị và sự quan trọng của mình </p>
                            </div>
                            <div className="col-number">
                                4
                            </div>
                        </div>
                    </div>
                </section>

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

            </div>
            <Footer />
        </div>
    )
}


export default Home