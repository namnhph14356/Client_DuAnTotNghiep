import { Table, Typography } from 'antd'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { listHistoryByUser } from '../../api/history'
import { useAppSelector } from '../../app/hooks'
import { RootState } from '../../app/store'
import { DayType } from '../../types/day'
import { UserType } from '../../types/user'

const HistoryLearning = () => {
  let auth = useAppSelector(((item: RootState) => item.auth.value)) as UserType
  const { id } = useParams();
  const days = useAppSelector<DayType[]>(item => item.day.value)

  const [listHistory, setListHistory] = useState([]);

  const getHistoryById = async () => {
    const { data } = await listHistoryByUser(id);
    if (data) {
      setListHistory(data);
    }
  };

  const getDayById = (id: string) => {
    const day = days.find((e: DayType) => e._id === id)
    return day?.title
  }

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
      title: "Ngày",
      dataIndex: "Ngày",
      key: "Ngày",
      render: (row, item) => `${getDayById(item?.practiceActivity?.day._id)}`,
    },
    // {
    //   title: "Email",
    //   dataIndex: "Email",
    //   key: "Email",
    //   render: (row, item) => `${item?.user?.email}`,
    // },
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
      render: (row, item) => <span className={`${item?.score >= 8 ? 'text-green-500' : 'text-red-500'} font-semibold`}>{item?.score}</span>,
    },
    // {
    //   title: "Tiến độ học tập",
    //   dataIndex: "learningProgress",
    //   key: "learningProgress",
    //   render: (row, item) => `${item?.learningProgress?.isPass ? 'Hoàn thành' : 'Chưa hoàn thành'}`,
    // },
    {
      title: "Thời gian làm",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (row, item) => `${moment(item.createdAt).format("hh:mm:ss, Do/MM/YYYY")}`,
    }
  ];
  return (
    <div>
      <div className="header__info__user">
        <ul className='breadcrumbs__user'>
          <div>
            <li>{auth?.username}</li>
            <li>/</li>
            <li>Lịch sử làm bài</li>
          </div>
        </ul>
      </div>

      <div>
        <div className="d-flex align-items-center justify-between">
          <Typography.Title className="m-0 py-4" level={3}>
            Lịch sử làm bài
          </Typography.Title>
        </div>
        <Table bordered dataSource={listHistory} columns={columns} />
      </div>
    </div>
  )
}

export default HistoryLearning