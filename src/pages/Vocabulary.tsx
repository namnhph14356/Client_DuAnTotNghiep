import React from 'react'
import HeaderDetail from '../components/HeaderDetail';
import NavDeatil from '../components/NavDeatil'
import "../css/vocabulary.css";


const Vocabulary = () => {
    return (
        <div className='voabulary__page'>
            <div className="main__voacbulary">
                <HeaderDetail/>
                <div className="nav__speaking">
                    <div className="count__question">
                        <p>
                            câu số 1 / <span>10</span>
                        </p>
                    </div>
                    <div>
                        <button className="btn__start__speaking">
                            <i className="fa-solid fa-book"></i> Khởi động
                        </button>
                        <button className="btn__comment__speaking">
                            <i className="fa-solid fa-pen-to-square mr-1"></i>Bài tập
                        </button>
                        <button className="btn__comment__speaking">
                            <i className="fa-solid fa-comments"></i> Hỏi và đáp
                        </button>

                    </div>
                </div>
                <div className="content__vocabualry">
                    <div className="list__item__vocabulary">
                        <div className="img__vocabulary">
                            <img src="https://file.removal.ai/preview/tmp-633bf0c570815.png" alt="" />
                        </div>
                        <div className="info__vocabulary">
                            <div className="item__vocabulary">
                                <h3 className='title__vocabulary__item'>
                                    <i className="fa-solid fa-volume-high"></i>
                                    call <span>/kɑːl/</span>
                                </h3>
                                <p>
                                    gọi điện thoại
                                </p>
                                <span>(intransitive/transitive verb) to telephone someone</span>
                            </div>
                            <div className="item__exemple__vocabulary">

                                <p>

                                    <i className="fa-solid fa-volume-high"></i>

                                    Call me when you've arrived there.
                                </p>
                                <span>
                                    Gọi điện cho tôi khi bạn đến đó nhé.
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="list__item__vocabulary">
                        <div className="img__vocabulary">
                            <img src="https://file.removal.ai/preview/tmp-633bf0c570815.png" alt="" />
                        </div>
                        <div className="info__vocabulary">
                            <div className="item__vocabulary">
                                <h3 className='title__vocabulary__item'>
                                    <i className="fa-solid fa-volume-high"></i>
                                    call <span>/kɑːl/</span>
                                </h3>
                                <p>
                                    gọi điện thoại
                                </p>
                                <span>(intransitive/transitive verb) to telephone someone</span>
                            </div>
                            <div className="item__exemple__vocabulary">

                                <p>

                                    <i className="fa-solid fa-volume-high"></i>

                                    Call me when you've arrived there.
                                </p>
                                <span>
                                    Gọi điện cho tôi khi bạn đến đó nhé.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <NavDeatil />
        </div>
    )
}

export default Vocabulary
