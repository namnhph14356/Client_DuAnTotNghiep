import { message } from 'antd'
import React, { useEffect } from 'react'
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { editAuth, getUserById } from '../../api/user'
import { useAppDispatch } from '../../app/hooks'
import { RootState } from '../../app/store'
import { currentUserSlice, editAuthSilce } from '../../features/Slide/auth/authSlide'
import { UserType } from '../../types/user'
import MenuSettingUser from './MenuSettingUser'



type FormInput = {
  username?: string,
  phone?: number,
  address?: string,
  sex?: number,
}

const EditInformationUser = () => {

  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const auth = useSelector(((item: RootState) => item.auth.value)) as UserType

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormInput>()

  const onSubmit: SubmitHandler<FormInput> = async (user) => {
  
    const { payload } = await dispatch(editAuthSilce({...user, _id:id}))
    if (payload.message === "Cập nhật thành công !") {
      message.success(payload.message);
      localStorage.setItem("tokenUser", JSON.stringify(payload.token))
    } else {
      message.error(payload.message);
    }

    navigate('/user')
  }

  useEffect(() => {
    reset(auth)
    dispatch(currentUserSlice())
  }, [id])
  
  return (
    <div className='edit__infomation__page'>
      <MenuSettingUser />

      <form onSubmit={handleSubmit(onSubmit)} >
        <div className="form__edit__user">
          <div className='item__form__edit'>
            <div className='labal__form__edit'>
              <label htmlFor="">Họ và tên</label>

            </div>
            <div className='change__form__edit'>
              <input className='inp__name__edit' type="text" id="" {...register('username')} />
            </div>
          </div>
          <div className='item__form__edit'>
            <div className='labal__form__edit'>
              <label htmlFor="">Giới tính :</label>
            </div>
            <div className='change__form__edit'>
              <input className="form-check-input" type="radio"  {...register('sex')} value={1}  /> Nữ
              <input className="form-check-input ml-3" type="radio"   {...register('sex')} value={0} /> Nam
            </div>
          </div>
          <div className='item__form__edit'>
            <div className='labal__form__edit'>
              <label htmlFor="">Địa chỉ</label>

            </div>
            <div className='change__form__edit'>
              <input className='inp__name__edit' type="text" {...register('address')} id="" />
            </div>
          </div>
          <div className='item__form__edit'>
            <div className='labal__form__edit'>
              <label htmlFor="">Điện thoại</label>

            </div>
            <div className='change__form__edit'><input className='inp__name__edit' type="number" {...register('phone')} id="" />
            </div>
          </div>
        </div>
        <div className="btn__save__info">
          <button>
            Lưu thay đổi
          </button>
        </div>
      </form>
    </div>


  )
}

export default EditInformationUser
