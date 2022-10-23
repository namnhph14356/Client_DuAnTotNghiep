/* eslint-disable no-restricted-globals */
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { detailSentence } from '../../api/sentence'
import { SentenceType } from '../../types/sentence'


const arraySentences = [
    {
        id: 1,
        title: 'I had a nightmare last night and I lost sleep 1',
        order: 1
    },
    {
        id: 2,
        title: 'hello bay be',
        order: 2
    },
    {
        id: 4,
        title: 'oh my goood',
        order: 3
    }
]

const DetailSentence = () => {

    // const {_id} = useParams()

    // const [sentence , setSenstence] = useState<SentenceType[]>([])

    // const handleGetSentence = async() => {
    //     const {data} = await detailSentence(_id)
    //     console.log('detail', data);

    //     setSenstence(data)
    // }

    // useEffect(() => {
    //     handleGetSentence()
    // }, [_id])

    const [sentences, setSenstences] = useState(arraySentences[0])

    const preDetail = (prew: number) => {
        const itemPre = arraySentences.filter((item) => item.order === prew)
        setSenstences(itemPre[0])
    }

    const nextDetail = (next: number) => {
        const itemNext = arraySentences.filter((item) => item.order === next)
        setSenstences(itemNext[0])
    }
    const navigate = useNavigate()


    return (
        <div className="content__detail__sentences">
            <div>
                <div className="">
                    <button onClick={() => navigate(-1)} className='btn__close__sentences'>
                    Quay lại
                </button>
                <button onClick={() => preDetail(sentences.order - 1)} disabled={sentences.order <= 1 ? true : false} className='btn__pre__sentences'>
                    Câu trước
                </button>
                <button onClick={() => nextDetail(sentences.order + 1)} className='btn__next__sentences'>
                    Câu sau
                </button>
            </div>
            <div className="content__detail__main">

                <div className="topic__sentence">
                    <h3 className="title__topic__sentence">
                        <i className="fa-solid fa-volume-high"></i> {sentences.title}
                    </h3>
                    <p>
                        <i className="fa-solid fa-volume-high"></i>  /aɪ hæd ə naɪt.mer læst naɪt ænd aɪ lɑːst sliːp/
                    </p>
                    <p className="phonetic__vn__sentence">
                        Tối qua, tôi gặp ác mộng rồi mất ngủ luôn.
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
                                    <td>
                                        <i className="fa-solid fa-volume-high"></i> am 1
                                    </td>
                                    <td>
                                        <i className="fa-solid fa-volume-high"></i> am 1
                                    </td>
                                    <td>
                                        <i className="fa-solid fa-volume-high"></i> am 1
                                    </td>
                                    <td>
                                        <i className="fa-solid fa-volume-high"></i> am 1
                                    </td>
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
                    <div className="item__Content__structural">
                        <p>
                            to <span>have a nightmare</span> = gặp ác mộng, mơ thấy ác mộng
                        </p>
                        <div className="translate__structural">
                            <p>
                                I'm afraid of having a nightmare.
                            </p>
                            <p>  Tôi sợ mơ thấy ác mộng.</p>
                        </div>
                    </div>
                    <div className="item__Content__structural">
                        <p>
                            to <span>have a nightmare</span> = gặp ác mộng, mơ thấy ác mộng
                        </p>
                        <div className="translate__structural">
                            <p>
                                I'm afraid of having a nightmare.
                            </p>
                            <p>  Tôi sợ mơ thấy ác mộng.</p>
                        </div>
                    </div>

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