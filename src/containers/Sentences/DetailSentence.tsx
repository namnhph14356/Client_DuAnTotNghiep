/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { detailSentence } from '../../api/sentence'
import { SentenceType } from '../../types/sentence'
import parse from "html-react-parser";

const arraySentences = [
  {
    _id: "1",
    title: 'My friend came and I had to take her out for dinner.',
    phuAm: " /aɪ hæd ə naɪt.mer læst naɪt ænd aɪ lɑːst sliːp/",
    meaning: "Bạn tôi đến và tôi phải dắt cô ấy đi ăn tối.",
    structuralAnalysis: '<p><strong style="color: rgb(111, 111, 111);">I hope</strong><span style="color: rgb(111, 111, 111);">&nbsp;(that): thể hiện sự mong mỏi của bạn về điều gì đó</span></p><p><span style="color: rgb(111, 111, 111);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I&nbsp;hope&nbsp;you&nbsp;can&nbsp;come&nbsp;to&nbsp;my&nbsp;birthday&nbsp;party&nbsp;.</span></p><p><span style="color: rgb(111, 111, 111);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tôi hy vọng bạn có thể đến dự tiệc sinh nhật của tôi.</span></p><p><br></p><p><strong style="color: rgb(111, 111, 111);">can&nbsp;</strong><span style="color: rgb(111, 111, 111);">do something = có thể làm gì</span></p><p><span style="color: rgb(111, 111, 111);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I&nbsp;can&nbsp;speak&nbsp;Japanese&nbsp;.</span></p><p><span style="color: rgb(111, 111, 111);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tôi có thể nói tiếng Nhật.</span></p><p><br></p><p><span style="color: rgb(111, 111, 111);">to&nbsp;</span><strong style="color: rgb(111, 111, 111);">get a raise</strong><span style="color: rgb(111, 111, 111);">&nbsp;= được tăng lương</span></p><p><span style="color: rgb(111, 111, 111);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I’ll&nbsp;get&nbsp;a&nbsp;raise&nbsp;this&nbsp;month&nbsp;.</span></p><p><span style="color: rgb(111, 111, 111);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tháng này tôi sẽ được tăng lương.</span></p><p><br></p><p><span style="color: rgb(111, 111, 111);">to&nbsp;</span><strong style="color: rgb(111, 111, 111);">promise</strong><span style="color: rgb(111, 111, 111);">&nbsp;someone (that)&nbsp;= hứa với ai (rằng)</span></p><p><span style="color: rgb(111, 111, 111);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Promise&nbsp;me&nbsp;you’ll&nbsp;be&nbsp;home&nbsp;before&nbsp;dark&nbsp;.</span></p><ol><li><span style="color: rgb(111, 111, 111);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Hứa với em là anh sẽ về nhà trước khi trời tối.</span></li></ol>',
    vocal: [
      { _id: "aa", text: "didn’t" },
      { _id: "bb", text: "couldn’t" },
      { _id: "c", text: "shouldn’t" },
      { _id: "1", text: "didn’t" },
    ],
    order: 1
  },
  {
    _id: "2",
    title: 'I intended to call you back but it just slipped my mind afterwards.',
    phuAm: " /aɪ ɪnˈtendɪd tuː kɑːl juː bæk bʌt ɪt dʒʌst slɪpt maɪ maɪnd ˈæf.t ə.wədz/",
    meaning: "Tôi đã định gọi điện thoại lại cho bạn nhưng sau đó lại quên mất.",
    structuralAnalysis: '<p><strong style="color: rgb(111, 111, 111);">I`m Not</strong><span style="color: rgb(111, 111, 111);">&nbsp;(that): thể hiện sự mong mỏi của bạn về điều gì đó</span></p><p><span style="color: rgb(111, 111, 111);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I&nbsp;hope&nbsp;you&nbsp;can&nbsp;come&nbsp;to&nbsp;my&nbsp;birthday&nbsp;party&nbsp;.</span></p><p><span style="color: rgb(111, 111, 111);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tôi hy vọng bạn có thể đến dự tiệc sinh nhật của tôi.</span></p><p><br></p><p><strong style="color: rgb(111, 111, 111);">can&nbsp;</strong><span style="color: rgb(111, 111, 111);">do something = có thể làm gì</span></p><p><span style="color: rgb(111, 111, 111);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I&nbsp;can&nbsp;speak&nbsp;Japanese&nbsp;.</span></p><p><span style="color: rgb(111, 111, 111);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tôi có thể nói tiếng Nhật.</span></p><p><br></p><p><span style="color: rgb(111, 111, 111);">to&nbsp;</span><strong style="color: rgb(111, 111, 111);">get a raise</strong><span style="color: rgb(111, 111, 111);">&nbsp;= được tăng lương</span></p><p><span style="color: rgb(111, 111, 111);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I’ll&nbsp;get&nbsp;a&nbsp;raise&nbsp;this&nbsp;month&nbsp;.</span></p><p><span style="color: rgb(111, 111, 111);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Hắn ta đã uống đến nôn ói tại bữa tiệc hồi tuần rồi của tôi..</span></p><p><br></p><p><span style="color: rgb(111, 111, 111);">to&nbsp;</span><strong style="color: rgb(111, 111, 111);">promise</strong><span style="color: rgb(111, 111, 111);">&nbsp;someone (that)&nbsp;= hứa với ai (rằng)</span></p><p><span style="color: rgb(111, 111, 111);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Promise&nbsp;me&nbsp;you’ll&nbsp;be&nbsp;home&nbsp;before&nbsp;dark&nbsp;.</span></p><ol><li><span style="color: rgb(111, 111, 111);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Tôi tự hào về cha mẹ mình. Cả hai người đều là những nhà khoa học..</span></li></ol>',
    vocal: [
      { _id: "2", text: "/eks/" },
      { _id: "1", text: "text" },
      { _id: "3", text: "ex" },
      { _id: "4", text: "flex" },
    ],
    order: 2
  },
  {
    _id: "3",
    title: 'I was in a hurry so I couldn t text you.',
    phuAm: "/aɪ wəz ɪn ə ˈhʌ r.i soʊ aɪ ˈkʊd.ənt tekst juː/",
    meaning: "  Tôi vội nên đã không thể nhắn tin cho bạn.",
    structuralAnalysis: '<p><strong style="color: rgb(111, 111, 111);">supervisor </strong><span style="color: rgb(111, 111, 111);">&nbsp;(that): Người đàn ông mặc áo sơ mi xanh là giám sát mới đó.</span></p><p><span style="color: rgb(111, 111, 111);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I&nbsp;hope&nbsp;you&nbsp;can&nbsp;come&nbsp;to&nbsp;my&nbsp;birthday&nbsp;party&nbsp;.</span></p><p><span style="color: rgb(111, 111, 111);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tôi hy vọng bạn có thể đến dự tiệc sinh nhật của tôi.</span></p><p><br></p><p><strong style="color: rgb(111, 111, 111);">can&nbsp;</strong><span style="color: rgb(111, 111, 111);">do something = có thể làm gì</span></p><p><span style="color: rgb(111, 111, 111);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I&nbsp;can&nbsp;speak&nbsp;Japanese&nbsp;.</span></p><p><span style="color: rgb(111, 111, 111);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Tôi có thể nói tiếng Nhật.</span></p><p><br></p><p><span style="color: rgb(111, 111, 111);">to&nbsp;</span><strong style="color: rgb(111, 111, 111);">get a raise</strong><span style="color: rgb(111, 111, 111);">&nbsp;= được tăng lương</span></p><p><span style="color: rgb(111, 111, 111);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I’ll&nbsp;get&nbsp;a&nbsp;raise&nbsp;this&nbsp;month&nbsp;.</span></p><p><span style="color: rgb(111, 111, 111);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  Hắn ta đã uống đến nôn ói tại bữa tiệc hồi tuần rồi của tôi..</span></p><p><br></p><p><span style="color: rgb(111, 111, 111);">to&nbsp;</span><strong style="color: rgb(111, 111, 111);">promise</strong><span style="color: rgb(111, 111, 111);">&nbsp;someone (that)&nbsp;= hứa với ai (rằng)</span></p><p><span style="color: rgb(111, 111, 111);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Promise&nbsp;me&nbsp;you’ll&nbsp;be&nbsp;home&nbsp;before&nbsp;dark&nbsp;.</span></p><ol><li><span style="color: rgb(111, 111, 111);">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Tôi tự hào về cha mẹ mình. Cả hai người đều là những nhà khoa học..</span></li></ol>',
    vocal: [
      { _id: "f", text: "/eɪm/" },
      { _id: "2", text: "came" },
      { _id: "2", text: "aim" },
      { _id: "3", text: "same" },
    ],
    order: 3
  }
]

