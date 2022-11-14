import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  Breadcrumb,
  Button,
  Space,
  Popconfirm,
  message,
  Input,
  Badge,
  Image,
  Tag,
  Modal,
} from "antd";
import type { Key, TableRowSelection } from "antd/es/table/interface";
import {
  SearchOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import type { InputRef } from "antd";
import type { FilterConfirmProps } from "antd/es/table/interface";
import type { ColumnsType, ColumnType } from "antd/es/table";
import moment from "moment";
import AdminPageHeader from "../../../components/AdminPageHeader";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { DayType } from "../../../types/day";
import { PracticeActivityType } from "../../../types/practiceActivity";
import {
  addDaySlice,
  changeBreadcrumb,
  getDayBiggest,
  getListDaySlice,
} from "../../../features/Slide/day/DaySlice";
import { addPracticeActivitylice, getListPracticeActivitylice } from "../../../features/Slide/practiceActivity/PracticeActivitySlice";
import { dayBiggest } from "../../../api/day";
import { useSelector } from "react-redux";
import { type } from "@testing-library/user-event/dist/types/setup/directApi";
import { async } from "@firebase/util";

interface DataType {
  key: React.Key;
  _id?: string;
  title: string;
}

interface ExpandedDataType {
  key: React.Key;
  _id?: string;
  day?: DayType;
  title: string;
  type: string;
}

type DataIndex = keyof ExpandedDataType;

type Props = {};
const typeActivity = [
  { id: 1, title: "listenspeak", type: "Luyện nghe nói phản xạ" },
  { id: 2, title: "vocabulary", type: "Luyện từ vựng" },
  { id: 3, title: "sentences", type: "Luyện cấu trúc và câu" },
  { id: 4, title: "conversation", type: "Luyện hội thoại" },
  { id: 5, title: "grammar", type: "Luyện ngữ pháp" },
]

const ListDay = (props: Props) => {
  const breadcrumb = useAppSelector((item) => item.day.breadcrumb);
  const days = useAppSelector((item) => item.day.value);
  const dayBiggest = useAppSelector((item: any) => item.day.bigDay);
  const activity = useAppSelector((item) => item.practiceActivity.value);
  const dispatch = useAppDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selected, setSelected] = useState<
    { key: string; id: string | undefined }[]
  >([]);
  const searchInput = useRef<InputRef>(null);
  const [bigDay, setBigDay] = useState<DayType>();
  const navigate = useNavigate();
  //------------------STATE--------------------

  useEffect(() => {
    dispatch(getDayBiggest());
    dispatch(getListDaySlice());
  }, []);

  const dataTable = days.map((item: DayType, index) => {
    return {
      key: index + 1,
      _id: item._id,
      title: item.title,
      createdAt: moment(item.createdAt).format("h:mm:ss a, MMM Do YYYY"),
      updatedAt: moment(item.updatedAt).format("h:mm:ss a, MMM Do YYYY"),
    };
  });

  const childrenTable = activity.map((item: PracticeActivityType, index) => {
    return {
      key: item._id,
      _id: item._id,
    };
  });

  //------------------TABLE-DATA-------------------

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
  };

  //------------------SEARCH--------------------

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    let rowSelected: { key: string; id: string | undefined }[] = [];
    newSelectedRowKeys.map((item) => {
      childrenTable.map((item2) =>
        item2.key === item
          ? rowSelected.push({ key: item2.key, id: item2._id })
          : ""
      );
    });
    setSelectedRowKeys(newSelectedRowKeys);
    setSelected(rowSelected);
  };

  const rowSelection: TableRowSelection<ExpandedDataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys: Key[] = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          onSelectChange(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys: Key[] = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          onSelectChange(newSelectedRowKeys);
        },
      },
    ],
  };
  //------------------SELECT-ROW-------------------

  const handleOk = (id) => {
    const key = "updatable";
    setConfirmLoading(true);
    message.loading({ content: "Loading...", key });

    setTimeout(() => {
      if (Array.isArray(id)) {
      } else {
      }
      setConfirmLoading(false);
      message.success({ content: "Xóa Thành Công!", key, duration: 2 });
    }, 2000);
  };

  const handleCancel = () => {
    message.error("Hủy Hành Động!");
  };

  // -----Add New DAY
  var number: any = 1;
  var newOrder: any = dayBiggest?.order + number;
  var newDay: any = {
    title: `Ngày ${newOrder}`,
    order: newOrder,
  };
  const addDay = async () => {

    Modal.confirm({
      title: `Bạn có muốn thêm ngày thứ ${days.length + 1} không ?`,
      content: <div className=' text-sm'>
        <p>Số ngày học hiện có {days.length} !</p>
      </div>,
      width: "30%",
      onOk: async () => {
        try {
          const { payload } = await dispatch(addDaySlice(newDay));
          typeActivity.map(async (item) => {
            await dispatch(addPracticeActivitylice({
              day: payload._id,
              title: item.type,
              type: item.title,
              order: item.id
            }))
          })
          navigate(`/manageDay/${payload?._id}`);
          message.success("Thêm thành công " + payload.title);
        } catch (error) {
          message.error("LỖI");
        }
      },
    })


  };

  //------------------REMOVE-CONFIRM-------------------

  const columns: ColumnsType<any> = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      className: "w-[100px]",
      sorter: (a: any, b: any) => a.key - b.key,
      // sorter: (record1, record2) => { return record1.key > record2.key },
      sortDirections: ["descend"],
    },
    {
      title: "Ngày học",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Ngày Tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
    },
    {
      title: "Actions",
      key: "action",
      render: (text, record) => (
        <Space align="center" size="middle">
          <Button style={{ background: "#198754" }}>
            <Link to={`/manageDay/${record._id}`}>
              <span className="text-white">Sửa</span>
            </Link>
          </Button>
        </Space>
      ),
    },
  ];

  const expandedRowRender = (row: any) => {
    console.log("${findOne}", row);

    const columns2: ColumnsType<ExpandedDataType> = [
      {
        title: "STT", dataIndex: "stt", key: "stt",
        sorter: (a: any, b: any) => a.stt - b.stt,
        className: "w-[100px]"
      },
      { title: "Tiêu đề", dataIndex: "title", key: "title" },
      {
        title: "Trạng thái", dataIndex: "status", key: "status",
        render: (record: any) => (
          <div className="">
            {record === "1" ? (
              <Tag color="green">Nouns</Tag>
            ) : record === "2" ? (
              <Tag color="blue">Adj</Tag>
            ) : record === "3" ? (
              <Tag color="purple">Adv</Tag>
            ) : record === "4" ? (
              <Tag color="purple">Verbs</Tag>
            ) : (
              <Tag color="red">ERROR</Tag>
            )}
          </div>
        ),
      },
      {
        title: "Hành Động",
        key: "action",
        render: (text, record) => (
          <Space align="center" size="middle">
            <Button style={{ background: "#198754" }}>
              <Link to={`/manageDay/${row._id}/${record.type}`}>
                <span className="text-white">Sửa</span>
              </Link>
            </Button>
          </Space>
        ),
      },
    ];

    let data: any = activity
      .filter((item: PracticeActivityType) => item?.day == row._id)
      .map((item2: PracticeActivityType, index) => {
        return {
          key: item2?._id,
          stt: index + 1,
          _id: item2?._id,
          title: item2?.title,
          order: item2.order,
          type: item2.type
        };
      }).sort((a, b) => a.order - b.order)

    return (
      <Table
        bordered
        columns={columns2}
        dataSource={data}
        pagination={false}
      />
    );
  };
  //------------------TABLE-COLUMM-------------------

  useEffect(() => {
    dispatch(changeBreadcrumb("Quản Lý Ngày Học"));
    dispatch(getListDaySlice());
    dispatch(getListPracticeActivitylice());
  }, []);

  return (
    <div>
      <AdminPageHeader breadcrumb={breadcrumb} />
      <Button type="primary" className="my-6" onClick={() => addDay()}>
        Thêm ngày
      </Button>

      <Table
        bordered
        footer={() => `Hiển thị 10 trên tổng ${days.length}`}
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
        columns={columns}
        dataSource={dataTable}
      />
    </div>
  );
};

export default ListDay;
