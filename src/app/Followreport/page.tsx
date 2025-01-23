"use client";

import React from "react";
import Swal from "sweetalert2";
import Navbar from "../Navbar/page"; // Ensure this path is correct

interface Complaint {
  id: number;
  date: string;
  from: string;
  subCategory: string;
  details: string;
  status: string;
}

const MainPage: React.FC = () => {
  const handleFilter = (): Complaint[] => {
    return [
      {
        id: 1,
        date: "2025-01-01",
        from: "ผู้ใช้ A",
        subCategory: "ระบบไม่ทำงาน",
        details: "ระบบไม่สามารถล็อกอินได้",
        status: "รอดำเนินการ",
      },
      {
        id: 2,
        date: "2025-01-02",
        from: "ผู้ใช้ B",
        subCategory: "ข้อผิดพลาดข้อมูล",
        details: "ข้อมูลไม่ตรงกับระบบ",
        status: "กำลังดำเนินการ",
      },
      {
        id: 3,
        date: "2025-01-03",
        from: "ผู้ใช้ C",
        subCategory: "ร้องเรียนทั่วไป",
        details: "บริการช้าเกินไป",
        status: "เสร็จสิ้น",
      },
    ];
  };

  const formatDate = (date: string): string =>
    new Date(date).toLocaleDateString("th-TH");

  const getStatusSteps = (status: string): string => {
    const steps = [
      { label: "รอดำเนินการ", isActive: status === "รอดำเนินการ" },
      { label: "กำลังดำเนินการ", isActive: status === "กำลังดำเนินการ" },
      { label: "เสร็จสิ้น", isActive: status === "เสร็จสิ้น" },
    ];

    return steps
      .map(
        (step, index) =>
          `
          <div style="display: flex; align-items: center; margin-bottom: 8px;">
            <div style="
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background-color: ${
                step.isActive ? "#3b82f6" : "#d1d5db"
              };
              color: #fff;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 12px;
              margin-right: 8px;
            ">
              ${index + 1}
            </div>
            <div style="
              color: ${step.isActive ? "#3b82f6" : "#6b7280"};
              font-size: 14px;
            ">
              ${step.label}
            </div>
          </div>
          `
      )
      .join("");
  };

  const handleViewStatus = (complaint: Complaint): void => {
    Swal.fire({
      title: `สถานะการร้องเรียน`,
      html: `
        <div style="text-align: left;">
          <p><strong>หัวข้อ:</strong> ${complaint.subCategory}</p>
          <p><strong>รายละเอียด:</strong> ${complaint.details}</p>
          <p><strong>สถานะ:</strong> ${complaint.status}</p>
          <div style="margin-top: 16px;">
            <h3 style="margin-bottom: 8px;">Timeline:</h3>
            ${getStatusSteps(complaint.status)}
          </div>
        </div>
      `,
      icon: "info",
      confirmButtonText: "ปิด",
      confirmButtonColor: "#3085d6",
    });
  };

  return (
    <div>
      <Navbar />

      <div className="p-6">
        <h1 className="text-3xl font-bold text-center">ติดตามปัญหา</h1>
        <p className="mt-4 text-center text-gray-600">
          ยินดีต้อนรับเข้าสู่หน้าการติดตามปัญหา กรุณาเลือกหัวข้อที่ท่านร้องเรียน
        </p>

        <div className="mt-8">
          <table className="min-w-full bg-white border rounded-lg shadow-lg overflow-hidden">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left p-4 border">ลำดับ</th>
                <th className="text-left p-4 border">วันที่</th>
                <th className="text-left p-4 border">ร้องเรียนจาก</th>
                <th className="text-left p-4 border">หัวข้อ</th>
                <th className="text-left p-4 border">รายละเอียด</th>
                <th className="text-center p-4 border">ดูสถานะ</th>
                <th className="text-center p-4 border">ลบ</th>
              </tr>
            </thead>
            <tbody>
              {handleFilter().map((complaint, index) => (
                <tr
                  key={complaint.id}
                  className="hover:bg-gray-100 cursor-pointer"
                >
                  <td className="p-4 border">{index + 1}</td>
                  <td className="p-4 border">{formatDate(complaint.date)}</td>
                  <td className="p-4 border">{complaint.from}</td>
                  <td className="p-4 border">{complaint.subCategory}</td>
                  <td className="p-4 border">{complaint.details}</td>
                  <td className="p-4 border text-center">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      onClick={() => handleViewStatus(complaint)}
                    >
                      ดูสถานะ
                    </button>
                  </td>
                  <td className="p-4 border text-center">
                    <button
                      onClick={() => console.log("ลบร้องเรียน ID:", complaint.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
