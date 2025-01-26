"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Navbar from "../Navbar/page";
import { Visibility as VisibilityIcon } from "@mui/icons-material";

interface StatusHistory {
  status: string;
  date: string;
  details?: string;
}

interface Complaint {
  id: number;
  date: string;
  from: string;
  subCategory: string;
  details: string;
  status: string;
  statusHistory: StatusHistory[];
}

const MainPage: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    // Load complaints data
    const data = handleFilter();
    setComplaints(data);
  }, []);

  const handleFilter = (): Complaint[] => {
    return [
      {
        id: 1,
        date: "2025-01-01",
        from: "ผู้ใช้ A",
        subCategory: "ระบบไม่ทำงาน",
        details: "ระบบไม่สามารถล็อกอินได้",
        status: "ตรวจสอบ",
        statusHistory: [
          { status: "รอดำเนินการ", date: "2025-01-01", details: "ระบบไม่สามารถล็อกอินได้" },
        ],
      },
      {
        id: 2,
        date: "2025-01-02",
        from: "ผู้ใช้ B",
        subCategory: "ข้อผิดพลาดข้อมูล",
        details: "ข้อมูลไม่ตรงกับระบบ",
        status: "ตรวจสอบ",
        statusHistory: [
          { status: "รอดำเนินการ", date: "2025-01-02", details: "ข้อมูลไม่ตรงกับระบบ" },
          { status: "กำลังดำเนินการ", date: "2025-01-03", details: "แก้ไขข้อมูลเบื้องต้น" },
        ],
      },
      {
        id: 3,
        date: "2025-01-03",
        from: "ผู้ใช้ C",
        subCategory: "ร้องเรียนทั่วไป",
        details: "บริการช้าเกินไป",
        status: "เสร็จสิ้น",
        statusHistory: [
          { status: "รอดำเนินการ", date: "2025-01-03", details: "บริการช้าเกินไป" },
          { status: "กำลังดำเนินการ", date: "2025-01-04", details: "แจ้งทีมงานเร่งด่วน" },
          { status: "เสร็จสิ้น", date: "2025-01-05", details: "ปัญหาได้รับการแก้ไขแล้ว" },
        ],
      },
      {
        id: 4,
        date: "2025-01-04",
        from: "ผู้ใช้ D",
        subCategory: "ระบบล่ม",
        details: "ไม่สามารถเข้าถึงระบบได้",
        status: "ตรวจสอบ",
        statusHistory: [
          { status: "รอดำเนินการ", date: "2025-01-04", details: "ไม่สามารถเข้าถึงระบบได้" },
          { status: "กำลังดำเนินการ", date: "2025-01-05", details: "รีเซ็ตเซิร์ฟเวอร์" },
        ],
      },
      {
        id: 5,
        date: "2025-01-05",
        from: "ผู้ใช้ E",
        subCategory: "ข้อผิดพลาดการเงิน",
        details: "ไม่สามารถชำระเงินได้",
        status: "เสร็จสิ้น",
        statusHistory: [
          { status: "รอดำเนินการ", date: "2025-01-05", details: "ตรวจสอบข้อมูลการเงิน" },
          { status: "กำลังดำเนินการ", date: "2025-01-06", details: "แก้ไข API การชำระเงิน" },
          { status: "เสร็จสิ้น", date: "2025-01-07", details: "ปัญหาได้รับการแก้ไขแล้ว" },
        ],
      },
      {
        id: 6,
        date: "2025-01-06",
        from: "ผู้ใช้ F",
        subCategory: "ร้องเรียนบริการ",
        details: "บริการไม่ตรงตามที่ตกลง",
        status: "กำลังดำเนินการ",
        statusHistory: [
          { status: "รอดำเนินการ", date: "2025-01-06", details: "ตรวจสอบข้อร้องเรียน" },
          { status: "กำลังดำเนินการ", date: "2025-01-07", details: "แจ้งทีมงานปรับปรุงบริการ" },
        ],
      },
      {
        id: 7,
        date: "2025-01-07",
        from: "ผู้ใช้ G",
        subCategory: "ข้อเสนอแนะ",
        details: "อยากให้เพิ่มฟีเจอร์ใหม่",
        status: "รอดำเนินการ",
        statusHistory: [
          { status: "รอดำเนินการ", date: "2025-01-07", details: "ฟีเจอร์ใหม่อยู่ระหว่างพิจารณา" },
        ],
      },
    ];
  };

  const formatDate = (date: string): string =>
    new Date(date).toLocaleDateString("th-TH");

  const handleViewNote = (complaint: Complaint): void => {
    const generateTimelineHtml = () =>
      complaint.statusHistory
        .map((history, index) => {
          const isCompleted = history.status === "เสร็จสิ้น";
          return `
            <div style="display: flex; align-items: flex-start; margin-bottom: 1rem;">
              <div style="width: 30px; height: 30px; border-radius: 50%; background-color: ${
                isCompleted ? "#66cc66" : "#ffcc66"
              }; color: white; display: flex; justify-content: center; align-items: center;">
                ${index + 1}
              </div>
              <div style="margin-left: 1rem; flex: 1;">
                <p style="margin: 0; font-weight: bold;">${history.status}</p>
                <p style="margin: 0; font-size: 0.9rem; color: gray;">${history.date}</p>
                ${
                  history.details
                    ? `<p style="margin: 0; font-size: 0.9rem; color: #555;">${history.details}</p>`
                    : ""
                }
              </div>
            </div>`;
        })
        .join("");
  
    Swal.fire({
      title: "หมายเหตุ",
      html: `
        <div style="text-align: left; max-height: 400px; overflow-y: auto;">
          ${generateTimelineHtml()}
          <hr style="margin: 1rem 0;" />
          <p><strong>สถานะปัจจุบัน:</strong> ${
            complaint.status !== "เสร็จสิ้น"
              ? `<span style="color: #ffcc66;">${complaint.status}</span>`
              : `<span style="color: #66cc66;">${complaint.status}</span>`
          }</p>
          <p><strong>วันที่:</strong> ${formatDate(complaint.date)}</p>
          <p><strong>หัวข้อร้องเรียน:</strong> ${complaint.subCategory}</p>
          <p><strong>รายละเอียด:</strong> ${complaint.details}</p>
        </div>
      `,
      showCancelButton: complaint.status === "ตรวจสอบ", // แสดงปุ่มยกเลิกเฉพาะสถานะตรวจสอบ
      confirmButtonText: complaint.status === "ตรวจสอบ" ? "ตรวจสอบ" : "ปิด",
      cancelButtonText: "ปิด",
      confirmButtonColor: "#3085d6",
    }).then((result) => {
      if (result.isConfirmed && complaint.status === "ตรวจสอบ") {
        handleReview(complaint); // เรียกใช้งานฟังก์ชันตรวจสอบหากสถานะเป็น "ตรวจสอบ"
      }
    });
  };  

  const handleReview = (complaint: Complaint): void => {
    Swal.fire({
      title: "ตรวจสอบปัญหา",
      html: `
        <div style="text-align: left;">
          <p><strong>หัวข้อร้องเรียน:</strong> ${complaint.subCategory}</p>
          <p><strong>รายละเอียด:</strong> ${complaint.details}</p>
          <div style="margin-top: 1rem;">
            <label>
              <input type="radio" name="review" value="complete" /> ปัญหาถูกแก้ไขอย่างสมบูรณ์
            </label>
            <label>
              <input type="radio" name="review" value="incomplete" /> ปัญหายังไม่ถูกแก้ไขอย่างสมบูรณ์
            </label>
          </div>
          <textarea id="additionalDetails" placeholder="กรุณาใส่รายละเอียดเพิ่มเติม" style="width: 100%; margin-top: 1rem; display: none;" rows="4"></textarea>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "บันทึก",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#3085d6",
      preConfirm: () => {
        const selectedOption = (document.querySelector('input[name="review"]:checked') as HTMLInputElement)?.value;

        if (!selectedOption) {
          Swal.showValidationMessage("กรุณาเลือกตัวเลือก");
          return null;
        }

        const additionalDetails = selectedOption === "incomplete"
          ? (document.getElementById("additionalDetails") as HTMLTextAreaElement)?.value
          : "";

        if (selectedOption === "incomplete" && !additionalDetails) {
          Swal.showValidationMessage("กรุณาใส่รายละเอียดเพิ่มเติม");
          return null;
        }

        return { selectedOption, additionalDetails };
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const newStatus = result.value?.selectedOption === "complete" 
          ? "เสร็จสิ้น" 
          : `กำลังดำเนินการครั้งที่ ${
              complaint.statusHistory.filter((h) => h.status.includes("กำลังดำเนินการ")).length + 1
            }`;

        const updatedComplaint = {
          ...complaint,
          status: newStatus === "เสร็จสิ้น" ? "เสร็จสิ้น" : "ตรวจสอบ",
          statusHistory: [
            ...complaint.statusHistory,
            {
              status: newStatus,
              date: new Date().toISOString().split("T")[0],
              details: result.value?.additionalDetails || "",
            },
          ],
        };

        console.log("Updated Complaint:", updatedComplaint);

        Swal.fire({
          title: "บันทึกสำเร็จ",
          icon: "success",
          confirmButtonText: "ปิด",
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#e8edff] flex flex-col items-center">
      <div className="w-full bg-gradient-to-b from-green-200 to-blue-200 h-32 rounded-b-lg shadow-md"></div>

      <div className="w-full max-w-[90%] -mt-10 z-10">
        <div className="bg-white shadow-lg rounded-xl">
          <Navbar />
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mt-6 max-w-[90%] w-full flex-grow mb-12">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border text-center">ลำดับ</th>
              <th className="px-4 py-2 border text-center">วันที่</th>
              <th className="px-4 py-2 border">หัวข้อร้องเรียน</th>
              <th className="px-4 py-2 border">รายละเอียด</th>
              <th className="px-4 py-2 border">สถานะ</th>
              <th className="px-4 py-2 border text-center">หมายเหตุ</th>
            </tr>
          </thead>
          <tbody>
            {complaints.length > 0 ? (
              complaints.map((complaint, index) => (
                <tr key={complaint.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border text-center">{index + 1}</td>
                  <td className="px-4 py-2 border text-center">{formatDate(complaint.date)}</td>
                  <td className="px-4 py-2 border">{complaint.subCategory}</td>
                  <td className="px-4 py-2 border">{complaint.details}</td>
                  <td className="px-4 py-2 border">{complaint.status}</td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      onClick={() => handleViewNote(complaint)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <VisibilityIcon />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-2 text-center">
                  กำลังโหลดข้อมูล...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <style jsx global>{`
        .swal2-popup {
          width: 700px !important; /* Extend modal width */
        }
      `}</style>
    </div>
  );
};

export default MainPage;
