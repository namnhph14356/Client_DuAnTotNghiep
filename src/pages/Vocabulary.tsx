/* eslint-disable no-restricted-globals */
import React from 'react'
import NavDeatil from '../components/NavDeatil'
import "../css/vocabulary.css";


const Vocabulary = () => {
  
  const backPage = () => {
    history.back();
  }

  return (
    <div className='voabulary__page'>
      <div className="main__voacbulary">
        <div className="w-full bg-indigo-600 px-4 py-2">
          <div className='flex gap-4'>
            <div className='my-auto' onClick={backPage}>
              <i className="fa-solid fa-angle-left text-5xl text-white font-bold cursor-pointer"></i>
            </div>
            <div className='my-auto'>
              <div className='text-xl uppercase text-white'>Luyện nghe hội thoại</div>
              <div className='text-white'>00 Điểm</div>
            </div>
          </div>
        </div>
        <div className="nav__speaking">
          <div className="count__question">
          <div>
              Câu số 1 / <span>10</span>
            </div>
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
              <img src="https://i.pinimg.com/564x/93/64/ae/9364ae370f7b3886669313eec8380797.jpg" alt="" />
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
              <img src="https://i.pinimg.com/564x/4b/36/74/4b3674d3b69b4d841714eda951e683c4.jpg" alt="" />
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
    </div>
  )
}

export default Vocabulary
