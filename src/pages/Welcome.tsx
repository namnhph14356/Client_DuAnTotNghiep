/* eslint-disable jsx-a11y/alt-text */

import React, { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { addWellcome } from "../api/welcome";
import ModalWelcomwe from "../Component/ModalWelcomwe";
import { ReactDimmer } from "react-dimmer";
import { message } from "antd";
type FormW = {
  username: string;
  numberphone: number;
  social: string;
  reason: string;
  timeStudy: string;
};
const Welcome = () => {
  const [isModal, setIsModal] = useState(false);
  // const handleClick = () => {
  //   setIsModal((prevState) => !prevState);
  // };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormW>();

  const onSubmit: SubmitHandler<FormW> = async (product: any) => {
    const user = localStorage.getItem("user")
      ? JSON.parse(String(localStorage.getItem("user"))).user.username
      : "";
    try {
      console.log(product);
      await addWellcome(product);
      message.success("Thành công");
      setIsModal((prevState) => !prevState);
    } catch (error) {
      message.error("Hệ thống bận");
    }
  };

  const reasonSection = useRef(null);
  const optionForYou = useRef(null);
  const testlevel = useRef(null);
  const scrollW = (ref: any) => {
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: "smooth",
    });
  };
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <section className="section-1">
            <p className="title">Bạn biết tới Vogue qua đâu?</p>
            <div className="box">
              <div className="row">
                <div className="col social__custom">
                  <img src="../image/image 7.png" width={140} />
                  <input
                    type="checkbox"
                    id="_checkbox"
                    className="_checkbox"
                    value="Google"
                    {...register("social")}
                  />
                  <label htmlFor="_checkbox">
                    <div id="tick_mark"></div>
                  </label>
                  <p>Tìm kiếm Google</p>
                </div>


                <div className="col social__custom">
                  <img src="../image/image 8.png" width={140} />
                  <input
                    type="checkbox"
                    id="_checkbox2"
                    className="_checkbox"
                    value="Youtube"
                    {...register("social")}
                  />
                  <label htmlFor="_checkbox2">
                    <div id="tick_mark"></div>
                  </label>
                  <p>Youtube</p>
                </div>
                <div className="col social__custom">
                  <img src="../image/image 9.png" width={140} />
                  <input
                    type="checkbox"
                    id="_checkbox3"
                    className="_checkbox"
                    value="TV"
                    {...register("social")}
                  />
                  <label htmlFor="_checkbox3">
                    <div id="tick_mark"></div>
                  </label>
                  <p>TV</p>
                </div>
                <div className="col social__custom">
                  <img src="../image/image 10.png" width={140} />
                  <input
                    type="checkbox"
                    id="_checkbox4"
                    className="_checkbox"
                    value="Tik Tok"
                    {...register("social")}
                  />
                  <label htmlFor="_checkbox4">
                    <div id="tick_mark"></div>
                  </label>
                  <p>Tik Tok</p>
                </div>
                <div className="col social__custom">
                  <img src="../image/image 11.png" width={140} />
                  <input
                    type="checkbox"
                    id="_checkbox5"
                    className="_checkbox"
                    value="Facebook"
                    {...register("social")}
                  />
                  <label htmlFor="_checkbox5">
                    <div id="tick_mark"></div>
                  </label>
                  <p>Facebook &amp; Instagram</p>
                </div>
                <div className="col social__custom">
                  <img src="../image/image 12.png" width={140} />
                  <input
                    type="checkbox"
                    id="_checkbox6"
                    className="_checkbox"
                    value="Người thân"
                    {...register("social")}
                  />
                  <label htmlFor="_checkbox6">
                    <div id="tick_mark"></div>
                  </label>
                  <p>Bạnbè  &amp; Gia đình</p>
                </div>
                <div className="col social__custom">
                  <img src="../image/image 14.png" width={140} />
                  <input
                    type="checkbox"
                    id="_checkbox7"
                    className="_checkbox"
                    value="Báo chí"
                    {...register("social")}
                  />
                  <label htmlFor="_checkbox7">
                    <div id="tick_mark"></div>
                  </label>
                  <p>Báo chí</p>
                </div>
                <div className="col social__custom">
                  <img src="../image/image 15.png" width={140} />
                  <input
                    type="checkbox"
                    id="_checkbox8"
                    className="_checkbox"
                    value="Khác"
                    {...register("social")}
                  />
                  <label htmlFor="_checkbox8">
                    <div id="tick_mark"></div>
                  </label>
                  <p>Khác</p>
                </div>
              </div>
            </div>
            <div className="box-btn">
              <a onClick={() => scrollW(reasonSection)} className="btn">
                Tiếp tục
              </a>
            </div>
          </section>
          <section className="section-1 ">
            <p className="title" ref={reasonSection}>
              Tại sao bạn học ngoại ngữ?
            </p>
            <div className="box">
              <div className="row">
                <div className="col reason__custom">
                  <img src="../image/image 17.png" width={140} />
                  <input
                    type="checkbox"
                    id="_reason"
                    value="Tìm kiếm Google"
                    className="_checkbox"
                    {...register("reason")}
                  />
                   <label htmlFor="_reason">
                    <div id="tick_mark"></div>
                  </label>
                  <p>Tìm kiếm Google</p>
                </div>
                <div className="col reason__custom">
                  <img src="../image/image 18.png" width={140} />
                  <input
                    type="checkbox"
                    id="_reason2"
                    value="Giao tiếp"
                    {...register("reason")}
                    className="_checkbox"
                  />
                   <label htmlFor="_reason2">
                    <div id="tick_mark"></div>
                  </label>
                  <p>Giao tiếp</p>
                </div>
                <div className="col reason__custom">
                  <img src="../image/image 19.png" width={140} />
                  <input
                    type="checkbox"
                    id="_reason3"
                    value="Xem phim"
                    {...register("reason")}
                    className="_checkbox"
                  />
                   <label htmlFor="_reason3">
                    <div id="tick_mark"></div>
                  </label>
                  <p>Xem phim</p>
                </div>
                <div className="col reason__custom">
                  <img src="../image/image 20.png" width={140} />
                  <input
                    type="checkbox"
                    id="_reason4"
                    value="Thi cử"
                    {...register("reason")}
                    className="_checkbox"
                  />
                   <label htmlFor="_reason4">
                    <div id="tick_mark"></div>
                  </label>
                  <p>Thi cử</p>
                </div>
                <div className="col reason__custom">
                  <img src="../image/image 15.png" width={140} />
                  <input
                    type="checkbox"
                    id="_reason5"
                    value="Khác"
                    {...register("reason")}
                    className="_checkbox"
                  />
                   <label htmlFor="_reason5">
                    <div id="tick_mark"></div>
                  </label>
                  <p>Khác</p>
                </div>
              </div>
            </div>
            <div className="box-btn">
              <a className="btn" onClick={() => scrollW(optionForYou)}>
                Tiếp tục
              </a>
            </div>
          </section>
          <section className="section-2 ">
            <p className="title" ref={optionForYou}>
              Chọn mức độ phù hợp với bạn
            </p>
            <div className="box">
              <ul>
                <li className="rounded-t-xl">
                <input
                      type="checkbox"
                      id=""
                      value="1"
                      {...register("timeStudy")}
                    />
                  <a>
                    30 phút/ngày
                  </a>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id=""
                    value="2"
                    {...register("timeStudy")}
                  />
                  <a>45 phút/ngày</a>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id=""
                    value="3"
                    {...register("timeStudy")}
                  />
                  <a>60 phút/ngày</a>
                </li>
                <li className="rounded-b-xl">
                  <input
                    type="checkbox"
                    id=""
                    value="4"
                    {...register("timeStudy")}
                  />
                  <a>90 phút/ngày</a>
                </li>
                <li className="rounded-b-xl">
                  <input
                    type="checkbox"
                    id=""
                    value="5"
                    {...register("timeStudy")}
                  />
                  <a>Khác</a>
                </li>
              </ul>
            </div>
            <div className="box-btn">
              {/* <a className="btn" onClick={()=>scrollW(testlevel)}>Tiếp tục</a> */}
              <button className="btn">Submit</button>
            </div>
          </section>

          {isModal && <ModalWelcomwe closeModal={setIsModal} />}

          <ReactDimmer
            isOpen={isModal}
            exitDimmer={setIsModal}
            zIndex={100}
            blur={1.5}
          />
        </form>
      
      </div>
    </div>
  );
};

export default Welcome;
