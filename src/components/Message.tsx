import {
  CloseOutlined, MenuOutlined, MessageOutlined, SendOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Avatar, Input } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getListUser } from "../api/user";
import { RootState } from "../app/store";
import "../css/message.css";
import { getListClassByUserSlide } from "../features/Slide/class/classSlice";
import { UserType } from "../types/user";
const { Search } = Input;

const Message: React.FC = (props) => {
  const auth = useSelector((item: RootState) => item.auth.value) as UserType;
  const { classByUser } = useSelector((item: RootState) => item.class);
  const bottomRef = React.useRef<HTMLDivElement>(null);
  const [dataQuestion, setDataQuestion] = useState<any>([]);
  const [groupSelect, setGroupSelect] = useState<any>(classByUser[0]);
  const [clicked, setClicked] = useState<boolean>(false);
  const [clicked1, setClicked1] = useState<boolean>(false);
  const [optionsUser, setOptionUser] = useState<any[]>([]);
  useEffect(() => {
    getDataUser();
  }, []);

  const getDataUser = async () => {
    const { data } = await getListUser();
    if (data && data.length > 0) {
      let listUser: any = [];
      data.forEach((item: any) => {
        if (item.role === "0") {
          listUser.push({
            label: item.username,
            value: item._id,
          });
        }
      });
      setOptionUser(listUser);
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

  useEffect(() => {
    dispatch(getListClassByUserSlide(auth._id));
  }, [auth._id, dispatch]);

  const onSelectGroup = (group) => {
    setGroupSelect(group);
  };

  const content = (
    <div className="wrapper-message">
      {auth && auth?.username && (
        <div className="message-left">
          <div className="icon-header-message-left">
            <MenuOutlined style={{ fontSize: "24px", color: "#fff" }} />
          </div>
          <div className="message-content-group">
            {classByUser &&
              classByUser.length > 0 &&
              classByUser.map((item) => (
                <div
                  key={item._id}
                  onClick={() => onSelectGroup(item)}
                  className={item._id === groupSelect._id ? "active-group" : ""}
                >
                  <div className="group-icon">
                    <Avatar.Group
                      maxCount={1}
                      maxStyle={{
                        color: "#f56a00",
                        backgroundColor: "#fde3cf",
                      }}
                    >
                      {item.userOfClass.length > 0 &&
                        item.userOfClass.map((user: any) => (
                          <Avatar
                            style={{
                              backgroundColor: "#87d068",
                              border: "1px solid rgba(0,0,0,0.1)",
                            }}
                            src={user?.userId?.img}
                            key={user?.userId?._id}
                            icon={<UserOutlined />}
                          />
                        ))}
                    </Avatar.Group>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="message-right">
        {auth && auth?.username && (
          <div className="header-message">
            <p className="text-header-message">{groupSelect?.nameClass}</p>
            <div onClick={onClose} className="icon-cancel-message">
              <CloseOutlined style={{ fontSize: "14px", color: "#fff" }} />
            </div>
          </div>
        )}
        {auth && auth?.username ? (
          <div className="message-content" ref={bottomRef}>
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
              Bạn cần đăng ký hoặc đăng nhập để chat nhóm
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
