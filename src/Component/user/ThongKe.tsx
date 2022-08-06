import { Col, Row } from "antd";
import React from "react";
import "./style.css";
type Props = {};

const ThongKe = (props: Props) => {
    return (
        <div className="container border-t-gray-300">
            <div className="py-[90px]">

                <div className="big-box">

                    <div className="box_statistical">
                        <h2 className="font-bold text-[20px]">Thống kê</h2>
                        <div className="item__statistical">
                            <div className="item__result__teacher">
                                <div className="icon__item__teacher">
                                    <i className="fa-solid fa-bolt-lightning"></i>
                                </div>
                                <div className="point__teacher">
                                    <span>
                                        0
                                    </span>
                                    <p>Điểm kinh nghiệm</p>
                                </div>
                            </div>
                            <div className="item__result__teacher">
                                <div className="icon__item__teacher">
                                    <i className="fa-solid fa-crown"></i>
                                </div>
                                <div className="point__teacher">
                                    <span>
                                        0
                                    </span>
                                    <p>Tổng vương niệm</p>
                                </div>
                            </div>
                            <div className="item__result__teacher">
                                <div className="icon__item__teacher">
                                    <i className="fa-solid fa-trophy"></i>
                                </div>
                                <div className="point__teacher">
                                    <span>
                                        0
                                    </span>
                                    <p>Thứ hạng</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="history__user">
                        <div className="title__history">
                            <h5>
                                Lịch sử hoạt động
                            </h5>
                            <button>
                                xóa tất cả lịch sử
                            </button>
                        </div>

                        <div className="list__history__user">
                            <p>
                                5 Tháng 8, 2022
                            </p>
                            <div className="item__history__user">

                                <div className="info__user__history">
                                    <div className="img__user__history">
                                        <img src="https://i.pinimg.com/564x/04/8c/7e/048c7e0904fe27ffd0b91784a93eacc4.jpg" alt="" />
                                    </div>
                                    <div className="name__history__user">
                                        <h5>
                                            Bùi Hồng Hạnh  <span>
                                                đã tham gia phần bài học
                                            </span>
                                        </h5>

                                    </div>
                                </div>

                                <div className="time__history">
                                    <div className="time__action">
                                        <p>
                                            10:22
                                        </p>
                                    </div>
                                    <div className="btn__deltete__history">
                                        <button>
                                            <i className="fa-solid fa-delete-left"></i>
                                        </button>
                                    </div>
                                </div>

                            </div>
                            <div className="item__history__user">

                                <div className="info__user__history">
                                    <div className="img__user__history">
                                        <img src="https://i.pinimg.com/564x/04/8c/7e/048c7e0904fe27ffd0b91784a93eacc4.jpg" alt="" />
                                    </div>
                                    <div className="name__history__user">
                                        <h5>
                                            Bùi Hồng Hạnh  <span>
                                                đã tham gia phần bài học
                                            </span>
                                        </h5>

                                    </div>
                                </div>

                                <div className="time__history">
                                    <div className="time__action">
                                        <p>
                                            10:22
                                        </p>
                                    </div>
                                    <div className="btn__deltete__history">
                                        <button>
                                            <i className="fa-solid fa-delete-left"></i>
                                        </button>
                                    </div>
                                </div>

                            </div>
                            <div className="item__history__user">

                                <div className="info__user__history">
                                    <div className="img__user__history">
                                        <img src="https://i.pinimg.com/564x/04/8c/7e/048c7e0904fe27ffd0b91784a93eacc4.jpg" alt="" />
                                    </div>
                                    <div className="name__history__user">
                                        <h5>
                                            Bùi Hồng Hạnh  <span>
                                                đã tham gia phần bài học
                                            </span>
                                        </h5>

                                    </div>
                                </div>

                                <div className="time__history">
                                    <div className="time__action">
                                        <p>
                                            10:22
                                        </p>
                                    </div>
                                    <div className="btn__deltete__history">
                                        <button>
                                            <i className="fa-solid fa-delete-left"></i>
                                        </button>
                                    </div>
                                </div>

                            </div>
                            <div className="item__history__user">

                                <div className="info__user__history">
                                    <div className="img__user__history">
                                        <img src="https://i.pinimg.com/564x/04/8c/7e/048c7e0904fe27ffd0b91784a93eacc4.jpg" alt="" />
                                    </div>
                                    <div className="name__history__user">
                                        <h5>
                                            Bùi Hồng Hạnh  <span>
                                                đã tham gia phần bài học
                                            </span>
                                        </h5>

                                    </div>
                                </div>

                                <div className="time__history">
                                    <div className="time__action">
                                        <p>
                                            10:22
                                        </p>
                                    </div>
                                    <div className="btn__deltete__history">
                                        <button>
                                            <i className="fa-solid fa-delete-left"></i>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ThongKe;
