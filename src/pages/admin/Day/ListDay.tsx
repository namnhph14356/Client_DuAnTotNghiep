import React, { useEffect } from "react";
import { Table, Button, Space, message, Tag, Modal, } from "antd";
import type { ColumnsType } from "antd/es/table";
import moment from "moment";
import AdminPageHeader from "../../../components/AdminPageHeader";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { DayType } from "../../../types/day";
import { PracticeActivityType } from "../../../types/practiceActivity";
import { addDaySlice, changeBreadcrumb, getDayBiggest, getListDaySlice, } from "../../../features/Slide/day/DaySlice";
import { addPracticeActivitylice, getListPracticeActivitylice } from "../../../features/Slide/practiceActivity/PracticeActivitySlice";
import { getListVocabularySlice } from "../../../features/Slide/vocabulary/vocabulary";

interface DataType {
  key: React.Key;
  _id?: string;
  title?: string;
  status?: number;
  createdAt: string;
  updatedAt: string;
}

interface ExpandedDataType {
  key?: React.Key;
  order?: number,
  status?: boolean;
  stt?: number,
  title?: string;
  type?: string;
  _id?: string;
  action: PracticeActivityType;
  day?: DayType;
  createdAt?: string;
  updatedAt?: string;
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
  const navigate = useNavigate();



  const dataTable = days.map((item: DayType, index) => {
    const activityByDay = activity.filter((e: PracticeActivityType) => e.day === item._id && e.status === true)

    return {
      key: index + 1,
      _id: item._id,
      title: item.title,
      status: activityByDay.length,
      createdAt: moment(item.createdAt).format("h:mm:ss a, MMM Do YYYY"),
      updatedAt: moment(item.updatedAt).format("h:mm:ss a, MMM Do YYYY"),
    };
  });

  var number: number = 1;
  var newOrder: number = dayBiggest?.order + number;
  var newDay: { title: string, order: number } = {
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

  const columns: ColumnsType<DataType> = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      className: "w-[100px]",
      sorter: (a: any, b: any) => a.key - b.key,
      sortDirections: ["descend"],
    },
    {
      title: "Ngày học",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Trạng thái",
      key: "status",
      render: (record: DayType) => (
        <div className="">
          {record.status === 0 ? (
            <Tag color="red">Trống trơn</Tag>
          ) : record.status === 1 ? (
            <Tag color="blue">1 phần</Tag>
          ) : record.status === 2 ? (
            <Tag color="purple">2 phần</Tag>
          ) : record.status === 3 ? (
            <Tag color="purple">3 phần</Tag>
          ) : record.status === 4 ? (
            <Tag color="purple">4 phần</Tag>
          ) : record.status === 5 ? (
            <Tag color="green">5 phần</Tag>
          ) : (
            <Tag color="red">ERROR</Tag>
          )}
        </div>
      ),
      // ...getColumnSearchProps('wordForm'),
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

  const expandedRowRender = (row: DataType) => {

    const columns2: ColumnsType<ExpandedDataType> = [
      {
        title: "STT", dataIndex: "stt", key: "stt",
        sorter: (a: any, b: any) => a.stt - b.stt,
        className: "w-[100px]"
      },
      { title: "Tiêu đề", dataIndex: "title", key: "title" },
      {
        title: "Trạng thái", dataIndex: "status", key: "status",
        render: (record: boolean) => (
          <div className="">
            {record === true ?
              <Tag color="green">Đã đủ</Tag>
              :
              <Tag color="red">Chưa đủ</Tag>
            }
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

    let data = activity
      .filter((item: PracticeActivityType) => item?.day == row._id)
      .map((item2: PracticeActivityType, index) => {
        return {
          key: item2._id,
          stt: index + 1,
          _id: item2._id,
          title: item2.title,
          order: item2.order,
          status: item2.status,
          type: item2.type,
          action: item2
        };
      }).sort((a, b) => a.order - b.order)
    console.log("dâtaaa", data);

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
    dispatch(getListVocabularySlice())
    dispatch(getDayBiggest());
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
