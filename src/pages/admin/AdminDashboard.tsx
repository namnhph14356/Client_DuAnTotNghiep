import React, { useEffect, useState } from 'react'
import { Avatar, Card, Col, Divider, List, Row, Skeleton, Typography } from "antd";
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getUserList } from '../../features/Slide/user/userSlide';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getListHistorySlide } from '../../features/Slide/history/History';
import { HistoryType } from '../../types/history';
import moment, { months } from 'moment';
import { getListDaySlice } from '../../features/Slide/day/DaySlice';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { BsCalendar2Day, BsClockHistory } from 'react-icons/bs'
import { FaRegMoneyBillAlt } from 'react-icons/fa'
import { getListWeekSlice } from '../../features/Slide/week/WeekSlice';
import { Line, Pie, Column } from '@ant-design/plots';
import { getListUser } from '../../api/user';
import { getPaymentSlice } from '../../features/Slide/payment/PaymentSlice';


ChartJS.register(ArcElement, Tooltip, Legend);


const AdminDashboard = () => {
  const [dataHis, setDataHis] = useState("")
  const users = useAppSelector<any>(data => data.user.value);
  const history = useAppSelector<any>(data => data.history.value);
  const dispatch = useAppDispatch()
  const day = useAppSelector<any>(data => data.day.value);
  const week = useAppSelector<any>(data => data.week.value);
  const payment = useAppSelector<any>(data => data.payment.value)
  const weekId = "6346cc2341f714cfb4355943"
  const mapDay = day.filter((item: any) => item.week._id === weekId)
  const [dateToFormat, setdateToFormat] = useState("")

  // lấy năm
  const d = new Date()
  const year = d.getFullYear()
  const totalPrice = payment.reduce((total: any, current: any) => (total = total + Number(current.amount)), 0)

  // lấy 7 ngày gần nhất
  const past7Days = [...Array.from(Array(7).keys())].map(index => {
    const date = new Date();
    date.setDate(date.getDate() - (index + 1));

    return date;
  });
  const date = new Date()
  const startDate = new Date(date.setDate(date.getDate() - 1))
  const endDate = new Date(date.setDate(date.getDate() - 6))
  const Day7 = past7Days.map((item) => moment(item).format("DD/MM"))
  Day7.reverse()
  const DataHistory = history.filter((item: any) => moment(item.createdAt).format("DD/MM") <= moment(startDate).format("DD/MM") && moment(item.createdAt).format("DD/MM") >= moment(endDate).format("DD/MM"))
  const setDataChart = Day7.map((item) => {
    return {
      year: item,
      value: history.filter((his) => { return moment(his.createdAt).format("DD/MM") === item }).length
    }
  })
  const config = {
    setDataChart,
    xField: 'year',
    yField: 'value',
    label: {},
    point: {
      size: 3,
      shape: 'diamond',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 6,
      },
    },
    tooltip: {
      showMarkers: true,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#000',
          fill: 'red',
        },
      },
    },
    interactions: [
      {
        type: 'marker-active',
      },
    ],
    meta: {
      value: {
        alias: 'Số lượng làm bài',
      },
    },
  };
  let totalStudent;
  let totalTeacher;
  let totalAdmin;

  if (users && users.length > 0) {
    totalStudent = users.filter((item) => item.role === "0");
    totalTeacher = users.filter((item) => item.role === "1");
    totalAdmin = users.filter((item) => item.role === "2");
  }

  const dataPie = [
    {
      type: "Học sinh",
      value: totalStudent?.length
    },
    {
      type: "Giảng viên",
      value: totalTeacher?.length,
    },
    {
      type: "Admin",
      value: totalAdmin?.length
    }
  ]

  const configPie = {
    appendPadding: 10,
    dataPie,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };
  // const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  const get12Month = [...Array.from(Array(12).keys())].map(index => {
    const date = new Date();
    date.setMonth(date.getMonth() - (index));

    return date;
  });
  const Month12 = get12Month.map((item) => moment(item).format("MM/YYYY"))
  Month12.reverse()

  const setDataColum = Month12.map((item) => {
    return {
      month: item,
      price: payment.filter((pay) => { return moment(pay.createdAt).format("MM/YYYY") === item })
        .reduce((total, current) => (total = total + Number(current.amount)), 0)
    }
  })

  const money = (currency: number) => currency?.toLocaleString("it-IT", { style: "currency", currency: "VND" });
  const configColum = {
    setDataColum,
    xField: 'month',
    yField: 'price',
    columnWidthRatio: 0.8,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      month: {
        alias: 'Tháng',
      },
      price: {
        alias: 'Doanh thu',
      },
    },
    tooltip: {
      showTitle: false,
      formatter: (item) => {
        return {
          name: `${item.month}`,
          value: `${money(item.price)}`,
        };
      },
    },
  };

  useEffect(() => {
    dispatch(getUserList("Quản Lý User"))
    dispatch(getListHistorySlide())
    dispatch(getListDaySlice())
    dispatch(getListWeekSlice())
    dispatch(getPaymentSlice())
  }, [])
  return (
    <div className=''>
      {/* <h1 className='p-1 text-2xl'>Dashboard</h1> */}
      <Row className='justify-between' >
        <Col xs={6} sm={6} md={6} lg={6} xl={6} className="p-1">
          <Card hoverable style={{ width: "100%" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              fill="currentColor"
              className="bi bi-people icon-dashboard"
              viewBox="0 -5 10 24"
            >
              <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
            </svg>
            <Typography.Title className="mt-2 text-xl" level={4}>
              Số lượng người dùng
            </Typography.Title>
            <Typography.Title level={4} className="m-0 ">
              {users.length}
            </Typography.Title>
            <div className="flexBox-dash">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-info-circle-fill mt-2 "
                viewBox="0 -5 10 24"
              >
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
              </svg>
            </div>
          </Card>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6} className="p-1">
          <Card hoverable style={{ width: "100%" }}>
            <div className='text-xl py-2 text-orange-500'>
              <BsCalendar2Day />
            </div>
            <Typography.Title className="mt-2 text-xl" level={4}>
              Số ngày đang có
            </Typography.Title>
            <Typography.Title level={4} className="m-0 ">
              {day.length}
            </Typography.Title>
            <div className="flexBox-dash">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-info-circle-fill mt-2 "
                viewBox="0 -5 10 24"
              >
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
              </svg>
            </div>
          </Card>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6} className="p-1">
          <Card hoverable style={{ width: "100%" }}>
            <div className='text-xl py-2 text-orange-500'>
              <FaRegMoneyBillAlt />
            </div>
            <Typography.Title className="mt-2 text-xl" level={4}>
              Tổng doanh thu
            </Typography.Title>
            <Typography.Title level={4} className="m-0 ">
              {money(totalPrice)}
            </Typography.Title>
            <div className="flexBox-dash">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-info-circle-fill mt-2 "
                viewBox="0 -5 10 24"
              >
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
              </svg>
            </div>
          </Card>
        </Col>
        <Col xs={6} sm={6} md={6} lg={6} xl={6} className="p-1">
          <Card hoverable style={{ width: "100%" }}>
            <div className='text-xl py-2 text-orange-500'>
              <BsClockHistory />
            </div>
            <Typography.Title className="mt-2 text-xl" level={4}>
              Số lượt làm bài
            </Typography.Title>
            <Typography.Title level={4} className="m-0 ">
              {history.length}
            </Typography.Title>
            <div className="flexBox-dash">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-info-circle-fill mt-2 "
                viewBox="0 -5 10 24"
              >
                <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
              </svg>
            </div>
          </Card>
        </Col>
      </Row>
      <Row className='justify-between'>
        <Col xs={16} sm={16} md={16} lg={16} xl={16} className="p-1">
          <List >
            <Card hoverable>
              <Typography.Title level={5} className="text-center">
                Số lượt làm bài trong 7 ngày gần nhất
              </Typography.Title>
              <Line width={100} data={setDataChart} {...config} />
            </Card>
          </List>
        </Col>

        <Col xs={8} sm={8} md={8} lg={8} xl={8} className="p-1">
          <List >
            <Card hoverable>
              <Typography.Title level={5} className="text-center">
                Số lượng người dùng
              </Typography.Title>
              <Pie data={dataPie} width={100} {...configPie} />
            </Card>
          </List>
        </Col>



      </Row>
      <div className='mt-5'>
        <List >

          <Card hoverable>
            <Typography.Title level={5} className="text-center">
              Thống kê doanh thu năm {year}
            </Typography.Title>
            <Column data={setDataColum} {...configColum} />
          </Card>
        </List>
      </div>
    </div >
  );
}
export default AdminDashboard
