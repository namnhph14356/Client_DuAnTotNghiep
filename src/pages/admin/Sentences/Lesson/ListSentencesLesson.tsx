import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AdminPageHeader from '../../../../components/AdminPageHeader'

const ListSentencesLesson = () => {
  const { dayId } = useParams();

  return (
    <div>
      <AdminPageHeader breadcrumb={"Danh sách bài học"} day={dayId} activity={{ title: "Luyện cấu trúc & câu", route: "sentences" }} type={{ title: "Bài học", route: "listLesson" }} />
    </div>
  )
}

export default ListSentencesLesson