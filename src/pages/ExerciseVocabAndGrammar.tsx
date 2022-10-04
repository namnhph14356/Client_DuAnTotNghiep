import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Menu from "../components/Menu";
import NavDeatil from "../components/NavDeatil";
import { useSpeechSynthesis } from "react-speech-kit";
import { AnswerVocabType, QuestionVocabType } from "../types/answerAndQuestion";
import { getAllQandA, getDetailQandA } from "../api/questionAndAnswer";

type Props = {};

const ExerciseVocabAndGrammar = (props: Props) => {
  const [question, setQuestion] = useState<QuestionVocabType>();
  const [answer, setAnswer] = useState<AnswerVocabType[]>([]);
  const [color, setColor] = useState("");

  const { speak } = useSpeechSynthesis();
  const id = "6335555999bd41ccb5d4b508";
  useEffect(() => {
    const getQandA = async ()=> {
      const {data} = await getDetailQandA(id);
      // const {}
      // const {data} = await getAllQandA()
      // Lấy ra Question
      const dataQ = data.data;
      setQuestion(dataQ)
      // Lấy mảng 
      const dataA = data.answer;
      setAnswer(dataA)
    }
    getQandA();
  },[])
  console.log(question);
  console.log(answer);
  
  const changeScore = (status:any)=>{
    let corect = "text-green-500";
    let inCorect = "text-red-500";
    console.log(status);
      if(status == 1){
        setColor(corect)
      }else{
       setColor(inCorect)
      }
    
  }

  
  return (
   <>
    <div>
      <div className="box__deatil__learning__main">
        <NavDeatil />
        <div className="main__topic col-span-7">
          <div className="desc__title__cocabulary">
            <h1 className="text-white">NGHE TỪ VÀ CHỌN ĐÁP ÁN ĐÚNG</h1>
            <p className="text-white">Câu số {"1"}/{"4"}</p>
          </div>
                <>
                  <div className="w-8/12 m-auto my-8">
                   <p className="font-bold">Câu {"1"}: {question?.questionText}</p>
                  {/* Hiển thị ảnh câu hỏi */}
                   <div>
                      <ul>
                        {answer?.map((item, index) => {
                          return <>
                           <li onClick={() => changeScore(item.inCorect)} className={`answer__vocab`} key={item._id}>
                            <div className={`${color ? color : ""}`}>
                               {item.answerText} 
                            </div>
                          
                            </li>
                          </>
                        })}
                      </ul>
                   </div>
                  </div>
                </>
          <Menu />
        </div>
        {/* <AdverDeatil /> */}
      </div>
    </div>
   </>
  );
};

export default ExerciseVocabAndGrammar;
