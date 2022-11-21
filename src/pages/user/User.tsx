import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { RootState } from "../../app/store";
import Footer from "../../components/Footer";
import EditInformationUser from "../../components/user/EditInformationUser ";
import MenuSettingUser from "../../components/user/MenuSettingUser";
import { UserType } from "../../types/user";
import "./user.css";
type Props = {};

const User = (props: Props) => {



  return (
    <>
      <div className="container">
        <EditInformationUser/>
        <MenuSettingUser/>
      </div>
    </>
  );
};

export default User;