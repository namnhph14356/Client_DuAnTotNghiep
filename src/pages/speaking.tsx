import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { listVocabulary } from "../api/vocabulary";
import AdverDeatil from "../Component/AdverDeatil";
import Footer from "../Component/Footer";
import HeaderComponent from "../Component/HeaderHome";
import NavDeatil from "../Component/NavDeatil";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { VocabulatyType } from "../types/vocabularyType";
import { getDetailTopic } from "../api/topicVocabulary";
import { TopicVocabulary } from "../types/topicVocabulary";
import Sound from "../Component/sound";

const SpeakingPage = () => {
  const [value, setValue] = useState<VocabulatyType[]>([]);
  const [_category, setTopic] = useState<TopicVocabulary>();
  const [valueLast, setValueLast] = useState<any>();
  const lastElement = {
    meaning:
      "Chúc mừng em đã hoàn tất 6 từ vựng của ngày hôm nay. Hãy nhớ phát âm cho chính xác như giọng giáo viên và bất kỳ lúc nào có thời gian, dù đang ở đâu, em hãy nói to từng từ thật nhiều lần cho thật nhuần nhuyễn nhé. Bây giờ, em đã sẵn sàng làm bài tập chưa? Nếu chưa sẵn sàng, hãy bấm vào góc lật trang bên trái để ôn lại các từ của ngày hôm nay nhé. Còn nếu đã sẵn sàng, hãy bấm vào nút “Làm bài tập 1” màu cam để tiếp tục",
    image: "1.jpg",
    status: 1,
  };

  console.log(_category);
  console.log(value);
  const id = "6329714e7cf1a7383fd1e0b9";
  useEffect(() => {
    const getData = async () => {
      const { data } = await getDetailTopic(id);
      const valueVocabulary = data.vocabulary;
      setTopic(data?.topic);
      setValue(valueVocabulary);
      setValueLast({ ...valueVocabulary, lastElement });
    };
    getData();
  }, []);

  console.log(valueLast);

  // Lối phần tử last slide vào mảng slide cũ
  return (
    <div>
      <HeaderComponent />
      <div className="box__deatil__learning__main">
        <NavDeatil />
        <div className="main__topic col-span-7">
          <div className="desc__title__cocabulary">
            <h2>
              Vocabulary /{" "}
              <span className="text-lg text-[#A93226] font-bold">
                {_category?.name}
              </span>
            </h2>
          </div>
          <Carousel showIndicators={false}>
            {value?.map((item, index) => {
              console.log(item.wordForm);

              return (
                <>
                  <div className="box__header__topic">
                    <button className="btn__volume__vocabulary">
                      <i className="fa-solid fa-volume-high"></i>
                    </button>
                    <Sound />
                  </div>

                  <div className="info__vocabulry">
                  <h3 className="vocabulary__speaking text-2xl font-bold">
                        {item.words}
                      </h3>

                      <p className="text-lg font-bold text-center">
                        (
                        {item.wordForm === "1"
                          ? "Nouns"
                          : item.wordForm === "2"
                          ? "Adj"
                          : item.wordForm === "3"
                          ? "Adv"
                          : item.wordForm === "4"
                          ? "Verbs"
                          : ""}
                        )
                      </p>
                  </div>
                <div className="flex justify-center">
                  <div className="w-6/12 ml-4">
                    <img
                      className="image__vocabula w-[100px] h-[150px] rounded-lg"
                      src={item.image}
                      alt=""
                    />
                  </div>
                  <div className="w-6/12">
                      <p className="text-3xl font-bold">{item.meaning}</p>
                    </div>
                    </div>
                  {/* <div className='box__btn__question'>
                        <button className='btn__next__question'>
                            Tiếp tục
                        </button>
                    </div> */}
                </>
              );
            })}
          </Carousel>
          <div className="box__list__detail">
            <ul>
              <li>
                <NavLink style={{ color: "#fff" }} to={"/detailLearning/speak"}>
                  {" "}
                  Khởi động
                  <i className="fa-solid fa-angle-right"></i>
                </NavLink>
              </li>
              <li>
                <NavLink style={{ color: "#fff" }} to={"/detailLearning/quiz"}>
                  {" "}
                  Hỏi và đáp
                  <i className="fa-solid fa-angle-right"></i>
                </NavLink>
              </li>
              <li>
                <NavLink
                  style={{ color: "#fff" }}
                  to={"/detailLearning/writeAndListen"}
                >
                  {" "}
                  Nghe và trả lời
                  <i className="fa-solid fa-angle-right"></i>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <AdverDeatil />
      </div>
    </div>
  );
};

export default SpeakingPage;
