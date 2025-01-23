import React from "react";
import Navbar from "../Navbar/page";

const MainPage = () => {
  return (
    <div>
      <Navbar />

      <div className="p-6">
        <h1 className="text-2xl font-bold">แจ้งปัญหาการใช้งาน</h1>
        <p className="mt-4">
          ยินดีต้อนรับเข้าสู่หน้าการแจ้งปัญหาการใช้งานระบบ กรุณากรอกรายละเอียดปัญหาที่พบ
        </p>
      </div>
    </div>
  );
};

export default MainPage;
