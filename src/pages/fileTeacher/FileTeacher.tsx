import React from "react";
import Footer from "../../components/Footer";
import BannerUser from "../../components/user/BannerUser";
import ThongKe from "../../components/user/ThongKe";
import Education from "./Education";
type Props = {};

const FileTeacher = (props: Props) => {
  return (
    <>
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
