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

const MainPage = () => {
  const [view, setView] = useState("ทั้งหมด");
  const { session } = useSession();
  const { logout } = useAuth();
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const { data: getAll } = useGetAll();



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
      }
    ]
  };

  useEffect(() => {
    console.log(session); // ดูค่า session ที่ได้มา
    if (session === null) {
      router.push('/adminlogin');
    }
  }, [session]);

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
        <div className="text-right mr-[60px] mt-[40px] w-[95%]">
          <button
            onClick={handleLogout}
            className="inline-flex items-center"
          >
            <span className="text-gray-800 font-medium">
              {userName}
              <AdminPanelSettingsIcon style={{ marginBottom: "8px", marginLeft: "5px" }} />
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
            <h3 className="text-lg font-medium text-center mb-2">แผนภูมิวงกลม</h3>
            <div className="w-full max-w-xs aspect-square">
              <Pie
                data={pieDataTeacher}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'right',
                      labels: {
                        font: { size: 12 },
                        padding: 10,
                        usePointStyle: true,
                        textAlign: 'left',
                        boxWidth: 15,
                      } as any,
                      maxWidth: 150, // จำกัดความกว้าง legend
                    },
                    title: {
                      display: true,
                      text: 'แผนภูมิวงกลม',
                      font: { size: 16 }
                    }
                  }
                }}
              />

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
                maintainAspectRatio: false }} />
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default MainPage;
