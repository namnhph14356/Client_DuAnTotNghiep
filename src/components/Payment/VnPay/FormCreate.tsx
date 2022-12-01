import React from 'react'

type Props = {}

const FormCreate = (props: Props) => {
  return (
    <div>
      <h1>Thanh toán khóa học</h1>
       <form action="">
            <div>
              <label htmlFor="">Tên hóa đơn</label>
              <input type="text" value={""} disabled>KHóa học 360</input>
            </div>

            <div>
              <label htmlFor="">Số tiền thanh toán</label>
              <input type="number" value={"360000"} disabled/>
            </div>

            <div>
              <label htmlFor="">Ngân hàng</label>
              <select name="" id="" defaultValue={"NCB"}>
                  <option value="" >Không chọn</option>
                  <option value="TPBANK" >TPBANK</option>
                  <option value="SCB" >SCB</option>
                  <option value="BIDV" >BIDV</option>
              </select>
            </div>
       </form>
    </div>
  )
}

export default FormCreate