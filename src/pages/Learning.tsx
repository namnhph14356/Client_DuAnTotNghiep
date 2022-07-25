import React, { useEffect } from 'react'
import Footer from '../Component/Footer'
import Header from '../Component/Header'



const Learning = () => {

   




    return (
        <div>

            <div>
               <Header/>
                <section className="content__learning">
                    <h2 className="title_learning">Chủ đề cho bạn</h2>
                    <div className="learning__box">
                        <div className="box__list__learning">
                            <div className="item__list__learning">
                                <a >
                                    <img src="./../image//family.PNG"  />
                                </a>
                                <h3 className="title__tiem__learning">Gia đình</h3>
                            </div>
                            <div className="item__list__learning">
                                <a >
                                    <img src="./../image/info.PNG"  />
                                </a>
                                <h3 className="title__tiem__learning">Giới thiệu</h3>
                            </div>
                            <div className="item__list__learning">
                                <a >
                                    <img src="./../image/hi.PNG"  />
                                </a>
                                <h3 className="title__tiem__learning">Chào hỏi</h3>
                            </div>
                            <div className="item__list__learning">
                                <a >
                                    <img src="./../image/shopping.PNG"  />
                                </a>
                                <h3 className="title__tiem__learning">Mua sắm</h3>
                            </div>
                            <div className="item__list__learning__key">
                                <div className="col">
                                    <a >
                                        <img src="./../image/shopping.PNG"  />
                                    </a>
                                    <h3 className="title__tiem__learning">Mua sắm</h3>
                                </div>
                                <div className="item__lock_learning">
                                    <button><i className="fa-solid fa-lock" /></button>
                                </div>
                            </div>
                            <div className="item__list__learning__key">
                                <div className="col">
                                    <a >
                                        <img src="./../image/shopping.PNG"  />
                                    </a>
                                    <h3 className="title__tiem__learning">Mua sắm</h3>
                                </div>
                                <div className="item__lock_learning">
                                    <button><i className="fa-solid fa-lock" /></button>
                                </div>
                            </div>
                            <div className="item__list__learning__key">
                                <div className="col">
                                    <a>
                                        <img src="./../image/shopping.PNG"  />
                                    </a>
                                    <h3 className="title__tiem__learning">Mua sắm</h3>
                                </div>
                                <div className="item__lock_learning">
                                    <button><i className="fa-solid fa-lock" /></button>
                                </div>
                            </div>
                            <div className="item__list__learning__key">
                                <div className="col">
                                    <a>
                                        <img src="./../image/shopping.PNG"  />
                                    </a>
                                    <h3 className="title__tiem__learning">Mua sắm</h3>
                                </div>
                                <div className="item__lock_learning">
                                    <button><i className="fa-solid fa-lock" /></button>
                                </div>
                            </div>
                        </div>
                        <div className="btn__display_item">
                        <button className='btn__see__more'> Xem thêm bài học</button>
                        </div>
                    </div>
                </section>
            </div>


            <Footer />
        </div>
    )
}

export default Learning