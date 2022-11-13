import React from 'react'
import { useParams } from 'react-router-dom'
import AdminPageHeader from '../../../../../components/AdminPageHeader'

const ListListenRead = () => {
  const { dayId } = useParams();
  return (
    <div>
      <AdminPageHeader breadcrumb={"Danh sách hội thoại"} day={dayId} activity={{ title: "Luyện hội thoại", route: "conversation" }} type={{ title: "Nghe và đọc", route: "listListenRead" }} />
    </div>
  )
}

export default ListListenRead