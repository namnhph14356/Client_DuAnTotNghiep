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
import { VocabulatyType } from "../../../../types/vocabularyType";
import { deleteVocabulary, listVocabulary } from "../../../../api/vocabulary";
import AdminPageHeader from "../../../../components/AdminPageHeader";

type Props = {};

interface DataType {
  key: React.Key;
  _id?: string;
  words: string;
  wordForm: string;
  image: string;
  dayId: string;
  meaning: string;
  createdAt: any;
  updatedAt: any;
}
type DataIndex = keyof DataType;
const ListVocabulary = (props: Props) => {
  const [vocabulary, setVocabulary] = useState<VocabulatyType[]>([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [dayTitle, setDayTitle] = useState();

  // const use
  // Call api
  useEffect(() => {
    const getData = async () => {
      const { data } = await listVocabulary();
      setVocabulary(data);
    };
    getData();
  }, []);
  console.log("Tim", vocabulary);

  const dataSources = vocabulary?.map((items: any, index: any) => {
    return {
      key: index + 1,
      stt: index + 1,
      _id: items._id,
      words: items.words,
      meaning: items.meaning,
      wordForm: items.wordForm,
      image: items.image,
      dayId: items.dayId?.title,
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
      title: "You want to delete this Contact ?",
      onOk: async () => {
        await deleteVocabulary(_id);
        setVocabulary(
          vocabulary.filter((item: VocabulatyType) => item._id !== _id)
        );
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
      title: "Từ vựng",
      dataIndex: "words",
      key: "words",
      ...getColumnSearchProps("words"),
    },
    {
      title: "Thuộc tính",
      key: "wordForm",
      // dataIndex: "wordForm"
      render: (record: any) => (
        <div className="">
          {record.wordForm === "1" ? (
            <Tag color="green">Nouns</Tag>
          ) : record.wordForm === "2" ? (
            <Tag color="blue">Adj</Tag>
          ) : record.wordForm === "3" ? (
            <Tag color="purple">Adv</Tag>
          ) : record.wordForm === "4" ? (
            <Tag color="purple">Verbs</Tag>
          ) : (
            <Tag color="red">ERROR</Tag>
          )}
        </div>
      ),
      // ...getColumnSearchProps('wordForm'),
    },
    {
      title: "Nghĩa",
      dataIndex: "meaning",
      key: "meaning",
      ...getColumnSearchProps("meaning"),
    },
    {
      title: "Hình ảnh",
      key: "image",
      render: (record) => (
        <div className="">
          <Image width={100} height={100} src={record.image} />
        </div>
      ),
    },
    // {
    //   title: "Day",
    //   dataIndex: "dayId",
    //   key: "dayId",
    // },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => a.createdAt - b.createdAt,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      sorter: (a, b) => a.updatedAt - b.updatedAt,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <Space align="center" size="middle">
          <Button style={{ background: "#198754" }}>
            <Link to={`/manageDay/vocabulary/${record._id}/editLesson`}>
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
      <AdminPageHeader breadcrumb="Quản lý vocabulary" />
      <Button type="primary" className="my-6">
        <Link to={`/manageDay/vocabulary/addLesson`}>Thêm Từ Vựng</Link>
      </Button>
      <Table columns={columns} dataSource={dataSources} className="overflow-auto"></Table>
    </div>
  );
};

export default ListVocabulary;