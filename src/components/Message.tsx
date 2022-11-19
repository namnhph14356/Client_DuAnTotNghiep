import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  MessageOutlined,
  CloseOutlined,
  SendOutlined,
  AlignLeftOutlined,
} from "@ant-design/icons";
import { Popover, Input } from "antd";
import "../css/message.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { UserType } from "../types/user";
const { Search } = Input;
const dataFrequentlyAskedQuestion = [
  {
    id: 1,
    text: "Học tiếng anh như thế nào là hiệu quả nhất?",
    time: new Date(),
  },
  {
    id: 2,
    text: "Đăng ký khoá học tiếng anh ở đâu?",
    time: new Date(),
  },
  {
    id: 3,
    text: "Tôi muốn cải thiện việc nói tiếng anh?",
    time: new Date(),
  },
  {
    id: 4,
    text: "Tôi cần giúp đỡ?",
    time: new Date(),
  },
  {
    id: 5,
    text: "Xin chào?",
    time: new Date(),
  },
];

const Message :React.FC = (props)  => {
  const auth = useSelector((item: RootState) => item.auth.value) as UserType;
  const [dataQuestion, setDataQuestion] = useState<any>([]);
  const [clicked, setClicked] = useState<boolean>(false);
  const [clicked1, setClicked1] = useState<boolean>(false);
  const onClose = () => {
    setClicked(!clicked);
  };
  const onClose1 = () => {
    setClicked1(!clicked1);
  };
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const onSearch = (value: string) => {
    if (value.trim().length > 0) {
      const dataMessage = {
        id: (Math.random() + 1).toString(36).substring(7),
        text: value,
        time: new Date().getTime(),
        isAdmin: false,
      };
      const dataNew = [...dataQuestion, dataMessage];
      setDataQuestion(dataNew);
      // if (inputRef.current) {
      //   inputRef.current.value = '';
      // }
    }
  };

  const onAddMessage = (value: string) => {
    if (value.trim().length > 0) {
      const dataMessage = {
        id: (Math.random() + 1).toString(36).substring(7),
        text: value,
        time: new Date().getTime(),
        isAdmin: false,
      };
      const dataNew = [...dataQuestion, dataMessage];
      setDataQuestion(dataNew);
      onClose1();
      // if (inputRef.current) {
      //   inputRef.current.value = '';
      // }
    }
  };

  const content2 = (
    <div className="wrapper-message1">
      <div className="header-message">
        <p className="text-header-message">Câu hỏi thường gặp</p>
        <div onClick={onClose1} className="icon-cancel-message">
          <CloseOutlined style={{ fontSize: "14px", color: "#fff" }} />
        </div>
      </div>
      <div className="message-content-wrapper">
        {dataFrequentlyAskedQuestion.map((item) => (
          <p
            onClick={() => onAddMessage(item.text)}
            key={item.id}
            className="text-message"
          >
            {item.text}
          </p>
        ))}
      </div>
    </div>
  );
  const content = (
    <div className="wrapper-message">
      <div className="header-message">
        <p className="text-header-message">Admin VianEnglish</p>
        <div onClick={onClose} className="icon-cancel-message">
          <CloseOutlined style={{ fontSize: "14px", color: "#fff" }} />
        </div>
      </div>
      { auth && auth?.username ? (
        <div className="message-content">
          <p className="text-repmessage">Chào bạn {auth.username}</p>
          <p className="text-repmessage">Bạn cần chúng tôi giúp gì nhỉ?</p>
          <p className="text-repmessage">
            Chúng tôi sẽ trả lời bạn sớm nhất khi có thể
          </p>
          {dataQuestion.map((item: any) => (
            <div key={item.id}>
              {item.isAdmin ? (
                <p className="text-repmessage">{item.text}</p>
              ) : (
                <p className="text-message1">{item.text}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="message-content">
          <p className="text-center">
            Bạn cần đăng ký hoặc đăng nhập để chat với quản trị viên{" "}
          </p>
        </div>
      )}

      {auth && auth?.username && (
        <div className="message-send">
          <div onClick={onClose1} className="cusound">
            <Popover
              placement="topLeft"
              content={content2}
              // open={clicked1}
              trigger="click"
            >
              <div className="option-message">
                <AlignLeftOutlined
                  style={{ fontSize: "24px", color: "#000" }}
                />
              </div>
            </Popover>
          </div>

          <Search
            ref={inputRef}
            placeholder="Nhắn cho admin"
            allowClear
            enterButton={<SendOutlined />}
            size="large"
            onSearch={onSearch}
          />
        </div>
      )}
    </div>
  );
  return (
    <div className="positon-messgae">
      <Popover
        // open={clicked}
        placement="topRight"
        content={content}
        trigger="click"
      >
        <div onClick={onClose} style={{ cursor: "pointer" }}>
          <MessageOutlined style={{ fontSize: "24px", color: "#08c" }} />
        </div>
      </Popover>
    </div>
  );
};

Message.propTypes = {};

export default Message;
