/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useRef, useState } from 'react';
import { Table, Breadcrumb, Button, Space, Popconfirm, message, Input, Badge, Image, Tag, Tooltip } from 'antd';
import type { Key, TableRowSelection } from 'antd/es/table/interface';
import AdminPageHeader from '../../../components/AdminPageHeader';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { QuizType } from '../../../types/quiz';
import { editQuizSlide, getListQuizSlide, removeQuizSlide } from '../../../features/Slide/quiz/QuizSlide';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getCategoryList } from '../../../features/Slide/category/CategorySlide';
import { CategoryType } from '../../../types/category';
import { SearchOutlined, CheckCircleOutlined, CloseCircleOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import moment from 'moment'
import { changeBreadcrumb, getListAnswerQuizSlide, removeAnswerQuizSlide } from '../../../features/Slide/answerQuiz/AnswerQuizSlide';
import { AnswerQuizType } from '../../../types/answerQuiz';
import { async } from '@firebase/util';
import { editPracticeActivitylice, getListPracticeActivitySliceByDay } from '../../../features/Slide/practiceActivity/PracticeActivitySlice';
import { PracticeActivityType } from '../../../types/practiceActivity';
import { Helmet } from "react-helmet";



interface DataType {
  key: React.Key;
  image?: string,
  question?: string,
  type?: string
  status?: boolean,
  _id?: string,
  category?: string,
  createdAt?: string,
  updatedAt?: string
}

interface ExpandedDataType {
  key: React.Key;
  _id?: string,
  quiz: string;
  answer: string;
  isCorrect: number;
}

interface TypeQuiz {
  id?: number,
  type: string,
  text: string
}

const typeQuiz = [
  { id: 1, type: "selectRadio", text: 'Chọn đáp án' },
  { id: 2, type: "selectImage", text: 'Chọn đáp án theo hình ảnh' },
  { id: 3, type: "selectCompound", text: 'Chọn nhiều đáp án' }
]


type DataIndex = keyof ExpandedDataType;
type DataIndex2 = keyof DataType;


type Props = {}

const ListListenSpeak = (props: Props) => {

  const breadcrumb = useAppSelector(item => item.answerQuiz.breadcrumb)
  const quizs = useAppSelector(item => item.quiz.value)
  const answerQuizs = useAppSelector(item => item.answerQuiz.value)
  const practiceActivity = useAppSelector(item => item.practiceActivity.value)
  const dispatch = useAppDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selected, setSelected] = useState<{ key: string, id: string | undefined }[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const [listTable, setListTable] = useState<any>([]);
  const { dayId } = useParams();
  const navigate = useNavigate();
  //------------------STATE--------------------
  const tableWithType = quizs.filter((item: QuizType) => item.practiceActivity?.type === "listenspeak" && item.type === 'selectRadio' || item.type === 'selectImage' || item.type === 'selectCompound')
  const tableListenSpeak = tableWithType.filter((item: QuizType) => item.practiceActivity?.day === String(dayId))
  const dataTable = tableListenSpeak.map((item: QuizType, index) => {
    return {
      key: index + 1,
      _id: item._id,
      question: item.question,
      image: item.image,
      timeLimit: item.timeLimit,
      type: item.type,
      status: item.status,
      createdAt: moment(item.createdAt).format("h:mm:ss a, MMM Do YYYY"),
      updatedAt: moment(item.updatedAt).format("h:mm:ss a, MMM Do YYYY"),

    }
  })

  const childrenTable = answerQuizs.map((item: AnswerQuizType, index) => {
    return {
      key: item._id,
      _id: item._id,
      quiz: item.quiz,
      answer: item.answer,
      isCorrect: item.isCorrect
    }
  })


  //------------------TABLE-DATA-------------------

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: any): ColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Tìm Kiếm ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Tìm
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Xóa
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
            Lọc
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record: any) => {
      return record[dataIndex].toString().toLowerCase().includes((value as string).toLowerCase())
    }

  });


  //------------------SEARCH--------------------


  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    let rowSelected: { key: string, id: string | undefined }[] = []
    newSelectedRowKeys.map((item) => {
      childrenTable.map((item2) => item2.key === item ? rowSelected.push({ key: item2.key, id: item2._id }) : "")
    })
    setSelectedRowKeys(newSelectedRowKeys)
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
        key: 'odd',
        text: 'Select Odd Row',
        onSelect: changableRowKeys => {
          let newSelectedRowKeys: Key[] = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          onSelectChange(newSelectedRowKeys)
        },
      },
      {
        key: 'even',
        text: 'Select Even Row',
        onSelect: changableRowKeys => {
          let newSelectedRowKeys: Key[] = [];
          newSelectedRowKeys = changableRowKeys.filter((_, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          onSelectChange(newSelectedRowKeys)
        },
      },
    ],
  }
  //------------------SELECT-ROW-------------------

  const handleOk = async (answer) => {
    const key = 'updatable';
    setConfirmLoading(true);
    message.loading({ content: 'Loading...', key });

    if (Array.isArray(answer.id)) {
      dispatch(removeAnswerQuizSlide(answer._id))
    } else {
      dispatch(removeAnswerQuizSlide(answer._id))
    }
    let detailQuestion: any = quizs.find((e: QuizType) => e?._id === answer.quiz)
    const { payload } = await dispatch(editQuizSlide({ ...detailQuestion, status: false }))
    await dispatch(getListQuizSlide())

    const detailActivity: any = practiceActivity.find((e: PracticeActivityType) => e._id === payload.practiceActivity)
    await dispatch(editPracticeActivitylice({ ...detailActivity, status: false }))

    setConfirmLoading(false);
    message.success({ content: 'Xóa Thành Công!', key, duration: 2 });
  };

  const handleOk1 = async (id) => {
    const key = 'updatable';
    setConfirmLoading(true);
    message.loading({ content: 'Loading...', key });

    const { payload } = await dispatch(removeQuizSlide(id))
    const detailActivity: any = practiceActivity.find((e: PracticeActivityType) => e._id === payload.practiceActivity)
    const lengthQuiz = quizs.filter((item: QuizType) => item.practiceActivity?.type === "listenspeak" && item.practiceActivity?._id === detailActivity._id)
    if (lengthQuiz.length < 2) {
      await dispatch(editPracticeActivitylice({ ...detailActivity, status: false }))
    }

    setConfirmLoading(false);
    message.success({ content: 'Xóa Thành Công!', key, duration: 2 });
  };

  const handleCancel = () => {
    message.error('Hủy Hành Động!');
  };

  const checkQuestion = () => {
    const quizLength = quizs.filter((e: QuizType) => e.practiceActivity?.day === dayId && e.practiceActivity?.type === "listenspeak")

    if (quizLength.length === 10) {
      message.warning("Đã đạt giới hạn câu hỏi !")
    } else {
      navigate(`/manageDay/${dayId}/listenspeak/question/add`)
    }
  }

  const checkAnswer = (question: QuizType) => {
    let lengthAns = answerQuizs.filter((e: AnswerQuizType) => e.quiz === question._id)
    switch (question.type) {
      case "selectRadio":
        if (lengthAns.length === 4) {
          message.warning("Đã đạt giới hạn đáp án !")
        } else {
          navigate(`/manageDay/${dayId}/listenspeak/answer/${question._id}/add`)
        }
        break;

      case "selectImage":
        if (lengthAns.length === 4) {
          message.warning("Đã đạt giới hạn đáp án !")
        } else {
          navigate(`/manageDay/${dayId}/listenspeak/answer/${question._id}/add`)
        }
        break;

      case "selectCompound":
        if (lengthAns.length === 6) {
          message.warning("Đã đạt giới hạn đáp án !")
          return
        } else {
          navigate(`/manageDay/${dayId}/listenspeak/answer/${question._id}/add`)
        }
        break;
      default:
        break;
    }
  }

  const checkStatusActivity = () => {
    const quizStatus = quizs.filter((item: QuizType) => item.practiceActivity?.type === "listenspeak" && item.practiceActivity?.day === String(dayId) && item.status === false)
    const lengthQuiz = quizs.filter((item: QuizType) => item.practiceActivity?.type === "listenspeak" && item.practiceActivity?.day === String(dayId))
    const detailActivity: any = practiceActivity.find((e: PracticeActivityType) => e.day === dayId && e.type === "listenspeak")

    if (quizStatus.length > 0 || lengthQuiz.length < 10) {
      dispatch(editPracticeActivitylice({ ...detailActivity, status: false }))
    } else {
      dispatch(editPracticeActivitylice({ ...detailActivity, status: true }))
    }
  }

  //------------------REMOVE-CONFIRM-------------------

  const columns: ColumnsType<any> = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: "key",
      className: 'w-[70px]',
      sorter: (a: any, b: any) => a.key - b.key,
      // sorter: (record1, record2) => { return record1.key > record2.key },
      sortDirections: ['descend'],
    },
    {
      title: 'Hình ảnh',
      key: "image",
      className: 'w-[100px]',
      render: (record) => (
        <div className="">
          <Image
            width={60}
            height={60}
            src={record.image ? record.image : 'https://vanhoadoanhnghiepvn.vn/wp-content/uploads/2020/08/112815953-stock-vector-no-image-available-icon-flat-vector.jpg'}
          />
        </div>
      )
    },
    {
      title: 'Câu hỏi',
      dataIndex: 'question',
      key: "question",
      ...getColumnSearchProps('question'),
    },
    {
      title: 'Loại Câu Hỏi',
      dataIndex: 'type',
      key: "type",
      className: 'w-[220px]',
      render: ((item) => (
        <>
          {item === "selectRadio"
            ? <p>Chọn đáp án</p> :
            item === "selectImage"
              ? <p>Chọn đáp án theo hình ảnh</p> :
              <p>Chọn nhiều đáp án</p>
          }
        </>
      )),
      filters: typeQuiz.map((item: TypeQuiz) => { return { text: item.text, value: item.type } }),
      onFilter: (value, record) => {
        return record.type == value
      }
    },
    {
      title: "Trạng thái", dataIndex: "status", key: "status",
      render: (record: any) => (
        <div >
          {record === true ?
            <Tag color="green">Đã đủ</Tag>
            :
            <Tag color="red">Chưa đủ</Tag>
          }
        </div>
      ),
    },
    {
      title: 'Thời gian',
      dataIndex: 'timeLimit',
      key: "timeLimit",
      className: 'w-[110px]',
      ...getColumnSearchProps('timeLimit'),
      render: ((value) => (<p>{moment(value).format('mm:ss')} phút</p>))
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
      title: 'Hành Động',
      align: 'center',
      className: 'w-[150px]',
      key: "action", render: (text, record) => (
        <Space align="center" size="middle">
          <Button style={{ background: "#198754" }} >
            <Link to={`/manageDay/${dayId}/listenspeak/question/${record._id}/edit`} >
              <span className="text-white">Sửa</span>
            </Link>

          </Button>

          <Popconfirm
            placement="topRight"
            title="Bạn Có Muốn Xóa?"
            okText="Có"
            cancelText="Không"
            onConfirm={() => { handleOk1(record._id) }}
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

  const expandedRowRender = (row: QuizType) => {

    const columns2: ColumnsType<ExpandedDataType> = [
      { title: 'Key', dataIndex: 'key', key: 'key', className: "hidden" },
      { title: 'STT', dataIndex: 'stt', key: 'stt' },
      { title: 'Đáp án', dataIndex: 'answer', key: 'answer' },
      {
        title: 'Hình ảnh', dataIndex: 'image', key: 'image',
        render: (record) => (
          <div className="">
            {record ?
              <Image width={60} height={60} src={record} />
              : ""}
          </div>
        )
      },
      {
        title: 'Đáp án đúng',

        key: 'isCorrect',
        render: (record) => (
          <span>
            {record.isCorrect === true
              ? <Badge status="success" text={<CheckCircleOutlined />} />
              : <Badge status="error" text={<CloseCircleOutlined />} />
            }
          </span>
        ),
      },
      {
        title: 'Hành động',
        key: "action", render: (text, record) => (
          <Space align="center" size="middle">
            <Button style={{ background: "#198754" }} >
              <Link to={`/manageDay/${dayId}/listenspeak/answer/${record._id}/edit`} >
                <span className="text-white">Sửa</span>
              </Link>
            </Button>

            <Popconfirm
              placement="topRight"
              title="Bạn Có Muốn Xóa?"
              okText="Có"
              cancelText="Không"
              onConfirm={() => { handleOk(record) }}
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

    let data: any = answerQuizs.filter((item: AnswerQuizType) => item.quiz === row._id).map((item2: AnswerQuizType, index) => {
      return {
        key: item2._id,
        stt: index + 1,
        _id: item2._id,
        answer: item2.answer,
        image: item2.image,
        quiz: item2.quiz,
        isCorrect: item2.isCorrect
      }
    })

    return (
      <div>
        <Space align="center" size="small">
          <Button style={{ background: "#E7975A" }} onClick={() => checkAnswer(row)} >
            <span className="text-white">Thêm đáp án</span>
          </Button>
        </Space>
        <Table bordered rowSelection={rowSelection} columns={columns2} dataSource={data} pagination={false} />
      </div>
    )
  }
  //------------------TABLE-COLUMM-------------------

  useEffect(() => {
    dispatch(changeBreadcrumb("Danh sách câu hỏi"))
    dispatch(getListAnswerQuizSlide())
    dispatch(getListQuizSlide())
    dispatch(getListPracticeActivitySliceByDay(dayId))
    setListTable(tableWithType)
    checkStatusActivity()
  }, [dayId])

  useEffect(() => {
    checkStatusActivity()
  }, [])

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Luyện Nghe Nói Phản Xạ | Vian English</title>
      </Helmet>

      <AdminPageHeader breadcrumb={breadcrumb} day={dayId} activity={{ title: "Luyện nghe nói phản xạ", route: "listenspeak" }} type={{ title: "Khởi động", route: "" }} />
      <Button type='primary' className='mb-8' onClick={() => checkQuestion()}>
        Thêm câu hỏi
      </Button>

      {selectedRowKeys.length > 1
        ? <Popconfirm
          title="Bạn Có Muốn Xóa Hết?"
          okText="Có"
          cancelText="Không"
          onConfirm={() => { handleOk(selected) }}
          okButtonProps={{ loading: confirmLoading }}
          onCancel={handleCancel}
        >
          <Button className='ml-4' type="primary" danger >
            Xóa Hết
          </Button>
        </Popconfirm>
        : ""}

      <span style={{ marginLeft: 8 }}>
        {selectedRowKeys.length > 0 ? `Đã chọn ${selectedRowKeys.length} hàng` : ''}
      </span>

      <Table
        bordered
        footer={() => `Hiển thị 10 trên tổng ${tableListenSpeak.length}`}
        expandable={{ expandedRowRender }}
        columns={columns}
        dataSource={dataTable}
      />

    </div>
  )
}

export default ListListenSpeak