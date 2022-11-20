import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { detailDayIdGrammmar } from "../../api/grammar";
import parse from "html-react-parser";
import Loading from "../../components/Loading";
const LessonGrammar = () => {
  const [grammar, setGrammar] = useState<any>();
  const { dayId, id } = useParams();
  useEffect(() => {
    const getData = async () => {
      const { data } = await detailDayIdGrammmar(dayId);
      console.log('data', data);
      setGrammar(data);
    };
    getData();
  }, []);
  return (
    <>
      {
        grammar ?
          <div className="content__grammar">
            <h3 className="title__content__grammar">{grammar?.name}</h3>
            <div className="structure__exercise__grammar">
              {grammar?.description ? parse(grammar?.description) : ""}

              <div className="attention__grammar">
                <h3 className="title__structure__exercise__grammar">III. Tóm tắt</h3>
                <div className="note__attention">
                  <p>{grammar?.summary}</p>
                </div>
              </div>
            </div>
            <div className="next__page__grammar">
              <button>
                <NavLink
                  to={`/learning/${dayId}/detailLearning/${id}/grammar/exercise`}
                  className="text-white hover:text-white"
                >
                  Bài tập
                </NavLink>
              </button>
            </div>
          </div>
          :
          <Loading />
      }
    </>
  );
};

export default LessonGrammar;
