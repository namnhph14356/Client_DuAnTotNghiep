import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { payment } from '../api/paypal';
import { Payment } from '../types/paypal';

type Props = {}
type FormV = {
  name: string
  price: number
  current?:string
  sku?:string
  quantity:number
};
const CheckoutPaypal = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },} = useForm<FormV>();
    const navigate = useNavigate();
    const onSubmit: SubmitHandler<FormV> = async (paypal:Payment)=> {
// sb-p6s1f19896587@personal.example.com
// s}$_1Ei&
      try {
          console.log(paypal);
          const current = "USD"
          const quantity = 1
          const sku = "item"
        const demo =  await payment({...paypal,current:current, sku:sku, quantity:quantity});
        console.log(demo);
        
          toastr.success('Thành Công')
        navigate('/success');
      
      } catch (error) {
        navigate('/cancle');
        toastr.error('Lỗi')
      }
    }

  return (
    <div className='main'>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="">Name</label>
                <input type="text" placeholder='Name' {...register('name', {required: true})}/>
            </div>
            <div>
                <label htmlFor="">Price</label>
                <input type="text" placeholder='Price' {...register('price', {required: true})}/>
            </div>
            <div>
               <button type={"submit"}>Click</button>
            </div>

        </form>
    </div>
  )
}

export default CheckoutPaypal