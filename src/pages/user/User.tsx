import React from "react";
import Footer from "../../Component/Footer";
import HeaderComponent from "../../Component/HeaderHome";
import BannerUser from "../../Component/user/BannerUser";
import ThongKe from "../../Component/user/ThongKe";
import "./user.css";
type Props = {};

const User = (props: Props) => {
  return (
    <>
      <HeaderComponent />
      
      <div className="container">
        <BannerUser />
        <ThongKe />
      </div>
      <Footer />
    </>
  );
};

export default User;
