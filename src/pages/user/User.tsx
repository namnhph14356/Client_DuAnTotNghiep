import React from "react";
import BannerUser from "../../Component/user/BannerUser";
import ThongKe from "../../Component/user/ThongKe";
import "./user.css";
type Props = {};

const User = (props: Props) => {
  return (
    <>
    
      
      <div className="container">
        <BannerUser />
        <ThongKe />
      </div>
    </>
  );
};

export default User;
