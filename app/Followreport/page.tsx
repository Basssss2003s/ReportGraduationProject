"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../navbar/page";
import { useSession } from "../../utils/useSession";
import { useAuth } from "../../utils/auth";
import { useRouter } from "next/navigation";
import ApplicantTracking from "../../navbar/Breadcrump";
import PersonIcon from '@mui/icons-material/Person';
import { useGetComplaintByEmailAddress } from "../../hooks/useGetComplaintByEmailAddress";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Complaint } from "../../types/complaintCreate";
import Link from "next/link";
import useEncryptData from "../../hooks/Encryption/Encryption";
import SearchIcon from '@mui/icons-material/Search';
const MainPage: React.FC = () => {
  const { session } = useSession();
  const { logout } = useAuth();
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const { data: responseData } = useGetComplaintByEmailAddress(session?.emailAddress) as { data?: Complaint[] };
  const { mutate: encrypting } = useEncryptData();
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
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("รหัสผ่านหรืออีเมลไม่ถูกต้อง");
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '-';
    const d = new Date(dateString);
    return d.toLocaleDateString('th-TH');
  };
  const handleViewComplaint = (params: any) => {
    encrypting(params.id, {
      onSuccess: (encryptedId: any) => {
        router.push(`/followreport/followreportdetail?id=${encryptedId}`);
      },
      onError: (error: any) => {
        console.error("Error encrypting ID:", error);
      }
    });
  };
  const [filters, setFilters] = useState({
    date: "",
    topicOfComplaint: "",
    detailsOfTheTopic: "",
    problemDetail: "",
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

  const filteredComplaints = responseData?.filter((complaint) => {
    // แปลงวันที่ทั้งสองให้อยู่ในรูปแบบเดียวกันก่อนเปรียบเทียบ
    const complaintDate = complaint.createDate ? formatSearchDate(complaint.createDate.toString()) : '';
    const searchDate = filters.date ? formatSearchDate(filters.date) : '';

    const dateMatch = !searchDate || complaintDate === searchDate;
    const topicMatch = !filters.topicOfComplaint || complaint.topicOfComplaint === filters.topicOfComplaint;
    const detailsMatch = filters.detailsOfTheTopic === "" || complaint.detailsOfTheTopic === filters.detailsOfTheTopic;
    const statusMatch = filters.status === "" || complaint.status === filters.status;
    const problemDetailMatch = !filters.problemDetail || complaint.problemDetail?.toLowerCase().includes(filters.problemDetail.toLowerCase());

    return dateMatch && topicMatch && detailsMatch && statusMatch && problemDetailMatch;
  }) || [];

  const paginatedComplaints = filteredComplaints.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage);


  return (
    <div className="min-h-screen bg-[#e8edff] flex flex-col items-center">
      <div className="w-full bg-gradient-to-b from-green-200 to-blue-200 h-32 rounded-b-lg shadow-md">
        <Link href="/main" className="hover:underline">
          <img
            src="/images/logo.png"
            width={150}
            className="absolute top-2 left-2 z-20"
            alt="Logo"
          />
        </Link>
        <div className="text-right mr-[60px] mt-[40px] w-[95%]">
          <button
            onClick={handleLogout}
            className="inline-flex items-center"
          >
            <span className="text-gray-800 font-medium">
              {userName}
              <PersonIcon style={{ marginBottom: "8px", marginLeft: "5px" }} />
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
        <ApplicantTracking />
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
          <div className="relative flex items-center">
            <SearchIcon className="absolute left-3 text-gray-500" />
            <input
              type="text"
              value={filters.problemDetail}
              onChange={(e) => setFilters({ ...filters, problemDetail: e.target.value })}
              className="border rounded p-2 pl-10" // เพิ่ม padding ซ้ายให้ไอคอนไม่ทับข้อความ
              placeholder="ค้นหารายละเอียด..."
            />
          </div>
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 mt-2 max-w-[90%] w-full flex-grow mb-12">
        <table className="min-w-full table-auto">
          <thead>

            <tr>
              <th className="px-4 py-2 border text-center">ลำดับ</th>
              <th className="px-4 py-2 border text-center">วันที่</th>
              <th className="px-4 py-2 border">หัวข้อร้องเรียน</th>
              <th className="px-4 py-2 border">รายละเอียด</th>
              <th className="px-4 py-2 border w-40">สถานะ</th>
              <th className="px-4 py-2 border text-center">หมายเหตุ</th>
            </tr>
          </thead>
          {paginatedComplaints.map(() => (
            <tbody>
              {responseData && responseData.length > 0 ? (
                responseData.map((complaint, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border text-center">{index + 1}</td>
                    <td className="px-4 py-2 border text-center">
                      {formatDate(complaint.createDate?.toString())}
                    </td>
                    <td className="px-4 py-2 border text-center">{complaint.detailsOfTheTopic || '-'}</td>
                    <td className="px-4 py-2 border">{complaint.problemDetail || '-'}</td>
                    <td className="border text-center">
                      <span
                        style={{
                          backgroundColor:
                            complaint.status === 'รอดำเนินการ' ? '#FFA500' :
                              complaint.status === 'กำลังดำเนินการ' ? '#FFA500' :
                                complaint.status === 'รอตรวจสอบ' ? 'green' :
                                  complaint.status === 'เสร็จสิ้น' ? 'green' :
                                    '',
                          fontWeight: 'bold',
                          padding: '2px 12px',
                          display: 'inline-block',
                          borderRadius: '9999px',
                        }}
                        className="text-white ">
                        {complaint.status || '-'}
                      </span>
                    </td>
                    <td className="px-4 py-2 border text-center ">
                      <button className="text-blue-500 hover:text-blue-700" onClick={() => handleViewComplaint({ id: complaint.id })}>
                        <RemoveRedEyeIcon />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-4 py-2 border text-center">
                    ไม่พบข้อมูลการร้องเรียน
                  </td>
                </tr>
              )}
            </tbody>
          ))}
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

export default MainPage;