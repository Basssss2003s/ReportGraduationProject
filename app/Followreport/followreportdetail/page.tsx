"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PersonIcon from '@mui/icons-material/Person';
import { useSession } from "../../../utils/useSession";
import { useAuth } from "../../../utils/auth";
import Navbar from "../../navbar/page";
import ApplicantTracking from "../../../navbar/Breadcrump";

const MainPage: React.FC = () => {
  const { session } = useSession();
  const { logout } = useAuth();
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");

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


return (
    <div className="min-h-screen bg-[#e8edff] flex flex-col items-center">
      <div className="w-full bg-gradient-to-b from-green-200 to-blue-200 h-32 rounded-b-lg shadow-md">
        <img
          src="/images/logo.png"
          width={150}
          className="absolute top-2 left-2 z-20"
          alt="Logo"
        />
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
      </div>

<style jsx global>{`
  .swal2-popup {
    width: 700px !important;
  }
`}</style>
</div>
);

}


export default MainPage;