import React from 'react'
import { Breadcrumb, PageHeader } from 'antd'
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'

type AdminPageHeaderProps = {
  breadcrumb: string
}

const AdminPageHeader = ({ breadcrumb }: AdminPageHeaderProps) => {
  return (
    <div>
      <div className="pt-4">
        <Breadcrumb >
          <Breadcrumb.Item href="/" className='h-full inline-flex'>
            <HomeOutlined className='my-auto'/>
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/admin/dashboard" >
            <span>Dashboard</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{breadcrumb}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <PageHeader
        className="site-page-header text-indigo-600"
        title={`${breadcrumb}`}
        style={{ paddingLeft: 0 }}
      />
    </div>
  )
}

export default AdminPageHeader