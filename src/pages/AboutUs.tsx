import React from "react";
import { CheckSquareOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet";
type Props = {};

const AboutUs = (props: Props) => {
  return (
    <div className="m-auto w-10/12">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Giới Thiệu | Vian English</title>
      </Helmet>
      <div className="container__learn flex justify-center gap-6 m-h-[400px] mt-12">
        <div className="learn__left ">
          <img
            className="w-[100%] rounded "
            src="../../assets/image/about-1.jpg"
            alt=""
          />
        </div>

        <div className="learn__right">
          <h3 className="text-xl font-bold text-[#17a2b8]">TÌM HIỂU VỀ CHÚNG TÔI </h3>
          <h1 className="text-3xl font-bold text-[#00394f] font-mono">
            Học tiếng Anh một cách tốt nhất
          </h1>

          <span>
            Trong khi bạn đang nghĩ mình nên học tiếng Anh ở đâu hay mình nên đăng ký khóa học nào thì bạn cũng muốn tìm hiểu xem khóa học
            đó có hiệu quả hay không và chi phí của khóa học đó thế nào. Hãy đến với chúng tôi Vian English.
          </span>

          <div className="mt-3 flex gap-4">
            <div className="">
              <img
                className="w-[300px] h-60 rounded"
                src="https://res.cloudinary.com/chanh-thon/image/upload/v1669733377/family_f7zrfe.png"
                alt=""
              />
            </div>
            <ul className="divide-y divide-gray-300">
              <li className="text-lg mt-2">
                Tạo sự chủ động
              </li>
              <li className="text-lg mt-2">
                Bài tập, đề kiểm tra, tài liệu chọn lọc
              </li>
              <li className="text-lg mt-2">
                Chi phí phù hợp
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="container__category mt-8 flex gap-4">
        <div className="flex flex-col gap-4">
          <div className="category__child flex gap-6 rounded bg-[#f8f9fa] p-4">
            <CheckSquareOutlined
              style={{ fontSize: "36px", color: "#00394f" }}
            />
            <div>
              <h1>Tạo sự chủ động</h1>
              <span>
                Học trực tuyến đồng nghĩa với việc phải tự học, tự khai thác thông tin kiến thức.
                Với những trẻ yêu thích tiếng Anh, sự say mê tìm tòi sẽ kích thích bé sáng tạo và chủ động tiếp nhận các kiến thức.
              </span>
            </div>
          </div>
          <div className="category__child flex gap-6 rounded bg-[#f8f9fa] p-4">
            <CheckSquareOutlined
              style={{ fontSize: "36px", color: "#00394f" }}
            />

            <div>
              <h1>Bài tập, đề kiểm tra, tài liệu chọn lọc</h1>
              <span>
                Các bài tập của khóa tiếng Anh 360 trực tuyến luôn được chọn lọc kỹ trước khi ra mắt đảm bảo theo trình độ và nhu cầu mong muốn của người học.
                Bên cạnh đó là hệ thống ngân hàng bài kiểm tra, bài thi đa dạng, cho phép các em trau dồi kiến thức liên tục.
              </span>
            </div>
          </div>
        </div>


        {/* ---------------------- */}
        <div className="flex flex-col gap-4">
          <div className="category__child flex gap-6 rounded bg-[#f8f9fa] p-4">
            <CheckSquareOutlined
              style={{ fontSize: "36px", color: "#00394f" }}
            />
            <div>
              <h1>Chi phí phù hợp</h1>
              <span>
                Chỉ với 360.000 đ bạn đã có thể đăng ký được khóa học Online của 360 VianEnglish gồm rất nhiều bài học đa dạng cho bạn thỏa
                sức lựa chọn mà không sợ chán. Đặc biệt là các bài thi sau mỗi tuần giúp bạn có thể kiểm tra lại kiến thức.
              </span>
            </div>
          </div>
          <div className="category__child flex gap-6 rounded bg-[#f8f9fa] p-4">
            <CheckSquareOutlined
              style={{ fontSize: "36px", color: "#00394f" }}
            />

            <div>
              <h1>Có thể theo dõi quá trình học</h1>
              <span>
                Với khóa học 360 của chúng tôi, phụ huynh, học sinh có thể đăng nhập vào tài khoản để theo dõi quá trình học tập của c
                on thông qua việc giao bài tập, tự động chấm điểm và đọc báo cáo kết quả bài làm mà có sự điều chỉnh, động viên, tác động phù hợp.
              </span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default AboutUs;
