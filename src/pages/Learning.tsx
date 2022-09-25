import React, { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { getCategoryList } from '../features/Slide/category/CategorySlide'
import '../css/learning.css'
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
                                            <div className="py-6">
                                                <h3 className='title__tiem__learning'>
                                                    <NavLink className={'group-hover:text-red-500 text-lg'} to={`detailLearning/${item._id}`}>
                                                        {item.title}
                                                    </NavLink>
                                                </h3>
                                            </div>
                                        </div>
                                    </div>
                                </NavLink>
                            })}

                            
                        </div>
                    </div>
                </section>



            </div>
        </div>
    )
}

export default Learning