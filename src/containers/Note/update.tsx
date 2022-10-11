import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Checkbox, Form, Input,message } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { NavLink, useNavigate, useParams} from 'react-router-dom';
import { editUserNote, getUserNote, userAddNote } from '../../api/noteCouse';
import MenuVocab from '../../components/VocabConponent/MenuVocab';
import { NoteCouseType } from '../../types/noteCouse';
type Props = {}
const Update = (props: Props) => {
    const backPage = () => {
        // eslint-disable-next-line no-restricted-globals
        history.go(-1);
    }

    const [value, setValue] = useState<NoteCouseType>();
    const userId:string = "62d6f40c1649dde5e7d58458";
    const dayId:string = "somethink";
    useEffect(()=>{
        const getValue = async () => {
            const {data} = await  getUserNote(dayId, userId)
            form.setFieldsValue(data)
        }
        getValue()
    },[]);
    const {id} = useParams();
    
    const [form] = Form.useForm();
    const onFinish = async (note:any) => {
        console.log(note);
        
        try {
            if(id){
                const data =  await editUserNote({...note,id})
                message.success("Cập nhật thành công");
                navigate("/learning/detailLearning/:id/vocabulary/note")
            }else{
                const data = await userAddNote({...note, dayId, userId});
                message.success("Cập nhật thành công");
                navigate("/learning/detailLearning/:id/vocabulary/note")
            }
        } catch (error) {
            console.log('Lỗi');
            
        }
    }
    const navigate = useNavigate();
    const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo);
	};
  return (
    <>
    {/* <MenuVocab /> */}
    <div  className='w-full h-auto bg-[#faf8dd] py-4 px-4 mt-6 rounded-xl'>
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
        // {...register("text")}
        name="text"
        >
            <ReactQuill className='mt-4' value={value?.text} theme="snow"  style={{background:"#fff"}}  />
        </Form.Item>
            <button className='p-2 bg-green-500 font-bold text-white rounded'>Lưu ghi chú</button>
     
        </Form>
        <button className='p-2 bg-green-500 font-bold text-white rounded ml-2' onClick={()=>backPage()}>Thoát</button>
    </div>
    </>
  )
}

export default Update