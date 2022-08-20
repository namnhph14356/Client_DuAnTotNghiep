/* eslint-disable jsx-a11y/alt-text */

import React, { useRef, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form';
import { addWellcome } from '../api/welcome';
import ModalWelcomwe from '../Component/ModalWelcomwe';
import { ReactDimmer } from "react-dimmer";
type FormW = {
  username:string,
  numberphone:number,
  social:string,
  reason:string,
  timeStudy:string
}
const Welcome = () => {
  // const [isModal, setIsModal] = useState(false);
  // const handleClick = () => {
  //   setIsModal((prevState) => !prevState);
  // };
  const {
    register,
    handleSubmit,
    formState: { errors },} = useForm<FormW>();
  
    const onSubmit: SubmitHandler<FormW> = async (product:any) => {
        try {
          console.log(product);
          await addWellcome(product)
          alert('success')
          
        } catch (error) {
          alert("Lỗi")
        }
    }


    const reasonSection = useRef(null)
    const optionForYou = useRef(null)
    const testlevel = useRef(null)
    const scrollW = (ref: any) =>{
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior:"smooth"
      })
    }
  return (
    <div>

<div>
  <form onSubmit={handleSubmit(onSubmit)}>
  <section className="section-1 ">
    <p className="title">Bạn biết tới Vogue qua đâu?</p>
    <div className="box">
      <div className="row">
        <div className="col">
          <img src="../image/image 7.png"  width={140} />
          <input type="checkbox" id="" value="1" {...register("social")}/>
          <p>Tìm kiếm Google</p>
        </div>
        <div className="col">
          <img src="../image/image 8.png"  width={140} />
          <input type="checkbox" id="" value="2" {...register("social")}/>
          <p>Youtube</p>
        </div>
        <div className="col">
          <img src="../image/image 9.png" width={140}  />
          <input type="checkbox" id="" value="3" {...register("social")}/>
          <p>TV</p>
        </div>
        <div className="col">
          <img src="../image/image 10.png" width={140}  />
          <input type="checkbox"  id="" value="4" {...register("social")}/>
          <p>Tik Tok</p>
        </div>
        <div className="col">
          <img src="../image/image 11.png" width={140}  />
          <input type="checkbox" id="" value="5" {...register("social")}/>
          <p>Facebook &amp;
            Instagram</p>
        </div>
        <div className="col">
          <img src="../image/image 12.png" width={140}  />
          <input type="checkbox"  id="" value="6" {...register("social")}/>
          <p>Bạn bè &amp; Gia đình</p>
        </div>
        <div className="col">
          <img src="../image/image 14.png" width={140}  />
          <input type="checkbox"  id="" value="7" {...register("social")}/>
          <p>Báo chí</p>
        </div>
        <div className="col">
          <img src="../image/image 15.png" width={140}  />
          <input type="checkbox" name="" id="" />
          <p>Khác</p>
        </div>
      </div>
    </div>
    <div className="box-btn">
      <a onClick={()=>scrollW(reasonSection)} className="btn">Tiếp tục</a>
    </div>
  </section>
  <section className="section-1 ">
    <p className="title" ref={reasonSection}>Tại sao bạn học ngoại ngữ?</p>
    <div className="box">
      <div className="row">
        <div className="col">
          <img src="../image/image 17.png"  width={140} />
          <input type="checkbox" id="" value="1" {...register("reason")}/>
          <p>Tìm kiếm Google</p>
        </div>
        <div className="col">
          <img src="../image/image 18.png"  width={140} />
          <input type="checkbox" id="" value="2" {...register("reason")}/>
          <p>Giao tiếp</p>
        </div>
        <div className="col">
          <img src="../image/image 19.png" width={140}  />
          <input type="checkbox" id="" value="3" {...register("reason")}/>
          <p>Xem phim</p>
        </div>
        <div className="col">
          <img src="../image/image 20.png" width={140}  />
          <input type="checkbox" id="" value="4" {...register("reason")}/>
          <p>Thi cử</p>
        </div>
        <div className="col">
          <img src="../image/image 15.png" width={140}  />
          <input type="checkbox" id="" value="5" {...register("reason")}/>
          <p>Khác</p>
        </div>
      </div>
    </div>
    <div className="box-btn">
      <a className="btn" onClick={()=>scrollW(optionForYou)}>Tiếp tục</a>
    </div>
  </section>
  <section className="section-2 ">
    <p className="title" ref={optionForYou}>Chọn mức độ phù hợp với bạn</p>
    <div className="box">
      <ul>
        <li className="rounded-t-xl"><a >
        <input type="checkbox" id="" value="1" {...register("timeStudy")}/>
          30 phút/ngày</a></li>
        <li>
        <input type="checkbox" id="" value="2" {...register("reason")}/>
          <a >45 phút/ngày</a></li>
        <li>
        <input type="checkbox" id="" value="3" {...register("reason")}/>
          <a >60 phút/ngày</a></li>
        <li className="rounded-b-xl">
        <input type="checkbox" id="" value="4" {...register("reason")}/>
          <a >90 phút/ngày</a></li>
          <li className="rounded-b-xl">
        <input type="checkbox" id="" value="5" {...register("reason")}/>
          <a >Khác</a></li>
      </ul>
    </div>
    <div className="box-btn">
      {/* <a className="btn" onClick={()=>scrollW(testlevel)}>Tiếp tục</a> */}
      <button className="btn">Submit</button>
    </div>
  </section>

{/* {isModal && <ModalWelcomwe closeModal={setIsModal} />}

    <ReactDimmer 
    isOpen={isModal}
    exitDimmer={setIsModal}
    zIndex={100}
    blur={1.5}
    /> */}
  </form>
  <section className="section-3 ">
    <div className="box">
      <img src="../image/image 30.png"  />
    </div>
    <p className="title" ref={testlevel}>Kiểm tra trình độ tại đây</p>
    <div className="box-btn mt-[40px] md:mt-[80px] ">
      <button className="btn">Tiếp tục</button>
    </div>
  </section>
  {/* <section className="section-1 test">
    <p className="test-name">Đâu là con mèo ?</p>
    <div className="test-row">
      <div className="test-row-col">
        <img src="../image/dog.png"  />
        <p>1. Dog</p>
      </div>
      <div className="test-row-col">
        <img src="../image/cat.png"  />
        <p>2. Cat</p>
      </div>
      <div className="test-row-col">
        <img src="../image/birth.png"  />
        <p>3. Bird</p>
      </div>
      <div className="test-row-col">
        <img src="../image/pig.png"  />
        <p>3. Pig</p>
      </div>
    </div>
    <div className="test-row-2">
      <div className="test-row-col-2">
        <div className="test-btn">
          <button className="btn">Bỏ qua</button>
        </div>
        <div className="test-btn">
          <button className="btn">Kiểm tra</button>
        </div>
      </div>
    </div>
  </section> */}
</div>


    </div>
  )
}

export default Welcome