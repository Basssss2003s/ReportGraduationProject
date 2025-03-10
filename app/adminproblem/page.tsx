"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "../../utils/useSession";
import { useAuth } from "../../utils/auth";
import { useGetComplaintByEmailAddress } from "../../hooks/useGetComplaintByEmailAddress";
import { Complaint } from "../../types/complaintCreate";
import PersonIcon from '@mui/icons-material/Person';
import Navbar from "../adminnavbar/page";
import ApplicantTracking from "../../navbar/Breadcrump";
import SearchIcon from '@mui/icons-material/Search';
import ApplicantTrackingAdmin from "../../navbar/BreadcrumpAdmin";

const MainPage = () => {
  const { session } = useSession();
  const { logout } = useAuth();
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const { data: responseData } = useGetComplaintByEmailAddress(session?.emailAddress) as { data?: Complaint[] };
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
  const [filters, setFilters] = useState({
    date: "",
    topicOfComplaint: "",
    detailsOfTheTopic: "",
    problemDetail: "",
    status: "",
  });

  useEffect(() => {
    console.log(session); // ดูค่า session ที่ได้มา
    if (session === null) {
      router.push('/adminlogin');
    }
  }, [session]);
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
        <ApplicantTrackingAdmin />
      </div>
      <div className="bg-white shadow-lg rounded-lg p-4 max-w-[90%] w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4"></div>
        <div className="relative">
          <input
            type="text"
            value={filters.problemDetail}
            onChange={(e) => setFilters({ ...filters, problemDetail: e.target.value })}
            className="border rounded p-2 pl-10 w-full focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
            placeholder="ค้นหารายละเอียดปัญหา..."
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mt-2 max-w-[90%] w-full flex-grow mb-12">

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
