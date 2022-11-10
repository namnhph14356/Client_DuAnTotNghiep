import React, { useEffect, useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { Divider, Form, Input, Button, Checkbox, Upload, Select, Avatar, message, Modal, Progress, Image, Empty } from 'antd';
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import AdminPageHeader from '../../../../components/AdminPageHeader';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { addQuizSlide, changeBreadcrumb, editQuizSlide } from '../../../../features/Slide/quiz/QuizSlide';
import { getCategoryList } from '../../../../features/Slide/category/CategorySlide';
import { CategoryType } from '../../../../types/category';
import { detailQuiz } from '../../../../api/quiz';
import { QuizType } from '../../../../types/quiz';
import useQuiz from '../../../../features/Slide/quiz/use_quiz';

type Props = {}

const FormExerciseVocabulary = (props: Props) => {

  const { data, error, mutate, add, edit, remove } = useQuiz()
  const quizs = useAppSelector(item => item.quiz.value)
  const practiceActivity = useAppSelector(item => item.practiceActivity.value)
  const { Option } = Select;
  const [form] = Form.useForm();
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm()
  const breadcrumb = useAppSelector(data => data.quiz.breadcrumb)
  const [quiz, setQuiz] = useState<QuizType>()
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const [fileList, setfileList] = useState<any>();
  const [selected, setSelected] = useState<any>();
  const typeQuiz = [
    { id: 1, name: "Chọn đáp án tự động", type: "selectAuto" },
  ]
  const type = "vocabulary"
  const prative: any = practiceActivity.find((item: any) => item.type === type)
  console.log(prative?._id);


  const { id } = useParams();

  const onFinish = async (value) => {
    console.log(value);
    if (fileList) {
      const CLOUDINARY_PRESET = "ypn4yccr";
      const CLOUDINARY_API_URL =
        "https://api.cloudinary.com/v1_1/vintph16172/image/upload"
      const formData = new FormData();
      formData.append("file", fileList);
      formData.append("upload_preset", CLOUDINARY_PRESET);

      const { data } = await axios.post(CLOUDINARY_API_URL, formData, {
        headers: {
          "Content-Type": "application/form-data"
        }
      });
      value.image = data.url;
      setfileList(null);
    }

    console.log("value", value);
    if (value.type === 'selectImage') {
      if (!value.image) {
        return message.error('Không để trống Ảnh!');
      }
    }


    const key = 'updatable';

    message.loading({ content: 'Loading...', key });
    setTimeout(() => {
      if (id) {
        // dispatch(editQuizSlide(value));
        mutate(edit(value))
        console.log("data swr", data);
        message.success({ content: 'Sửa Thành Công!', key, duration: 2 });
        navigate("/manageDay/vocabulary/listExercise");
      } else {
        // dispatch(addQuizSlide(value));
        mutate(add(value))
        console.log("data swr", data);

        message.success({ content: 'Thêm Thành Công!', key, duration: 2 });
        navigate("/manageDay/vocabulary/listExercise");
      }

    }, 2000);
  };

  const onFinishFailed = (errorInfo) => {
    id ? message.error('Sửa Không Thành Công!') : message.error('Thêm Không Thành Công!');
  };

  const onReset = () => {
    form.resetFields();
  };

  //----------------------UPLOAD

  const onChangeImage = async (e) => {
    console.log("e", e.target.files[0]);
    if (e.target.files[0].type === "image/png" || e.target.files[0].type === "image/jpeg") {
      setfileList(e.target.files[0])
      console.log("fileList before", fileList);
      const imgPreview = document.getElementById("img-preview") as HTMLImageElement

      imgPreview.src = await URL.createObjectURL(e.target.files[0])


    } else {
      message.error('File không hợp lệ!');
    }

  }
  React.useEffect(() => {
    form.setFieldsValue({
      practiceActivity: prative?._id
    })
  }, [])
  useEffect(() => {
    if (id) {
      const getQuiz = async () => {
        const { data } = await detailQuiz(id)
        // console.log("data edit", data);
        setQuiz(data)
        console.log(data);
        setSelected(data.quiz.type)
        form.setFieldsValue(data.quiz);
        dispatch(changeBreadcrumb("Sửa Quiz"))
      }
      getQuiz()
    } else {
      dispatch(changeBreadcrumb("Thêm câu hỏi bài tập phần từ vựng"))
    }

    dispatch(getCategoryList())

  }, [])




  return (
    <div className="container">
      <AdminPageHeader breadcrumb={breadcrumb} />
      <div className="pb-6 mx-6">
        <Form layout="vertical" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} >

          {id ? <Form.Item label="_id" name="_id" hidden={true}>
            <Input />
          </Form.Item> : ""}

          <Form.Item
            label="Thể Loại"
            name="type"
            tooltip="Thể Loại Quiz"
            rules={[{ required: true, message: 'Không để Trống!' }]}
          >
            {id
              ? <Select defaultValue={'selectAuto'}>
                {typeQuiz?.map((item: any, index) => (
                  <Option key={index + 1} value={item.type}>
                    {item.name}
                  </Option>
                ))}
              </Select>
              : <Select
                defaultValue={typeQuiz?.map((item: any, index) => {
                  if (item.type === quiz?.type) {
                    return <Option key={index + 1} value={item.type}>
                      {item.name}
                    </Option>
                  }
                })}
              >

                {typeQuiz?.map((item: any, index) => (
                  <Option key={index + 1} value={item.type}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            }
          </Form.Item>

          <Form.Item
            label="Câu Hỏi"
            name="question"
            tooltip="Câu Hỏi dành cho Category"
            rules={[{ required: true, message: 'Không để Trống!' }]}
          >
            {id ?
              <Input /> :
              <Input />
            }
          </Form.Item>



          <div>
            <Form.Item name="image" valuePropName="src" label="ImagePreview" >
              <img id="img-preview" style={{ width: "100px" }} />
            </Form.Item>
            <Form.Item
              label="Upload ảnh"
              tooltip="Ảnh dành cho Quiz"
            >
              <Input type="file" accept='.png,.jpg' className="form-control" onChange={onChangeImage} />
            </Form.Item>

          </div>

          <Form.Item label="_id" name="_id" hidden={true}>
            <Input />
          </Form.Item>


          <Form.Item label="practiceActivity" name="practiceActivity" hidden={true} >
            <Input />
          </Form.Item>

          <Form.Item className='float-right'>
            <Button className='inline-block mr-2' type="primary" htmlType="submit" >
              {id ? "Sửa" : "Thêm"}
            </Button>
            <Button className='inline-block ' type="primary" danger onClick={() => { onReset() }}>
              Reset
            </Button>
          </Form.Item>
        </Form>
      </div>




    </div >
  )
}

export default FormExerciseVocabulary