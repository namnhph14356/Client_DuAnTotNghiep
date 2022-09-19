import React from 'react'

const AdverDeatil = () => {
    return (
        <div className="col-span-3 advertisement__source__learning">
      
            <h2 className="title__adver__source">
                Học tiếng anh cùng evan
            </h2>
            <div className="price__surce__learing">

                <p>
                    <i className="fa-solid fa-dollar-sign"></i>
                    1,435,500 vnd <span>
                        GÓI VOGUE PRO TRỌN ĐỜI
                    </span>
                </p>
                <button className='btn__cart__adver'>
                    <i className="fa-solid fa-cart-shopping"></i>
                    Thanh toán
                </button>
            </div>

            <div className="info__adver__learning">
                <div className="title__info__adver">
                    Kiểm tra trình độ
                </div>
                <div className="menu__info__adver">
                    <div className="item__menu__info__adver">
                        <h3>
                            Level 1
                        </h3>
                        <p>
                            Làm chủ bảng phiên âm IPA, nâng cao
                            vốn từ vựng, kỹ năng nghe và giao tiếp
                            được các chủ đề cơ bản
                        </p>
                    </div>
                    <div className="item__menu__info__adver">
                        <h3>
                            Level 2
                        </h3>
                        <p>
                            Luyện phản xạ nâng cao trong tiếng Anh
                            Luyện các chủ đề chuyên sâu, học thực tế:
                            1 buổi lý thuyết – 1 buổi thực hành
                            Tự tin thuyết trình bằng tiếng Anh trước đám đông
                        </p>
                    </div>
                    <div className="item__menu__info__adver">
                        <h3>
                            Level 3
                        </h3>
                        <p>
                            Chứng chỉ toeic quốc tế 500-700+
                            Nâng cao kiến thức chuyên môn
                            phục vụ trong công việc và cuộc sống
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AdverDeatil