const DetailSentence = () => {
  const { dayId, id, idDetailSentence } = useParams();
  const [sentences, setSenstences] = useState(arraySentences[0])
  const navigate = useNavigate()
  // const {_id} = useParams()

  // const [sentence , setSenstence] = useState<SentenceType[]>([])

  // const handleGetSentence = async() => {
  //     const {data} = await detailSentence(_id)
  //     console.log('detail', data);

  //     setSenstence(data)
  // }

  useEffect(() => {
    const itemNext = arraySentences.filter((item) => item._id === idDetailSentence)
    setSenstences(itemNext[0])
    // handleGetSentence()
  }, [idDetailSentence])


  const preDetail = (prew: number) => {
    const itemPre = arraySentences.filter((item) => item.order === prew)
    setSenstences(itemPre[0])
  }

  const nextDetail = (next: number) => {
    const itemNext = arraySentences.filter((item) => item._id === idDetailSentence)
    setSenstences(itemNext[0])
  }


  return (
    <div className="content__detail__sentences">
      <div>
        <div>
          <NavLink to={`/learning/${dayId}/detailLearning/${id}/sentences/lesson`}>
            <button className='btn__close__sentences'>
              Quay lại
            </button>
          </NavLink>

          <NavLink to={`/learning/${dayId}/detailLearning/${id}/sentences/lesson/${sentences.order - 1}`}>
            <button className={`btn__pre__sentences ${sentences.order <= 1 ? 'bg-blue-400 hover:bg-blue-400' : ''}`} disabled={sentences.order <= 1 ? true : false}>
              Câu sau
            </button>
          </NavLink>

          <NavLink to={`/learning/${dayId}/detailLearning/${id}/sentences/lesson/${sentences.order + 1}`}>
            <button className={`btn__pre__sentences ${sentences.order >= arraySentences.length ? 'bg-blue-400 hover:bg-blue-400' : ''}`} disabled={sentences.order >= arraySentences.length ? true : false}>
              Câu sau
            </button>
          </NavLink>
        </div>
        <div className="content__detail__main">
          <div className="topic__sentence">
            <h3 className="title__topic__sentence">
              <i className="fa-solid fa-volume-high"></i> {sentences.title}
            </h3>
            <p>
              <i className="fa-solid fa-volume-high"></i>  {sentences.phuAm}
            </p>
            <p className="phonetic__vn__sentence">
              {sentences.meaning}
            </p>
          </div>
          <div className="phonetic__content__detail">
            <div className="table__spelling">
              <p>
                <span>ÂM VÀ TỔ HỢP ÂM CẦN CHÚ Ý LUYỆN TẬP</span>
              </p>
              <table className='table__item__spelling'>
                <tbody>
                  <tr>
                    {sentences.vocal.map((item) => (
                      <td>
                        <i className="fa-solid fa-volume-high"></i> {item.text}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="structural__analysis__detail">
          <h3 className="title__structural">
            PHÂN TÍCH CẤU TRÚC
          </h3>
          <div className="content__structural">
            {parse(sentences.structuralAnalysis)}
          </div>
        </div>
        <div className="">
          <button className='btn__pre__sentences'>
            Câu trước
          </button>
          <button className='btn__next__sentences'>
            Câu sau
          </button>
        </div>
      </div>

    </div >
  )
}

export default DetailSentence