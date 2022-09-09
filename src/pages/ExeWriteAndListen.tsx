/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import HeaderComponent from '../Component/HeaderHome'
import './../css/writeAndListen.css'

const ExeWriteAndListen = () => {
    return (
        <div>
            <HeaderComponent />
            <div className='main__quiz__topic'>


                <div className="br__main__write__listen">
                    <div className="desc__title__cocabulary">
                        <h2>
                            vocabulary <span>


                                /   tên Chủ đề 1
                            </span>
                        </h2>


                    </div>

                    <div className="pd__box__write__listen">
                        <div className='info__write__listen'>
                            <p><i className="fa-solid fa-pen"></i> Nghe và điền vào chỗ trống.</p>
                        </div>
                        <div className="audio__listen">
                            <audio
                                controls
                                src="http://res.cloudinary.com/chanh-thon/video/upload/v1659464441/upload_preset/q0jdgn5b59x7sqql90cv.mp3">
                                Your browser does not support the
                                <code>audio</code> element.
                            </audio>
                        </div>

                        <div className="conversation__box">
                            <p>
                                <strong>Linda:</strong>
                                <span>
                                    Today we are <input className='inp__text' type="text" name="" id="" />
                                    the argument that school uniforms are a good idea. First we will hear from the supporting side, and then the opposition will
                                </span>
                            </p>
                            <p>
                                <strong>Peter:</strong>
                                <span>
                                    Today we are <input className='inp__text' type="text" name="" id="" />
                                    the argument that school uniforms are a good idea. First we will hear from the supporting side, and then the opposition will
                                </span>
                            </p>
                            <p>
                                <strong>Linda:</strong>
                                <span>
                                    Today we are <input className='inp__text' type="text" name="" id="" />
                                    the argument that school uniforms are a good idea. First we will hear from the supporting side, and then the opposition will
                                </span>
                            </p>
                            <p>
                                <strong>Linda:</strong>
                                <span>
                                    Today we are <input className='inp__text' type="text" name="" id="" />
                                    the argument that school uniforms are a good idea. First we will hear from the supporting side, and then the opposition will
                                </span>
                            </p>
                            <p>
                                <strong>Linda:</strong>
                                <span>
                                    Today we are <input className='inp__text' type="text" name="" id="" />
                                    the argument that school uniforms are a good idea. First we will hear from the supporting side, and then the opposition will
                                </span>
                            </p>
                        </div>
                        <div className="btn__Check__answer">
                            <button>
                                Kiểm tra
                            </button>
                        </div>


                        {/* check result */}


                        <div className="conversation__box">
                            <p>
                                <strong>Linda:</strong>
                                <span>
                                    Today we are <input className='text__result__wrong' type="text" name="" id="" value={"go to"} />
                                    the argument that school uniforms are a good idea. First we will hear from the supporting side, and then the opposition will
                                </span>
                            </p>
                            <p>
                                <strong>Peter:</strong>
                                <span>
                                    Today we are <input className='text__result__correct' type="text" name="" id="" value={"oh my good"} />
                                    the argument that school uniforms are a good idea. First we will hear from the supporting side, and then the opposition will
                                </span>
                            </p>
                            <p>
                                <strong>Linda:</strong>
                                <span>
                                    Today we are <input className='text__result__wrong' type="text" name="" id="" value={"what "} />
                                    the argument that school uniforms are a good idea. First we will hear from the supporting side, and then the opposition will
                                </span>
                            </p>
                            <p>
                                <strong>Linda:</strong>
                                <span>
                                    Today we are <input className='text__result__correct' type="text" name="" id="" value={"realy"} />
                                    the argument that school uniforms are a good idea. First we will hear from the supporting side, and then the opposition will
                                </span>
                            </p>
                            <p>
                                <strong>Linda:</strong>
                                <span>
                                    Today we are <input className='text__result__correct' type="text" name="" id="" value={"fuck"} />
                                    the argument that school uniforms are a good idea. First we will hear from the supporting side, and then the opposition will
                                </span>
                            </p>
                        </div>
                        <div className="answer__result">
                            <p>
                                <i className="fa-solid fa-medal"></i>
                                Bạn đã trả lời đúng : 2/10
                            </p>
                            <button className='btn__detail__result'>
                                xem chi tiết
                            </button>
                        </div>


                        {/* listed result */}


                        <div className="conversation__box">
                            <table className='table__list__result'>
                                <thead>
                                    <tr>
                                        <th>
                                            .......
                                        </th>
                                        <th>
                                            câu trả lời của bạn
                                        </th>
                                        <th>
                                            Câu trả lời chính xác
                                        </th>
                                        <th>

                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='body__table__result'>
                                    <tr>
                                        <td>
                                            01
                                        </td>
                                        <td className='correct__text__writer'>
                                            Go to
                                        </td>
                                        <td>
                                            Go to
                                        </td>
                                        <td>
                                            <i className="fa-solid fa-thumbs-up result__correct__icon"></i>                            </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            01
                                        </td>
                                        <td className='woring__text__writer'>
                                            Go to
                                        </td>
                                        <td>
                                            Go to
                                        </td>
                                        <td>
                                            <i className="fa-solid fa-circle-xmark result__wrong__icon"></i>                          </td>
                                    </tr>
                                </tbody>
                                <tr className='result__medium'>
                                    <td>
                                        13:22 20/12/2022
                                    </td>
                                    <td>

                                    </td>
                                    <td>
                                        1/12
                                    </td>
                                    <td>
                                        Chưa đạt yêu cầu
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div className="back__wep__close">
                            <button>
                                Trở lại
                            </button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ExeWriteAndListen