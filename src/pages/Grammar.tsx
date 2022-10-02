import React, { useEffect, useState } from "react";
import { getGrammarDetail } from "../api/grammar";
import AdverDeatil from "../components/AdverDeatil";
import Menu from "../components/Menu";
import NavDeatil from "../components/NavDeatil";
import { GammarType } from "../types/grammar";
import "../css/grammar.css";
import { NavLink } from "react-router-dom";
type Props = {};

const Grammar = (props: Props) => {
  const [grammar, setGrammar] = useState<GammarType>();
  const id = "632eaf3702bab4b8df45f300";
  const image = "https://hocde.vn/wp-content/uploads/2019/09/th%C3%AC-hi%E1%BB%87n-t%E1%BA%A1i-%C4%91%C6%A1n.jpg";
  useEffect(() => {
    const getDeatil = async () => {
      const { data } = await getGrammarDetail(id);
      setGrammar(data);
    };
    getDeatil();
  }, []);
console.log(grammar);

  return (
    <div>
      <div className="box__deatil__learning__main">
        <NavDeatil />
        <div className="main__topic col-span-7">
          <div className="desc__title__cocabulary">
            <h2>
              Grammar / {grammar?.name}
              <span className="text-lg text-[#A93226] font-bold"></span>
            </h2>
          </div>
          {/* <div style={{backgroundImage:`url(${image})`}}></div> */}
          <div className="image__grammar">
          <img src={image} alt="" className="m-auto"/>
          </div>

        <div>
            <h4 className="text-2xl text-center mt-12 font-bold">{grammar?.example}</h4>
        </div>

        <div className="mt-12 ml-12">
            <p className="text-red-600 text-xl font-bold">- Chú ý*</p>
            <span className="text-lg">
                {grammar?.note}
            </span>
        </div>
          <div className="box__btn__question m-auto">
            <NavLink to={"/learning/detailLearning/exerciseDaily"} className="btn__next__question" >Tiếp tục</NavLink>
          </div>

          <Menu />
        </div>
        <AdverDeatil />
      </div>
    </div>
  );
};

export default Grammar;
