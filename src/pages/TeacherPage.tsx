import React from 'react'

import Footer from '../components/Footer'
// import '../../css/teacherPage.css'
import '../css//teacherPage.css'


type Props = {}

const TeacherPage = (props: Props) => {
    return (
        <div className=''>
            <div className="main__teacher__page">
                <section className="box__teacher__page">
                    <div className="information__teacher__Page">
                        <div className="img__teacher__page">
                            <img src="https://i.pinimg.com/564x/fd/aa/53/fdaa53535fe9fc778976e333810421d7.jpg" alt="" />
                        </div>
                        <div className="desc__teacher__page">
                            <h2>
                                Bùi Hồng Hạnh
                            </h2>
                            <ul className='list__info__teacher'>
                                <li>67349hy</li>
                                <li><i className="fa-solid fa-clock"></i>Đã tham gia tháng 7 2022</li>
                                <li>Email : hanhbhph15007@fpt.edu.vn</li>
                                <li>Phone : +08 734 7472 </li>
                                <li>Certificate : 8.0 ielts </li>
                            </ul>
                        </div>
                    </div>
                    <div className="btn__edit__teacher">
                        <button> <i className="fa-solid fa-screwdriver-wrench"></i>
                            Sửa hồ sơ
                        </button>
                    </div>
                </section>

                <section className="education__teacher">
                    <h2>
                        EDUCATION
                    </h2>
                    <div className="list__education">
                        <div className="time__school__item">
                            <p>2008 – 2010</p>
                            <h4>
                                WEBSTER TECH UNIVERSITY
                            </h4>
                            <p>
                                Master of Computer Science
                            </p>
                        </div>
                        <div className="info__school__item">
                            Consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aaliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh.
                        </div>
                    </div>
                    <div className="list__education">
                        <div className="time__school__item">
                            <p>2008 – 2010</p>
                            <h4>
                                WEBSTER TECH UNIVERSITY
                            </h4>
                            <p>
                                Master of Computer Science
                            </p>
                        </div>
                        <div className="info__school__item">
                            Consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aaliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh.
                        </div>
                    </div>
                    <div className="list__education">
                        <div className="time__school__item">
                            <p>2008 – 2010</p>
                            <h4>
                                WEBSTER TECH UNIVERSITY
                            </h4>
                            <p>
                                Master of Computer Science
                            </p>
                        </div>
                        <div className="info__school__item">
                            Consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aaliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh.
                        </div>
                    </div>
                </section>
                <section className='statistical__teacher'>
                    <div className="header__statistical">
                        <div className="title__statistical">
                            <h2>
                                Thống kê
                            </h2>
                        </div>
                        <div className="btn__statistical__teacher">
                            <button>
                                <i className="fa-solid fa-gear"></i> Quản lý bài học
                            </button>
                        </div>
                    </div>
                    <div className="result__list__teacher">
                        <div className="item__result__teacher">
                            <div className="icon__item__teacher">
                                <i className="fa-solid fa-trophy"></i>
                            </div>
                            <div className="point__teacher">
                                <span>
                                    0
                                </span>
                                <p>Thứ hạng</p>
                            </div>
                        </div>
                        <div className="item__result__teacher">
                            <div className="icon__item__teacher">
                                <i className="fa-solid fa-users"></i>
                            </div>
                            <div className="point__teacher">
                                <span>
                                    0
                                </span>
                                <p>Số học sinh theo học</p>
                            </div>
                        </div>
                        <div className="item__result__teacher">
                            <div className="icon__item__teacher">
                                <i className="fa-solid fa-star"></i>
                            </div>
                            <div className="point__teacher">
                                <span>
                                    0
                                </span>
                                <p>Đánh giá</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default TeacherPage