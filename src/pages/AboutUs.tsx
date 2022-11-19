import React from "react";
import { CheckSquareOutlined } from "@ant-design/icons";
type Props = {};

const AboutUs = (props: Props) => {
  return (
    <div className="container w-8/12">
      <div className="container__learn flex justify-center gap-6 m-h-[400px] mt-12">
        <div className="learn__left ">
          <img
            className="w-[100%] rounded"
            src="../../assets/image/about-1.jpg"
            alt=""
          />
        </div>

        <div className="learn__right">
          <h3 className="text-xl font-bold text-[#17a2b8]">LEARN ABOUT US </h3>
          <h1 className="text-3xl font-bold text-[#00394f] font-mono">
            Best englist website
          </h1>

          <span>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio
            consequatur ab perferendis et, iusto rerum magnam animi temporibus
            ad iste ex veniam qui similique accusantium, ipsum dolorum dolor.
            Labore, aperiam!
          </span>

          <div className="mt-4 flex gap-4">
            <div className="">
              <img
                className="w-[300px] rounded"
                src="../../assets/image/family.png"
                alt=""
              />
            </div>
            <ul className="">
              <li className="border-y-[1px] boder-blue-900 text-lg mt-2">
                Some think, I dont know code
              </li>
              <li className="border-b-[1px] boder-blue-900 text-lg mt-2">
                Some think, I dont know code
              </li>
              <li className="border-b-[1px] boder-blue-900 text-lg mt-2">
                Some think, I dont know code
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
              <h1>Giáo trình hiệu quả nhất</h1>
              <span>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Voluptatem laborum quos totam dicta vitae doloremque illum eaque
                mollitia, nisi esse corporis laudantium animi inventore minus
                molestias. Repudiandae laudantium corporis quia.
              </span>
            </div>
          </div>
          <div className="category__child flex gap-6 rounded bg-[#f8f9fa] p-4">
            <CheckSquareOutlined
              style={{ fontSize: "36px", color: "#00394f" }}
            />

            <div>
              <h1>Giáo trình hiệu quả nhất</h1>
              <span>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Voluptatem laborum quos totam dicta vitae doloremque illum eaque
                mollitia, nisi esse corporis laudantium animi inventore minus
                molestias. Repudiandae laudantium corporis quia.
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
              <h1>Giáo trình hiệu quả nhất</h1>
              <span>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Voluptatem laborum quos totam dicta vitae doloremque illum eaque
                mollitia, nisi esse corporis laudantium animi inventore minus
                molestias. Repudiandae laudantium corporis quia.
              </span>
            </div>
          </div>
          <div className="category__child flex gap-6 rounded bg-[#f8f9fa] p-4">
            <CheckSquareOutlined
              style={{ fontSize: "36px", color: "#00394f" }}
            />

            <div>
              <h1>Giáo trình hiệu quả nhất</h1>
              <span>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Voluptatem laborum quos totam dicta vitae doloremque illum eaque
                mollitia, nisi esse corporis laudantium animi inventore minus
                molestias. Repudiandae laudantium corporis quia.
              </span>
            </div>
          </div>
        </div>
      </div>

      <section className="box__teacher">
        <h2 className="title__lecturers mt-8 mb-8 text-[#00394f]">Giảng Viên Của Vogue</h2>
        <div className="list__teacher">
          <div className="item__teacher">
            <div className="">
              <img
                className="img__teacher"
                src="https://i.pinimg.com/564x/40/13/74/4013749a8693c2ac0e3a8a3326a99240.jpg"
                alt=""
              />
            </div>
            <h3 className="name__teacher__1">Thomas Edison</h3>
            <p>Thạc sỹ Giáo Dục & Quản Trị Kinh Doanh từ Đại Học StanFord</p>
          </div>
          <div className="item__teacher">
            <div className="">
              <img
                className="img__teacher"
                src="https://i.pinimg.com/564x/58/44/1a/58441a96ff4480dbae3779ec75ef87a4.jpg"
                alt=""
              />
            </div>
            <h3 className="name__teacher__1">Anhxtanh</h3>
            <p>Thạc sỹ Giáo Dục & Quản Trị Kinh Doanh từ Đại Học StanFord</p>
          </div>
          <div className="item__teacher">
            <div className="">
              <img
                className="img__teacher"
                src="https://i.pinimg.com/564x/cb/72/2c/cb722cc4a9a425e604c911957f9b2f93.jpg"
                alt=""
              />
            </div>
            <h3 className="name__teacher__1">Picaso</h3>
            <p>Thạc sỹ Giáo Dục & Quản Trị Kinh Doanh từ Đại Học StanFord</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUs;
