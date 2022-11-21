import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams  } from 'react-router-dom'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'

import { useAppDispatch } from '../../app/hooks'
import { RootState } from '../../app/store'
import { UserType } from '../../types/user'
import MenuSettingUser from './MenuSettingUser'
import { currentUserSlice, editAuthSilce } from '../../features/Slide/auth/authSlide'
import { message } from 'antd'
import { getUserById } from '../../api/user'

type FormInput = {
  email?: string,
}


const EditEmailUser = () => {
  
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const auth = useSelector(((item: RootState) => item.auth.value)) as UserType

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInput>()

  const onSubmit: SubmitHandler<FormInput> = async (user) => {
    const data = await dispatch(editAuthSilce(user))
    message.success('Cập nhật thành công')
    navigate('/user')
  }

  useEffect(() => {
    const getUser = async (id: any) => {
      const { data } = await getUserById(id)
      reset(auth)
    }
    getUser(id)
    dispatch(currentUserSlice())
  }, [id])


  return (
    <div className='edit__email__page'>
        <MenuSettingUser/>
        <form onSubmit={handleSubmit(onSubmit)} >
        <div className="form__edit__user">
          <div className='item__form__edit'>
            <div className='labal__form__edit'>
              <label htmlFor="">Email hiện tại : </label>

            </div>
            <div className='change__form__edit'>
              <h3>
                {auth.email}
              </h3>
            </div>
          </div>
          <div className='item__form__edit'>
            <div className='labal__form__edit'>
              <label htmlFor="">Email mới :</label>
            </div>
            <div className='change__form__edit'>
            <input className='inp__name__edit bg-gray-300' type="text" id="" {...register('email')} disabled={true}/>
            </div>
          </div>
          <p className='text-red-500'>Tính năng đang được cập nhật</p>
        </div>
        <div className="btn__save__info">
          <button disabled>
            Lưu thay đổi
          </button>
        </div>
      </form>
        
    </div>
  )
}

export default EditEmailUser