import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks'
import AdminPageHeader from '../../../../../components/AdminPageHeader'
import { changeBreadcrumb } from '../../../../../features/Slide/listenWrite/ListenWriteSlice'

const FormListenRead = () => {
  const { id, dayId } = useParams()
  const breadcrumb = useAppSelector(data => data.listenWrite.breadcrumb)

  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) {
      dispatch(changeBreadcrumb("Sửa bài tập"))
    }else{
      dispatch(changeBreadcrumb("Thêm bài tập"))
    }
  }, [id])
  return (
    <div>
      <AdminPageHeader breadcrumb={breadcrumb} day={dayId} activity={{ title: "Luyện hội thoại", route: "conversation" }} type={{ title: "Nghe và đọc", route: "listListenRead" }} />

    </div>
  )
}

export default FormListenRead