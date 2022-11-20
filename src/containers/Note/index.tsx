import { async } from "@firebase/util";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { getUserNote } from "../../api/noteCouse";
import MenuVocab from "../../components/VocabConponent/MenuVocab";
import { NoteCouseType } from "../../types/noteCouse";
import { ReactDimmer } from "react-dimmer";
import { useDispatch, useSelector } from "react-redux";
import { addNote, editNote, getNoteUser } from "../../features/Slide/note/NoteSlice";
import { setConstantValue } from "typescript";
import { RootState, store } from "../../app/store";
import parse from "html-react-parser";
import { UserType } from "../../types/user";
import { Form, message } from "antd";
import ReactQuill from "react-quill";
type Props = {
}
const Note = () => {
  const dataForm = useSelector<any, any>(data => data.noteCouse.value)
  const auth = useSelector(((item: RootState) => item.auth.value)) as UserType
  const [value, setValue] = useState<any>();
  const [isModal, setIsModal] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { dayId } = useParams();

  useEffect(() => {
    const getText = async () => {
      const { payload } = await dispatch(getNoteUser({ dayId, id: auth._id }));
      if (payload) {
        setValue(payload)
      }
    };
    getText();
  }, [dayId]);

  const [form] = Form.useForm();
  form.setFieldsValue(dataForm)

  const onFinish = async (note: any) => {
    try {
      if (!dataForm) {
        const newNote = { ...note, dayId, userId: auth._id };
        console.log(newNote);

        dispatch(addNote(newNote))
        message.success("Cập nhật thành công !")
        setOpen(false)
      } else {
        const newNote = { ...note, id: value._id }
        dispatch(editNote(newNote))
        message.success("Cập nhật thành công !")
        setOpen(false)
      }

    } catch (error) {
      console.log('Lỗi');
    }
  }
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      {/* <MenuVocab /> */}
      <div className="w-full h-auto bg-[#faf8dd] py-4 px-4 mt-6 rounded-xl">
        <div className="grid grid-cols-2 text-xl font-lg border-b-[1.5px] text-[#666] pb-2">
          <span className="grid justify-items-start">Ghi chú bài học</span>
          <button onClick={() => setOpen(!open)} className="grid justify-items-end" >
            <i className="fa-regular fa-pen-to-square"></i>
          </button>
        </div>
        <div className="mt-2">
          <Form form={form}
            initialValues={{}}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
            labelCol={{ span: 24 }}
          >
            {dataForm ? 
            dataForm.text !== "<p><br></p>" &&
              <Form.Item
                name="text"
              >
                <p >{parse(String(dataForm?.text))}</p>
              </Form.Item>
              :
              <i>
                Hãy ghi chú những điểm tâm đắc hay cần lưu ý về bài học để tham khảo
                sau này.
              </i>
            }
            {open === true ?
              <div>
                <Form.Item
                  name="text"
                >
                  <ReactQuill className='quill_custom bg-white mt-4 mb-8 rounded h-full p-0' value={dataForm ? dataForm?.text : ""} theme="snow" style={{ background: "#fff", }} />
                </Form.Item>
                <div className="space-x-4">
                  <button className='p-2 bg-green-500 font-bold text-white rounded'>Lưu ghi chú</button>
                  <button className='p-2 bg-green-500 font-bold text-white rounded' onClick={() => setOpen(false)}>Thoát</button>
                </div>
              </div>
              : ""
            }
          </Form>
        </div>
      </div>
    </>
  );
};

export default Note;
