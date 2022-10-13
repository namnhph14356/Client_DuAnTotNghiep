import { Button, Space, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import {
  EditOutlined, DeleteOutlined, PlusOutlined
} from "@ant-design/icons";
import { SizeType } from 'antd/lib/config-provider/SizeContext';
import { Link } from 'react-router-dom';
interface DataType {
  key: string;
  name: string;
  video: string;
  category: string;
}



const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    video: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNYLyuEWfYDzFAlInBlQ7u_OAJ4eQZBi_4yg&usqp=CAU',
    category: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    video: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNYLyuEWfYDzFAlInBlQ7u_OAJ4eQZBi_4yg&usqp=CAU',
    category: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    video: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNYLyuEWfYDzFAlInBlQ7u_OAJ4eQZBi_4yg&usqp=CAU',
    category: 'London No. 1 Lake Park',
  },
];

const LessonListTeacher: React.FC = () => {
  const [size, setSize] = useState<SizeType>('large');
  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Video',
      dataIndex: 'video',
      key: 'video',
      render: (video) => (
        <>
          <img src={video} style={{ width: 80 }} alt="" />
        </>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Action',
      key: 'action',
      dataIndex: 'action',
      render: (_, data) => (
        <>
          <div>
            <Button type="primary" icon={<EditOutlined />} size={size} style={{ marginRight: 10 }} />
            <Button type="primary" danger icon={<DeleteOutlined />} size={size} />
          </div>
        </>
      ),
    },
  ];
  return <>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' ,margin: '' }}>
      <Typography.Title level={5}>Quản lý video bài giảng/List</Typography.Title>
      <Link to='add'><Button type="primary" icon={<PlusOutlined />} size={size}>Thêm mới</Button></Link>
    </div>
    <Table columns={columns} dataSource={data} />
  </>
};


export default LessonListTeacher;
