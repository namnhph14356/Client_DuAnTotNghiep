import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getUserNote } from "../../api/noteCouse";
import MenuVocab from "../../components/VocabConponent/MenuVocab";
import { NoteCouseType } from "../../types/noteCouse";
import { ReactDimmer } from "react-dimmer";
import Update from "./update";
import { useDispatch, useSelector } from "react-redux";
import { getNoteUser } from "../../features/Slide/note/NoteSlice";
import { setConstantValue } from "typescript";
import { store } from "../../app/store";
type  Props = {
}
const Note = () => {
  const dataForm = useSelector<any, any>(data => data.noteCouse.value )  
  const [value, setValue] = useState<any>();
  const [isModal, setIsModal] = useState(false);
  const dispatch = useDispatch()
  const userId = "6329d7cdfe189857201a8ce4";
  const dayId = "day16"
  useEffect(() => {
    const getText = async () => {
      const {payload} =await dispatch(getNoteUser({dayId, userId}));
      
      setValue(payload);
    };
    getText();
  },[dayId]);
const triggerModal = () => {
  setIsModal((prevState) => !prevState)
}

  return (
    <>
    {/* <MenuVocab /> */}
    <div className="w-full h-auto bg-[#faf8dd] py-4 px-4 mt-6 rounded-xl">
      <div className="grid grid-cols-2 text-xl font-lg border-b-[1.5px] text-[#666] pb-2">
        <span className="grid justify-items-start">Ghi chú bài học</span>
        <button onClick={()=>triggerModal()}   className="grid justify-items-end" >
        <i className="fa-regular fa-pen-to-square"></i>
        </button>
      </div>
      <div className="mt-2">
        {" "}
        {dataForm?.text ? (
          <span dangerouslySetInnerHTML={{__html:`${dataForm?.text}`}}></span>
        ) : (
          <i>
            Hãy ghi chú những điểm tâm đắc hay cần lưu ý về bài học để tham khảo
            sau này.
          </i>
        )}
      </div>
    </div>
          
    {isModal && <Update dataForm={dataForm ? dataForm : ""}/>}

          <ReactDimmer
            isOpen={isModal}
            exitDimmer={setIsModal}
            zIndex={100}
            blur={1}
      
          />
    </>
  );
};

export default Note;
