"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import Navbar from "../adminnavbar/page";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Complaint {
  id: number;
  date: string;
  from: string;
  subCategory: string;
  details: string;
  status: string;
  firstName: string;
  lastName: string;
  phone: string;
}

const ComplaintTable: React.FC = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([
    { id: 1, date: "2025-01-01", from: "นักศึกษา", subCategory: "ระบบอินเทอร์เน็ต", details: "อินเทอร์เน็ตช้าในห้องเรียน A101", status: "รอดำเนินการ", firstName: "สมชาย", lastName: "ใจดี", phone: "0812345678" },
  { id: 2, date: "2025-01-02", from: "อาจารย์", subCategory: "อุปกรณ์ในห้องเรียน", details: "โปรเจคเตอร์ไม่ทำงาน", status: "กำลังดำเนินการ", firstName: "วิชาญ", lastName: "นามสมมติ", phone: "0898765432" },
  { id: 3, date: "2025-01-03", from: "บุคคลภายนอก", subCategory: "พื้นที่ส่วนกลาง", details: "ห้องน้ำสกปรก", status: "รอดำเนินการ", firstName: "สายไหม", lastName: "ดีพร้อม", phone: "0998887776" },
  { id: 4, date: "2025-01-04", from: "นักศึกษา", subCategory: "พื้นที่ส่วนกลาง", details: "ไม่มีที่นั่งในห้องสมุด", status: "เสร็จสิ้น", firstName: "อรพรรณ", lastName: "ใจงาม", phone: "0867654321" },
  { id: 5, date: "2025-01-05", from: "อาจารย์", subCategory: "ระบบอินเทอร์เน็ต", details: "Wi-Fi ในห้องพักอาจารย์หลุดบ่อย", status: "รอดำเนินการ", firstName: "ก้องภพ", lastName: "แสงทอง", phone: "0823456789" },
  { id: 6, date: "2025-01-06", from: "บุคคลภายนอก", subCategory: "เจ้าหน้าที่", details: "พนักงานพูดจาไม่สุภาพ", status: "รอดำเนินการ", firstName: "จิราภรณ์", lastName: "พงษ์พิพัฒน์", phone: "0955551234" },
  { id: 7, date: "2025-01-07", from: "นักศึกษา", subCategory: "อุปกรณ์ในห้องเรียน", details: "เก้าอี้เสีย", status: "รอดำเนินการ", firstName: "มนัส", lastName: "รุ่งเรือง", phone: "0834567890" },
  { id: 8, date: "2025-01-08", from: "อาจารย์", subCategory: "ที่จอดรถ", details: "ที่จอดรถไม่เพียงพอ", status: "รอดำเนินการ", firstName: "ประภาส", lastName: "อินทร์ทอง", phone: "0845678901" },
  { id: 9, date: "2025-01-09", from: "บุคคลภายนอก", subCategory: "ห้องเรียน", details: "ห้องเรียนไม่สะอาด", status: "กำลังดำเนินการ", firstName: "สุนีย์", lastName: "ดวงแก้ว", phone: "0866781234" },
  { id: 10, date: "2025-01-10", from: "นักศึกษา", subCategory: "ระบบอินเทอร์เน็ต", details: "Wi-Fi ไม่ครอบคลุม", status: "รอดำเนินการ", firstName: "วิไล", lastName: "รัตนวดี", phone: "0878904321" },
  ]);

  const [filters, setFilters] = useState({
    date: "",
    from: "",
    subCategory: "",
    status: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const subCategoryOptions: { [key: string]: string[] } = {
    อาจารย์: [
      "ห้องพักอาจารย์",
      "อุปกรณ์ในห้องเรียน",
      "ระบบอินเทอร์เน็ต",
      "พื้นที่ส่วนกลาง",
      "เจ้าหน้าที่",
      "ที่จอดรถ",
      "เรื่องอื่นๆ",
    ],
    นักศึกษา: [
      "ห้องพักอาจารย์",
      "อุปกรณ์ในห้องเรียน",
      "ระบบอินเทอร์เน็ต",
      "พื้นที่ส่วนกลาง",
      "เจ้าหน้าที่",
      "ที่จอดรถ",
      "เรื่องอื่นๆ",
    ],
    บุคคลภายนอก: [
      "ห้องเรียน",
      "อุปกรณ์ในห้องเรียน",
      "ระบบอินเทอร์เน็ต",
      "พื้นที่ส่วนกลาง",
      "บุคลากร",
      "เจ้าหน้าที่",
      "เรื่องอื่นๆ",
    ],
  };

  const filteredComplaints = complaints.filter((complaint) => {
    return (
      (filters.date === "" || complaint.date.includes(filters.date)) &&
      (filters.from === "" || complaint.from.includes(filters.from)) &&
      (filters.subCategory === "" || complaint.subCategory.includes(filters.subCategory)) &&
      (filters.status === "" || complaint.status.includes(filters.status))
    );
  });

  const paginatedComplaints = filteredComplaints.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage);

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "ข้อมูลนี้จะถูกลบอย่างถาวร!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "ลบ",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        setComplaints(complaints.filter((complaint) => complaint.id !== id));
        Swal.fire("ลบสำเร็จ!", "ข้อมูลได้ถูกลบเรียบร้อยแล้ว", "success");
      }
    });
  };

  const statusColor = (status: string) => {
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

  const handleEdit = (complaint: Complaint) => {
    Swal.fire({
      title: '<h2 style="font-size: 1.5rem; font-weight: bold;">แก้ไขข้อมูล</h2>',
      html: `
        <div style="text-align: left; font-size: 1rem; margin: 10px 20px;">
          <label for="swal-date" style="font-weight: bold;">วันที่:</label>
          <input type="text" id="swal-date" value="${complaint.date}" class="swal2-input" style="width: 90%; margin-top: 5px;" readonly>
        </div>
        <div style="text-align: left; font-size: 1rem; margin: 10px 20px;">
          <label for="swal-from" style="font-weight: bold;">ร้องเรียนจาก:</label>
          <input type="text" id="swal-from" value="${complaint.from}" class="swal2-input" style="width: 90%; margin-top: 5px;" readonly>
        </div>
        <div style="text-align: left; font-size: 1rem; margin: 10px 20px;">
          <label for="swal-subCategory" style="font-weight: bold;">หัวข้อร้องเรียน:</label>
          <input type="text" id="swal-subCategory" value="${complaint.subCategory}" class="swal2-input" style="width: 90%; margin-top: 5px;" readonly>
        </div>
        <div style="text-align: left; font-size: 1rem; margin: 10px 20px;">
          <label for="swal-details" style="font-weight: bold;">รายละเอียด:</label>
          <textarea id="swal-details" class="swal2-textarea" style="width: 90%; margin-top: 5px;" readonly>${complaint.details}</textarea>
        </div>
        <div style="text-align: left; font-size: 1rem; margin: 10px 20px;">
          <label style="font-weight: bold;">ชื่อผู้ร้องเรียน:</label>
          <input type="text" id="swal-fullName" value="${complaint.firstName} ${complaint.lastName}" class="swal2-input" style="width: 90%; margin-top: 5px;" readonly>
        </div>
        <div style="text-align: left; font-size: 1rem; margin: 10px 20px;">
          <label for="swal-phone" style="font-weight: bold;">เบอร์โทร:</label>
          <input type="text" id="swal-phone" value="${complaint.phone}" class="swal2-input" style="width: 90%; margin-top: 5px;" readonly>
        </div>
        <div style="text-align: left; font-size: 1rem; margin: 10px 20px;">
          <label for="swal-status" style="font-weight: bold;">สถานะ:</label>
          <select id="swal-status" class="swal2-input" style="width: 90%; margin-top: 5px;">
            <option value="รอดำเนินการ" ${complaint.status === "รอดำเนินการ" ? "selected" : ""}>รอดำเนินการ</option>
            <option value="กำลังดำเนินการ" ${complaint.status === "กำลังดำเนินการ" ? "selected" : ""}>กำลังดำเนินการ</option>
            <option value="เสร็จสิ้น" ${complaint.status === "เสร็จสิ้น" ? "selected" : ""}>เสร็จสิ้น</option>
          </select>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: 'บันทึก',
      preConfirm: () => {
        const status = (document.getElementById('swal-status') as HTMLSelectElement).value;
  
        if (!status) {
          Swal.showValidationMessage('กรุณาเลือกสถานะ');
          return;
        }
  
        return { status };
      },
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const { status } = result.value;
        setComplaints((prev) =>
          prev.map((comp) =>
            comp.id === complaint.id ? { ...complaint, status } : comp
          )
        );
        Swal.fire('บันทึกสำเร็จ!', 'ข้อมูลได้ถูกแก้ไขเรียบร้อยแล้ว', 'success');
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

      <div className="bg-white shadow-lg rounded-lg p-4 mt-6 max-w-[90%] w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="date"
            placeholder="วันที่"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            className="border rounded p-2"
          />
          <select
            value={filters.from}
            onChange={(e) => setFilters({ ...filters, from: e.target.value, subCategory: "" })}
            className="border rounded p-2"
          >
            <option value="">ทั้งหมด</option>
            <option value="อาจารย์">อาจารย์</option>
            <option value="นักศึกษา">นักศึกษา</option>
            <option value="บุคคลภายนอก">บุคคลภายนอก</option>
          </select>
          <select
            value={filters.subCategory}
            onChange={(e) => setFilters({ ...filters, subCategory: e.target.value })}
            className="border rounded p-2"
            disabled={!filters.from}
          >
            <option value="">หัวข้อร้องเรียน</option>
            {filters.from &&
              subCategoryOptions[filters.from].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
          </select>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="border rounded p-2"
          >
            <option value="">ทั้งหมด</option>
            <option value="รอดำเนินการ">รอดำเนินการ</option>
            <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
            <option value="เสร็จสิ้น">เสร็จสิ้น</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mt-6 max-w-[90%] w-full flex-grow mb-12">
      <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border">ลำดับ</th>
              <th className="px-4 py-2 border">วันที่</th>
              <th className="px-4 py-2 border">ร้องเรียนจาก</th>
              <th className="px-4 py-2 border">หัวข้อร้องเรียน</th>
              <th className="px-4 py-2 border">รายละเอียด</th>
              <th className="px-4 py-2 border">สถานะ</th>
              <th className="px-4 py-2 border">แก้ไข</th>
              <th className="px-4 py-2 border">ลบ</th>
            </tr>
          </thead>
          <tbody>
            {paginatedComplaints.map((complaint, index) => (
              <tr key={complaint.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="px-4 py-2 border">{complaint.date}</td>
                <td className="px-4 py-2 border">{complaint.from}</td>
                <td className="px-4 py-2 border">{complaint.subCategory}</td>
                <td className="px-4 py-2 border">{complaint.details}</td>
                <td className={`px-4 py-2 border ${statusColor(complaint.status)}`}>{complaint.status}</td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => handleEdit(complaint)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <EditIcon />
                  </button>
                </td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => handleDelete(complaint.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <DeleteIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            ก่อนหน้า
          </button>
          <span>
            หน้า {currentPage} จาก {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="bg-gray-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            ถัดไป
          </button>
        </div>
      </div>

      <style jsx global>{`
        .swal2-popup {
          width: 700px !important; /* Extend modal width */
        }
      `}</style>
    </div>
  );
};

export default ComplaintTable;

