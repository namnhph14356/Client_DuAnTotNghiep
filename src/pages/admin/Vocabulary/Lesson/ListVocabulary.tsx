import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import { VocabulatyType } from "../../../../types/vocabularyType";
import { deleteVocabulary, listVocabulary } from "../../../../api/vocabulary";
import AdminPageHeader from "../../../../components/AdminPageHeader";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { editPracticeActivitylice } from "../../../../features/Slide/practiceActivity/PracticeActivitySlice";
import { PracticeActivityType } from "../../../../types/practiceActivity";

type Props = {};

interface DataType {
  key: React.Key;
  _id?: string;
  words: string;
  wordForm: string;
  image: string;
  dayId: string;
  meaning: string;
  createdAt: string;
  updatedAt: string;
}
type DataIndex = keyof DataType;
const ListVocabulary = (props: Props) => {
  const [vocabulary, setVocabulary] = useState<VocabulatyType[]>([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [dayTitle, setDayTitle] = useState();
  const dispatch = useAppDispatch();
  const practiceActivity = useAppSelector(item => item.practiceActivity.value)
  const { dayId } = useParams();
  const navigate = useNavigate();

  // Call api
  useEffect(() => {
    const getData = async () => {
      const { data } = await listVocabulary();
      setVocabulary(data);
    };
    getData();
  }, []);

  const tableListenSpeak = vocabulary.filter((item: VocabulatyType) => item.dayId?._id === String(dayId))
  const dataSources = tableListenSpeak?.map((items: any, index: number) => {
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
  let activity: any = practiceActivity.find((e: PracticeActivityType) => e.day === dayId && e.type === "vocabulary")

  const handleOk = async (id) => {
    const key = "updatable";
    setConfirmLoading(true);
    const del = await deleteVocabulary(id);
    setVocabulary(
      vocabulary.filter((item: VocabulatyType) => item._id !== id)
    );
    dispatch(editPracticeActivitylice({ ...activity, status: false }))
    message.loading({ content: "Loading...", key });
    if (del) {
      message.success({ content: "Xóa Thành Công!", key, duration: 2 });
    }
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

  const checkAnswer = () => {
    const voca = vocabulary.filter((e:VocabulatyType) => e.dayId?._id === dayId)
    if (voca.length === 5) {
      message.warning("Đã đạt giới hạn từ vựng !")
    } else {
      navigate(`/manageDay/${dayId}/vocabulary/addLesson`)
    }

  }

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
      className: 'w-[70px]',
      dataIndex: "key",
      key: "key",
      sorter: (a: any, b: any) => a.key - b.key,
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
      className: 'w-[110px]',
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
    {
      title: 'Ngày Tạo',
      dataIndex: 'createdAt',
      key: "createdAt",
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
            <Link to={`/manageDay/${dayId}/vocabulary/${record._id}/editLesson`}>
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
            <Button type="primary" danger >
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  
  return (
    <div>
      <AdminPageHeader breadcrumb={"Danh sách từ vựng"} day={dayId} activity={{ title: "Luyện từ vựng", route: "vocabulary" }} type={{ title: "Bài học", route: "listLesson" }} />
      <Button type="primary" className="my-6" onClick={() => checkAnswer()}>
        {/* <Link to={`/manageDay/${dayId}/vocabulary/addLesson`}> */}
        Thêm Từ Vựng
        {/* </Link> */}
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

export default ListVocabulary;
