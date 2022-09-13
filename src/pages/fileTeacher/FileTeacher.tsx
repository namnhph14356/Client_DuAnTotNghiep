import React from "react";
import Footer from "../../Component/Footer";
import Header from "../../Component/Header";
import BannerUser from "../../Component/user/BannerUser";
import ThongKe from "../../Component/user/ThongKe";
import Education from "./Education";
type Props = {};

const FileTeacher = (props: Props) => {
  return (
    <>
      <Header />
      <div className="container">
        <BannerUser />
        <div style={{marginTop: 30, marginBottom: 30, padding: 20}}>
        <Education />
        </div>
        <hr />
        <ThongKe />
      </div>
      <Footer />
    </>
  );
};

export default FileTeacher;
