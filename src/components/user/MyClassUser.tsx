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
import React, { useEffect, useRef, useState } from 'react'
import moment from 'moment'
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { RootState } from '../../app/store';
import { UserType } from '../../types/user';
import { getListClass } from '../../features/Slide/class/classSlice';
import { ClassType } from '../../types/Class';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import { ExclamationCircleOutlined, SearchOutlined } from "@ant-design/icons";
import { FilterConfirmProps } from "antd/lib/table/interface";
type DataIndex = keyof ExpandedDataType;
interface ExpandedDataType {
  key: React.Key;
  _id?: string;
  nameClass: string;
  userOfClass: any;
  teacherOfClass: any;
  linkJoinClass?: string,
  lever?: string;
  createdAt: string;
  updatedAt: string;
}
const MyClassUser = () => {

  const { listClass } = useAppSelector((state: any) => state.class)
  const auth = useAppSelector(((item: RootState) => item.auth.value)) as UserType
  const searchInput = useRef<InputRef>(null);
  const [userClass, setUserClass] = useState<any>([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const dispatch = useAppDispatch()

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const getClassListUser = () => {
    let myClass: any = []
    listClass?.map(async (e: any) => {
      e.userOfClass?.map((item) => {
        if (item.userId._id === auth._id) {
          myClass.push(e)
        }
      })
    })
    setUserClass(myClass)
  }

  useEffect(() => {
    dispatch(getListClass())
    getClassListUser()
  }, [])

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
      render: (row, item, index) => `${index + 1}`,
    },
    {
      title: "Tên lớp",
      dataIndex: "nameClass",
      key: "nameClass",
      ...getColumnSearchProps('nameClass'),
      render: (row, item) => `${item?.nameClass}`,
    },
    {
      title: "Giảng viên",
      dataIndex: "teacherOfClass",
      key: "teacherOfClass",
      render: (row, item) => `${item?.teacherOfClass}`,
    },
    {
      title: "Ngày vào lớp",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (row, item) =>
      `${moment(item?.timeJoinClass).format("DD/MM/YYYY")}`,
    },
    {
      title: "Link học trực tuyến",
      dataIndex: "linkJoinClass",
      key: "linkJoinClass",
    }
  ];
  return (
    <div>
      <div className="header__info__user">
        <ul className='breadcrumbs__user'>
          <div>
            <li>{auth.username}</li>
            <li>/</li>
            <li>Lớp học của tôi</li>
          </div>
        </ul>
      </div>

      <div>
        <div className="d-flex align-items-center justify-between">
          <Typography.Title className="m-0 py-4" level={3}>
            Lớp học của tôi
          </Typography.Title>
        </div>
        <Table bordered dataSource={userClass} columns={columns} />
      </div>
    </div>
  )
}

export default MyClassUser
