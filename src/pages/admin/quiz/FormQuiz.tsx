import React, { useEffect, useRef, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { Divider, Form, Input, Button, Checkbox, Upload, Select, Avatar, message, Modal, Progress, Image, Empty } from 'antd';
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import AdminPageHeader from '../../../Component/AdminPageHeader';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addQuizSlide, changeBreadcrumb, editQuizSlide } from '../../../features/Slide/quiz/QuizSlide';
import { getCategoryList } from '../../../features/Slide/category/CategorySlide';
import { CategoryType } from '../../../types/category';
import { detailQuiz } from '../../../api/quiz';
import { QuizType } from '../../../types/quiz';


// import img from '../../../../public/image//image 22.png'

type Props = {}

const FormQuiz = (props: Props) => {
  const { Option } = Select;
  const [form] = Form.useForm();
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm()
  const breadcrumb = useAppSelector(data => data.quiz.breadcrumb)
  const categories = useAppSelector(data => data.category.value)
  const [quiz, setQuiz] = useState<QuizType>()
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const [fileList, setfileList] = useState<any>();
  const typeQuiz = [
    { id: 1, name: "Nghe rồi chọn Đáp Án" },
    { id: 2, name: "Chọn Đáp Án" },
    { id: 3, name: "Nghe rồi Viết Đáp Án" }
  ]


  console.log("fileList", fileList);
  console.log("data edit", quiz);

  const { id } = useParams();
  console.log(id);

  const onFinish = async (value) => {


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
    if (!value.image) {
      return message.error('Không để trống Ảnh!');
    }


    const key = 'updatable';

    message.loading({ content: 'Loading...', key });
    setTimeout(() => {
      if (id) {
        dispatch(editQuizSlide(value));
        message.success({ content: 'Sửa Thành Công!', key, duration: 2 });
        navigate("/admin/quiz");
      } else {
        dispatch(addQuizSlide(value));
        message.success({ content: 'Thêm Thành Công!', key, duration: 2 });
        navigate("/admin/quiz");
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

  // const [defaultFileList, setDefaultFileList] = useState([]);
  // const [progress, setProgress] = useState(0);
  // const [previewVisible, setPreviewVisible] = useState(false);
  // const [previewImage, setPreviewImage] = useState('');
  // const [previewTitle, setPreviewTitle] = useState('');

  // const handleCancel = () => setPreviewVisible(false);

  // const handlePreview = async (file: any) => {
  //   if (!file.url && !file.preview) {
  //     const a: any = defaultFileList[0]
  //     file.preview = a.thumbUrl
  //   }
  //   console.log("defaultFileList", defaultFileList);

  //   setPreviewImage(file.url || (file.preview as string));
  //   setPreviewVisible(true);
  //   setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  // };

  // const uploadImage = async options => {
  //   const { onSuccess, onError, file, onProgress } = options;

  //   const CLOUDINARY_PRESET = "ypn4yccr";
  //   const CLOUDINARY_API_URL = "https://api.cloudinary.com/v1_1/vintph16172/image/upload"
  //   const config = {
  //     headers: { "content-type": "multipart/form-data" },
  //     onUploadProgress: event => {
  //       const percent = Math.floor((event.loaded / event.total) * 100);
  //       setProgress(percent);
  //       if (percent === 100) {
  //         setTimeout(() => setProgress(0), 1000);
  //       }
  //       onProgress({ percent: (event.loaded / event.total) * 100 });
  //     }
  //   };

  //   const formData = new FormData();
  //   formData.append("file", file);
  //   formData.append("upload_preset", CLOUDINARY_PRESET);
  //   console.log("file upload", file);
  //   console.log("formData upload", formData);
  //   try {
  //     const { data } = await axios.post(CLOUDINARY_API_URL, formData, config);
  //     console.log("data", data);
  //     onSuccess("Ok");
  //   } catch (error) {
  //     console.log("error", error);
  //     onError({ error })
  //   }

  // }

  // const handleOnChange = (e) => {
  //   const { file, fileList, event } = e
  //   console.log("e", e);

  //   fileList[0].response = ""
  //   setDefaultFileList(fileList);
  //   console.log("defaultFileList", defaultFileList);

  //   //filelist - [{uid: "-1",url:'Some url to image'}]
  // };



  useEffect(() => {
    if (id) {
      const getQuiz = async () => {
        const { data } = await detailQuiz(id)
        // console.log("data edit", data);
        setQuiz(data)
        form.setFieldsValue(data.quiz);
        dispatch(changeBreadcrumb("Sửa Quiz"))
      }
      getQuiz()
    } else {
      dispatch(changeBreadcrumb("Thêm Quiz"))
    }

    dispatch(getCategoryList())

  }, [])




  return (
    <div className="container">
      <AdminPageHeader breadcrumb={breadcrumb} />
      <div className="pb-6 mx-6">
        <Form layout="vertical" form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          {id ? <Form.Item label="_id" name="_id" hidden={true}>
            <Input />
          </Form.Item> : ""}

          <Form.Item
            label="Câu Hỏi"
            name="question"
            tooltip="Câu Hỏi dành cho Category"
            rules={[{ required: true, message: 'Không để Trống!' }]}
          >
            <Input />
          </Form.Item>


          <Form.Item
            label="Danh mục"
            name="category"
            tooltip="Danh Mục Category"
            rules={[{ required: true, message: 'Không để Trống!' }]}
          >
            {id
              ? <Select >
                {categories?.map((item: CategoryType, index) => (
                  <Option key={index + 1} value={item._id}>
                    {item.title}
                  </Option>
                ))}
              </Select>
              : <Select
                defaultValue={categories?.map((item: CategoryType, index) => {
                  if (item._id === quiz?.category) {
                    return <Option key={index + 1} value={item._id}>
                      {item.title}
                    </Option>
                  }
                })}
              >

                {categories?.map((item: CategoryType, index) => (
                  <Option key={index + 1} value={item._id}>
                    {item.title}
                  </Option>
                ))}
              </Select>}


          </Form.Item>


          <Form.Item
            label="Upload ảnh"
            tooltip="Ảnh dành cho Quiz"
            rules={[{ required: true, message: 'Không để Trống!' }]}

          >
            <Input type="file" accept='.png,.jpg' className="form-control" onChange={onChangeImage} />
            {/* <Upload
              onRemove={(file: any) => {
                setfileList(null)
                console.log("fileList remove", fileList);
              }}
              beforeUpload={(file: any) => {
                setfileList(file);
                console.log("fileList before", fileList);
              }}
              listType="picture"
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Select File</Button>
            </Upload> */}
          </Form.Item>

          <Form.Item name="image" valuePropName="src" label="ImagePreview" >
            {/* {quiz?.image || fileList
              ? <img id="img-preview" style={{ width: "100px" }} />
              : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            } */}
            <img id="img-preview" style={{ width: "100px" }} />

          </Form.Item>

          <Form.Item
            label="Thời Gian Làm"
            name="timeLimit"
            tooltip="Thời gian làm bài"
            rules={[{ required: true, message: 'Không để Trống!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Thể Loại"
            name="type"
            tooltip="Thể Loại Quiz"
            rules={[{ required: true, message: 'Không để Trống!' }]}
          >
            {id
              ? <Select >
                {typeQuiz?.map((item: any, index) => (
                  <Option key={index + 1} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
              : <Select
                defaultValue={typeQuiz?.map((item: any, index) => {
                  if (item.id === quiz?.type) {
                    return <Option key={index + 1} value={item.id}>
                      {item.name}
                    </Option>
                  }
                })}
              >

                {typeQuiz?.map((item: any, index) => (
                  <Option key={index + 1} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>}


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




    </div>
  )
}

export default FormQuiz