import React, { useEffect, useRef, useState } from 'react';
import { Table, Breadcrumb, Button, Space, Popconfirm, message, Input,Image } from 'antd';
import type { Key, TableRowSelection } from 'antd/es/table/interface';
import AdminPageHeader from '../../../Component/AdminPageHeader';
import { Link } from 'react-router-dom';
import { QuizType } from '../../../types/quiz';
import {  getListQuizSlide, removeQuizSlide } from '../../../features/Slide/quiz/QuizSlide';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';

import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import moment from 'moment'
import { getListAnswerQuizSlide } from '../../../features/Slide/answerQuiz/AnswerQuizSlide';
import { AnswerQuizType } from '../../../types/answerQuiz';
import { UserQuizType } from '../../../types/userQuiz';
import { HistoryType } from '../../../types/history';
import { changeBreadcrumb,getListUserQuizSlide } from '../../../features/Slide/userQuiz/UserQuiz';

interface DataType {
  key: React.Key;
  _id?: string,
  answerQuiz: string,
  history: string,
  quiz: string,
  time: string,
  score: number
}


type DataIndex = keyof DataType;


type Props = {}

const ListUserQuiz = (props: Props) => {

  const breadcrumb = useAppSelector(item => item.userQuiz.breadcrumb)
  const quizs = useAppSelector(item => item.quiz.value)
  const answerQuizs = useAppSelector(item => item.answerQuiz.value)
  const historys = useAppSelector(item => item.history.value)
  const userQuizs = useAppSelector(item => item.userQuiz.value)
  const dispatch = useAppDispatch();
  console.log('quizs', quizs);
  console.log('answerQuizs', answerQuizs);
  console.log('userQuizs', userQuizs);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selected, setSelected] = useState<{ key: number, id: string | undefined }[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  //------------------STATE--------------------


  const dataTable = userQuizs.map((item: UserQuizType, index) => {
    return {
      key: index + 1,
      _id: item._id,
      answerQuiz: answerQuizs.filter((answer: AnswerQuizType) => { return answer._id == item.answerQuiz }).reduce((result, item: any) => {
        return `${result}${item.answer}`
      }, ""),
      history: historys.filter((history: HistoryType) => { return history._id == item.history }).reduce((result, item: any) => {
        return `${result}${item._id}`
      }, ""),
      quiz: quizs.filter((quiz: QuizType) => { return quiz._id == item.quiz }).reduce((result, item: any) => {
        return `${result}${item.question}`
      }, ""),
      time: item.time,
      score: item.score,
      createdAt: moment(item.createdAt).format("h:mm:ss a, MMM Do YYYY"),
      updatedAt: moment(item.updatedAt).format("h:mm:ss a, MMM Do YYYY")
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

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
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
    let rowSelected: { key: number, id: string | undefined }[] = []
    newSelectedRowKeys.map((item) => {
      dataTable.map((item2) => item2.key === item ? rowSelected.push({ key: item2.key, id: item2._id }) : "")
    })
    console.log('rowSelected', rowSelected);
    console.log('newSelectedRowKeys', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys)
    setSelected(rowSelected);
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
  };

  const rowSelection: TableRowSelection<DataType> = {
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

  const handleOk = (id) => {
    const key = 'updatable';
    setConfirmLoading(true);
    console.log(id);
    message.loading({ content: 'Loading...', key });

    setTimeout(() => {
      if (Array.isArray(id)) {
        dispatch(removeQuizSlide(id))
      } else {
        dispatch(removeQuizSlide(id))
      }
      setConfirmLoading(false);
      message.success({ content: 'Xóa Thành Công!', key, duration: 2 });
    }, 2000);
  };

  const handleCancel = () => {
    message.error('Hủy Hành Động!');
  };


  //------------------REMOVE-CONFIRM-------------------

  const columns: ColumnsType<DataType> = [
    {
      title: 'STT',
      dataIndex: 'key',
      key: "key",
      sorter: (a: any, b: any) => a.key - b.key,
      // sorter: (record1, record2) => { return record1.key > record2.key },
      sortDirections: ['descend'],
    },
    {
      title: 'ID',
      dataIndex: '_id',
      key: "_id",
      ...getColumnSearchProps('_id'),
      sorter: (a: any, b: any) => a._id - b._id,
      // sorter: (record1, record2) => { return record1.key > record2.key },
      sortDirections: ['descend'],
    },
    {
      title: 'AnswerQuiz',
      dataIndex: 'answerQuiz',
      key: "answerQuiz",
      filters: answerQuizs.map((item: AnswerQuizType) => { return { text: item.answer, value: item.answer } }),
      onFilter: (value, record) => {
        return record.answerQuiz == value
      }
    },
    {
      title: 'History',
      dataIndex: 'history',
      key: "history"
    },
    {
      title: 'Quiz',
      dataIndex: 'quiz',
      key: "quiz",
      ...getColumnSearchProps('quiz'),
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: "time",

    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: "score",

    },
    {
      title: 'Ngày Tạo',
      dataIndex: 'createdAt',
      key: "createdAt",

    },
    {
      title: 'Ngày Update',
      dataIndex: 'updatedAt',
      key: "updatedAt",

    },
    
    
  ];

  //------------------TABLE-COLUMM-------------------






  useEffect(() => {
    dispatch(changeBreadcrumb("Quản Lý Quiz"))
    dispatch(getListQuizSlide())
    dispatch(getListAnswerQuizSlide())
    dispatch(getListUserQuizSlide())

  }, [])

  return (
    <div>
      <AdminPageHeader breadcrumb={breadcrumb} />
      <Button type="primary" className="my-6" >
        <Link to={`/admin/quiz/add`}>Thêm Quiz</Link>

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
        footer={() => `Hiển thị 10 trên tổng ${quizs.length}`}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataTable} />
    </div>
  )
}

export default ListUserQuiz