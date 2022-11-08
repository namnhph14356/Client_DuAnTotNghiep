import { Select } from 'antd';
import { Option } from 'antd/lib/mentions';
import React from 'react'

type Props = {}
interface IModalProps {
    closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  }
const PopupChange = ({ closeModal }: IModalProps) => {
  return (
    <div className="modal">
      <div className="modal-header">
        <h4 className='close__modal'
          onClick={() => {
            closeModal(false);
          }}
        >
          X
        </h4>
      </div>
      <div className="modal-body">
        <div className=''>
        <div className="w-[100%]">
            <label htmlFor="" className="text-xl font-bold text-blue-500">Tháng</label>
            <div className="mt-2 mb-4">
              <Select value={"Tuần 1"} className="w-full h-[30px]">
                 <Option value="">Tuần 2</Option>
                 <Option value="">Tuần 3</Option>
                 <Option value="">Tuần 4</Option>
              </Select>
            </div>

              <label htmlFor="" className="text-xl font-bold text-blue-500">Tuần</label>
              <div className="mt-2">
              <Select value={"Ngày 1"} className="w-full h-[40px]">
                 <Option value="">Ngày 2</Option>
                 <Option value="">Ngày 3</Option>
                 <Option value="">Ngày 4</Option>
                 <Option value="">Ngày 5</Option>
                 <Option value="">Ngày 6</Option>
              </Select>
              </div>
        </div>
        <div>
           <button className='buton__modal yes__modal'>Submit</button>
           <button  className='buton__modal no__modal'  onClick={() => {
            closeModal(false);
          }}>Đóng</button>
        </div>
      </div>

    </div> 
    </div>
  )
}

export default PopupChange