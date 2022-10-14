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
    const dataDemo = useSelector<any, any>(data => data.noteCouse.value);
    console.log("update",dataDemo?.text);
    
    const [value, setValue] = useState<NoteCouseType>();
    // const userId:string = "62d6f40c1649dde5e7d58458";
    // const dayId:string = "hungchitestthoi";
    const dispatch = useDispatch();
    console.log("---------------------------");
    const dayId = props.dataForm.dayId;
    const userId = props.dataForm.userId;
    // console.log("daadadad",dayId, userId);
    
    // useEffect(()=>{
    //     const getValue = async () => {
            
    //         const {payload} = await dispatch(getNoteUser({dayId, userId}))
    //         console.log("payload",payload);
            
    //         setValue(payload)   
    //         // dispatch(getData("asd"));
    //         console.log("value",value);
            
    //         form.setFieldsValue(payload)
    //     }
    //     getValue()
    // },[]);
    
    const [form] = Form.useForm();  
    form.setFieldsValue(dataDemo)
    const id = dataDemo?._id
 
    const onFinish = async (note:any) => {
        // console.log(note);
        
        try {
            if(id){
                const newNote = {...note, id}
                dispatch(editNote(newNote))
                // closeModal((prevState) => prevState)  
                message.success("Cập nhật thành công");
            }else{
               const newNote =  {...note, dayId, userId};
               dispatch(addNote(newNote))
                message.success("Cập nhật thành công");
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
            <ReactQuill   className='quill_custom mt-4 rounded' value={dataDemo?.text} theme="snow"  style={{background:"#fff"}}  />
        </Form.Item>
            <button className='p-2 bg-green-500 font-bold text-white rounded'>Lưu ghi chú</button>
     
        </Form>
    </div>
    </div>
  )
}

export default Update