import React from 'react'
import { NavLink } from 'react-router-dom'
import AdverDeatil from '../Component/AdverDeatil'
import Footer from '../Component/Footer'
import HeaderComponent from '../Component/HeaderHome'
import NavDeatil from '../Component/NavDeatil'


const SpeakingPage = () => {

    return (
        <div>
            <HeaderComponent />
            <div className='box__deatil__learning__main'>

                <NavDeatil />
                <div className='main__topic col-span-7'>
                    <div className="desc__title__cocabulary">
                        <h2>
                            vocabulary <span>


                                /   tên Chủ đề 1
                            </span>
                        </h2>

                        <div className='count__question__vocabulary'>
                            <h4 >
                                câu số <span>2</span> / <span>4</span>
                            </h4>
                        </div>
                    </div>
                    <div className="box__header__topic">
                        <button className='btn__volume__vocabulary'>
                            <i className="fa-solid fa-volume-high"></i>
                        </button>
                        <h3 className="vocabulary__speaking">
                            My  farther
                        </h3>

                    </div>

                    <div className="info__vocabulry">
                        <p>
                            Bố của tôi
                        </p>
                    </div>
                    <div className='box__btn__question'>
                        <button className='btn__next__question'>
                            Tiếp tục
                        </button>
                    </div>

                    <div className="box__list__detail">
                        <ul>
                            <li>
                                <NavLink style={{ color: '#fff' }} to={'/detailLearning/speak'}> Khởi động
                                    <i className="fa-solid fa-angle-right"></i></NavLink>
                            </li>
                            <li>

                                <NavLink style={{ color: '#fff' }} to={'/detailLearning/quiz'}> Hỏi và đáp
                                    <i className="fa-solid fa-angle-right"></i></NavLink>
                            </li>
                            <li>

                                <NavLink style={{ color: '#fff' }} to={'/detailLearning/writeAndListen'}>  Nghe và trả lời
                                    <i className="fa-solid fa-angle-right"></i></NavLink>
                            </li>
                        </ul>
                    </div>
                </div>

                <AdverDeatil />
            </div>


        </div>
    )
}

export default SpeakingPage