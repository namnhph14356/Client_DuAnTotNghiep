import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import {
  MessageOutlined,
  CloseOutlined,
  SendOutlined,
  UserOutlined,
  AntDesignOutlined,
  AlignLeftOutlined,
  EditOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { Popover, Input, Image, Avatar, Tooltip } from "antd";
import "../css/message.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { UserType } from "../types/user";
import { getListUser } from "../api/user";
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

const groupMessages = [
  {
    _id: 1,
    listUser: [
      {
        _id: "637ccf1b33db8ds76ae9c8f0aa",
        username: "Long chanh thôn",
        email: "longchanhthon@gmail.com",
        password:
          "$2b$10$.Fkc.oen1Rmo5MJ5KAWsCO1JTS/MXvT/111Vb4E6SooAIwqeLBJLu",
        phone: "",
        address: "",
        img: "https://ui-avatars.com/api/?uppercase=true&name=LT&background=999900&size=500",
        sex: 1,
        role: "0",
        idFacebook: "",
        idGoogle: "",
      },
      {
        _id: "637ccf1b33db876ae9dsaadsc8f0aa",
        username: "Long chanh thôn",
        email: "longchanhthon@gmail.com",
        password:
          "$2b$10$.Fkc.oen1Rmo5MJ5KAWsCO1JTS/MXvT/111Vb4E6SooAIwqeLBJLu",
        phone: "",
        address: "",
        img: "https://ui-avatars.com/api/?uppercase=true&name=LT&background=999900&size=500",
        sex: 1,
        role: "0",
        idFacebook: "",
        idGoogle: "",
      },
      {
        _id: "637ccf1b33db876ae9c8f0dsdaa",
        username: "Long sadsad thôn",
        email: "longchanhthon@gmail.com",
        password:
          "$2b$10$.Fkc.oen1Rmo5MJ5KAWsCO1JTS/MXvT/111Vb4E6SooAIwqeLBJLu",
        phone: "",
        address: "",
        img: "https://ui-avatars.com/api/?uppercase=true&name=LT&background=999900&size=500",
        sex: 1,
        role: "0",
        idFacebook: "",
        idGoogle: "",
      },
      {
        _id: "637ccf1b33db876ae9saddsac8f0aa",
        username: "Long saddsaasd thôn",
        email: "longchanhthon@gmail.com",
        password:
          "$2b$10$.Fkc.oen1Rmo5MJ5KAWsCO1JTS/MXvT/111Vb4E6SooAIwqeLBJLu",
        phone: "",
        address: "",
        img: "https://ui-avatars.com/api/?uppercase=true&name=LT&background=999900&size=500",
        sex: 1,
        role: "0",
        idFacebook: "",
        idGoogle: "",
      },
      {
        _id: "637ccf1b33db876swwqwqwqsae9c8f0aa",
        username: "Long sdsadads thôn",
        email: "longchanhthon@gmail.com",
        password:
          "$2b$10$.Fkc.oen1Rmo5MJ5KAWsCO1JTS/MXvT/111Vb4E6SooAIwqeLBJLu",
        phone: "",
        address: "",
        img: "https://ui-avatars.com/api/?uppercase=true&name=LT&background=999900&size=500",
        sex: 1,
        role: "0",
        idFacebook: "",
        idGoogle: "",
      },
    ],
    time: new Date().getTime() + 1,
    name: "Nhóm lập trình",
  },
  {
    _id: 2,
    name: "Nhóm Java",
    listUser: [
      {
        _id: "637ccf1b33db8ds76ae9c8f0aa",
        username: "Long chanh thôn",
        email: "longchanhthon@gmail.com",
        password:
          "$2b$10$.Fkc.oen1Rmo5MJ5KAWsCO1JTS/MXvT/111Vb4E6SooAIwqeLBJLu",
        phone: "",
        address: "",
        img: "https://ui-avatars.com/api/?uppercase=true&name=LT&background=999900&size=500",
        sex: 1,
        role: "0",
        idFacebook: "",
        idGoogle: "",
      },
      {
        _id: "637ccf1b33db876ae9dsaadsc8f0aa",
        username: "Long chanh thôn",
        email: "longchanhthon@gmail.com",
        password:
          "$2b$10$.Fkc.oen1Rmo5MJ5KAWsCO1JTS/MXvT/111Vb4E6SooAIwqeLBJLu",
        phone: "",
        address: "",
        img: "https://ui-avatars.com/api/?uppercase=true&name=LT&background=999900&size=500",
        sex: 1,
        role: "0",
        idFacebook: "",
        idGoogle: "",
      },
      {
        _id: "637ccf1b33db876ae9c8f0dsdaa",
        username: "Long sadsad thôn",
        email: "longchanhthon@gmail.com",
        password:
          "$2b$10$.Fkc.oen1Rmo5MJ5KAWsCO1JTS/MXvT/111Vb4E6SooAIwqeLBJLu",
        phone: "",
        address: "",
        img: "https://ui-avatars.com/api/?uppercase=true&name=LT&background=999900&size=500",
        sex: 1,
        role: "0",
        idFacebook: "",
        idGoogle: "",
      },
    ],
    time: new Date().getTime() + 100,
  },
  {
    _id: 3,
    name: "Nhóm thực tập 2022",
    listUser: [
      {
        _id: "637ccf1b33db8ds76ae9c8f0aa",
        username: "Long chanh thôn",
        email: "longchanhthon@gmail.com",
        password:
          "$2b$10$.Fkc.oen1Rmo5MJ5KAWsCO1JTS/MXvT/111Vb4E6SooAIwqeLBJLu",
        phone: "",
        address: "",
        img: "https://ui-avatars.com/api/?uppercase=true&name=LT&background=999900&size=500",
        sex: 1,
        role: "0",
        idFacebook: "",
        idGoogle: "",
      },
      {
        _id: "637ccf1b33db876ae9dsaadsc8f0aa",
        username: "Long chanh thôn",
        email: "longchanhthon@gmail.com",
        password:
          "$2b$10$.Fkc.oen1Rmo5MJ5KAWsCO1JTS/MXvT/111Vb4E6SooAIwqeLBJLu",
        phone: "",
        address: "",
        img: "https://ui-avatars.com/api/?uppercase=true&name=LT&background=999900&size=500",
        sex: 1,
        role: "0",
        idFacebook: "",
        idGoogle: "",
      },
      {
        _id: "637ccf1b33db876ae9c8f0dsdaa",
        username: "Long sadsad thôn",
        email: "longchanhthon@gmail.com",
        password:
          "$2b$10$.Fkc.oen1Rmo5MJ5KAWsCO1JTS/MXvT/111Vb4E6SooAIwqeLBJLu",
        phone: "",
        address: "",
        img: "https://ui-avatars.com/api/?uppercase=true&name=LT&background=999900&size=500",
        sex: 1,
        role: "0",
        idFacebook: "",
        idGoogle: "",
      },
      {
        _id: "637ccf1b33db876ae9saddsac8f0aa",
        username: "Long saddsaasd thôn",
        email: "longchanhthon@gmail.com",
        password:
          "$2b$10$.Fkc.oen1Rmo5MJ5KAWsCO1JTS/MXvT/111Vb4E6SooAIwqeLBJLu",
        phone: "",
        address: "",
        img: "https://ui-avatars.com/api/?uppercase=true&name=LT&background=999900&size=500",
        sex: 1,
        role: "0",
        idFacebook: "",
        idGoogle: "",
      },
    ],
    time: new Date().getTime() + 10,
  },
];

const Message: React.FC = (props) => {
  const auth = useSelector((item: RootState) => item.auth.value) as UserType;

  const bottomRef = React.useRef<HTMLDivElement>(null);
  const [dataQuestion, setDataQuestion] = useState<any>([]);
  const [groupSelect, setGroupSelect] = useState<any>(groupMessages[0]);
  const [clicked, setClicked] = useState<boolean>(false);
  const [clicked1, setClicked1] = useState<boolean>(false);
  const [optionsUser, setOptionUser] = useState<any[]>([]);
  useEffect(() => {
    getDataUser();
  }, [])
  
  const getDataUser = async () => {
    const { data } = await getListUser();
    if (data && data.length > 0) {
      let listUser: any = [];
      data.map((item: any) => {
        if (item.role === "0") {
          listUser.push({
            label: item.username,
            value: item._id,
          })
        }
      })
      setOptionUser(listUser)
    }
  };
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
      setTimeout(() => {
        bottomRef.current?.scrollTo({ top: 1000000, behavior: "smooth" });
      }, 500);
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
      setTimeout(() => {
        bottomRef.current?.scrollTo({ top: 1000000, behavior: "smooth" });
      }, 500);
      // if (inputRef.current) {
      //   inputRef.current.value = '';
      // }
    }
  };

  const onShowAddGroup = () => {

  }


  const onSelectGroup = (group) => {
    setGroupSelect(group);
  };

  const content = (
    <div className="wrapper-message">
      <div className="message-left">
        <div className="icon-header-message-left">
          <MenuOutlined style={{ fontSize: "24px", color: "#000" }} />
        </div>
        <div className="message-content-group">
          {groupMessages &&
            groupMessages.length > 0 &&
            groupMessages.map((item) => (
              <div
                key={item._id}
                onClick={() => onSelectGroup(item)}
                className={item._id === groupSelect._id ? "active-group" : ""}
              >
                <div className="group-icon">
                  <Avatar.Group
                    maxCount={1}
                    maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                  >
                    {item.listUser.length > 0 &&
                      item.listUser.map((user) => (
                        <Tooltip
                          key={user._id}
                          title={user.username}
                          placement="top"
                        >
                          <Avatar
                            style={{
                              backgroundColor: "#87d068",
                              border: "1px solid rgba(0,0,0,0.1)",
                            }}
                            icon={<UserOutlined />}
                          />
                        </Tooltip>
                      ))}
                  </Avatar.Group>
                </div>
              </div>
            ))}
          <div className="icon-message-add-group" onClick={onShowAddGroup}>
            <EditOutlined style={{ fontSize: "24px", color: "#fff" }} />
          </div>
        </div>
      </div>
      <div className="message-right">
        <div className="header-message">
          <p className="text-header-message">{groupSelect?.name}</p>
          <div onClick={onClose} className="icon-cancel-message">
            <CloseOutlined style={{ fontSize: "14px", color: "#fff" }} />
          </div>
        </div>
        {auth && auth?.username ? (
          <div className="message-content" ref={bottomRef}>
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
    </div>
  );
  return (
    <div className="positon-messgae">
      <div onClick={onClose} style={{ cursor: "pointer" }}>
        <MessageOutlined style={{ fontSize: "24px", color: "#08c" }} />
      </div>
      {clicked && content}
    </div>
  );
};

Message.propTypes = {};

export default Message;
