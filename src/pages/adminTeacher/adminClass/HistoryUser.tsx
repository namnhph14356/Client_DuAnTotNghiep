import { Table, Typography } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listHistoryByUser } from "../../../api/history";
import { getUserById } from "../../../api/user";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getListDaySlice } from "../../../features/Slide/day/DaySlice";
import { DayType } from "../../../types/day";
import { UserType } from "../../../types/user";
const HistoryUser = (props) => {
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const days = useAppSelector<DayType[]>(item => item.day.value)
  const [listHistory, setListHistory] = useState([]);
  const [user, setUser] = useState<UserType>();

  const getHistoryById = async () => {
    const { data } = await listHistoryByUser(userId);
    if (data) {
      setListHistory(data);
    }
  };

  const getUser = async () => {
    const { data } = await getUserById(userId);
    if (data) {
      setUser(data);
    }
  };

  const getDayById = (id: string) => {
    const day = days.find((e: DayType) => e._id === id)
    return day?.title
  }

  useEffect(() => {
    dispatch(getListDaySlice())
    getHistoryById();
    getUser()
  }, [userId]);
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (row, item, index) => `${index + 1}`,
    },
    {
      title: "Tên học sinh",
      dataIndex: "Name Student",
      key: "Name Student",
      render: (row, item) => `${item?.user?.username}`,
    },
    {
      title: "Ngày",
      dataIndex: "Ngày",
      key: "Ngày",
      render: (row, item) => `${getDayById(item?.learningProgress?.day)}`,
    },
    {
      title: "Tên bài tập",
      dataIndex: "practiceActivity",
      key: "practiceActivity",
      render: (row, item) => `${item?.practiceActivity?.title}`,
    },
    {
      title: "Điểm",
      dataIndex: "score",
      key: "score",
      render: (row, item) => <span className={`${item?.score >= 8 ? 'text-green-500' : 'text-red-500' } font-semibold`}>{item?.score}</span>,
    },
    {
      title: "Thời gian làm",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (row, item) => `${moment(item.createdAt).format("hh:mm:ss, Do/MM/YYYY")}`,
    }
  ];
  return (
    <div className="p-2 h-screen">
      <div className="d-flex align-items-center justify-between">
        <Typography.Title className="m-0 py-4" level={3}>
          Lịch sử làm bài của <span className="text-blue-500">{user?.username}</span>
        </Typography.Title>
      </div>
      <Table bordered dataSource={listHistory} columns={columns} />
    </div>
  );
};

HistoryUser.propTypes = {};

export default HistoryUser;
