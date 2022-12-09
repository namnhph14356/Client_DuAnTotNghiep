import React from 'react'
import { NavLink } from 'react-router-dom';
import { CreditCardOutlined } from '@ant-design/icons';

type Props = {}
interface IModalProps {
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  }
const PopupPayment = ({closeModal}: IModalProps) => {
  return (
    <div className="modalPayment">
      <div className="modal-header">
        <h4 className='close__modal'
          onClick={() => {
            closeModal(false);
          }}
        >
          X
        </h4>
      </div>
      <div className="mt-4">
        <p className='text__modal'>Chọn hình thức thanh toán</p>
        <div className='my-8'>
            <NavLink className="p-3 rounded bg-blue-500 text-white font-bold" to={"/payment/vnpay"}>Thanh toán qua VnPay</NavLink>
        </div>
        <div className='flex justify-center gap-3'>
            <div><CreditCardOutlined className='text-3xl'/></div>
            
            <NavLink className="p-2 rounded bg-blue-500 text-white font-bold" to={"/payment/qrCode"}>Thanh toán qua chuyển khoản</NavLink>
        </div>
        
      </div>
    </div>
  )
}

export default PopupPayment