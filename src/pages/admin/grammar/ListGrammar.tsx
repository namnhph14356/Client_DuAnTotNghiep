import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Table,
  Breadcrumb,
  Button,
  Space,
  Popconfirm,
  message,
  Input,
  Image,
  Tag,
  Modal,
  Tooltip,
} from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { InputRef } from "antd";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { SearchOutlined } from "@ant-design/icons";
import moment from "moment";
import { deleteGrammar, getListGrammar } from "../../../api/grammar";
import { GammarType } from "../../../types/grammar";
import { useDispatch } from "react-redux";
import { changeBreadcrumb } from "../../../features/Slide/category/CategorySlide";
import AdminPageHeader from "../../../components/AdminPageHeader";
type Props = {};

interface DataType {
  key: React.Key;
  _id?: string;
  name: string;
  description: string;
  dayId?: string;
  summary?: string;
  createdAt?: string;
  updatedAt?: string;
}
type DataIndex = keyof DataType;
const ListGrammar = (props: Props) => {
  const [grammar, setGrammar] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const dispatch = useDispatch();
  const { dayId } = useParams()
  // Call api
  useEffect(() => {
    const getData = async () => {
      const { data } = await getListGrammar();
      setGrammar(data);
    };
    getData();
  }, []);

  const tableWithType = grammar.filter((item: any) => item.dayId === dayId)
  const dataSources = tableWithType?.map((items: any, index: any) => {

    return {
      key: index + 1,
      stt: index + 1,
      _id: items._id,
      name: items.name,
      description: items.description,
      dayId: items.dayId,
      summary: items.summary,
      createdAt: moment(items.createdAt).format("h:mm:ss a, MMM Do YYYY"),
      updatedAt: moment(items.updatedAt).format("h:mm:ss a, MMM Do YYYY"),
    };
  });
  const handleOk = async (id) => {
    const key = "updatable";
    setConfirmLoading(true);
    await deleteGrammar(id);
    setGrammar(grammar.filter((item: GammarType) => item._id !== id));
    message.loading({ content: "Loading...", key });
    message.success({ content: "Xóa Thành Công!", key, duration: 2 });
  };

  const handleCancel = () => {
    message.error("Hủy Hành Động!");
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
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
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record: any) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),

    render: (text) => (searchedColumn === dataIndex ? text : text),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      className: 'w-[70px]',
      sorter: (a: any, b: any) => a.key - b.key,
      sortDirections: ["descend"],
    },
    {
      title: "Tiêu đề",
      dataIndex: "name",
      key: "Name",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      render: (record) => (
        <div className="description_grammar" dangerouslySetInnerHTML={{ __html: `${record}` }}></div>
      )
    },
    {
      title: "Tóm tắt",
      dataIndex: "summary",
      key: "summary",
      render: (record) => (
        <div className="description_grammar" dangerouslySetInnerHTML={{ __html: `${record}` }}></div>
      )

    },
    {
      title: 'Ngày Tạo',
      dataIndex: 'createdAt',
      key: "createdAt",
      className: 'w-[110px]',
      sortDirections: ['descend'],
      ellipsis: {
        showTitle: false,
      },
      render: ((value) => (
        <Tooltip title={value}>
          <span>{value}</span>
        </Tooltip>
      ))

    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'updatedAt',
      key: "updatedAt",
      className: 'w-[130px]',
      sortDirections: ['descend'],
      ellipsis: {
        showTitle: false,
      },
      render: ((value) => (
        <Tooltip title={value}>
          <span>{value}</span>
        </Tooltip>
      ))

    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <Space align="center" size="middle">
          <Button style={{ background: "#198754" }}>
            <Link to={`/manageDay/${dayId}/grammar/${record?._id}/editLesson`}>
              <span className="text-white">Sửa</span>
            </Link>
          </Button>

          <Popconfirm
            placement="topRight"
            title="Bạn Có Muốn Xóa?"
            okText="Có"
            cancelText="Không"
            onConfirm={() => {
              handleOk(record._id);
            }}
            okButtonProps={{ loading: confirmLoading }}
            onCancel={handleCancel}
          >
            <Button type="primary" danger>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <AdminPageHeader breadcrumb={"Danh sách bài học ngữ pháp"} day={dayId} activity={{ title: "Luyện ngữ pháp", route: "grammar" }} type={{ title: "Bài học", route: "listLesson" }} />
      <Button type="primary" className="my-6">
        <Link to={`/manageDay/${dayId}/grammar/addLesson`}>Thêm Ngữ Pháp</Link>
      </Button>
      <Table
        bordered
        columns={columns}
        dataSource={dataSources}
        footer={() => `Hiển thị 10 trên tổng ${dataSources.length}`}
      ></Table>
    </div>
  );
};

export default ListGrammar;
