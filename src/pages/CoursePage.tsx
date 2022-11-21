import React from "react";
import "./../css/course.css";

type Props = {};

const CoursePage = (props: Props) => {
  return (
    <div className=" w-8/12 m-auto">
      <div className=" flex justify-center m-auto text-center mt-16">
        <div className="mt-2">
          <div className="probootstrap-pricing border-[1px] p-8">
            <h3 className="text-2xl">Gói thường</h3>
            <div className="probootstrap-price-wrap my-6 ">
              <div className="probootstrap-price text-3xl text-[#6078EA]">
                200.000 VND
              </div>
              <span className="probootstrap-price-per-month mt-2 text-gray-400">
                / tháng
              </span>
            </div>
            <ul className="flex flex-col gap-6 mt-12">
              <li>Học thường</li>
              <li>Học thường học thường</li>
              <li>Học thường học thường Học thường học thường</li>
            </ul>
            <button className="btn__buy__coures mt-12">Thử miễn phí</button>
          </div>
        </div>
        <div className="bg-[#fffdfd]">
          <div className="probootstrap-pricing popular border-[1px] p-10">
            <h3 className="text-2xl">Gói nâng cao</h3>
            <div className="probootstrap-price-wrap my-6 ">
              <div className="probootstrap-price text-3xl text-[#6078EA]">
                1.000.000 VND
              </div>
              <span className="probootstrap-price-per-month mt-2 text-gray-400">
                / tháng
              </span>
            </div>
            <ul className="flex flex-col gap-6 mt-12">
              <li>Học thường</li>
              <li>Học thường học thường</li>
              <li>Học thường học thường Học thường học thường</li>
            </ul>
            <button className="btn__buy__coures mt-12">Thử miễn phí</button>
          </div>
        </div>
        <div className="mt-2">
          <div className="probootstrap-pricing border-[1px] p-8">
            <h3 className="text-2xl">Gói doanh nghiệp</h3>
            <div className="probootstrap-price-wrap my-6 ">
              <div className="probootstrap-price text-3xl text-[#6078EA]">
                2.000.000 VND
              </div>
              <span className="probootstrap-price-per-month mt-2 text-gray-400">
                / tháng
              </span>
            </div>
            <ul className="flex flex-col gap-6 mt-12">
              <li>Học thường</li>
              <li>Học thường học thường</li>
              <li>Học thường học thường Học thường học thường</li>
            </ul>
            <button className="btn__buy__coures mt-12">Thử miễn phí</button>
          </div>
        </div>

        {/* END row */}
      </div>

      <div className="mt-12">
        <h1 className="text-center text-3xl">Câu hỏi thường gặp?</h1>

        <div className="mt-8 flex gap-4">
            <div className="w-[50%] flex flex-col gap-4">
          <div className="">
            <h3 className="font-bold">
              1. Để thanh toán đảm bảo, tôi có cần đăng ký một tài khoản thanh
              toán đảm bảo?
            </h3>
            <span>
              Bạn không cần phải tạo tài khoản thanh toán đảm bảo. Hiện tại, bạn
              có thể thanh toán qua thẻ Visa, MasterCard, online bằng thẻ ATM
              nội địa hoặc chuyển khoản qua Ngân hàng. Những hình thức thanh
              toán khác sẽ được cung cấp trên SenPay.vn trong thời gian sớm
              nhất.
            </span>
          </div>

          <div className="">
            <h3 className="font-bold">2. Thanh toán đảm bảo là gì?</h3>
            <span>
              Thanh toán đảm bảo cho phép người mua thanh toán trực tuyến an
              toàn. Số tiền sẽ chỉ được chuyển cho nhà cung cấp sau khi người
              mua xác nhận đã nhận được hàng. Thanh toán đảm bảo giúp cho việc
              giao dịch được thực hiện nhanh chóng, an toàn và dễ dàng hơn. Đối
              với người mua: Tiền chỉ được chuyển cho nhà cung cấp sau khi người
              mua xác nhận đã nhận được hàng. Đối với nhà cung cấp: Mọi thông
              tin thanh toán đều được xác minh trước khi thực hiện giao dịch, và
              bên bán chỉ chuyển hàng sau khi bên mua đã thực hiện thanh toán.
              Hướng dẫn thanh toán đảm bảo, bạn xem thêm tại đây nhé!
            </span>
          </div>
          </div>
{/* ======================================================= */}
        <div className="w-[50%] flex flex-col gap-4">
          <div className="">
            <h3 className="font-bold">
              {" "}
              3. Tôi có phải trả phí để sử dụng dịch vụ Thanh toán đảm bảo?
            </h3>
            <span>
              Người mua hoàn toàn được miễn phí sử dụng dịch vụ thanh toán đảm
              bảo.
            </span>
          </div>

          <div className="">
            <h3 className="font-bold"> 4. Tại sao phải chọn Thanh toán đảm bảo?</h3>
            <span>
              Thanh toán đảm bảo an toàn, dễ sử dụng và MIỄN PHÍ. Đặc biệt, bạn
              không cần phải tạo tài khoản thanh toán đảm bảo Những tính năng
              quan trọng của thanh toán đảm bảo: • Thanh toán an toàn với hệ
              thống bảo mật VeriSign • Theo dõi được việc giao nhận hàng • Tiền
              chỉ được chuyển cho nhà cung cấp sau khi bạn xác nhận đã nhận được
              hàng.
            </span>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePage;
