import { Table, Typography } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listHistoryByUser } from "../../../api/history";
import { getUserById } from "../../../api/user";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getListDaySlice } from "../../../features/Slide/day/DaySlice";
import { getLearningProgressByUserSlice } from "../../../features/Slide/learningProgress/LearningProgress";
import { DayType } from "../../../types/day";
import { LearningProgressType } from "../../../types/learningProgress";
import { UserType } from "../../../types/user";
import type { ColumnsType, ColumnType } from 'antd/es/table';
import type { Key, TableRowSelection } from 'antd/es/table/interface';
import { WeekType } from "../../../types/week";
import { MonthType } from "../../../types/month";
import { getListMonthSlice } from "../../../features/Slide/month/MonthSlice";
import { getListWeekSlice } from "../../../features/Slide/week/WeekSlice";

const ProgressUser = (props) => {
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const days = useAppSelector<DayType[]>(item => item.day.value)
  const weeks = useAppSelector<WeekType[]>(item => item.week.value)
  const months = useAppSelector<MonthType[]>(item => item.month.value)
  const learningProgress = useAppSelector<any>(item => item.learningProgress.value)
  const [user, setUser] = useState<UserType>();

  const getUser = async () => {
    const { data } = await getUserById(userId);
    if (data) {
      setUser(data);
      const { payload } = await dispatch(getLearningProgressByUserSlice(data._id));
    }
  };

  const getMonthById = (id: string) => {
    const month = months.find((e: MonthType) => e._id === id)
    return month?.title
  }

  const getScore = (id: string, type: string) => {

    const day = days.find((e: any) => e.week._id === id)

    if (day) {
      const learning = learningProgress.find((e) => e.day._id === day._id)
      if (type === "scoreVocabulary") {
        return learning?.oralWeekVocabularyScore || 0
      } else if (type === "scoreSentences") {
        return learning?.oralWeekSentencesScore || 0
      }

    }
  }

  const mediumScore = (idDay: string, type: string) => {
    const learning = learningProgress.find((e) => e.day._id === idDay)
    let score = 0
    if (learning) {
      if (type === "mediumScore") {
        score =
          (
            learning?.listeningSpeakingScore
            + learning?.vocabularyScore
            + learning?.structureSentencesScore
            + learning?.conversationScore
            + learning?.grammarScore
          ) / 5
      } else if (type === "scoreOral") {
        score = learning.oralScore
      } else if (type === "scoreOral") {

      }
    } else {
      return 0
    }
    return score
  }

  const statusDay = (idDay: string) => {
    const learning = learningProgress.find((e) => e.day._id === idDay)
    if (learning) {
      return learning.isPass
    }
    return false
  }

  const progressWeek = (idWeek: string) => {
    const listDayByWeek = learningProgress.filter((e: any) => e.day.week === idWeek)
    const listDayPass = listDayByWeek.filter((e) => e.isPass === true)
    const percentPass = 100 / 7 * listDayPass.length
    return Number(percentPass.toFixed(0))
  }

  useEffect(() => {
    getUser()
    dispatch(getListDaySlice())
    dispatch(getListMonthSlice())
    dispatch(getListWeekSlice())
  }, [userId]);

  const dataSourd = weeks.map((item: WeekType, index: number) => {
    return {
      key: index + 1,
      ...item
    }
  })

  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      render: (row, item, index) => `${index + 1}`,
    },
    {
      title: "Tháng",
      dataIndex: "month",
      key: "month",
      render: (row, item) => `${getMonthById(item.month)}`,
    },
    {
      title: "Tuần",
      dataIndex: "week",
      key: "week",
      render: (row, item) => `${item.title}`,
    },
    {
      title: "Điểm thi Từ vựng",
      dataIndex: "oralWeekVocabularyScore",
      key: "oralWeekVocabularyScore",
      render: (row, item) => <span className={`${getScore(item?._id, "scoreVocabulary") >= 5 ? 'text-green-500' : 'text-red-500'} font-semibold`}>
        {getScore(item?._id, "scoreVocabulary")}
      </span>,
    },
    {
      title: "Điểm thi Cấu trúc câu",
      dataIndex: "oralWeekSentencesScore",
      key: "oralWeekSentencesScore",
      render: (row, item) => <span className={`${getScore(item?._id, "scoreSentences") >= 5 ? 'text-green-500' : 'text-red-500'} font-semibold`}>
        {getScore(item?._id, "scoreSentences")}
      </span>,
    },
    {
      title: "Tiến độ",
      dataIndex: "tienDo",
      key: "tienDo",
      render: (row, item) => <span className={`${progressWeek(item._id) >= 50 ? 'text-green-500' : 'text-red-500'} font-semibold`}>
        {progressWeek(item._id)}%
      </span>,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (row, item) => <span className={`${item?.isPass >= true ? 'text-green-500' : 'text-red-500'} font-semibold`}>
        Chưa hoàn thành
      </span>,
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (row, item) => `${moment(item.updatedAt).format("hh:mm:ss, Do/MM/YYYY")}`,
    }
  ];



  const expandedRowRender = (row: any) => {
    const expandedRowRender = (row: any) => {

      const columns2: ColumnsType<LearningProgressType> = [
        { title: 'Key', dataIndex: 'key', key: 'key', className: "hidden" },
        {
          title: 'Nghe nói phản xạ',
          dataIndex: 'listeningSpeakingScore',
          key: 'listeningSpeakingScore',
          render: (row, item) => <span className={`${item?.listeningSpeakingScore >= 5 ? 'text-green-500' : 'text-red-500'} font-semibold`}>
            {item?.listeningSpeakingScore}
          </span>,
        },
        {
          title: 'Từ vựng',
          dataIndex: 'vocabularyScore',
          key: 'vocabularyScore',
          render: (row, item) => <span className={`${item?.listeningSpeakingScore >= 5 ? 'text-green-500' : 'text-red-500'} font-semibold`}>
            {item?.listeningSpeakingScore}
          </span>,
        },
        {
          title: 'Cấu trúc & câu',
          dataIndex: 'structureSentencesScore',
          key: 'structureSentencesScore',
          render: (row, item) => <span className={`${item?.structureSentencesScore >= 5 ? 'text-green-500' : 'text-red-500'} font-semibold`}>
            {item?.structureSentencesScore}
          </span>,
        },
        {
          title: 'Hội thoại',
          dataIndex: 'conversationScore',
          key: 'conversationScore',
          render: (row, item) => <span className={`${item?.conversationScore >= 5 ? 'text-green-500' : 'text-red-500'} font-semibold`}>
            {item?.conversationScore}
          </span>,
        },
        {
          title: 'Ngữ pháp',
          dataIndex: 'grammarScore',
          key: 'grammarScore',
          render: (row, item) => <span className={`${item?.grammarScore >= 5 ? 'text-green-500' : 'text-red-500'} font-semibold`}>
            {item?.grammarScore}
          </span>,
        },
      ];

      let data23: any = learningProgress.filter((item: any) => item.day._id === row._id).map((item2: any, index) => {
        return {
          key: item2._id,
          ...item2
        }

      })

      return <div className=''>
        <Table bordered columns={columns2} dataSource={data23} pagination={false} />
      </div>

    }
    const dataSourd = days.filter((e: any) => e.week._id === row._id).map((item: DayType, index: number) => {
      return {
        key: index + 1,
        ...item
      }
    })
    const columns = [
      {
        title: "STT",
        dataIndex: "key",
        key: "key",
        render: (row, item, index) => `${index + 1}`,
      },
      {
        title: "Ngày",
        dataIndex: "Ngày",
        key: "ngay",
        render: (row, item) => `${item?.title}`,
      },
      {
        title: "Điểm trung bình",
        dataIndex: "mediumScore",
        key: "mediumScore",
        render: (row, item) => <div className={`font-bold ${mediumScore(item._id, `mediumScore`) > 5 ? 'text-green-500' : 'text-red-500'} `}>
          {mediumScore(item._id, "mediumScore")}
        </div>,
      },
      {
        title: "Điểm thi Oral",
        dataIndex: "scoreOral",
        key: "scoreOral",
        render: (row, item) => <span className={`${mediumScore(item._id, `scoreOral`) >= 5 ? 'text-green-500' : 'text-red-500'} font-semibold`}>
          {mediumScore(item._id, `scoreOral`)}
        </span>,
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
        render: (row, item) => <span className={`${statusDay(item._id) === true ? 'text-green-500' : 'text-red-500'} font-semibold`}>
          {statusDay(item._id) === true ? 'Hoàn thành' : 'Chưa hoàn thành'}
        </span>,
      },
      {
        title: "Ngày cập nhật",
        dataIndex: "updatedAt",
        key: "updatedAt",
        render: (row, item) => `${moment(item.updatedAt).format("hh:mm:ss, Do/MM/YYYY")}`,
      }
    ];


    return <div>
      <Table bordered columns={columns} dataSource={dataSourd} pagination={false} expandable={{ expandedRowRender }} />
    </div>

  }

  return (
    <div className="p-2">
      <div className="d-flex align-items-center justify-between">
        <Typography.Title className="m-0 py-4" level={3}>
          Tiến độ học tập của <span className="text-blue-500">{user?.username}</span>
        </Typography.Title>
      </div>
      <Table bordered
        footer={() => `Hiển thị 10 trên tổng ${dataSourd.length}`}
        dataSource={dataSourd}
        columns={columns}
        expandable={{ expandedRowRender }}
      />
    </div>
  );
};

ProgressUser.propTypes = {};

export default ProgressUser;
