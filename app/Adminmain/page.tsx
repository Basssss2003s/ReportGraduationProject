"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../adminnavbar/page";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import { useSession } from "../../utils/useSession";
import { useAuth } from "../../utils/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ApplicantTrackingAdmin from "../../navbar/BreadcrumpAdmin";
import { useGetAll } from "../../hooks/useGetAll";
import { useGetAllUser } from "../../hooks/useGetAllUser";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
);
import LogoutIcon from '@mui/icons-material/Logout';
const MainPage = () => {
  const [view, setView] = useState("ทั้งหมด");
  const { session, loading } = useSession();
  const { logout } = useAuth();
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const { data: getAll } = useGetAll();
  const { data: getAllUser } = useGetAllUser();


  const [showSignout, setShowSignout] = useState(false);

  const handleButtonClick = () => {
    setShowSignout(!showSignout);
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
  // Data for each group
  const lineDataTeacher = {
    labels: [
      "มกราคม",
      "กุมภาพันธ์",
      "มีนาคม",
      "เมษายน",
      "พฤษภาคม",
      "มิถุนายน",
      "กรกฎาคม",
      "สิงหาคม",
      "กันยายน",
      "ตุลาคม",
      "พฤศจิกายน",
      "ธันวาคม"
    ],
    datasets: [
      {
        label: "จำนวนร้องเรียน/ร้องทุกข์แต่ละเดือน",
        data: Array(12).fill(0).map((_, index) => {
          // index + 1 เพราะเดือนเริ่มจาก 1 (มกราคม) ถึง 12 (ธันวาคม)
          const month = index + 1;

          // กรองข้อมูลตามเดือน
          return getAll?.filter(item => {
            // สมมติว่า createDate เป็นรูปแบบ YYYY-MM-DD HH:MM:SS.SSS
            const dateObj = new Date(item.createDate?.toString() || '');
            // getMonth() คืนค่า 0-11 (0 = มกราคม, 11 = ธันวาคม)
            return dateObj.getMonth() + 1 === month;
          }).length || 0;
        }),
        borderColor: "#FF6384",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  };

  const barDataTeacher = {
    labels: [
      "บุคลากร",
      "การเรียนการสอน",
      "บริการนักศึกษา",
      "สิ่งอำนวยความสะดวก",
      "ค่าธรรมเนียมและการเงิน",
      "ความปลอดภัย",
      "หอพัก/ที่พักอาศัย",
      "IT/ระบบสารสนเทศ",
      "อาหารและโภชนาการ",
      "การขนส่ง/การเดินทาง",
      "เรื่องอื่นๆ"
    ],
    datasets: [
      {
        label: "ประเด็นการร้องเรียน/ร้องทุกข์",
        data: [
          getAll?.filter(item => item.topicOfComplaint === "บุคลากร").length,
          getAll?.filter(item => item.topicOfComplaint === "การเรียนการสอน").length,
          getAll?.filter(item => item.topicOfComplaint === "บริการนักศึกษา").length,
          getAll?.filter(item => item.topicOfComplaint === "สิ่งอำนวยความสะดวก").length,
          getAll?.filter(item => item.topicOfComplaint === "ค่าธรรมเนียมและการเงิน").length,
          getAll?.filter(item => item.topicOfComplaint === "ความปลอดภัย").length,
          getAll?.filter(item => item.topicOfComplaint === "หอพัก/ที่พักอาศัย").length,
          getAll?.filter(item => item.topicOfComplaint === "IT/ระบบสารสนเทศ").length,
          getAll?.filter(item => item.topicOfComplaint === "อาหารและโภชนาการ").length,
          getAll?.filter(item => item.topicOfComplaint === "การขนส่ง/การเดินทาง").length,
          getAll?.filter(item => item.topicOfComplaint === "เรื่องอื่นๆ").length

        ],
        backgroundColor: [
          "#FF6384", // แดง
          "#36A2EB", // ฟ้า
          "#FFCE56", // เหลือง
          "#4BC0C0", // เขียวมิ้นต์
          "#9966FF", // ม่วง
          "#FF9F40", // ส้ม
          "#4d5a46", // เทาอ่อน
          "#8b0000", // น้ำเงินเข้ม  
          "#D35400", // ส้มเข้ม  
          "#27AE60", // เขียวสด  
          "#8E44AD"  // ม่วงเข้ม  
        ]
      },
    ],
  };

  const pieDataTeacher = {
    labels: [
      "อาจารย์",
      "นักศึกษา",
      "เจ้าหน้าที่",
      "บุคคลภายนอก"
    ],
    datasets: [
      {
        data: [
          getAllUser?.filter(item => item.typePersonal === "อาจารย์").length || 0,
          getAllUser?.filter(item => item.typePersonal === "เจ้าหน้าที่").length || 0,
          getAllUser?.filter(item => item.typePersonal === "นักศึกษา").length || 0,
          getAllUser?.filter(item => item.typePersonal === "บุคคลภายนอก").length || 0
        ],
        backgroundColor: [
          "#FFCE56", // เหลือง
          "#8b0000", // น้ำเงินเข้ม  
          "#27AE60", // เขียวสด  
          "#8E44AD"  // ม่วงเข้ม  
        ]
      }
    ]
  };

  useEffect(() => {
    console.log(session); // ดูค่า session ที่ได้มา
    if (!loading && session === null) {
      router.push('/adminlogin');
    }
  }, [session, loading]);

  return (
    <div className="min-h-screen bg-[#e8edff] flex flex-col items-center">
      {/* Gradient Header */}
      <div className="w-full bg-gradient-to-b from-green-200 to-blue-200 h-32 rounded-b-lg shadow-md">
        <Link href="/adminmain" className="hover:underline">
          <img
            src="/images/logo.png"
            width={150}
            className="absolute top-2 left-2 z-20"
            alt="Logo"
          />
        </Link>
        <div style={{ position: 'relative' }}>
          <div className="text-right" style={{ marginRight: '60px', marginTop: '40px', width: '95%' }}>
            <div className="flex flex-col items-end">
              <button
                onClick={handleButtonClick}
                className="inline-flex items-center"
              >
                <span className="text-gray-800 font-medium">
                  {userName}
                  <AdminPanelSettingsIcon style={{ marginLeft: "5px" }} />
                </span>
              </button>

              {showSignout && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: '10px',
                  zIndex: 50,
                  marginTop: '5px'
                }}>
                  <button
                    onClick={handleLogout}
                    className="bg-white text-black text-sm flex items-center px-4 py-1 rounded-full shadow-md hover:bg-gray-200 hover:shadow-lg"
                  >
                    <span>Logout</span>
                    <LogoutIcon style={{ marginLeft: "8px", color: 'red' }} />
                  </button>

                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <div className="w-full max-w-[90%] -mt-10 z-10">
        <div className="bg-white shadow-lg rounded-xl">
          <Navbar />
        </div>
      </div>
      <div className="rounded-lg mt-6 ml-8 w-[90%]">
        <ApplicantTrackingAdmin />
      </div>
      {/* Summary Cards */}
      <div className="flex flex-nowrap gap-4 pb-4">
        <div className="bg-blue-100 rounded-lg p-6 shadow-md text-center flex-shrink-0 min-w-[200px] transform transition-transform hover:scale-105">
          <h2 className="text-xl font-semibold text-blue-800">การรายงานทั้งหมด</h2>
          <p className="mt-4 text-3xl font-bold text-blue-800">{getAll?.length}</p>
        </div>

        <div className="bg-orange-100 rounded-lg p-6 shadow-md text-center flex-shrink-0 min-w-[200px] transform transition-transform hover:scale-105">
          <h2 className="text-xl font-semibold text-orange-800">รอดำเนินการ</h2>
          <p className="mt-4 text-3xl font-bold text-orange-800">
            {getAll?.filter(item => item.status === 'รอดำเนินการ').length}
          </p>
        </div>

        <div className="bg-yellow-100 rounded-lg p-6 shadow-md text-center flex-shrink-0 min-w-[200px] transform transition-transform hover:scale-105">
          <h2 className="text-xl font-semibold text-yellow-800">กำลังดำเนินการ</h2>
          <p className="mt-4 text-3xl font-bold text-yellow-800">
            {getAll?.filter(item => item.status === 'กำลังดำเนินการ').length}
          </p>
        </div>

        <div className="bg-teal-100 rounded-lg p-6 shadow-md text-center flex-shrink-0 min-w-[200px] transform transition-transform hover:scale-105">
          <h2 className="text-xl font-semibold text-teal-800">คำร้องที่รอตรวจสอบ</h2>
          <p className="mt-4 text-3xl font-bold text-teal-800">
            {getAll?.filter(item => item.status === 'รอตรวจสอบ').length}
          </p>
        </div>

        <div className="bg-green-100 rounded-lg p-6 shadow-md text-center flex-shrink-0 min-w-[200px] transform transition-transform hover:scale-105">
          <h2 className="text-xl font-semibold text-green-800">เสร็จสิ้น</h2>
          <p className="mt-4 text-3xl font-bold text-green-800">
            {getAll?.filter(item => item.status === 'เสร็จสิ้น').length}
          </p>
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 mt-2 max-w-[90%] w-full flex-grow mb-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          <div className="flex flex-col items-center p-4">
            <h3 className="text-xl font-bold text-center mb-4">แผนภูมิวงกลม</h3>
            {/* Modified Pie Chart container - increased height and centered */}
            <div className="w-full h-48 flex justify-center items-center">
              <Pie
                data={pieDataTeacher}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                      labels: {
                        font: { size: 14 },
                        padding: 20,
                        usePointStyle: true,
                        textAlign: 'left',
                        boxWidth: 15,
                      } as any,
                    },
                    title: {
                      display: false
                    }
                  }
                }}
              />
            </div>
            {/* Modified gender icons with color and larger size */}
            <div className="flex justify-center items-center mt-6 space-x-12">
              <div className="flex flex-col items-center">
                <MaleIcon style={{ color: "#3498db", fontSize: 36 }} />
                <span className="text-blue-500 font-medium">ชาย</span>
                <span>{getAllUser?.filter(item => item.title === "นาย").length}</span>
              </div>
              <div className="flex flex-col items-center">
                <FemaleIcon style={{ color: "#e84393", fontSize: 36 }} />
                <span className="text-pink-500 font-medium">หญิง</span>
                <span>{getAllUser?.filter(item => item.title === "นาง" || item.title === "นางสาว").length}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center p-4">
            <h3 className="text-lg font-medium text-center mb-2">กราฟแท่ง</h3>
            <div className="w-full max-w-xs aspect-square">
              <Bar data={barDataTeacher} options={{
                plugins: {
                  legend: {
                    labels: {
                      // ลบรูปแบบการแสดงจุดสีออกไปเลย
                      boxWidth: 0,
                      usePointStyle: false
                    }
                  }
                },
                maintainAspectRatio: false
              }} />
            </div>
          </div>

          <div className="flex flex-col items-center p-4">
            <h3 className="text-lg font-medium text-center mb-2">กราฟเส้น</h3>
            <div className="w-full max-w-xs aspect-square">
              <Line data={lineDataTeacher} options={{
                plugins: {
                  legend: {
                    labels: {
                      // ลบรูปแบบการแสดงจุดสีออกไปเลย
                      boxWidth: 0,
                      usePointStyle: false
                    }
                  }
                },
                maintainAspectRatio: false
              }} />
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default MainPage;
