import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Checkbox, Form, Input,message } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { NavLink, useNavigate, useParams} from 'react-router-dom';
import { editUserNote, getUserNote, userAddNote } from '../../api/noteCouse';
import MenuVocab from '../../components/VocabConponent/MenuVocab';
import { NoteCouseType } from '../../types/noteCouse';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, editNote, getData, getNoteUser } from '../../features/Slide/note/NoteSlice';
type Props = {

}
interface IModalProps {
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  }
const Update = ( props:any) => {

    const dispatch = useDispatch();
    const dayId = props.dataForm.dayId;
    const userId = props.dataForm.userId;
    
    const data =  props.dataForm
    const [form] = Form.useForm();
    form.setFieldsValue(data)  
    const id = data?._id
    
    const onFinish = async (note:any) => {
  
        try {
            if(id){
                const newNote = {...note, id}
                dispatch(editNote(newNote))
            }else{
               const newNote =  {...note, dayId, userId};
               dispatch(addNote(newNote))
         
            }
        } catch (error) {
            console.log('Lỗi');
            
        }
    }
    const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};
  return (
    <div className='modal'>
    {/* <MenuVocab /> */}
    <div  className='w-full h-screen bg-[#faf8dd] py-4 px-4 rounded-xl'>
    <div className="text-xl font-lg border-b-[1.5px] text-[#666] pb-2">
        <span className="grid justify-items-start">Ghi chú bài học</span>
      </div>
      <Form form={form} 
      initialValues={{}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="on"
      labelCol={{ span: 24 }}
      >
        <Form.Item 
        name="text"
        >
            <ReactQuill   className='quill_custom mt-4 rounded' value={data?.text} theme="snow"  style={{background:"#fff"}}  />
        </Form.Item>
            <button className='p-2 bg-green-500 font-bold text-white rounded'>Lưu ghi chú</button>
     
        </Form>
    </div>
    </div>
  )
}

export default Update