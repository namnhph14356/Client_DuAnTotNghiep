import React, { useEffect, useState } from 'react'
import { Breadcrumb, PageHeader } from 'antd'
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux'
import { useAppSelector } from '../app/hooks';
import { DayType } from '../types/day';

type AdminPageHeaderProps = {
  breadcrumb: string,
  day?: string,
  activity?: {
    title: string,
    route: string
  }
  type?: {
    title: string,
    route: string
  },
  class1?: {
    title: string,
    route: string
  }
}

const AdminPageHeader = ({ breadcrumb, day, activity, class1, type }: AdminPageHeaderProps) => {
  const days: any = useAppSelector(item => item.day.value)
  const [detailDay, setdetailDay] = useState<DayType>();
  useEffect(() => {
    if (day) {
      setdetailDay(days.filter((item) => item._id === String(day))[0])
    }
  }, [day])

  return (
    <div>
      <div className="pt-4">
        <Breadcrumb >
          <Breadcrumb.Item href="/" className='h-full inline-flex'>
            <HomeOutlined className='my-auto' />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/admin/dashboard" >
            <span>Dashboard</span>
          </Breadcrumb.Item>

          {day &&
            <Breadcrumb.Item href={`/admin/day`} >
              <span>Quản lí ngày học</span>
            </Breadcrumb.Item>
          }
          {detailDay &&
            <Breadcrumb.Item href={`/manageDay/${day}`} >
              <span>{detailDay?.title}</span>
            </Breadcrumb.Item>
          }
          {class1 &&
            <Breadcrumb.Item href={`/admin/${class1.route}`}>
              <span>{class1.title}</span>
            </Breadcrumb.Item>
          }

          {activity &&
            <Breadcrumb.Item href={`/manageDay/6346cf1741f714cfb435594b/${activity.route}`}>
              <span>{activity.title}</span>
            </Breadcrumb.Item>
          }

          {type && activity &&
            <Breadcrumb.Item href={`/manageDay/6346cf1741f714cfb435594b/${activity?.route}/${type.route}`}>
              <span>{type.title}</span>
            </Breadcrumb.Item>
          }

          <Breadcrumb.Item>{breadcrumb}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <PageHeader
        className="site-page-header text-indigo-600"
        title={`${day ? `${detailDay?.title} / ${breadcrumb}` : `${breadcrumb}`}`}
        style={{ paddingLeft: 0 }}
      />
    </div>
  )
}

export default AdminPageHeader