/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useEffect, useRef, useState } from 'react';
import { Table, Breadcrumb, Button, Space, Popconfirm, message, Input, Badge, Image, Tag, Tooltip } from 'antd';
import type { Key, TableRowSelection } from 'antd/es/table/interface';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { SearchOutlined, CheckCircleOutlined, CloseCircleOutlined, SettingOutlined, DeleteOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import moment from 'moment'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { QuizType } from '../../../../types/quiz';
import { AnswerQuizType } from '../../../../types/answerQuiz';
import { getListAnswerQuizSlide, removeAnswerQuizSlide } from '../../../../features/Slide/answerQuiz/AnswerQuizSlide';
import { editQuizSlide, getListQuizSlide, removeQuizSlide } from '../../../../features/Slide/quiz/QuizSlide';
import { editPracticeActivitylice, getListPracticeActivitySliceByDay } from '../../../../features/Slide/practiceActivity/PracticeActivitySlice';
import { changeBreadcrumb } from '../../../../features/Slide/sentences/sentencesSlice';
import AdminPageHeader from '../../../../components/AdminPageHeader';
import { SentenceType } from '../../../../types/sentence';
import { PracticeActivityType } from '../../../../types/practiceActivity';


interface DataType {
  key: React.Key;
  _id?: string,
  category: string,
  question: string,
  image: string,
  timeLimit: string,
  type?: string
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
  text: string,
  type: string
}

const typeQuiz = [
  { id: 1, type: "selectAuto", text: 'Chọn đáp án' },
  { id: 2, type: "listenWrite", text: 'Nghe và viết' },
]


type DataIndex = keyof ExpandedDataType;
type DataIndex2 = keyof DataType;


type Props = {}
const ListSentencesExercise = () => {
  const breadcrumb = useAppSelector(item => item.answerQuiz.breadcrumb)
  const quizs: any = useAppSelector(item => item.quiz.value)
  const answerQuizs = useAppSelector(item => item.answerQuiz.value)
  const practiceActivity = useAppSelector(item => item.practiceActivity.value)
  const sentences = useAppSelector(item => item.sentences.value)

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
  const prative: any = practiceActivity.find((item: PracticeActivityType) => item.type === "sentences" && item.day === dayId)
  const tableWithType = quizs.filter((item: QuizType) => item.practiceActivity?.type === "sentences" && item.type === 'selectAuto' || item.type === 'listenWrite')
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
      isCorrect: item
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
    const detailQuestion = quizs.find((e) => e._id === answer.quiz)
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
    const lengthQuiz = quizs.filter((item: QuizType) => item.practiceActivity?.type === "sentences" && item.practiceActivity?._id === detailActivity._id)
    if (lengthQuiz.length - 1 < 10) {
      await dispatch(editPracticeActivitylice({ ...detailActivity, status: false }))
    }

    setConfirmLoading(false);
    message.success({ content: 'Xóa Thành Công!', key, duration: 2 });
  };

  const handleCancel = () => {
    message.error('Hủy Hành Động!');
  };

  const checkQuestion = () => {
    const quizLength = quizs.filter((e: QuizType) => e.practiceActivity?.day === dayId && e.practiceActivity?.type === "sentences")

    if (quizLength.length === 10) {
      message.warning("Đã đạt giới hạn câu hỏi !")
    } else {
      navigate(`/manageDay/${dayId}/sentences/addExercise`)
    }
  }

  const checkAnswer = (question: QuizType) => {
    let lengthAns = answerQuizs.filter((e: AnswerQuizType) => e.quiz === question._id)
    switch (question.type) {
      case "selectAuto":
        if (lengthAns.length === 4) {
          message.warning("Đã đạt giới hạn đáp án !")
        } else {
          navigate(`/manageDay/${dayId}/sentences/answer/${question._id}/add`)
        }
        break;

      case "listenWrite":
        navigate(`/manageDay/${dayId}/sentences/${question._id}/editExercise`)
        break;
      default:
        break;
    }
  }

  const checkStatusActivity = () => {
    const quizStatus = quizs.filter((item: QuizType) => item.practiceActivity?.type === "sentences" && item.practiceActivity?.day === String(dayId) && item.status === false)
    const lengthQuiz = quizs.filter((item: QuizType) => item.practiceActivity?.type === "sentences" && item.practiceActivity?.day === String(dayId))
    const senten = sentences.filter((e: SentenceType) => e.practiceActivity === prative._id)

    if (quizStatus.length > 0 || lengthQuiz.length < 10 || senten.length < 5) {
      dispatch(editPracticeActivitylice({ ...prative, status: false }))
    } else {
      dispatch(editPracticeActivitylice({ ...prative, status: true }))
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
            src={record.image}
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
      className: 'w-[140px]',
      render: ((item) => (
        <>
          {item === "selectAuto"
            ? <p>Chọn đáp án</p> :
            item === "listenWrite"
              ? <p>Nghe và viết</p> :
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
      className: 'w-[100px]',
      render: (record: boolean) => (
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
            <Link to={`/manageDay/${dayId}/sentences/${record._id}/editExercise`} >
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

  const expandedRowRender = (row: any) => {

    const columns2: ColumnsType<ExpandedDataType> = [
      { title: 'Key', dataIndex: 'key', key: 'key', className: "hidden" },
      { title: 'STT', dataIndex: 'stt', key: 'stt' },
      { title: 'Đáp án', dataIndex: 'answer', key: 'answer' },
      {
        title: 'Đáp án đúng',

        key: 'isCorrect',
        render: (record) => {
          return (
            <span>
              {record.isCorrect === undefined ?
                <Badge status="success" text={<CheckCircleOutlined />} />
                :
                record.isCorrect === true
                  ? <Badge status="success" text={<CheckCircleOutlined />} />
                  : <Badge status="error" text={<CloseCircleOutlined />} />
              }
            </span>
          );
        },
      },
      {
        title: 'Hành động',
        key: "action", render: (text, record) => (
          <Space align="center" size="middle">
            <Button style={{ background: "#198754" }} >
              <Link to={`${record.isCorrect === undefined ? `/manageDay/${dayId}/sentences/${record.quiz}/editExercise` : `/manageDay/${dayId}/sentences/answer/${record._id}/edit`}`} >
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
      <AdminPageHeader breadcrumb={"Danh sách bài tập"} day={dayId} activity={{ title: "Luyện cấu trúc & câu", route: "sentences" }} type={{ title: "Bài tập", route: "listExercise" }} />
      <Button type='primary' className='mb-8' onClick={() => checkQuestion()}>
        {/* <Link to={`/manageDay/${dayId}/listenspeak/question/add`}> */}
        Thêm câu hỏi
        {/* </Link> */}
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

export default ListSentencesExercise