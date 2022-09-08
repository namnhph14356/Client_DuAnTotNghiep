import React from 'react'
import Footer from '../Component/Footer'
import HeaderComponent from '../Component/HeaderHome'


const SpeakingPage = () => {

    return (
        <div>
            <HeaderComponent />
            <section className='main__vocabulary'>
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

            </section>
           
        </div>
    )
}

export default SpeakingPage