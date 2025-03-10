"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../navbar/page";
import { useSession } from '../../utils/useSession';
import { useAuth } from "../../utils/auth";
import { useRouter } from "next/navigation";
import ApplicantTracking from "../../navbar/Breadcrump";
import PersonIcon from '@mui/icons-material/Person';
import Link from "next/link";
import { useGetAll } from "../../hooks/useGetAll";
import { Complaint } from "../../types/complaintCreate";
import { useGetComplaintByEmailAddress } from "../../hooks/useGetComplaintByEmailAddress";


const MainPage = () => {
  const { session } = useSession();
  const { logout } = useAuth();
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const { data: getAll } = useGetAll();
  const { data: responseData } = useGetComplaintByEmailAddress(session?.emailAddress) as { data?: Complaint[] };
  const userComplaintsCount = responseData?.length || 0; // นับจำนวนคำร้องทั้งหมดของ user ปัจจุบัน

  useEffect(() => {
    console.log(session); // ดูค่า session ที่ได้มา
    if (session === null) {
      router.push('/login');
    }
  }, [session]);
  
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


  return (
    <div className="min-h-screen bg-[#e8edff] flex flex-col items-center">
      {/* Gradient Header */}
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

      {/* Navbar */}
      <div className="w-full max-w-[90%] -mt-10 z-10">
        <div className="bg-white shadow-lg rounded-xl">
          <Navbar />
        </div>
      </div>
      <div className="rounded-lg mt-6 ml-8 w-[90%]">
        <ApplicantTracking />
      </div>
      {/* Main Content */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-2 max-w-[90%] w-full flex-grow mb-12">
        <h1 className="text-2xl font-bold text-center text-blue-600">ระบบจัดการการร้องเรียน/ร้องทุกข์</h1>
        <p className="mt-4 text-center text-gray-600">
          ยินดีต้อนรับเข้าสู่ระบบรับเรื่องร้องเรียน/ร้องทุกข์คณะบริหารธุรกิจ
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {/* Card: All Reports */}
          <div className="bg-blue-100 rounded-lg p-6 shadow-md text-center transform transition-transform hover:scale-105">
            <h2 className="text-xl font-semibold text-blue-800">การรายงานทั้งหมด</h2>
            <p className="mt-4 text-3xl font-bold text-blue-800">{getAll?.length}</p>
          </div>

          {/* Card: Pending Reports */}
          <div className="bg-orange-100 rounded-lg p-6 shadow-md text-center transform transition-transform hover:scale-105">
            <h2 className="text-xl font-semibold text-orange-800">รอดำเนินการ</h2>
            <p className="mt-4 text-3xl font-bold text-orange-800">
              {getAll?.filter(item => item.status === 'รอดำเนินการ').length}
            </p>
          </div>

          {/* Card: In Progress */}
          <div className="bg-yellow-100 rounded-lg p-6 shadow-md text-center transform transition-transform hover:scale-105">
            <h2 className="text-xl font-semibold text-yellow-800">กำลังดำเนินการ</h2>
            <p className="mt-4 text-3xl font-bold text-yellow-800">
              {getAll?.filter(item => item.status === 'กำลังดำเนินการ').length}
            </p>
          </div>

           {/* Card: Resolved Reports */}
           <div className="bg-teal-100 rounded-lg p-6 shadow-md text-center transform transition-transform hover:scale-105">
            <h2 className="text-xl font-semibold text-teal-800">คำร้องที่รอตรวจสอบ</h2>
            <p className="mt-4 text-3xl font-bold text-teal-800">
              {getAll?.filter(item => item.status === 'รอตรวจสอบ').length}
            </p>
          </div>

          {/* Card: Resolved Reports */}
          <div className="bg-green-100 rounded-lg p-6 shadow-md text-center transform transition-transform hover:scale-105">
            <h2 className="text-xl font-semibold text-green-800">เสร็จสิ้น</h2>
            <p className="mt-4 text-3xl font-bold text-green-800">
              {getAll?.filter(item => item.status === 'เสร็จสิ้น').length}
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card: Your Reports */}
          <div className="bg-purple-100 rounded-lg p-6 shadow-md text-center transform transition-transform hover:scale-105">
            <h2 className="text-xl font-semibold text-purple-800">คำร้องของคุณ</h2>
            <p className="mt-4 text-3xl font-bold text-purple-800">
              {userComplaintsCount}
            </p>
            <button
              onClick={() => (router.push('/followreport'))}
              className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              ดูรายละเอียด
            </button>
          </div>

          {/* Card: Resolved Reports */}
          <div className="bg-teal-100 rounded-lg p-6 shadow-md text-center transform transition-transform hover:scale-105">
            <h2 className="text-xl font-semibold text-teal-800">คำร้องที่รอตรวจสอบของคุณ</h2>
            <p className="mt-4 text-3xl font-bold text-teal-800">
              {responseData?.filter(item => item.status === 'รอตรวจสอบ').length || 0}
            </p>
            <button
              onClick={() => (router.push('/followreport'))}
              className="mt-4 px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              ดูรายละเอียด
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
