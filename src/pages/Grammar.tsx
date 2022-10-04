import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import HeaderDetail from "../components/HeaderDetail";
import NavDeatil from "../components/NavDeatil";
import '../css/grammar.css'

const Grammar = () => {
  return (
    <div className="grammar__page">
      <div className="main__grammar__page">
        <HeaderDetail />
        <div className="nav__speaking">
          <div className="count__question">
            <p>
              câu số 1 / <span>10</span>
            </p>
          </div>
          <div>
            <button className="btn__start__speaking">
              <i className="fa-solid fa-book mr-2"></i> Khởi động
            </button>
            <button className="btn__comment__speaking">
              <i className="fa-solid fa-comment mr-2"></i>Nghe và đọc
            </button>
            <button className="btn__comment__speaking">
              <i className="fa-solid fa-notes-medical"></i> Ghi chú
            </button>
            <button className="btn__comment__speaking">
              <i className="fa-solid fa-comments mr-2"></i> Hỏi và đáp
            </button>
          </div>
        </div>
        <div className="content__grammar">
          <h3 className="title__content__grammar">
            Thì hiện tại đơn
          </h3>
          <div className="structure__exercise__grammar">
            <h3 className="title__structure__exercise__grammar">
              I. Định nghĩa
            </h3>
            <p>
              Danh từ là các từ được dùng để gọi tên người hay sự vật. Mọi thứ chúng ta thấy hoặc có thể đề cập đến đều được giới thiệu bằng một từ đặt tên cho nó – từ đó được gọi là danh từ.
            </p>
            <img src="https://ielts247.com/wp-content/uploads/thi-hien-tai-don-la-gi-ielts247com.jpg" alt="" />
            <div className="example__structure__exercise__grammar">
              <h3 className="title__example">
                II . Ví dụ
              </h3>
              <div className="px-4 py-5 sm:px-6">
                <div className="item__example">
                  <h3 className="text-sm font-medium leading-6 text-gray-900">1. Câu khẳng định</h3>
                  <div className="explain__example">
                    <p className="mt-1 max-w-2xl text-sm ">I saw <span>Tom</span> at the theater last night.</p>
                    <p className="mt-1 max-w-2xl text-sm ">Tôi đã nhìn thấy <span>Tom</span> ở nhà hát đêm qua.</p>
                    <p>
                      danh từ riêng <span> “Tom”</span> làm túc từ cho giới từ “to”
                    </p>
                  </div>

                </div>
                <div className="item__example">
                  <h3 className="text-sm font-medium leading-6 text-gray-900">2. Câu phủ định</h3>
                  <div className="explain__example">
                    <p className="mt-1 max-w-2xl text-sm ">I saw <span>Tom</span> at the theater last night.</p>
                    <p className="mt-1 max-w-2xl text-sm ">Tôi đã nhìn thấy <span>Tom</span> ở nhà hát đêm qua.</p>
                    <p>
                      danh từ riêng <span> “Tom”</span> làm túc từ cho giới từ “to”
                    </p>
                  </div>

                </div>
              </div>
            </div>

            <div className="attention__grammar">
              <h3 className="title__structure__exercise__grammar">
                III. Chú ý
              </h3>
              <div className="note__attention">
                <p>
                  Danh từ là các từ được dùng để gọi tên người hay sự vật. Mọi thứ chúng ta thấy hoặc có thể đề cập đến đều được giới thiệu bằng một từ đặt tên cho nó – từ đó được gọi là danh từ.
                </p>
              </div>
            </div>
          </div>
          <div className="next__page__grammar">
            <button>
              <NavLink to={'/'} className='text-white hover:text-white'>
                Bài tập
              </NavLink>
            </button>
          </div>
        </div>
      </div>
      <NavDeatil />
    </div>
  );
};

export default Grammar;
