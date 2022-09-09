import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { listVocabulary } from '../../../api/vocabulary';
import { Table, Breadcrumb, Button, Space, Popconfirm, message, Input, Image, Tag } from 'antd';
import type { ColumnsType, ColumnType } from 'antd/es/table';
type Props = {}

interface DataType {
  key: React.Key;
  _id?: string,
  words: string,
  wordForm: string,
  image: string,
  meaning: string,
}
type DataIndex = keyof DataType;
const ListVocabulary = (props: Props) => {
  const [vocabulary, setVocabulary] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  useEffect(()=> {
    const getData = async () => {
      const {data} =  await listVocabulary()
      console.log(data);
      setVocabulary(data);
    }
    getData()
  },[])
  const dataSources = vocabulary?.map((items: any, index: any) => {
  
    return {
        key: index + 1,
        stt: index + 1,
        words: items.words,
        meaning: items.meaning,
        wordForm: items.wordForm,
        image: items.image,
        createdAt: items.createdAt,
        updatedAt: items.updatedAt,
    }
})
const handleOk = (id) => {
  const key = 'updatable';
  setConfirmLoading(true);
  console.log(id);
  message.loading({ content: 'Loading...', key });

  setTimeout(() => {
    // delete record
    message.success({ content: 'Xóa Thành Công!', key, duration: 2 });
  }, 2000);
};

const handleCancel = () => {
  message.error('Hủy Hành Động!');
};
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
    title: 'Words',
    dataIndex: 'words',
    key: "words",

  }, {
    title: 'WordForm',
    dataIndex: 'wordForm',
    key: "wordForm",

  }, {
    title: 'Meaning',
    dataIndex: 'meaning', 
    key: "meaning",
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
          <Link to={`/admin/vocabulary/${record._id}/edit`} >
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
  return (
    <div>
          <h1>Vocabulary</h1>
            <Table  columns={columns} dataSource={dataSources}></Table>
    </div>
  )
}

export default ListVocabulary