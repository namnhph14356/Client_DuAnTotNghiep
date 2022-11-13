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
import { getListPracticeActivitylice } from "../../../features/Slide/practiceActivity/PracticeActivitySlice";
import { dayBiggest } from "../../../api/day";
import { useSelector } from "react-redux";

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
    title: `ngày ${newOrder}`,
    order: newOrder,
  };
  const addDay = async () => {
    try {
      const data = await dispatch(addDaySlice(newDay));
      setTimeout(() => {
        navigate(`/manageDay/${data.payload?._id}`);
      }, 1000);
    } catch (error) {
      message.error("LỖI");
    }
  };

  //------------------REMOVE-CONFIRM-------------------

  const columns: ColumnsType<any> = [
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
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Ngày Tạo",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Ngày Update",
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
    console.log("row", row);

    const columns2: ColumnsType<ExpandedDataType> = [
      { title: "Key", dataIndex: "key", key: "key", className: "hidden" },
      { title: "STT", dataIndex: "stt", key: "stt" },
      { title: "ID", dataIndex: "_id", key: "_id" },
      { title: "Title", dataIndex: "title", key: "title" },
      { title: "Type", dataIndex: "type", key: "type" },
      {
        title: "Hành Động",
        key: "action",
        render: (text, record) => (
          <Space align="center" size="middle">
            <Button style={{ background: "#198754" }}>
              <Link to={`/admin/answerQuiz/${record._id}/edit`}>
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

    console.log(
      activity
        .filter((item: PracticeActivityType) => item?.day === row._id)
        .map((item2: PracticeActivityType, index) => {
          return {
            key: item2?._id,
            stt: index + 1,
            _id: item2?._id,
            title: item2?.title,
            type: item2.type,
          };
        })
    );

    let data: any = activity
      .filter((item: PracticeActivityType) => item?.day == row._id)
      .map((item2: PracticeActivityType, index) => {
        return {
          key: item2?._id,
          stt: index + 1,
          _id: item2?._id,
          title: item2?.title,
          type: item2.type,
        };
      });
    console.log("dataActivi", data);

    return (
      <Table
        rowSelection={rowSelection}
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

      {selectedRowKeys.length > 1 ? (
        <Popconfirm
          title="Bạn Có Muốn Xóa Hết?"
          okText="Có"
          cancelText="Không"
          onConfirm={() => {
            handleOk(selected);
          }}
          okButtonProps={{ loading: confirmLoading }}
          onCancel={handleCancel}
        >
          <Button className="ml-4" type="primary" danger>
            Xóa Hết
          </Button>
        </Popconfirm>
      ) : (
        ""
      )}

      <span style={{ marginLeft: 8 }}>
        {selectedRowKeys.length > 0
          ? `Đã chọn ${selectedRowKeys.length} hàng`
          : ""}
      </span>

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
