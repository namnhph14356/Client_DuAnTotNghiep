/* eslint-disable no-lone-blocks */


import { Collapse, Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams, NavLink } from 'react-router-dom';
import { detailCategory } from '../api/category';
import AdverDeatil from '../components/AdverDeatil';
import '../css/detailLearning.css'

const DetailLearning = () => {
  const { id }: any = useParams()
  const [dateLearning, setDateLearning] = useState(false)

  const handleOk = () => {
    setDateLearning(false);
  };

  const handleCancel = () => {
    setDateLearning(false);
  };
  useEffect(() => {
    const getQuiz = async () => {
      const { data } = await detailCategory(id)
      console.log(data);
    }
    getQuiz()
  }, [id])

  return (
    <div>
      <div className='box__deatil__learning__main'>
        <div className="main__topic col-span-9 w-full">
          <div className='box__main__topic'>
            <h2 className="title__deatial__learning">
              Giới thiệu lớp tiếng Anh cho trẻ em
            </h2>
            <p className='info__topic'>
              Các em hãy làm theo yêu cầu của chương trình dù có phải làm bài tập lại, thi lại bao nhiêu lần đi nữa. Chương trình được thiết kế để các em nhớ bài nhiều nhất có thể trước khi học sang bài mới. Các em có thể học một bài trong nhiều ngày, không cần phải học nhanh. Nếu làm bài chưa đạt, hãy làm lại cho đến khi đạt được yêu cầu về thời gian và điểm số.                </p>
            <p className='info__topic'>
              Khi học 3 câu thông dụng và các câu hỏi trong ngày, hãy tận dụng thời gian rảnh rỗi để đọc to mỗi câu ít nhất 200 lần trước khi học sang các câu mới. Chắc chắn chương trình này sẽ giúp các em giỏi tiếng Anh!                </p>
          </div>

          <div className="box__list__detail">
            <NavLink to={`/learning/detailLearning/${id}/speak`} >
              <p className='text-lg'>Bắt đầu học</p>
              <div className='mt-2'>
                <p className='text-2xl'><span className='font-bold'> Tuần 1</span> <i className="fa-solid fa-caret-right"></i> Ngày 1</p>
              </div>
            </NavLink>
          </div>

          <div >
            <div className="dateLearning" onClick={() => setDateLearning(true)} >
              <button className='  space-x-2'>
                <i className="fa-solid fa-bars " ></i>
                <span>CHỌN NGÀY HỌC</span>
              </button>
            </div>
          </div>
          {dateLearning == true ?

            <Modal title="Tuần 1" visible={dateLearning} onOk={handleOk} onCancel={handleCancel} width={'60%'} >
              <div className='flex justify-between mb-4'>
                <div className='font-bold'>Điểm trung bình: 4.0</div>
                <div className='font-bold'>Đây là tuần học mới nhất</div>
              </div>
              <Collapse defaultActiveKey={['1']} style={{ width: "100%", borderBottom: "1px solid #d9d9d9" }} >
                <div>
                  <div className="conversation__box">
                    <ul className='divide-y divide-gray-300 m-0'>
                      <li >
                        <div className='flex justify-between'>
                          <div className='flex gap-4 '>
                            <div className='w-24  h-full relative bg-green-500'>
                              <div className='h-full absolute top-[35%] right-[30%] text-white'>Ngày 1</div>
                            </div>
                            <div className='py-3 text-xs text-gray-600'>
                              <div>Số câu khởi động: 1</div>
                              <div>Điểm bài tập Quiz: 10</div>
                              <div>Điểm bài tập nghe và viết: 10</div>
                              <div>Điểm trung bình: 10 Điểm</div>
                            </div>

                          </div>
                          <div className='px-4 my-auto'>
                            <div className='text-green-500'>Đã hoàn thành</div>
                            <button className='bg-green-500 py-1 px-3 text-white'>Xem lại bài</button>
                          </div>

                        </div>
                      </li>
                      <li >
                        <div className='flex justify-between'>
                          <div className='flex gap-4 '>
                            <div className='w-24  h-full relative bg-green-500'>
                              <div className='h-full absolute top-[35%] right-[30%] text-white'>Ngày 1</div>
                            </div>
                            <div className='py-3 text-xs text-gray-600'>
                              <div>Số câu khởi động: 1</div>
                              <div>Điểm bài tập Quiz: 10</div>
                              <div>Điểm bài tập nghe và viết: 10</div>
                              <div>Điểm trung bình: 10 Điểm</div>
                            </div>

                          </div>
                          <div className='px-4 my-auto'>
                            <div className='text-green-500'>Đã hoàn thành</div>
                            <button className='bg-green-500 py-1 px-3 text-white'>Xem lại bài</button>
                          </div>

                        </div>
                      </li>
                      <li >
                        <div className='flex justify-between'>
                          <div className='flex gap-4 '>
                            <div className='w-24  h-full relative bg-green-500'>
                              <div className='h-full absolute top-[35%] right-[30%] text-white'>Ngày 1</div>
                            </div>
                            <div className='py-3 text-xs text-gray-600'>
                              <div>Số câu khởi động: 1</div>
                              <div>Điểm bài tập Quiz: 10</div>
                              <div>Điểm bài tập nghe và viết: 10</div>
                              <div>Điểm trung bình: 10 Điểm</div>
                            </div>

                          </div>
                          <div className='px-4 my-auto'>
                            <div className='text-green-500'>Đã hoàn thành</div>
                            <button className='bg-green-500 py-1 px-3 text-white'>Xem lại bài</button>
                          </div>

                        </div>
                      </li>

                    </ul>
                  </div>
                </div>
              </Collapse>
            </Modal>
            : ""}
        </div>

        <div className="col-span-3 advertisement__source__learning">
          <AdverDeatil />
        </div>
      </div>
    </div>
  )
}

export default DetailLearning

{/* <table className='table__list__result'>

<tbody className='body__table__result '>
  <tr >
    <td>{index + 1}</td>
    <td className={checkAnswerIscorrect(item.idQuestion, item.keyQuestion)}>{item.answerUser}</td>
    <td className='correct__text__writer'>{item.answerCorrect} </td>
    <td>{item.isCorrect == true
      ? <i className="fa-solid fa-thumbs-up result__correct__icon"></i>
      : <i className="fa-solid fa-circle-xmark result__wrong__icon"></i>}</td>
  </tr>
</tbody>
<tfoot className='border-t'>
  <tr className='result__medium'>
    <td>Kết quả:</td>
    <td> </td>
    <td><span className='font-bold'>{numTrueAnswer}/{convertValues.length}</span></td>
    <td>Chưa đạt yêu cầu</td>
  </tr>
</tfoot>
</table> */}