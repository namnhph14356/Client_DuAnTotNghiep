import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { listVocabulary } from "../api/vocabulary";
import Footer from "../Component/Footer";
import HeaderComponent from "../Component/HeaderHome";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { VocabulatyType } from "../types/vocabularyType";
import { getDetailTopic } from "../api/topicVocabulary";
import { TopicVocabulary } from "../types/topicVocabulary";
import NavDeatil from "../components/NavDeatil";
import Sound from "../components/sound";
import AdverDeatil from "../components/AdverDeatil";
import { useSpeechSynthesis } from "react-speech-kit";
import { speakInput } from "../midlerware/LearningListenWrite";
import "../css/speaking.css";
import Menu from "../components/Menu";

const SpeakingPage = () => {
  const [value, setValue] = useState<VocabulatyType[]>([]);
  const [_category, setTopic] = useState<TopicVocabulary>();
  const [valueLast, setValueLast] = useState<any>();
  const lastElement = {
    name: `Chúc mừng em đã hoàn tất ${
      value.length != null ? value.length : "demo"
    } từ vựng của ngày hôm nay. Hãy nhớ phát âm cho chính xác như giọng giáo viên và bất kỳ lúc nào có thời gian, dù đang ở đâu, em hãy nói to từng từ thật nhiều lần cho thật nhuần nhuyễn nhé. Bây giờ, em đã sẵn sàng làm bài tập chưa? Nếu chưa sẵn sàng, hãy bấm vào góc lật trang bên trái để ôn lại các từ của ngày hôm nay nhé. Còn nếu đã sẵn sàng, hãy bấm vào nút “Làm bài tập 1” màu cam để tiếp tục`,
    image:
      "https://media.istockphoto.com/photos/silhouette-of-a-man-holding-a-trophy-at-sunset-picture-id1202740292?b=1&k=20&m=1202740292&s=612x612&w=0&h=WNQasYubjIswIKcQxq5guDI4z5ca0lttDZDrT3VzmjY=",
    status: 1,
  };
  const { speak } = useSpeechSynthesis();
  // get id of topic
  const id = "6329714e7cf1a7383fd1e0b9";
  useEffect(() => {
    const getData = async () => {
      const { data } = await getDetailTopic(id);
      const valueVocabulary = data.vocabulary;
      setTopic(data?.topic);
      setValue(valueVocabulary);
      // Merch slide end
      setValueLast([...valueVocabulary, lastElement]);
    };
    getData();
  }, []);

  console.log(value.length);

  console.log(valueLast);

  // Lối phần tử last slide vào mảng slide cũ
  return (
    <div>
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
            {valueLast?.map((item, index) => {
              console.log(item.wordForm);

              return (
                <>
                  <div className="box__header__topic">
                    <button
                      className="btn__volume__vocabulary"
                      onClick={() =>
                        speak({
                          text: item.words,
                          rate: 0.3,
                          pitch: 0.5,
                          voices:
                            "en-US - Microsoft Zira - English (United States)",
                        })
                      }
                    >
                      <i className="fa-solid fa-volume-high"></i>
                    </button>

                    <h3 className="vocabulary__speaking text-2xl font-bold">
                      {item.words ? item.words : "Congratulations"} -
                      <span className="text-gray-400 text-xl">
                        {item.pa ? item.pa : ""}
                      </span>
                    </h3>

                    {/* <div className="right">
                      [<span className="font-bold text-orange-600 text-xl">
                        {item.place == 0 ? "UK" : "US"}
                      </span>]
                    </div> */}

                    <div className="info__vocabulry">
                      <span className="text-lg font-bold text-center">
                      <strong>-</strong>
                        {item.wordForm === "1"
                          ? "(Danh từ)"
                          : item.wordForm === "2"
                          ? "(Tính từ)"
                          : item.wordForm === "3"
                          ? "(Động từ)"
                          : item.wordForm === "4"
                          ? "(Verbs)"
                          : ""}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <div className="w-4/12 ml-4 mt-6">
                      <div className="text-2xl text-left font-bold text-orange-600 mt-4">
                        {item.meaning}
                      </div>
                      <img
                        className="image__vocabula w-[120px] h-[200px] rounded-lg"
                        src={item.image}
                        alt=""
                      />
                    </div>
                    <div className="w-7/12 my-auto">
                      {item.example ? (
                        <p className="text-lg font-bold px-12">
                          {item.example}
                        </p>
                      ) : (
                        <>
                          <p className=" font-bold mt-6">{item.name}</p>
                          <NavLink
                            to={"/learning/detailLearning/grammar"}
                            className="font-bold text-white bg-gradient-to-r from-[#6078ea] to-[#17ead9]  rounded p-2 mt-8 border-orange-500 hover:to-[#ff9933] "
                          >
                            Next Level
                          </NavLink>
                        </>
                      )}
                    </div>
                  </div>
                </>
              );
            })}
          </Carousel>
          <Menu />
        </div>
        <AdverDeatil />
      </div>
    </div>
  );
};

export default SpeakingPage;
