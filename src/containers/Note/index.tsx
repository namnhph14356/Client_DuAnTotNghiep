import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getUserNote } from "../../api/noteCouse";
import MenuVocab from "../../components/VocabConponent/MenuVocab";
import { NoteCouseType } from "../../types/noteCouse";

const Note = () => {
  const [text, setText] = useState<NoteCouseType>();
  const userId = "62d6f40c1649dde5e7d58458";
  const dayId = "somethink";
  useEffect(() => {
    const getText = async () => {
      const { data } = await getUserNote(dayId, userId);
      setText(data);
    };
    getText();
  },[]);

  return (
    <>
    {/* <MenuVocab /> */}
    <div className="w-full h-auto bg-[#faf8dd] py-4 px-4 mt-6 rounded-xl">
      <div className="grid grid-cols-2 text-xl font-lg border-b-[1.5px] text-[#666] pb-2">
        <span className="grid justify-items-start">Ghi chú bài học</span>

        <NavLink to={`/learning/detailLearning/:id/vocabulary/updateNote/${text?._id ? text._id : ""}`} className="grid justify-items-end" >
        <i className="fa-duotone fa-notebook"></i>
        click
        </NavLink>
      </div>
      <div className="mt-2">
        {" "}
        {text?.text ? (
          <span dangerouslySetInnerHTML={{__html:`${text?.text}`}}></span>
        ) : (
          <i>
            Hãy ghi chú những điểm tâm đắc hay cần lưu ý về bài học để tham khảo
            sau này.
          </i>
        )}
      </div>
    </div>
    </>
  );
};

export default Note;
