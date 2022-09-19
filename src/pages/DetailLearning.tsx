
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams, NavLink } from 'react-router-dom';
import { detailCategory } from '../api/category';
import AdverDeatil from '../components/AdverDeatil';
import Footer from '../components/Footer';
import HeaderComponent from '../components/HeaderHome';
import NavDeatil from '../components/NavDeatil';

const DetailLearning = () => {

    const { pathname } = useLocation();
    const navigate = useNavigate();
    const { id }: any = useParams()
    const [speak, setSpeak] = useState()
    const [quiz, setQuiz] = useState()
    const [listenWrite, setListenWrite] = useState()

    useEffect(() => {
        const getQuiz = async () => {
            const { data } = await detailCategory(id)
            console.log(data);
        }
        getQuiz()
    }, [id])

    return (
        <div>
            <HeaderComponent />
            <div className='box__deatil__learning__main'>

                <NavDeatil />

                <div className="main__topic col-span-7">
                    <div className='box__main__topic'>
                        <h2 className="title__deatial__learning">
                            Giới thiệu
                        </h2>
                        <p className='info__topic'>
                            Các em hãy làm theo yêu cầu của chương trình dù có phải làm bài tập lại, thi lại bao nhiêu lần đi nữa. Chương trình được thiết kế để các em nhớ bài nhiều nhất có thể trước khi học sang bài mới. Các em có thể học một bài trong nhiều ngày, không cần phải học nhanh. Nếu làm bài chưa đạt, hãy làm lại cho đến khi đạt được yêu cầu về thời gian và điểm số.                </p>
                        <p className='info__topic'>
                            Khi học 3 câu thông dụng và các câu hỏi trong ngày, hãy tận dụng thời gian rảnh rỗi để đọc to mỗi câu ít nhất 200 lần trước khi học sang các câu mới. Chắc chắn chương trình này sẽ giúp các em giỏi tiếng Anh!                </p>


                        <div className="box__list__detail">
                            <ul>
                                <li>
                                    <NavLink style={{ color: '#fff' }} to={`/learning/detailLearning/${id}/speak`}> 
                                        Khởi động
                                        <i className="fa-solid fa-angle-right"></i>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink style={{ color: '#fff' }} to={`/learning/detailLearning/${id}/quiz`}> 
                                        Hỏi và đáp
                                        <i className="fa-solid fa-angle-right"></i>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink style={{ color: '#fff' }} to={`/learning/learning/detailLearning/${id}/writeAndListen`}>
                                        Nghe và trả lời
                                        <i className="fa-solid fa-angle-right"></i>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <AdverDeatil />


            </div>
            
        </div>
    )
}

export default DetailLearning