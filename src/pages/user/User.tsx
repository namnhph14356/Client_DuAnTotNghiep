import React from "react";
import Footer from "../../components/Footer";
import HeaderComponent from "../../components/HeaderHome";
import BannerUser from "../../components/user/BannerUser";
import ThongKe from "../../components/user/ThongKe";
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
