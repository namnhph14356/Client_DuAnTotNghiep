import { Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listWellcome } from '../../../api/welcome';
import { getWelcome } from '../../../features/Slide/welcome/WellcomeSlide';
import { WellcomeTyle } from '../../../types/wellcome';

type Props = {}

const ListWellcome = (props: Props) => {
  const listWellcome = useSelector<any, any>(data => data.wellcome.value)
  const dispath = useDispatch();
  console.log(listWellcome);
  

  useEffect(()=>{
    dispath(getWelcome())
  },[])
  
  const headings = [
    { title: "STT", dataIndex: "stt", key: "stt" },
    { title: "Username", dataIndex: "username", key: "username" },
    { title: "NumberPhone", dataIndex: "numberphone", key: "numberphone" },
    { title: "Social", dataIndex: "social", key: "social" },
    { title: "Reason", dataIndex: "reason", key: "reason" },
    {title:"TimeStudy", dataIndex: "timeStudy", key: "timeStudy" },
    {title:"Created_at", dataIndex: "createdAt", key: "createdAt" },
    {title:"Updated_at", dataIndex: "updatedAt", key: "updatedAt" }
  ]
  
  const dataSourc = listWellcome?.map((items: any, index: any) => {
  
    return {
        key: index + 1,
        stt: index + 1,
        username: items.username,
        numberphone: items.numberphone,
        social: items.social,
        reason: items.reason,
        timeStudy: items.timeStudy,
        createdAt: items.createdAt,
        updatedAt: items.updatedAt,
    }
})
  return (
    <div>

            <h1>User information</h1>
            <Table columns={headings} dataSource={dataSourc}></Table>

        </div>
  )
}

export default ListWellcome