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
      <div className="modal-header" style={{background:"#4F46E5"}}>
        <h4 className='close__modal'
          onClick={() => {
            closeModal(false);
          }}
        >
          X
        </h4>
      </div>
      <div className="my-4 text-center">
        <p className='text__modal'>Chọn hình thức thanh toán</p>
        <div className='my-6 flex justify-center gap-3'>
            <img className='rounded' src={"https://inkythuatso.com/uploads/images/2021/12/vnpay-logo-inkythuatso-01-13-16-26-42.jpg"} alt="" width="40px"  />
            <NavLink className="p-2 rounded bg-blue-500 my-auto text-white font-bold w-[300px] hover:bg-white" to={"/payment/vnpay"}>Thanh toán qua VnPay</NavLink>
        </div>
        <div className='flex justify-center gap-3'>
            <div><i className="fa-solid fa-credit-card text-4xl my-auto" /></div>
            <NavLink className="p-2 rounded bg-blue-500 my-auto text-white font-bold w-[300px] hover:bg-white" to={"/payment/qrCode"}>Thanh toán qua chuyển khoản</NavLink>
        </div>
        
      </div>
    </div>
  )
}

export default PopupPayment