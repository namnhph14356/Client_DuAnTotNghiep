import React from 'react'

const ExemVocabulary = () => {
    return (
        <div>
            <div className="exem__vocabulary__quiz">
                <div className="node__excem__quiz">
                    <h1>
                        Bài thi Từ vựng cơ bản Tuần 1
                    </h1>
                    <p>
                        - Hãy gõ từ hoặc cụm từ tương ứng nghĩa tiếng Việt vào ô trống và bấm Enter (hoặc click nút Câu tiếp theo) để chuyển sang câu tiếp theo.
                    </p>
                    <p>
                        - Khi hoàn thành bài thi trước thời hạn, bạn có thể bấm nút Nộp bài để kiểm tra kết quả. Khi hết thời gian, chương trình tự động tính kết quả bất kể bạn đã làm xong bài hay chưa.                    </p>
                </div>
                <div className="exam__content__quiz">
                    <div className="activity__contents">
                        <table className='table__user'>
                            <tbody>

                                <tr>
                                    <td className='first__col__voca text-xl'>
                                        Hỏi
                                    </td>
                                    <td className='text-2xl font-bold py-8 font-mono'>
                                        Đi dạo
                                    </td>
                                </tr>
                                <tr>
                                    <td className='first__col__voca text-xl'>
                                        Trả lời
                                    </td>
                                    <td>
                                        <input type="text" />
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                    <div className='flex justify-between mt-4'>
                        <div className="bnt__control__exem__quiz">
                            <button className='btn__next__quiz__voca'>
                                Câu tiếp theo
                            </button>
                            <button>
                                Nộp bài
                            </button>
                        </div>
                        <div className="status__exem__quiz">
                            <p>Số câu : <span>1/14</span></p>
                            <p>Thời gian : <span>147</span></p>
                        </div>
                    </div>

                </div>
                <div className="lst__answered__oral__vocabulary">
                    <div className="header__list__ansered__oral">
                        <p>Danh sách các câu đã làm</p>
                    </div>
                    <div className='mt-5 border-b-2 border-slate-200'>
                        <div className='item__result__answerd'>
                            <h2> <span>1 .</span> Môn thể thao</h2>
                        </div>
                        <div className="ml-9 text-lg">
                            <p>
                                sport
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="result__exam__info">
                <h1>
                    Kết quả
                </h1>
                <div className='text-base '>
                    <p className='font-semibold'>Số điểm :<span className='text-xl'> 0 điểm</span></p>
                </div>
                <div className='text-base '>
                    <p className='font-semibold'>Thời gian hoàn thành  :<span className='text-xl'> 0 điểm</span></p>
                </div>
                <div className='text-base '>
                    <p className='font-semibold'>Số câu đúng :<span className='text-xl'> 0 điểm</span></p>
                </div>
                <div className="btn__control__result__exem">
                    <button>Lưu điểm</button>
                    <button>Làm lại</button>
                    <button>Quay lại lớp học</button>
                </div>
            </div>
        </div>
    )
}

export default ExemVocabulary