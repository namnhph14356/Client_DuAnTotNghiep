import React from 'react'
import NavOral from '../components/NavOral'
import HeaderOral from '../HeaderOral'
const OralSeven = () => {
  return (
    <div className='oralPage'>
      <div className='main__oral__page'>
        <HeaderOral />
        <div>
          <div className="exam__content__wrap__oral">
            <div className="exam__container__oral">
              <table className='table__exam__oral'>
                <thead  >
                  <tr className='row__table__exem__oral' >
                    <th>
                      de
                    </th>
                    <td>
                      <div className='title__exam__oral__table'>
                        <p>
                          Tôi thích đọc sách và đã đọc tất cả những cuốn sách nên đọc rồi.
                        </p>
                      </div>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr className='row__body__table__oral'>
                    <th>
                      thu am <i className="fa-solid fa-microphone"></i>
                    </th>
                    <td className='text-orange-500'>
                      I love reading books and I have read all the must-reads.
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="btn__control__exam">
                <div>
                  <button className='btn__next__control'>
                    cau tiep theo
                  </button>
                </div>
                <div>
                  <p>
                    so cau 1/ <span>
                      2
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="list__answered">
            <div className='title__list__answered'>
              <p>
                danh sách kết quả
              </p>
            </div>

          </div>
        </div>
        {/* kết quả hiển thị */}
        {/* <div className="open__result">
          <div className='title__open'>
            <h2>
              Kết quả
            </h2>
            <div className="box__result__open">
              <h2>
                Không đạt
              </h2>
              <p>Vui lòng thi lại!!!</p>
              <ul className='list__result__open'>
                <li>
                  số điểm : <span>
                    0
                  </span>
                </li>
                <li>
                  thời gian hoàn thành: <span>
                    80 giây
                  </span>
                </li>
                <li>
                  số câu đúng : <span>
                    2/4
                  </span>
                </li>
              </ul>
            </div>
            <div className="btn__control__open">
              <button className='btn__open__prew'>
                Làm lại
              </button>
              <button className='btn__open__next'>
                ôn lại bài
              </button>
              <button className='btn__close__open'>
                quay lại lớp học
              </button>
            </div>
          </div>
          <div className="list__answered">
          <div className='title__list__answered'>
            <p>
              danh sach cau on tap
            </p>
          </div>
          <ol className='list__answered__result'>
            <li>
              <div className="question__list__result">

                <p>
                  <i className="fa-solid fa-volume-high"></i>  I love reading books and I have read all the must-reads.
                </p>

              </div>
              <div className='transe__answered__list__oral__seven'>
                <div>
                  <p>
                  Tôi thích đọc sách và đã đọc tất cả những cuốn sách nên đọc rồi.                  </p>
                </div>
                <div>
                  <i className="fa-solid fa-xmark"></i>
                </div>
              </div>

            </li>

          </ol>
        </div>
        </div> */}
       
      </div>
      <NavOral />
    </div>
  )
}

export default OralSeven
