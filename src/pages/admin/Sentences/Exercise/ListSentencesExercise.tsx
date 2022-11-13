import React from 'react'
import { useParams } from 'react-router-dom';
import AdminPageHeader from '../../../../components/AdminPageHeader'

const ListSentencesExercise = () => {
  const { dayId } = useParams();
  return (
    <div>
      <AdminPageHeader breadcrumb={"Danh sách bài tập"} day={dayId} activity={{ title: "Luyện cấu trúc & câu", route: "sentences" }} type={{ title: "Bài tập", route: "listExercise" }} />
    </div>
  )
}

export default ListSentencesExercise