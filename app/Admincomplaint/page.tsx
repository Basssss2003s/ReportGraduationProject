"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Navbar from "../adminnavbar/page";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useSession } from "../../utils/useSession";
import { useAuth } from "../../utils/auth";
import { useRouter } from "next/navigation";
import ApplicantTrackingAdmin from "../../navbar/BreadcrumpAdmin";
import { useGetAll } from "../../hooks/useGetAll";
import { useUpdateComplaint } from "../../hooks/useUpdateComplaint";

interface Complaint {
  id: number;
  createDate: string;
  topicOfComplaint: string;
  detailsOfTheTopic: string;
  problemDetail: string;
  status: string;
}

const ComplaintTable: React.FC = () => {
  const { session } = useSession();
  const { logout } = useAuth();
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const { data: getAll } = useGetAll();
  const { mutateAsync: mutateAsyncUpdate } = useUpdateComplaint();

  const formatDates = (dateString: string | undefined) => {
    if (!dateString) return '-';
    const d = new Date(dateString);
    return d.toLocaleDateString('th-TH');
  };
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '-';
    const d = new Date(dateString);
    return d.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // ฟังก์ชันแปลงวันที่สำหรับการค้นหา
  const formatSearchDate = (dateString: string): string => {
    if (!dateString) return '';
    const d = new Date(dateString);
    // แปลงเป็น yyyy-mm-dd สำหรับการเปรียบเทียบ
    return d.toISOString().split('T')[0];
  };

  useEffect(() => {
    if (session?.fullName) {
      setUserName(session.fullName);
    }
  }, [session]);

  const handleLogout = async () => {
    try {
      logout();
      router.push("/adminlogin");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("รหัสผ่านหรืออีเมลไม่ถูกต้อง");
    }
  };

  const [filters, setFilters] = useState({
    date: "",
    topicOfComplaint: "",
    detailsOfTheTopic: "",
    status: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // กำหนดตัวเลือกสำหรับ filter
  // const subCategoryOptions = {
  //   "นักศึกษา": ["การเรียนการสอน", "สิ่งอำนวยความสะดวก", "อาคารสถานที่", "อื่นๆ"],
  //   "อาจารย์": ["การเรียนการสอน", "สิ่งอำนวยความสะดวก", "อาคารสถานที่", "อื่นๆ"],
  //   "บุคคลภายนอก": ["การเรียนการสอน", "สิ่งอำนวยความสะดวก", "อาคารสถานที่", "อื่นๆ"]
  // };

  const filteredComplaints = getAll?.filter((complaint) => {
    // แปลงวันที่ทั้งสองให้อยู่ในรูปแบบเดียวกันก่อนเปรียบเทียบ
    const complaintDate = complaint.createDate ? formatSearchDate(complaint.createDate.toString()) : '';
    const searchDate = filters.date ? formatSearchDate(filters.date) : '';

    const dateMatch = !searchDate || complaintDate === searchDate;
    const topicMatch = !filters.topicOfComplaint || complaint.topicOfComplaint === filters.topicOfComplaint;
    const detailsMatch = filters.detailsOfTheTopic === "" || complaint.detailsOfTheTopic === filters.detailsOfTheTopic;
    const statusMatch = filters.status === "" || complaint.status === filters.status;

    return dateMatch && topicMatch && detailsMatch && statusMatch;
  }) || [];

  const paginatedComplaints = filteredComplaints.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage);



  const handleEdit = async (complaint: Complaint) => {
    const result = await Swal.fire({
      title: '<h2 style="font-size: 1.5rem; font-weight: bold;">แก้ไขข้อมูล</h2>',
      html: `
        <div style="text-align: left; font-size: 1rem; margin: 10px 20px;">
          <label for="swal-date" style="font-weight: bold;">วันที่:</label>
          <input type="text" id="swal-date" value="${formatDate(complaint.createDate)}" class="swal2-input" style="width: 90%; margin-top: 5px;" readonly>
        </div>
        <div style="text-align: left; font-size: 1rem; margin: 10px 20px;">
          <label for="swal-topic" style="font-weight: bold;">ประเภทผู้ร้องเรียน:</label>
          <input type="text" id="swal-topic" value="${complaint.topicOfComplaint}" class="swal2-input" style="width: 90%; margin-top: 5px;" readonly>
        </div>
        <div style="text-align: left; font-size: 1rem; margin: 10px 20px;">
          <label for="swal-details" style="font-weight: bold;">หัวข้อร้องเรียน:</label>
          <input type="text" id="swal-details" value="${complaint.detailsOfTheTopic}" class="swal2-input" style="width: 90%; margin-top: 5px;" readonly>
        </div>
        <div style="text-align: left; font-size: 1rem; margin: 10px 20px;">
          <label for="swal-problem" style="font-weight: bold;">รายละเอียด:</label>
          <textarea id="swal-problem" class="swal2-textarea" style="width: 90%; margin-top: 5px;" readonly>${complaint.problemDetail}</textarea>
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
      cancelButtonText: 'ยกเลิก',
      preConfirm: () => {
        const status = (document.getElementById('swal-status') as HTMLSelectElement).value;
        if (!status) {
          Swal.showValidationMessage('กรุณาเลือกสถานะ');
          return false;
        }
        return { status };
      },
    });

    if (result.isConfirmed) {
      try {
        await mutateAsyncUpdate({
          id: complaint.id,
          payload: {
            status: result.value.status,
            state: result.value.status, // ใช้สถานะใหม่
            firstName: session?.firstName || '',
            lastName: session?.lastName || '',
            fullName: session?.fullName || '',
            emailAddress: session?.emailAddress || ''
          }
        });
        
        await Swal.fire({
          icon: 'success',
          title: 'อัพเดทสถานะสำเร็จ',
          timer: 1500,
          showConfirmButton: false,
        });
        router.push("/adminmain"); // นำทางไปที่ "/adminmain"
      } catch (error) {
        console.error("Error updating complaint:", error);
        await Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'ไม่สามารถอัพเดทสถานะได้ กรุณาลองใหม่อีกครั้ง'
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#e8edff] flex flex-col items-center">
      <div className="w-full bg-gradient-to-b from-green-200 to-blue-200 h-32 rounded-b-lg shadow-md">
        <Link href="/adminmain" className="hover:underline">
          <img
            src="/images/logo.png"
            width={150}
            className="absolute top-2 left-2 z-20"
            alt="Logo"
          />
        </Link>
        <div className="text-right mr-[60px] mt-[40px] w-[95%]">
          <button onClick={handleLogout} className="inline-flex items-center">
            <span className="text-gray-800 font-medium">
              {userName}
              <AdminPanelSettingsIcon style={{ marginBottom: "8px", marginLeft: "5px" }} />
            </span>
          </button>
        </div>
      </div>

      <div className="w-full max-w-[90%] -mt-10 z-10">
        <div className="bg-white shadow-lg rounded-xl">
          <Navbar />
        </div>
      </div>

      <div className="rounded-lg mt-6 ml-8 w-[90%]">
        <ApplicantTrackingAdmin />
      </div>

      <div className="bg-white shadow-lg rounded-lg p-4 max-w-[90%] w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="date"
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
            className="border rounded p-2"
          />
          <select
            value={filters.topicOfComplaint}
            onChange={(e) => setFilters({ ...filters, topicOfComplaint: e.target.value })}
            className="border rounded p-2"
          >
            <option value="">ร้องเรียน/ร้องทุกข์จาก</option>
            <option value="นักศึกษา">นักศึกษา</option>
            <option value="อาจารย์">อาจารย์</option>
            <option value="บุคคลภายนอก">บุคคลภายนอก</option>
          </select>
          <select
            value={filters.detailsOfTheTopic}
            onChange={(e) => setFilters({ ...filters, detailsOfTheTopic: e.target.value })}
            className="border rounded p-2"
          >
            <option value="">หัวข้อร้องเรียนทั้งหมด</option>
            <option value="บุคลากร">บุคลากร</option>
            <option value="การเรียน/การสอน">การเรียน/การสอน</option>
            <option value="ผลการเรียน">ผลการเรียน</option>
            <option value="สิ่งอำนวยความสะดวก">สิ่งอำนวยความสะดวก</option>
            <option value="เรื่องอื่นๆ">เรื่องอื่นๆ</option>
          </select>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="border rounded p-2"
          >
            <option value="">สถานะทั้งหมด</option>
            <option value="รอดำเนินการ">รอดำเนินการ</option>
            <option value="กำลังดำเนินการ">กำลังดำเนินการ</option>
            <option value="เสร็จสิ้น">เสร็จสิ้น</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mt-2 max-w-[90%] w-full flex-grow mb-12">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border">ลำดับ</th>
              <th className="px-4 py-2 border">วันที่</th>
              <th className="px-4 py-2 border">ประเภทผู้ร้องเรียน</th>
              <th className="px-4 py-2 border">หัวข้อร้องเรียน</th>
              <th className="px-4 py-2 border">รายละเอียด</th>
              <th className="px-4 py-2 border">สถานะ</th>
              <th className="px-4 py-2 border">แก้ไข</th>
            </tr>
          </thead>
          <tbody>
            {paginatedComplaints.map((complaint:any) => (
              <tr key={complaint.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border text-center">{getAll?.filter((item) => item.id === complaint.id)[0]?.id}</td>
                <td className="px-4 py-2 border text-center">{formatDates(getAll?.filter((item) => item.id === complaint.id)[0]?.createDate?.toString())}</td>
                <td className="px-4 py-2 border">{getAll?.filter((item) => item.id === complaint.id)[0]?.topicOfComplaint}</td>
                <td className="px-4 py-2 border">{getAll?.filter((item) => item.id === complaint.id)[0]?.detailsOfTheTopic}</td>
                <td className="px-4 py-2 border">{getAll?.filter((item) => item.id === complaint.id)[0]?.problemDetail}</td>
                <td className="border text-center">
                  <span
                    style={{
                      backgroundColor:
                        getAll?.filter((item) => item.id === complaint.id)[0]?.status === 'รอดำเนินการ' ? '#FFA500' :
                          getAll?.filter((item) => item.id === complaint.id)[0]?.status === 'กำลังดำเนินการ' ? '#3190FF' :
                            getAll?.filter((item) => item.id === complaint.id)[0]?.status === 'รอตรวจสอบ' ? 'green' :
                              getAll?.filter((item) => item.id === complaint.id)[0]?.status === 'เสร็จสิ้น' ? 'green' :
                                '',
                      fontWeight: 'bold',
                      padding: '2px 12px',
                      display: 'inline-block',
                      borderRadius: '9999px',
                    }}
                    className="text-white ">
                    {getAll?.filter((item) => item.id === complaint.id)[0]?.status}
                  </span>
                </td>
                <td className="px-4 py-2 border text-center">
                  <button
                    onClick={() => handleEdit(complaint)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <EditIcon />
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
          width: 700px !important;
        }
      `}</style>
    </div>
  );
};

export default ComplaintTable;