"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../navbar/page";
import { useSession } from "../../utils/useSession";
import { useAuth } from "../../utils/auth";
import { useRouter } from "next/navigation";
import ApplicantTracking from "../../navbar/Breadcrump";
import PersonIcon from "@mui/icons-material/Person";
import { useGetComplaintByEmailAddress } from "../../hooks/useGetComplaintByEmailAddress";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Complaint } from "../../types/complaintCreate";
import Link from "next/link";
import useEncryptData from "../../hooks/Encryption/Encryption";

const MainPage: React.FC = () => {
  const { session } = useSession();
  const { logout } = useAuth();
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const { data: responseData } = useGetComplaintByEmailAddress(session?.emailAddress) as { data?: Complaint[] };
  const { mutate: encrypting } = useEncryptData();
  const [filterDate, setFilterDate] = useState<string>("");
  const [filterTopic, setFilterTopic] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
      alert("เกิดข้อผิดพลาดในการออกจากระบบ กรุณาลองใหม่อีกครั้ง");
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "-";
    const d = new Date(dateString);
    return d.toLocaleDateString("th-TH");
  };

  const handleViewComplaint = (params: any) => {
    encrypting(params.id, {
      onSuccess: (encryptedId: any) => {
        router.push(`/followreport/followreportdetail?id=${encryptedId}`);
      },
      onError: (error: any) => {
        console.error("Error encrypting ID:", error);
      },
    });
  };

  const filteredData = responseData?.filter((complaint) => {
    const complaintDate = formatDate(complaint.createDate?.toString());
    const matchesDate = filterDate ? complaintDate.includes(filterDate) : true;
    const matchesTopic = filterTopic ? complaint.detailsOfTheTopic?.toLowerCase().includes(filterTopic.toLowerCase()) : true;
    return matchesDate && matchesTopic;
  }) || [];

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen bg-[#e8edff] flex flex-col items-center">
      <div className="w-full bg-gradient-to-b from-green-200 to-blue-200 h-32 rounded-b-lg shadow-md">
        <Link href="/main" className="hover:underline">
          <img src="/images/logo.png" width={150} className="absolute top-2 left-2 z-20" alt="Logo" />
        </Link>
        <div className="text-right mr-[60px] mt-[40px] w-[95%]">
          <button onClick={handleLogout} className="inline-flex items-center">
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

      <div className="bg-white shadow-lg rounded-lg p-4 mt-4 max-w-[90%] w-full">
        <div className="flex flex-wrap gap-4">
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="border rounded-lg p-2"
            placeholder="กรองตามวันที่"
          />
          <input
            type="text"
            value={filterTopic}
            onChange={(e) => setFilterTopic(e.target.value)}
            className="border rounded-lg p-2"
            placeholder="กรองตามหัวข้อร้องเรียน"
          />
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
              <th className="px-4 py-2 border">สถานะ</th>
              <th className="px-4 py-2 border text-center">หมายเหตุ</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((complaint, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border text-center">{complaint.id}</td>
                  <td className="px-4 py-2 border text-center">
                    {formatDate(complaint.createDate?.toString())}
                  </td>
                  <td className="px-4 py-2 border text-center">{complaint.detailsOfTheTopic || "-"}</td>
                  <td className="px-4 py-2 border">{complaint.problemDetail || "-"}</td>
                  <td className="px-4 py-2 border text-center">{complaint.status || "-"}</td>
                  <td className="px-4 py-2 border text-center">
                    <button className="text-blue-500 hover:text-blue-700" onClick={() => handleViewComplaint({ id: complaint.id })}>
                      <RemoveRedEyeIcon />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-2 border text-center">ไม่พบข้อมูลการร้องเรียน</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4 w-full px-6">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            ก่อนหน้า
          </button>

          <span className="text-gray-700 font-medium">
            หน้า {currentPage} จาก {totalPages}
          </span>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
          >
            ถัดไป
          </button>
        </div>

      </div>
    </div>
  );
};

export default MainPage;
