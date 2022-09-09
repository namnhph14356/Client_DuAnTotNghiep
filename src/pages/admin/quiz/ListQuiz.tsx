import React, { useEffect, useRef, useState } from 'react';
import { Table, Breadcrumb, Button, Space, Popconfirm, message, Input, Image, Tag } from 'antd';
import type { Key, TableRowSelection } from 'antd/es/table/interface';
import AdminPageHeader from '../../../Component/AdminPageHeader';
import { Link } from 'react-router-dom';
import { QuizType } from '../../../types/quiz';
import { changeBreadcrumb, getListQuizSlide, removeQuizSlide } from '../../../features/Slide/quiz/QuizSlide';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getCategoryList } from '../../../features/Slide/category/CategorySlide';
import { CategoryType } from '../../../types/category';

import { SearchOutlined } from '@ant-design/icons';
import type { InputRef } from 'antd';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import type { ColumnsType, ColumnType } from 'antd/es/table';
import moment from 'moment'
import { getListAnswerQuizSlide } from '../../../features/Slide/answerQuiz/AnswerQuizSlide';
import { AnswerQuizType } from '../../../types/answerQuiz';

interface DataType {
  key: React.Key;
  _id?: string,
  category: string,
  question: string,
  image: string,
  timeLimit: string,
  type: number
}


type DataIndex = keyof DataType;


type Props = {}

const ListQuiz = (props: Props) => {

  const breadcrumb = useAppSelector(item => item.quiz.breadcrumb)
  const quizs = useAppSelector(item => item.quiz.value)
  const answerQuizs = useAppSelector(item => item.answerQuiz.value)
  const categories = useAppSelector(item => item.category.value)
  const dispatch = useAppDispatch();
  console.log('quizs', quizs);
  console.log('answerQuizs', answerQuizs);
  console.log('categories', categories);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selected, setSelected] = useState<{ key: number, id: string | undefined }[]>([]);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  //------------------STATE--------------------


  const dataTable = quizs.map((item: QuizType, index) => {
    return {
      key: index + 1,
      _id: item._id,
      category: categories.filter((cate: CategoryType) => { return cate._id == item.category }).reduce((result, item: any) => {
        return `${result}${item.title}`
      }, ""),
      question: item.question,
      image: item.image,
      timeLimit: item.timeLimit,
      type: item.type,
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
      title: 'Category',
      dataIndex: 'category',
      key: "category",
      filters: categories.map((item: CategoryType) => { return { text: item.title, value: item.title } }),
      onFilter: (value, record) => {
        return record.category == value
      }
    },
    {
      title: 'Image',
      key: "image",
      render: (record) => (
        <div className="">
          <Image
            width={100}
            height={100}
            src={record.image}
          />
        </div>
      )
    },
    {
      title: 'TimeLimit',
      dataIndex: 'timeLimit',
      key: "timeLimit",
      ...getColumnSearchProps('timeLimit'),
    },
    {
      title: 'Type',
      key: "type",
      render: (record) => (
        console.log(record.type),
        
        <div className="">
          {record.type === 1
            ? <Tag color="red">Nghe</Tag>
            : record.type === 2
              ? <Tag color="geekblue">Chọn</Tag>
              : record.type === 3
                ? <Tag color="green">Viết</Tag>
                : ""
          }

        </div>
      )

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
    {
      title: "Hành Động", key: "action", render: (text, record) => (
        <Space align="center" size="middle">
          <Button style={{ background: "#198754" }} >
            <Link to={`/admin/quiz/${record._id}/edit`} >
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
    }
  ];

  //------------------TABLE-COLUMM-------------------






  useEffect(() => {
    dispatch(changeBreadcrumb("Quản Lý Quiz"))
    dispatch(getListQuizSlide())
    dispatch(getListAnswerQuizSlide())
    dispatch(getCategoryList())

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
        rowClassName={"break-words"}
        bordered
        footer={() => `Hiển thị 10 trên tổng ${quizs.length}`}
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataTable} />
    </div>
  )
}

export default ListQuiz