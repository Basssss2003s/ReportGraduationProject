"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import Navbar from "../Adminnavbar/page";

interface Complaint {
  id: number;
  date: string;
  from: string;
  subCategory: string;
  details: string;
  status: string;
}

interface Filters {
  from: string;
  subCategory: string;
  startDate: string;
  endDate: string;
  status: string;
}

const ComplaintTable: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([
    {
      id: 1,
      date: "2025-01-01",
      from: "นักศึกษา",
      subCategory: "ร้องเรียนระบบอินเทอร์เน็ต",
      details: "อินเทอร์เน็ตช้าในห้องเรียน A101",
      status: "รอดำเนินการ",
    },
    {
      id: 2,
      date: "2025-01-05",
      from: "บุคคลภายนอก",
      subCategory: "ร้องเรียนนักศึกษา",
      details: "นักศึกษาส่งเสียงดังในหอพัก",
      status: "กำลังดำเนินการ",
    },
  ]);

  const [filters, setFilters] = useState<Filters>({
    from: "",
    subCategory: "",
    startDate: "",
    endDate: "",
    status: "",
  });

  const categories: Record<string, string[]> = {
    อาจารย์: [
      "ร้องเรียนห้องพักอาจารย์",
      "ร้องเรียนอุปกรณ์ในห้องเรียน",
      "ร้องเรียนระบบอินเทอร์เน็ต",
      "ร้องเรียนพื้นที่ส่วนกลาง",
      "ร้องเรียนเจ้าหน้าที่",
      "ร้องเรียนที่จอดรถ",
      "เรื่องอื่นๆ",
    ],
    นักศึกษา: [
      "ร้องเรียนห้องเรียน",
      "ร้องเรียนอุปกรณ์ในห้องเรียน",
      "ร้องเรียนระบบอินเทอร์เน็ต",
      "ร้องเรียนพื้นที่ส่วนกลาง",
      "ร้องเรียนบุคลากร",
      "ร้องเรียนเจ้าหน้าที่",
      "เรื่องอื่นๆ",
    ],
    บุคคลภายนอก: [
      "ร้องเรียนนักศึกษา",
      "ร้องเรียนบุคลากร",
      "ร้องเรียนเจ้าหน้าที่",
      "ร้องเรียนที่จอดรถ",
      "เรื่องอื่นๆ",
    ],
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "ข้อมูลนี้จะถูกลบอย่างถาวร!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
    }).then((result) => {
      if (result.isConfirmed) {
        setComplaints(complaints.filter((complaint) => complaint.id !== id));
        Swal.fire("ลบสำเร็จ!", "ข้อมูลได้ถูกลบเรียบร้อยแล้ว", "success");
      }
    });
  };

  const handleStatusChange = (id: number) => {
    Swal.fire({
      title: "เปลี่ยนสถานะ",
      input: "select",
      inputOptions: {
        "รอดำเนินการ": "รอดำเนินการ",
        "กำลังดำเนินการ": "กำลังดำเนินการ",
        "เสร็จสิ้น": "เสร็จสิ้น",
      },
      inputPlaceholder: "เลือกสถานะใหม่",
      showCancelButton: true,
      confirmButtonText: "เปลี่ยนสถานะ",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const updatedComplaints = complaints.map((complaint) =>
          complaint.id === id ? { ...complaint, status: result.value } : complaint
        );
        setComplaints(updatedComplaints);
        Swal.fire(
          "เปลี่ยนสถานะสำเร็จ!",
          `สถานะถูกเปลี่ยนเป็น "${result.value}"`,
          "success"
        );
      }
    });
  };

  const formatDate = (date: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    return new Date(date).toLocaleDateString("th-TH", options);
  };

  const getStatusStyle = (status: string): string => {
    switch (status) {
      case "รอดำเนินการ":
        return "text-red-500 font-bold";
      case "กำลังดำเนินการ":
        return "text-orange-500 font-bold";
      case "เสร็จสิ้น":
        return "text-green-500 font-bold";
      default:
        return "";
    }
  };

  const handleFilter = (): Complaint[] => {
    return complaints.filter((complaint) => {
      const { from, subCategory, startDate, endDate, status } = filters;
      const complaintDate = new Date(complaint.date);

      const isWithinDateRange =
        (!startDate || new Date(startDate) <= complaintDate) &&
        (!endDate || new Date(endDate) >= complaintDate);
      const matchesFrom = !from || complaint.from.includes(from);
      const matchesSubCategory = !subCategory || complaint.subCategory.includes(subCategory);
      const matchesStatus = !status || complaint.status === status;

      return isWithinDateRange && matchesFrom && matchesSubCategory && matchesStatus;
    });
  };

  return (
    <div>
      <Navbar />

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">ข้อมูลคำร้องเรียน</h1>

        {/* Filters */}
        <div className="flex flex-wrap items-end gap-4 mb-6">
          {/* Filter inputs */}
        </div>

        {/* Table */}
        <table className="min-w-full bg-white border rounded shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left p-4 border">ลำดับ</th>
              <th className="text-left p-4 border">วันที่</th>
              <th className="text-left p-4 border">ร้องเรียนจาก</th>
              <th className="text-left p-4 border">รายละเอียดหัวข้อร้องเรียน</th>
              <th className="text-left p-4 border">รายละเอียดปัญหา</th>
              <th className="text-left p-4 border">สถานะ</th>
              <th className="text-center p-4 border">แก้ไข</th>
              <th className="text-center p-4 border">ลบ</th>
            </tr>
          </thead>
          <tbody>
            {handleFilter().map((complaint, index) => (
              <tr key={complaint.id} className="hover:bg-gray-100">
                <td className="p-4 border">{index + 1}</td>
                <td className="p-4 border">{formatDate(complaint.date)}</td>
                <td className="p-4 border">{complaint.from}</td>
                <td className="p-4 border">{complaint.subCategory}</td>
                <td className="p-4 border">{complaint.details}</td>
                <td className={`p-4 border ${getStatusStyle(complaint.status)}`}>
                  {complaint.status}
                </td>
                <td className="p-4 border text-center">
                  <button
                    onClick={() => handleStatusChange(complaint.id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    แก้ไข
                  </button>
                </td>
                <td className="p-4 border text-center">
                  <button
                    onClick={() => handleDelete(complaint.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
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
  );
};

export default ComplaintTable;
