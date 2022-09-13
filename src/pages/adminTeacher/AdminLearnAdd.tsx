import React from "react";
import PropTypes from "prop-types";
import { Typography } from "antd";
import { Button, Checkbox, Form, Input } from "antd";
const AdminLearnAdd = (props) => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  const onReset = () => {
    form.resetFields();
  };

  return (
    <div>
      <Typography.Title level={5}>
        Quản lý video bài giảng/Thêm mới
      </Typography.Title>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Tên video"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Video"
          name="video"
          rules={[{ required: true, message: "Please input your video!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Danh mục"
          name="category"
          rules={[{ required: true, message: "Please input your category!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset} style={{marginLeft: 10}}>
            Reset
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

AdminLearnAdd.propTypes = {};

export default AdminLearnAdd;
