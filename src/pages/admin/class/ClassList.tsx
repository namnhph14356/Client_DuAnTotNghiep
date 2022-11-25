import { ExclamationCircleOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputRef,
  message,
  Modal,
  notification,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Typography,
} from "antd";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getClassById } from "../../../api/class";
import { getListUser } from "../../../api/user";
import type { ColumnsType, ColumnType } from 'antd/es/table';
import {
  createClass,
  getClassByIdSlide,
  getListClass,
  removeClasses,
  updateClass,
} from "../../../features/Slide/class/classSlice";
import { FilterConfirmProps } from "antd/lib/table/interface";
import AdminPageHeader from "../../../components/AdminPageHeader";
const { Option } = Select;

interface ExpandedDataType {
  key: React.Key;
  _id?: string,
  nameClass: string;
  linkJoinClass: string;
  numberOfStudents: number | string;
  numberOfTeachers: number | string;
  lever: string,
  createdAt: string,
}

type DataIndex = keyof ExpandedDataType;

const ClassList = () => {
  const dispatch = useDispatch();
  const { listClass } = useSelector((state: any) => state.class);
  const [idUpdate, setIdUpdate] = useState("");
  const [objectUpdate, setObjectUpdate] = useState({});
  const searchInput = useRef<InputRef>(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  const onUpdateClass = async (data) => {

    const { data: dataUp } = await getClassById(data._id);
    if (dataUp && dataUp.class) {
      setObjectUpdate({
        ...dataUp.class,
        userOfClass: dataUp.class.userOfClass.map((key) => ({
          value: key.userId._id,
          label: key.userId.username,
        })),
        teacherOfClass: dataUp.class.teacherOfClass.map((key) => ({
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

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: any): ColumnType<any> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Tìm kiếm với tên lớp`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, width: "200px" }}
          className="flex"
          prefix={<SearchOutlined className="site-form-item-icon" />}
        />
        <div>
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
              size="small"
              className="my-auto flex"
            >
              Tìm
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
            >
              Xóa
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                setSearchText((selectedKeys as string[])[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Lọc
            </Button>
          </Space>
        </div>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record: any) => {
      return record[dataIndex].toString().toLowerCase().includes((value as string).toLowerCase())
    }

  });

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      className: 'w-[70px]',
      render: (row, item, index) => `${index + 1}`,
    },
    {
      title: "Tên lớp",
      dataIndex: "nameClass",
      key: "nameClass",
      ...getColumnSearchProps('nameClass'),
      render: (row, item) => <Link to={`detail/${item?._id}`}>{item.nameClass}</Link>,
    },
    {
      title: "Mã lớp",
      dataIndex: "linkJoinClass",
      key: "linkJoinClass",
    },
    {
      title: "Số học sinh",
      dataIndex: "numberOfStudents",
      key: "numberOfStudents",
      render: (row, item) => `${item?.userOfClass?.length} học sinh`,
    },
    {
      title: "Số giảng viên",
      dataIndex: "numberOfTeachers",
      key: "numberOfTeachers",
      render: (row, item) => `${item?.teacherOfClass?.length} giảng viên`,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (row, item) => `${moment(item?.createdAt).format('DD/MM/YYYY')}`,
    },
    {
      title: "Hành động",
      dataIndex: "Action",
      className: 'w-[200px]',
      key: "action",
      render: (row, item) => (
        <Space align="center" size="middle" >

          <Button style={{ background: "#616160" }} onClick={() => onUpdateClass(item)}>
            <Link to={`/admin/class/detail/${item?._id}`} >
              <span className="text-white">Xem</span>
            </Link>

          </Button>
          <Button style={{ background: "#198754" }} onClick={() => onUpdateClass(item)}>
            {/* <Link to={`/manageDay/${dayId}/listenspeak/question/${record._id}/edit`} >
            </Link> */}
            <span className="text-white">Sửa</span>

          </Button>

          <Popconfirm
            placement="topRight"
            title="Bạn Có Muốn Xóa?"
            okText="Có"
            cancelText="Không"
            onConfirm={() => { onRemoveClass(item._id) }}
          >
            <Button type="primary" danger >
              Xóa
            </Button>
          </Popconfirm>

        </Space>
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
        userId: item?.value ? item?.value : item,
        timeJoinClass: new Date(),
      }));
      value.teacherOfClass = value.teacherOfClass?.map((item) => ({
        userId: item?.value ? item?.value : item,
        timeJoinClass: new Date(),
      }));
      dispatch(updateClass({ ...value, _id: idUpdate })).then((res) => {
        if (res) {
          message.success("Cập nhật lớp học thành công")
        } else {
          message.error("Cập nhật lớp học thất bại")
        }
      });
    } else {

      value.userOfClass = value.userOfClass?.map((item) => ({
        userId: item,
        timeJoinClass: new Date(),
      }));

      value.teacherOfClass = value.teacherOfClass?.map((item) => ({
        userId: item,
        timeJoinClass: new Date(),
      }));

      dispatch(createClass(value)).then((res) => {
        if (res) {
          message.success("Thêm mới lớp học thành công")
        } else {
          message.error("Thêm mới lớp học thất bại")
        }
      });
    }

    setIsShowModal(false);
  };
  const [optionsUser, setOptionUser] = useState<any[]>([]);
  const [optionsTeacher, setOptionTeacher] = useState<any[]>([]);

  const getDataUser = async () => {
    const { data } = await getListUser();
    if (data && data.length > 0) {
      let listUser: any = [];
      let listTeacher: any = []
      data.map((item: any) => {
        if (item.role === "0") {
          listUser.push({
            label: item.username,
            value: item._id,
          })
        } else if (item.role === "1") {
          listTeacher.push({
            label: item.username,
            value: item._id,
          })
        }
      })
      setOptionUser(listUser)
      setOptionTeacher(listTeacher)
    }
  };

  useEffect(() => {
    dispatch(getListClass());
    getDataUser();
  }, []);

  let totalStudent = 0;
  let totalTeacher = 0;
  if (listClass && listClass.length > 0) {
    listClass.forEach((item) => (totalStudent += item.userOfClass.length));
  }
  if (listClass && listClass.length > 0) {
    listClass.forEach((item) => (totalTeacher += item.teacherOfClass.length));
  }

  return (
    <div>
      {isShowModal && (
        <div >
          <Modal
            className="admin-class-wrapper"
            title={idUpdate !== "" ? "Chỉnh sửa lớp học" : "Thêm mới lớp học"}
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
                label="Tên lớp"
                labelAlign="left"
                name="nameClass"
                rules={[
                  { required: true, message: "Please input your name Class!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Học sinh"
                labelAlign="left"
                name="userOfClass"
              >
                {optionsUser && optionsUser.length > 0 && (
                  <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="Chọn học sinh vào lớp học"
                    options={optionsUser}
                  />
                )}
              </Form.Item>

              <Form.Item
                label="Giảng viên"
                labelAlign="left"
                name="teacherOfClass"
              >
                {optionsTeacher && optionsTeacher.length > 0 && (
                  <Select
                    mode="multiple"
                    style={{ width: "100%" }}
                    placeholder="Chọn giảng viên vào lớp học"
                    options={optionsTeacher}
                  />
                )}
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
      <AdminPageHeader breadcrumb={"Danh sách lớp học"} class1={{ title: "Quản lí lớp học", route: "class" }} />
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
              LỚP HỌC
            </Typography.Title>
            <Typography.Title level={2} className="m-0 ">
              {listClass?.length}
            </Typography.Title>
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
              HỌC SINH
            </Typography.Title>
            <Typography.Title level={2} className="m-0 ">
              {totalStudent}
            </Typography.Title>
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
              GIẢNG VIÊN
            </Typography.Title>
            <Typography.Title level={2} className="m-0 ">
              {totalTeacher}
            </Typography.Title>
          </Card>
        </Col>
      </Row>

      <div className="p-2">
        <div className="py-2 ">
          <Button type="primary" onClick={onShowAdd} >
            Thêm mới lớp học
          </Button>
        </div>
        <Table bordered dataSource={listClass} columns={columns} footer={() => `Hiển thị 10 trên tổng ${listClass.length}`} />
      </div>
    </div>
  );
}

ClassList.propTypes = {};

export default ClassList