import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
  // Call api
  useEffect(() => {
    const getData = async () => {
      const { data } = await getListGrammar();
      setGrammar(data);
    };
    getData();
  }, []);
  const dataSources = grammar?.map((items: any, index: any) => {
    console.log(items.wordForm);

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
  const handleOk = (id) => {
    const key = "updatable";
    setConfirmLoading(true);
    console.log(id);
    message.loading({ content: "Loading...", key });

    setTimeout(() => {
      // delete record
      message.success({ content: "Xóa Thành Công!", key, duration: 2 });
    }, 2000);
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

  const onDelete = (_id: any) => {
    Modal.confirm({
      title: "Bạn có chắc chắn xóa không?",
      onOk: async () => {
        await deleteGrammar(_id);
        setGrammar(grammar.filter((item: GammarType) => item._id !== _id));
      },
    });
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
      sorter: (a: any, b: any) => a.key - b.key,
      // sorter: (record1, record2) => { return record1.key > record2.key },
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
      className: "description_grammar",
    },
    {
      title: "Tóm tắt",
      dataIndex: "summary",
      key: "summary",
    },
    {
      title: "Thời gian tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Thời gian chỉnh sửa",
      dataIndex: "updatedAt",
      key: "updatedAt",
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <Space align="center" size="middle">
          <Button style={{ background: "#198754" }}>
            <Link to={`/manageDay/grammar/${record?.dayId}/edit`}>
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
            <Button type="primary" danger onClick={() => onDelete(record._id)}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <AdminPageHeader breadcrumb="Quản lý Ngữ Pháp Bài Học" />
      <Button type="primary" className="my-6">
        <Link to={`/manageDay/grammar/add`}>Thêm Ngữ Pháp</Link>
      </Button>
      <h1>Ngữ pháp</h1>
      <Table columns={columns} dataSource={dataSources}></Table>
    </div>
  );
};

export default ListGrammar;
