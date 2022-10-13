import { ExclamationCircleOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  Modal,
  notification,
  Row,
  Select,
  Table,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClassById } from "../../../api/class";
import { getListUser } from "../../../api/user";
import {
  createClass,
  getClassByIdSlide,
  getListClass,
  removeClasses,
  updateClass,
} from "../../../features/Slide/class/classSlice";
const { Option } = Select;
const AdminClassList = (props) => {
  const dispatch = useDispatch();
  const { listClass } = useSelector((state: any) => state.class);
  const [idUpdate, setIdUpdate] = useState("");
  const [objectUpdate, setObjectUpdate] = useState({});

  const onUpdateClass = async (data) => {
    
    const { data: dataUp } = await getClassById(data._id);
    if (dataUp && dataUp.class) {
      setObjectUpdate({
        ...dataUp.class,
        userOfClass: dataUp.class.userOfClass.map((key) => ({
          value: key.userId._id,
          label: key.userId.username,
        })),
      });
      setIsShowModal(true);
      setIdUpdate(data._id);
    }
  };

  const onRemove = (id: string) => {
    dispatch(removeClasses(id)).then((res) => {
      if (res) {
        notification["success"]({
          message: "Xoá lớp học thành công",
        });
      } else {
        notification["error"]({
          message: "Xoá lớp học thất bại",
        });
      }
    });
  };

  const onRemoveClass = (id: string) => {
    Modal.confirm({
      title: "Bạn có muốn xoá lớp học không?",
      icon: <ExclamationCircleOutlined />,
      content: "Nếu xoá lớp học, bạn sẽ không thể hoàn tác lại lớp học",
      okText: "Đồng ý",
      cancelText: "Huỷ",
      onOk: () => onRemove(id),
    });
  };

  const columns = [
    {
      title: "nameClass",
      dataIndex: "nameClass",
      key: "nameClass",
    },
    {
      title: "Link Join Class",
      dataIndex: "linkJoinClass",
      key: "linkJoinClass",
    },
    {
      title: "Number of Students",
      dataIndex: "numberOfStudents",
      key: "numberOfStudents",
      render: (row, item) => `${item?.userOfClass?.length} student`,
    },
    {
      title: "Lever",
      dataIndex: "lever",
      key: "lever",
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "action",
      render: (row, item) => (
        <div className="d-flex">
          <button onClick={() => onUpdateClass(item)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-pencil-square"
              viewBox="0 0 16 16"
            >
              <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
              <path
                fill-rule="evenodd"
                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
              />
            </svg>
          </button>
          <button onClick={() => onRemoveClass(item._id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-trash3"
              viewBox="0 0 16 16"
            >
              <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z" />
            </svg>
          </button>
        </div>
      ),
    },
  ];

  const [isShowModal, setIsShowModal] = useState(false);

  const onShowAdd = () => {
    setIsShowModal(true);
  };

  const onCloseAdd = () => {
    setIsShowModal(false);
    setIdUpdate("");
    setObjectUpdate({});
  };

  const onAddClass = (value) => {
    if (idUpdate !== "") {
      value.userOfClass = value.userOfClass.map((item) => ({
        userId: item?.userId?.value ? item?.userId?.value : item,
        timeJoinClass: new Date(),
      }));
      dispatch(updateClass({ ...value, _id: idUpdate })).then((res) => {
        if (res) {
          notification["success"]({
            message: "Cập nhật lớp học thành công",
          });
        } else {
          notification["error"]({
            message: "Cập nhật lớp học thất bại",
          });
        }
      });
    } else {
      value.userOfClass = value.userOfClass.map((item) => ({
        userId: item,
        timeJoinClass: new Date(),
      }));
      dispatch(createClass(value)).then((res) => {
        if (res) {
          notification["success"]({
            message: "Thêm mới lớp học thành công",
          });
        } else {
          notification["error"]({
            message: "Thêm mới lớp học thất bại",
          });
        }
      });
    }

    setIsShowModal(false);
  };
  const [options, setOption] = useState<any[]>([]);
  const getDataUser = async () => {
    const { data } = await getListUser();
    if (data && data.length > 0) {
      setOption(
        data.map((item: any) => ({
          label: item.username,
          value: item._id,
        }))
      );
    }
  };

  useEffect(() => {
    dispatch(getListClass());
    getDataUser();
  }, []);

  let totalStudent = 0;

  if (listClass && listClass.length > 0) {
    listClass.forEach((item) => (totalStudent += item.userOfClass.length));
  }

  return (
    <div>
      {isShowModal && (
        <div >
          <Modal
          className="admin-class-wrapper"
          title={idUpdate !== "" ? "Update a Class" : "Create a new Class"}
          centered
          visible={isShowModal}
          onOk={onAddClass}
          onCancel={onCloseAdd}
        >
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={objectUpdate}
            onFinish={onAddClass}
            autoComplete="off"
          >
            <Form.Item
              label="Class Name"
              labelAlign="left"
              name="nameClass"
              rules={[
                { required: true, message: "Please input your name Class!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Link join class"
              name="linkJoinClass"
              labelAlign="left"
              rules={[
                {
                  required: true,
                  message: "Please input your Link join class!",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="User Of Class"
              labelAlign="left"
              name="userOfClass"
              rules={[
                { required: true, message: "Please input your User Of Class!" },
              ]}
            >
              {options && options.length > 0 && (
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Chọn user vào lớp học"
                  options={options}
                />
              )}
            </Form.Item>
            <Form.Item
              label="Lever"
              labelAlign="left"
              name="lever"
              rules={[{ required: true, message: "Please input your Lever!" }]}
            >
              <Select placeholder="Chọn lever" style={{ width: "100%" }}>
                <Option value="Beginner">Beginner </Option>
                <Option value="High Beginner">High Beginner</Option>
                <Option value="Low Intermediate">Low Intermediate</Option>
                <Option value="Intermediate">Intermediate</Option>
                <Option value="High Intermediate">High Intermediate</Option>
                <Option value="Low Advanced">Low Advanced</Option>
                <Option value="Advanced">Advanced</Option>
              </Select>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
        </div>
      )}
      <Row>
        <Col xs={8} sm={8} md={8} lg={8} xl={8} className="p-2">
          <Card hoverable style={{ width: "100%" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              className="bi bi-lightning icon-dashboard"
              viewBox="0 0 20 20"
            >
              <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5zM6.374 1 4.168 8.5H7.5a.5.5 0 0 1 .478.647L6.78 13.04 11.478 7H8a.5.5 0 0 1-.474-.658L9.306 1H6.374z" />
            </svg>
            <Typography.Title className="mt-2" level={5}>
              TOTAL NUMBER OF CLASSES
            </Typography.Title>
            <Typography.Title level={2} className="m-0 ">
              {listClass?.length}
            </Typography.Title>
            <div className="flexBox-dash">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-info-circle-fill mt-2 "
                viewBox="0 -5 10 24"
              >
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
              </svg>
            </div>
          </Card>
        </Col>
        <Col xs={8} sm={8} md={8} lg={8} xl={8} className="p-2">
          <Card hoverable style={{ width: "100%" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="currentColor"
              className="bi bi-people icon-dashboard"
              viewBox="0 -5 10 24"
            >
              <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
            </svg>
            <Typography.Title className="mt-2" level={5}>
              TOTAL NUMBER OF STUDENTS
            </Typography.Title>
            <Typography.Title level={2} className="m-0 ">
              {totalStudent}
            </Typography.Title>
            <div className="flexBox-dash">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                fill="currentColor"
                className="bi bi-info-circle-fill mt-2 "
                viewBox="0 -5 10 24"
              >
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
              </svg>
            </div>
          </Card>
        </Col>
      </Row>

      <div className="p-2">
        <div className="d-flex align-items-center justify-between">
          <Typography.Title className="m-0 py-2" level={3}>
            Quản lý lớp học
          </Typography.Title>
          <div className="py-2 d-flex">
            <Input
              style={{ width: "80%" }}
              placeholder="Search with class name"
              prefix={<SearchOutlined className="site-form-item-icon" />}
            />
            <Button type="primary" onClick={onShowAdd} className="ms-2">
              Create a new class
            </Button>
          </div>
        </div>
        <Table scroll={{y: '150px'}} dataSource={listClass} columns={columns} />
      </div>
    </div>
  );
};

AdminClassList.propTypes = {};

export default AdminClassList;
