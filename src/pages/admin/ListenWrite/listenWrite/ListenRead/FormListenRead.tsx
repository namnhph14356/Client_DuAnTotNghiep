/* eslint-disable jsx-a11y/alt-text */
import { Button, Form, Input, message } from 'antd'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks'
import AdminPageHeader from '../../../../../components/AdminPageHeader'
import { addListen, changeBreadcrumb } from '../../../../../features/Slide/listenWrite/ListenWriteSlice'
import { PracticeActivityType } from '../../../../../types/practiceActivity'
import { uploadImage, uploadVideo } from '../../../../../utils/upload'

const FormListenRead = () => {
  const { id, dayId } = useParams()
  const breadcrumb = useAppSelector(data => data.listenWrite.breadcrumb)
  const practiceActivity = useAppSelector(item => item.practiceActivity.value)
  const [preview, setPreview] = useState<any>();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const type = "conversation"
  const prative: any = practiceActivity.find((item: PracticeActivityType) => item.type === type && item.day === dayId)

  const onChangeImage = async (e) => {
    if (
      e.target.files[0].type === "audio/mpeg" ||
      e.target.files[0].type === "video/quicktime"
    ) {
      message.loading("Loading ...")
      const imgLink = await uploadVideo(e.target);
      setPreview(imgLink);
    } else {
      message.error("File không hợp lệ!");
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = async (value: any) => {
    const key = "updatable";

    if (id) {
      message.loading({ content: "Loading...", key });
      // editVocabulary(value);
      message.success({ content: "Sửa Thành Công!", key, duration: 2 });
      navigate(`/manageDay/${dayId}/vocabulary/listLesson`);
    } else {
      console.log("value", value, preview);
      // dispatch(addListen())
      message.loading({ content: "Loading...", key });
      // addVocabulary({ ...value, dayId: dayId });
      message.success({ content: "Thêm Thành Công!", key, duration: 2 });
      // navigate(`/manageDay/${dayId}/conversation//${id}editListenRead`);

    }
  };

  const onFinishFailed = (errorInfo) => {
    id
      ? message.error("Sửa Không Thành Công!")
      : message.error("Thêm Không Thành Công!");
  };

  useEffect(() => {
    if (id) {
      dispatch(changeBreadcrumb("Sửa cấu trúc"))
    } else {
      dispatch(changeBreadcrumb("Thêm cấu trúc"))
    }
  }, [id])

  
  return (
    <div className='h-screen'>
      <AdminPageHeader breadcrumb={breadcrumb} day={dayId} activity={{ title: "Luyện hội thoại", route: "conversation" }} type={{ title: "Nghe và đọc", route: "listListenRead" }} />
      <Form
        layout="vertical"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {id ? (
          <Form.Item label="_id" name="_id" hidden={true}>
            <Input />
          </Form.Item>
        ) : (
          ""
        )}

        <Form.Item label="Upload image" tooltip="Image for Quiz">
          <Input
            type="file"
            // accept=".mp3,.wav,.wma"
            className="form-control"
            onChange={(e) => onChangeImage(e)}
          />
        </Form.Item>

        <Form.Item label="Audio">
          <audio src={preview} controls></audio>
        </Form.Item>

        <Form.Item
          label="Phân tích cấu trúc"
          name="structure"
          tooltip="Phân tích cấu trúc"
          rules={[{ required: true, message: "Không để Trống!" }]}
        >
          <ReactQuill
            className="form-control rounded"
            theme="snow"
            style={{ background: "#fff", height: "200px", marginBottom: "40px" }}
          />
        </Form.Item>

        <Form.Item className="">
          <Button
            className="inline-block mr-2"
            type="primary"
            htmlType="submit"
          >
            {id ? "Sửa" : "Thêm"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default FormListenRead