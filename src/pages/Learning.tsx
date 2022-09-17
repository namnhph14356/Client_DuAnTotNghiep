import React, { useEffect } from 'react'
import Footer from '../Component/Footer'
import HeaderComponent from '../Component/HeaderHome'
import { Link, NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
// import Footer from '../Component/Footer'
// import Header from '../Component/Header'
import { getCategoryList } from '../features/Slide/category/CategorySlide'




const Learning = () => {
    const categories = useAppSelector(item => item.category.value)
    const dispatch = useAppDispatch()
    console.log("categories", categories);


    useEffect(() => {
        dispatch(getCategoryList())
    }, [])




    return (
        <div>

            <div>

                <HeaderComponent />

                <h2 className="title_learning">Chủ đề cho bạn</h2>

                {/* START: section */}
                <section className="probootstrap-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3 col-sm-6 col-xs-12 probootstrap-animate">
                                <div className="probootstrap-block-image item__list__learning">
                                    <img className='img__learning__item' src="https://i.pinimg.com/564x/9b/ef/0d/9bef0d15de56d8251f1fd34a6f486ac3.jpg" alt="Free Bootstrap Template by uicookies.com" />
                                    <div className="text">

                                        <h3 className='title__tiem__learning'><NavLink to={'/detailLearning'}> Family</NavLink></h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 col-xs-12 probootstrap-animate">
                                <div className="probootstrap-block-image item__list__learning">
                                    <img className='img__learning__item' src="https://i.pinimg.com/564x/03/d9/cd/03d9cdb7ecf52fe540f02249c75db6a4.jpg" alt="Free Bootstrap Template by uicookies.com" />
                                    <div className="text">

                                        <h3 className='title__tiem__learning'><NavLink to={'/detailLearning'}> Family</NavLink></h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 col-xs-12 probootstrap-animate">
                                <div className="probootstrap-block-image item__list__learning">
                                    <img className='img__learning__item' src="https://i.pinimg.com/564x/fe/2c/81/fe2c81e2935c1eed8794b063278c767e.jpg" alt="Free Bootstrap Template by uicookies.com" />
                                    <div className="text">

                                        <h3 className='title__tiem__learning'><NavLink to={'/detailLearning'}> Family</NavLink></h3>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 col-xs-12 probootstrap-animate">
                                <div className="probootstrap-block-image item__list__learning">
                                    <img className='img__learning__item' src="https://i.pinimg.com/564x/87/88/33/87883393c7828cb694e2568f77f3bf81.jpg" alt="Free Bootstrap Template by uicookies.com" />
                                    <div className="text">

                                        <h3 className='title__tiem__learning'><NavLink to={'/detailLearning'}> Family</NavLink></h3>
                                    </div>

                                    {/* <Header />
                                    <section className="content__learning">
                    <h2 className="title_learning">Chủ đề cho bạn</h2>
                    <div className="learning__box">
                        <div className="box__list__learning">
                            {categories?.map((item: any, index) => {
                                return <div className="item__list__learning">
                                    <Link to={`detailLearning/${item._id}`} >
                                        <a>
                                            <img className='h-40 w-fit ' src={item.image} />
                                        </a>
                                    </Link>
                                    <h3 className="title__tiem__learning">{item.title}</h3>
                                </div>
                            })}
                            <div className="item__list__learning">
                                <a >
                                    <img src="./../image/family.PNG" />
                                </a>
                                <h3 className="title__tiem__learning">Gia đình</h3>
                            </div>
                            <div className="item__list__learning">
                                <a >
                                    <img src="./../image/info.PNG" />
                                </a>
                                <h3 className="title__tiem__learning">Giới thiệu</h3>
                            </div>
                            <div className="item__list__learning">
                                <a >
                                    <img src="./../image/hi.PNG" />
                                </a>
                                <h3 className="title__tiem__learning">Chào hỏi</h3>
                            </div>
                            <div className="item__list__learning">
                                <a >
                                    <img src="./../image/shopping.PNG" />
                                </a>
                                <h3 className="title__tiem__learning">Mua sắm</h3>
                            </div>
                            <div className="item__list__learning__key">
                                <div className="col">
                                    <a >
                                        <img src="./../image/shopping.PNG" />
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
                                        <img src="./../image/shopping.PNG" />
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
                                        <img src="./../image/shopping.PNG" />
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
                                        <img src="./../image/shopping.PNG" />
                                    </a>
                                    <h3 className="title__tiem__learning">Mua sắm</h3>
                                </div>
                                <div className="item__lock_learning">
                                    <button><i className="fa-solid fa-lock" /></button>

                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 col-xs-12 probootstrap-animate">
                                <div className=" probootstrap-block-image item__list__learning__key">
                                    <div className="col">
                                        <img className='img__learning__item' src="https://i.pinimg.com/564x/63/e9/e4/63e9e415b5a257055a4aa09438f7b2a2.jpg" alt="Free Bootstrap Template by uicookies.com" />
                                        <h3 className="title__tiem__learning">Mua sắm</h3>
                                    </div>
                                    <div className="item__lock_learning">
                                        <button><i className="fa-solid fa-lock" /></button>
                                    </div>
                                </div>

                            </div>


                        </div>

                        <div className="btn__display_item">
                            <button className='btn__see__more'> Xem thêm bài học</button>
                        </div>

                    </div>
                                    </section> */}
                                    {/* END: section */}

                                </div>


                                <Footer />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Learning