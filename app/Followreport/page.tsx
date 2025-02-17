"use client";
import React, {useEffect, useState } from "react";
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

const MainPage: React.FC = () => {
  const { session } = useSession();
  const { logout } = useAuth();
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const { data: responseData } = useGetComplaintByEmailAddress(session?.emailAddress) as { data?: Complaint[] };
  const { mutate: encrypting } = useEncryptData();
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
            {responseData && responseData.length > 0 ? (
              responseData.map((complaint, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border text-center">{complaint.id}</td>
                  <td className="px-4 py-2 border text-center">
                    {formatDate(complaint.createDate?.toString())}
                  </td>
                  <td className="px-4 py-2 border text-center">{complaint.detailsOfTheTopic || '-'}</td>
                  <td className="px-4 py-2 border">{complaint.problemDetail || '-'}</td>
                  <td
                    style={{
                      backgroundColor:
                        complaint.status === 'รอดำเนินการ' ? '#FFA500' :
                          complaint.status === 'เสร็จสิ้น' ? 'green' :
                            complaint.status === 'ไม่สามารถดำเนินการได้' ? 'red' :
                              '', // หากไม่มี status ที่ตรงกับที่กำหนดจะไม่ใส่สีพื้นหลัง
                      fontWeight: 'bold',
                    }}
                    className="text-white px-3 py-0.5 rounded-full ml-2 text-center w-32 border">
                    {complaint.status || '-'}
                  </td>
                  <td className="px-4 py-2 border text-center">
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
        </table>
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