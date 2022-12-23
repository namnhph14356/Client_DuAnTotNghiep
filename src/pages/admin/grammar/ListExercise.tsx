import React, { useEffect, useRef, useState } from 'react';
import { Table, Breadcrumb, Button, Space, Popconfirm, message, Input, Badge, Image, Tag, Tooltip } from 'antd';
import type { Key, TableRowSelection } from 'antd/es/table/interface';
import AdminPageHeader from '../../../components/AdminPageHeader';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
import { editPracticeActivitylice } from '../../../features/Slide/practiceActivity/PracticeActivitySlice';
import { GrammarType } from '../../../types/grammar';
import { PracticeActivityType } from '../../../types/practiceActivity';
import { Helmet } from "react-helmet";

interface DataType {
  key: React.Key;
  category?: string;
  question: string;
  questionAfter?: string;
  image?: string;
  meaning?: string,
  suggestions?: string,
  timeLimit?: string;
  type?: string;
  practiceActivity?: string;
  explain?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ExpandedDataType {
  key: React.Key;
  _id?: string,
  quiz: string;
  answer: string;
  isCorrect: number;
  wordMeaning: string;
  explainAnswer: string;
}

const typeQuiz = [
  { id: 1, type: "selectRadio" },
  { id: 2, type: "selectImage" },
  { id: 3, type: "selectCompound" }
]

type DataIndex = keyof ExpandedDataType;
type DataIndex2 = keyof DataType;

type Props = {}

const ListExercise = () => {

  const breadcrumb = useAppSelector(item => item.answerQuiz.breadcrumb)
  const quizs = useAppSelector(item => item.quiz.value)
  const answerQuizs = useAppSelector(item => item.answerQuiz.value)
  const practiceActivity = useAppSelector(item => item.practiceActivity.value)

  const grammar = useAppSelector(item => item.grammar.value)

  const dispatch = useAppDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selected, setSelected] = useState<{ key: string, id: string | undefined }[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  const { dayId } = useParams();
  const navigate = useNavigate();

  //------------------STATE--------------------
  let activity: any = practiceActivity.find((e: PracticeActivityType) => e.day === dayId && e.type === "grammar")
  const tableWithType = quizs.filter((item: QuizType) => item.practiceActivity?.type === "grammar" && item.type === 'selectRadio')
  const tableListenSpeak = tableWithType.filter((item: QuizType) => item.practiceActivity?.day === String(dayId))
  const dataTable = tableListenSpeak.map((item: QuizType, index) => {
    return {
      key: index + 1,
      _id: item._id,
      question: item.question,
      type: item.type,
      suggestions: item.suggestions,
      meaning: item.meaning,
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
      isCorrect: item.isCorrect,
      wordMeaning: item.wordMeaning,
      explainAnswer: item.explainAnswer,
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

  const checkQuestion = () => {
    const quizLength = quizs.filter((e: QuizType) => e.practiceActivity?.day === dayId && e.practiceActivity?.type === "grammar")

    if (quizLength.length === 10) {
      message.warning("Đã đạt giới hạn câu hỏi !")
    } else {
      navigate(`/manageDay/${dayId}/grammar/question/add`)
    }
  }

  const checkAnswer = (question: QuizType) => {
    let lengthAns = answerQuizs.filter((e: AnswerQuizType) => e.quiz === question._id)
    if (lengthAns.length === 4) {
      message.warning("Đã đạt giới hạn đáp án !")
    } else {
      navigate(`/manageDay/${dayId}/grammar/answer/${question._id}/add`)
    }
  }

  const checkStatusActivity = () => {
    const quizStatus = quizs.filter((item: QuizType) => item.practiceActivity?.type === "grammar" && item.practiceActivity?.day === String(dayId) && item.status === false)
    const lengthQuiz = quizs.filter((item: QuizType) => item.practiceActivity?.type === "grammar" && item.practiceActivity?.day === String(dayId))
    const gram = grammar.filter((e: GrammarType) => e.dayId === dayId)

    const detailActivity: any = practiceActivity.find((e: PracticeActivityType) => e.day === dayId && e.type === "grammar")

    if (quizStatus.length > 0 || lengthQuiz.length < 10 || gram.length < 1) {
      dispatch(editPracticeActivitylice({ ...detailActivity, status: false }))
    } else {
      dispatch(editPracticeActivitylice({ ...detailActivity, status: true }))
    }
  }

  const handleOk = async (id) => {
    const key = 'updatable';
    setConfirmLoading(true);
    message.loading({ content: 'Loading...', key });

    const { payload } = await dispatch(removeAnswerQuizSlide(id))
    if (payload) {
      const detailQuestion: any = quizs.find((e: QuizType) => e._id === payload.quiz)
      await dispatch(editQuizSlide({ ...detailQuestion, status: false }))
      await dispatch(getListQuizSlide())
      dispatch(editPracticeActivitylice({ ...activity, status: false }))
    }
    setConfirmLoading(false);
    message.success({ content: 'Xóa Thành Công!', key, duration: 2 });
  };
  const handleOk1 = async (id) => {
    const key = 'updatable';
    setConfirmLoading(true);
    message.loading({ content: 'Loading...', key });

    const { payload } = await dispatch(removeQuizSlide(id))
    const detailActivity: any = practiceActivity.find((e: PracticeActivityType) => e._id === payload.practiceActivity)
    const lengthQuiz = quizs.filter((item: QuizType) => item.practiceActivity?.type === "grammar" && item.practiceActivity?._id === detailActivity._id)
    if (lengthQuiz.length - 1 < 10) {
      await dispatch(editPracticeActivitylice({ ...detailActivity, status: false }))
    }
    setConfirmLoading(false);
    message.success({ content: 'Xóa Thành Công!', key, duration: 2 });
  };
  const handleCancel = () => {
    message.error('Hủy Hành Động!');
  };

  //------------------REMOVE-CONFIRM-------------------

  const columns: ColumnsType<any> = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: "key",
      className: 'w-[70px]',
      sorter: (a: any, b: any) => a.key - b.key,
      sortDirections: ['descend'],
    },
    {
      title: 'Câu hỏi',
      dataIndex: 'question',
      className: 'w-[250px]',
      key: "question",
      ...getColumnSearchProps('question'),
    },
    {
      title: 'Gợi ý',
      dataIndex: 'suggestions',
      className: 'w-[180px]',
      key: "suggestions",
      ...getColumnSearchProps('suggestions'),
    },
    {
      title: 'Ý nghĩa',
      dataIndex: 'meaning',
      className: 'w-[220px]',
      key: "meaning",
      ...getColumnSearchProps('meaning'),
    },
    {
      title: "Trạng thái", dataIndex: "status", key: "status",
      className: 'w-[100px]',
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
      title: 'Ngày Tạo',
      dataIndex: 'createdAt',
      key: "createdAt",
      className: 'w-[100px]',
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
      className: 'w-[110px]',
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
      fixed: "right",
      key: "action", render: (text, record) => (
        <Space align="center" size="middle">
          <Button style={{ background: "#198754" }} >
            <Link to={`/manageDay/${dayId}/grammar/question/${record._id}/edit`} >
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
      { title: 'Ngữ nghĩa / loại từ', dataIndex: 'wordMeaning', key: 'wordMeaning' },
      { title: 'Giải thích đáp án', dataIndex: 'explainAnswer', key: 'explainAnswer' },
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
              <Link to={`/manageDay/${dayId}/grammar/answer/${record._id}/edit`} >
                <span className="text-white">Sửa</span>
              </Link>

            </Button>

            <Popconfirm
              placement="topRight"
              title="Bạn Có Muốn Xóa?"
              okText="Có"
              cancelText="Không"
              onConfirm={() => { handleOk(record._id) }}
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
        isCorrect: item2.isCorrect,
        wordMeaning: item2.wordMeaning,
        explainAnswer: item2.explainAnswer
      }

    })

    return <div className=''>
      <Space align="center" size="small">
        <Button style={{ background: "#E7975A" }} onClick={() => checkAnswer(row)}>
          <span className="text-white">Thêm đáp án</span>
        </Button>
      </Space>
      <Table bordered rowSelection={rowSelection} columns={columns2} dataSource={data} pagination={false} />
    </div>

  }
  //------------------TABLE-COLUMM-------------------

  useEffect(() => {
    dispatch(changeBreadcrumb("Danh sách bài tập ngữ pháp"))
    dispatch(getListAnswerQuizSlide())
    dispatch(getCategoryList())
    dispatch(getListQuizSlide())
    checkStatusActivity()
  }, [])

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Luyện Ngữ Pháp | Vian English</title>
      </Helmet>
      <AdminPageHeader breadcrumb={breadcrumb} day={dayId} activity={{ title: "Luyện ngữ pháp", route: "grammar" }} type={{ title: "Bài tập", route: "listExercise" }} />
      <Button type='primary' className='mb-8' onClick={() => checkQuestion()}>
        {/* <Link to={`/manageDay/${dayId}/grammar/question/add`}> */}
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
        expandable={{ expandedRowRender, defaultExpandedRowKeys: ['0'] }}
        columns={columns}
        dataSource={dataTable}
      />

    </div>
  )
}

export default ListExercise 