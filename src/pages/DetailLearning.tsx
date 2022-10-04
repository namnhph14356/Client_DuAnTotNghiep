/* eslint-disable no-lone-blocks */


import { Collapse, Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams, NavLink } from 'react-router-dom';
import { detailCategory } from '../api/category';
import AdverDeatil from '../components/AdverDeatil';
import '../css/detailLearning.css'

const DetailLearning = () => {


  return (
    <div className='detail__learning__page'>
      <div className="content__detail__learning">
        <div className="video__learning">
          <img src="https://i.pinimg.com/564x/46/1e/a8/461ea8504beb717ac0364e55c712d16e.jpg" alt="" />
        </div>
        <div className="deatil__main__learning">
          <h3 className="title__detail__main">
            CÁC PHẦN HỌC CHÍNH :
          </h3>
          <div className="list__main__learning">
            <NavLink to={'/learning/detailLearning/speak'}>
              <div className="item__list__learning">
                <div className="info__item__list">
                  <div>
                    <i className="fa-solid fa-ear-listen"></i>
                  </div>
                  <div>
                    <h4 className="title__info__item">
                      Luyện nghe nói
                    </h4>
                    <p>
                      00 điểm |<span> bắt buộc</span>
                    </p>
                  </div>
                </div>
                <div className='icon__item__list'>
                  <i className="fa-solid fa-chevron-right"></i>
                </div>
              </div>
            </NavLink>
            <NavLink to={'/learning/detailLearning/vocabulary'}>
              <div className="item__list__learning">
                <div className="info__item__list">
                  <div>
                    <i className="fa-solid fa-file-word"></i>
                  </div>
                  <div>
                    <h4 className="title__info__item">
                      Luyện từ vựng
                    </h4>
                    <p>
                      00 điểm |<span> bắt buộc</span>
                    </p>
                  </div>
                </div>
                <div className='icon__item__list'>
                  <i className="fa-solid fa-chevron-right"></i>
                </div>
              </div>
            </NavLink>
            <NavLink to={'/learning/detailLearning/grammar'}>
            <div className="item__list__learning">
              <div className="info__item__list">
                <div>
                  <i className="fa-solid fa-bars-staggered"></i>
                </div>
                <div>
                  <h4 className="title__info__item">
                    Luyện cấu trúc câu
                  </h4>
                  <p>
                    00 điểm |<span> bắt buộc</span>
                  </p>
                </div>
              </div>
              <div className='icon__item__list'>
                <i className="fa-solid fa-chevron-right"></i>
              </div>
            </div>
            </NavLink>
            <div className="item__list__learning">
              <div className="info__item__list">
                <div>
                  <i className="fa-solid fa-comment"></i>
                </div>
                <div>
                  <h4 className="title__info__item">
                    Luyện hội thoại
                  </h4>
                  <p>
                    00 điểm |<span> bắt buộc</span>
                  </p>
                </div>
              </div>
              <div className='icon__item__list'>
                <i className="fa-solid fa-chevron-right"></i>
              </div>
            </div>
            <NavLink to={'/learning/detailLearning/grammar'}>
            <div className="item__list__learning">
              <div className="info__item__list">
                <div>
                  <i className="fa-solid fa-book-open"></i>
                </div>
                <div>
                  <h4 className="title__info__item">
                    Luyện ngữ pháp
                  </h4>
                  <p>
                    00 điểm |<span> bắt buộc</span>
                  </p>
                </div>
              </div>
              <div className='icon__item__list'>
                <i className="fa-solid fa-chevron-right"></i>
              </div>
            </div>
            </NavLink>
          </div>
        </div>
      </div>
      <div className="setting__detail__learning">
        tuy chon
      </div>
    </div>
  )
}

export default DetailLearning
