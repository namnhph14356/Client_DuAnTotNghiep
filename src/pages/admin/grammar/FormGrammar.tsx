import {
  Divider,
  Form,
  Input,
  Button,
  Checkbox,
  Upload,
  Select,
  Avatar,
  message,
  Modal,
  Progress,
  Image,
  Empty,
} from "antd";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  addVocabulary,
  detailVocabulary,
  editVocabulary,
} from "../../../api/vocabulary";
import ReactQuill from "react-quill";
import {
  addGrammar,
  getGrammarDetail,
  updateGrammar,
} from "../../../api/grammar";
import JoditEditor from "jodit-react";
import { GammarType } from "../../../types/grammar";
import AdminPageHeader from "../../../components/AdminPageHeader";

type Props = {};

const FormGrammar = (props: Props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [fileList, setfileList] = useState<any>();
  const [grammar, setGrammar] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();
  const { id } = useParams();
  var titlePage: string = "";
  if (id) {
    titlePage = "Cập Nhật Ngữ Pháp Bài Học";
  } else {
    titlePage = "Thêm Ngữ Pháp Bài Học";
  }
  const onFinish = async (value: GammarType) => {
    const key = "updatable";

    message.loading({ content: "Loading...", key });
    if (id) {
      try {
        updateGrammar(value);
        message.success({ content: "Sửa Thành Công!", key, duration: 2 });
        navigate("/manageDay/grammar");
      } catch (error) {
        message.error({ content: "Lỗi", key, duration: 2 });
      }
    } else {
      try {
        addGrammar(value);
        message.success({ content: "Thêm Thành Công!", key, duration: 2 });
        navigate("/manageDay/grammar");
      } catch (error) {
        message.error({ content: "Lỗi", key, duration: 2 });
      }
    }
  };

  const onFinishFailed = (errorInfo) => {
    id
      ? message.error("Sửa Không Thành Công!")
      : message.error("Thêm Không Thành Công!");
  };

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    if (id) {
      const getDetail = async () => {
        const { data } = await getGrammarDetail(id);
        setGrammar(data);
        form.setFieldsValue(data);
      };
      getDetail();
    }
  }, []);
  const config: any = {
    readonly: false,
    addNewLineOnDBLClick: false,
  };
  return (
    <div className="">
      <AdminPageHeader breadcrumb={titlePage} />
      <div className="">
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

          <Form.Item
            label="Tiêu đề"
            name="name"
            tooltip="Tên đề mục"
            rules={[{ required: true, message: "Không để Trống!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            tooltip="Chi tiết"
            rules={[{ required: true, message: "Không để Trống!" }]}
          >
            <JoditEditor value={grammar} config={config} />
          </Form.Item>

          <Form.Item label="Tóm tắt" name="summary" tooltip="Tóm tắt">
            <Input />
          </Form.Item>

          <Form.Item className="float-right">
            <Button
              className="inline-block mr-2"
              type="primary"
              htmlType="submit"
            >
              {id ? "Sửa" : "Thêm"}
            </Button>
            <Button
              className="inline-block "
              type="primary"
              danger
              onClick={() => {
                onReset();
              }}
            >
              Xóa Hết
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default FormGrammar;
