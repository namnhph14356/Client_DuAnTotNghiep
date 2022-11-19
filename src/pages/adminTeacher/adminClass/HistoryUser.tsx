import { Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listHistoryByUser } from "../../../api/history";
const HistoryUser = (props) => {
  const { userId } = useParams();

  const [listHistory, setListHistory] = useState([]);

  const getHistoryById = async () => {
    const { data } = await listHistoryByUser(userId);
    if (data) {
      setListHistory(data);
    }
  };

  useEffect(() => {
    getHistoryById();
  }, []);
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (row, item, index) => `${index + 1}`,
    },
    {
      title: "Name Student",
      dataIndex: "Name Student",
      key: "Name Student",
      render: (row, item) => `${item?.user?.username}`,
    },
    {
      title: "Email",
      dataIndex: "Email",
      key: "Email",
      render: (row, item) => `${item?.user?.email}`,
    },
    {
      title: "Loại bài tập",
      dataIndex: "type",
      key: "type",
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
    },
    {
        title: "Tiến độ học tập",
        dataIndex: "learningProgress",
        key: "learningProgress",
        render: (row, item) => `${item?.learningProgress?.isPass ? 'Hoàn thành' : 'Chưa hoàn thành'}`,
      },
  ];
  return (
    <div className="p-2">
      <div className="d-flex align-items-center justify-between">
        <Typography.Title className="m-0 py-4" level={3}>
          Lịch sử làm bài
        </Typography.Title>
      </div>
      <Table dataSource={listHistory} columns={columns} />
    </div>
  );
};

HistoryUser.propTypes = {};

export default HistoryUser;
