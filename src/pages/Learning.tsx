import React, { useEffect } from 'react'
import Footer from '../components/Footer'
import { Link, NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { getCategoryList } from '../features/Slide/category/CategorySlide'
const Learning = () => {
    const categories = useAppSelector(item => item.category.value)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getCategoryList())
    }, [])


    return (
        <div>
            <div>
                <h2 className="title_learning">Chủ đề cho bạn</h2>
                {/* START: section */}
                <section className="probootstrap-section">
                    <div className="container">
                        <div className="row">

                            {categories?.map((item: any, index) => {
                                return <NavLink to={`detailLearning/${item._id}`}>
                                    <div key={index + 1} className="group col-md-3 col-sm-6 col-xs-12 probootstrap-animate">
                                        <div className="probootstrap-block-image item__list__learning">
                                            <img className='img__learning__item' src={item.image} alt="" />
                                            <div className="text">
                                                <h3 className='title__tiem__learning'>
                                                    <NavLink className={'group-hover:text-red-500'} to={`detailLearning/${item._id}`}>
                                                        {item.title}
                                                    </NavLink>
                                                </h3>
                                            </div>
                                        </div>

                                    </div>
                                </NavLink>
                            })}



                            {/* <div className="col-md-3 col-sm-6 col-xs-12 probootstrap-animate">
                                <div className="probootstrap-block-image item__list__learning">
                                    <img className='img__learning__item' src="https://i.pinimg.com/564x/03/d9/cd/03d9cdb7ecf52fe540f02249c75db6a4.jpg" alt="Free Bootstrap Template by uicookies.com" />
                                    <div className="text">

                                        <h3 className='title__tiem__learning'><NavLink to={'/detailLearning'}> Family</NavLink></h3>
                                    </div>
                                </div>
                            </div> */}
                            
                        </div>
                    </div>
                </section>



            </div>
        </div>
    )
}

export default Learning