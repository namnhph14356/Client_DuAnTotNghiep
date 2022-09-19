import React from "react";
import BannerUser from "../../Component/user/BannerUser";
import ThongKe from "../../Component/user/ThongKe";
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
    </>
  );
};

export default FileTeacher;
