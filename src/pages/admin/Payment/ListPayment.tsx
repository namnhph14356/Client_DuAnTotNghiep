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
import { getListUser, getUserById } from "../../../api/user";
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
import { Helmet } from "react-helmet";
import { getPaymentSlice } from "../../../features/Slide/payment/PaymentSlice";
import { useAppSelector } from "../../../app/hooks";
import { UserType } from "../../../types/user";
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

const ListPayment = () => {
  const dispatch = useDispatch();
  const  listClass  = useAppSelector((item: any) => item.payment.value);
  const [user, setUser] = useState<any>([]);
  const [idUpdate, setIdUpdate] = useState("");
  const [objectUpdate, setObjectUpdate] = useState({});
  const searchInput = useRef<InputRef>(null);
  const [searchText, setSearchText] = useState(''); 
  const [searchedColumn, setSearchedColumn] = useState('');
  useEffect(() => {
    const getUser = async () => {
        const {data} = await getListUser();
        setUser(data);
    }
    getUser();
  },[])
  const dataTable = listClass.map((item: any, index) => {
    const userId = user.find((e: any) => e._id === item.userId)
    console.log(userId);
    
    return {
      key: index + 1,
      _id: item._id,
      userId: userId?.username,
      email: userId?.email,
      phone:userId?.phone,
      code:item.code,
      amount:item.amount,
      bank: item.bank,
      createdAt: moment(item.createdAt).format("h:mm:ss a, MMM Do YYYY"),
      updatedAt: moment(item.updatedAt).format("h:mm:ss a, MMM Do YYYY"),
    };
  });


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
          placeholder={`Tìm kiếm hóa đơn`}
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
      title: "Tên người dùng",
      dataIndex: "userId",
      key: "userId",
    //   ...getColumnSearchProps('nameClass'),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
    },
    {
        title: "Ngân hàng",
        dataIndex: "bank",
        key: "bank",
      },
    
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    //   render: (row, item) => `${moment(item?.createdAt).format('DD/MM/YYYY')}`,
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

  const [optionsUser, setOptionUser] = useState<any[]>([]);
  const [optionsTeacher, setOptionTeacher] = useState<any[]>([]);

  useEffect(() => {
    dispatch(getPaymentSlice());
    // getDataUser();
  }, []);

//   let totalStudent = 0;
//   let totalTeacher = 0;
//   if (listClass && listClass.length > 0) {
//     listClass.forEach((item) => (totalStudent += item.userOfClass?.length));
//   }
//   if (listClass && listClass.length > 0) {
//     listClass.forEach((item) => (totalTeacher += item.teacherOfClass?.length));
//   }
  

  return (
    <div>
       <Helmet>
        <meta charSet="utf-8" />
        <title>Quản Lí hóa đơn | Vian English</title>
      </Helmet>
      {isShowModal && (
        <div >
          <Modal
            className="admin-class-wrapper"
            title={idUpdate !== "" ? "Chỉnh sửa lớp học" : "Thêm mới lớp học"}
            centered
            visible={isShowModal}
            onCancel={onCloseAdd}
          >
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              initialValues={objectUpdate}
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
      <AdminPageHeader breadcrumb={"Danh sách hóa đơn"} class1={{ title: "Quản lí hóa đơn", route: "payment" }} />
      
      <Table bordered dataSource={dataTable} columns={columns} footer={() => `Hiển thị 10 trên tổng `} />
    </div>
  );
}

ListPayment.propTypes = {};

export default ListPayment