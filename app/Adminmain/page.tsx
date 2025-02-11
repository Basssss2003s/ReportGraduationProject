"use client";
import React, { useState } from "react";
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

  // Data for each group
  const lineDataTeacher = {
    labels: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม"],
    datasets: [
      {
        label: "จำนวนร้องเรียน (อาจารย์)",
        data: [10, 20, 30, 40, 50],
        borderColor: "#FF6384",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  };

  const lineDataStudent = {
    labels: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม"],
    datasets: [
      {
        label: "จำนวนร้องเรียน (นักศึกษา)",
        data: [15, 25, 35, 20, 30],
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
    ],
  };

  const lineDataOutsider = {
    labels: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม"],
    datasets: [
      {
        label: "จำนวนร้องเรียน (บุคคลภายนอก)",
        data: [5, 10, 15, 10, 5],
        borderColor: "#FFCE56",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        fill: true,
      },
    ],
  };

  const barDataTeacher = {
    labels: [
      "ห้องพักอาจารย์",
      "อุปกรณ์ในห้องเรียน",
      "ระบบอินเทอร์เน็ต",
      "พื้นที่ส่วนกลาง",
      "เจ้าหน้าที่",
      "ที่จอดรถ",
      "เรื่องอื่นๆ",
    ],
    datasets: [
      {
        label: "อาจารย์",
        data: [5, 8, 10, 6, 4, 3, 2],
        backgroundColor: "#FF6384",
      },
    ],
  };

  const pieDataTeacher = {
    labels: [
      "ห้องพักอาจารย์",
      "อุปกรณ์ในห้องเรียน",
      "ระบบอินเทอร์เน็ต",
      "พื้นที่ส่วนกลาง",
      "เจ้าหน้าที่",
      "ที่จอดรถ",
      "เรื่องอื่นๆ",
    ],
    datasets: [
      {
        label: "จำนวนการร้องเรียน",
        data: [5, 8, 10, 6, 4, 3, 2],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#E7E9ED"],
      },
    ],
  };

  const barDataStudent = {
    labels: [
      "ห้องเรียน",
      "อุปกรณ์ในห้องเรียน",
      "ระบบอินเทอร์เน็ต",
      "พื้นที่ส่วนกลาง",
      "บุคลากร",
      "เจ้าหน้าที่",
      "เรื่องอื่นๆ",
    ],
    datasets: [
      {
        label: "นักศึกษา",
        data: [10, 12, 15, 8, 6, 2, 4],
        backgroundColor: "#36A2EB",
      },
    ],
  };

  const pieDataStudent = {
    labels: [
      "ห้องเรียน",
      "อุปกรณ์ในห้องเรียน",
      "ระบบอินเทอร์เน็ต",
      "พื้นที่ส่วนกลาง",
      "บุคลากร",
      "เจ้าหน้าที่",
      "เรื่องอื่นๆ",
    ],
    datasets: [
      {
        label: "จำนวนการร้องเรียน",
        data: [10, 12, 15, 8, 6, 2, 4],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#E7E9ED"],
      },
    ],
  };

  const barDataOutsider = {
    labels: ["นักศึกษา", "บุคลากร", "เจ้าหน้าที่", "ที่จอดรถ", "เรื่องอื่นๆ"],
    datasets: [
      {
        label: "บุคคลภายนอก",
        data: [3, 5, 8, 4, 6],
        backgroundColor: "#FFCE56",
      },
    ],
  };

  const pieDataOutsider = {
    labels: ["นักศึกษา", "บุคลากร", "เจ้าหน้าที่", "ที่จอดรถ", "เรื่องอื่นๆ"],
    datasets: [
      {
        label: "จำนวนการร้องเรียน",
        data: [3, 5, 8, 4, 6],
        backgroundColor: ["#FFCE56", "#36A2EB", "#FF6384", "#4BC0C0", "#9966FF"],
      },
    ],
  };

  const renderContent = () => {
    if (view === "ทั้งหมด") {
      return (
        <section className="">
          <h2 className="text-xl font-semibold mb-4">ข้อมูลการร้องเรียน: ทั้งหมด</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <h3 className="text-lg font-medium text-center mb-2">แผนภูมิวงกลม</h3>
              <div className="aspect-square">
                <Pie data={pieDataTeacher} />
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <h3 className="text-lg font-medium text-center mb-2">กราฟแท่ง</h3>
              <div className="aspect-square">
                <Bar data={barDataTeacher} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <h3 className="text-lg font-medium text-center mb-2">กราฟเส้น</h3>
              <div className="aspect-square">
                <Line data={lineDataTeacher} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
          </div>
        </section>
      );
    } else if (view === "อาจารย์") {
      return (
        <section className="">
          <h2 className="text-xl font-semibold mb-4">ข้อมูลการร้องเรียน: อาจารย์</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <h3 className="text-lg font-medium text-center mb-2">แผนภูมิวงกลม</h3>
              <div className="aspect-square">
                <Pie data={pieDataTeacher} />
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <h3 className="text-lg font-medium text-center mb-2">กราฟแท่ง</h3>
              <div className="aspect-square">
                <Bar data={barDataTeacher} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <h3 className="text-lg font-medium text-center mb-2">กราฟเส้น</h3>
              <div className="aspect-square">
                <Line data={lineDataTeacher} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
          </div>
        </section>
      );
    } else if (view === "นักศึกษา") {
      return (
        <section className="">
          <h2 className="text-xl font-semibold mb-4">ข้อมูลการร้องเรียน: นักศึกษา</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <h3 className="text-lg font-medium text-center mb-2">แผนภูมิวงกลม</h3>
              <div className="aspect-square">
                <Pie data={pieDataStudent} />
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <h3 className="text-lg font-medium text-center mb-2">กราฟแท่ง</h3>
              <div className="aspect-square">
                <Bar data={barDataStudent} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <h3 className="text-lg font-medium text-center mb-2">กราฟเส้น</h3>
              <div className="aspect-square">
                <Line data={lineDataStudent} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
          </div>
        </section>
      );
    } else if (view === "บุคคลภายนอก") {
      return (
        <section className="">
          <h2 className="text-xl font-semibold mb-4">ข้อมูลการร้องเรียน: บุคคลภายนอก</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <h3 className="text-lg font-medium text-center mb-2">แผนภูมิวงกลม</h3>
              <div className="aspect-square">
                <Pie data={pieDataOutsider} />
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <h3 className="text-lg font-medium text-center mb-2">กราฟแท่ง</h3>
              <div className="aspect-square">
                <Bar data={barDataOutsider} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <h3 className="text-lg font-medium text-center mb-2">กราฟเส้น</h3>
              <div className="aspect-square">
                <Line data={lineDataOutsider} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
          </div>
        </section>
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#e8edff] flex flex-col items-center">
      {/* Gradient Header */}
      <div className="w-full bg-gradient-to-b from-green-200 to-blue-200 h-32 rounded-b-lg shadow-md"></div>

      {/* Navbar */}
      <div className="w-full max-w-[90%] -mt-10 z-10">
        <div className="bg-white shadow-lg rounded-xl">
          <Navbar />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-100 rounded-lg p-6 shadow-md text-center transform transition-transform hover:scale-105">
          <h2 className="text-xl font-semibold text-blue-800">การรายงานทั้งหมด</h2>
          <p className="mt-4 text-3xl font-bold text-blue-800">120</p>
        </div>

        <div className="bg-orange-100 rounded-lg p-6 shadow-md text-center transform transition-transform hover:scale-105">
          <h2 className="text-xl font-semibold text-orange-800">รอดำเนินการ</h2>
          <p className="mt-4 text-3xl font-bold text-orange-800">30</p>
        </div>

        <div className="bg-yellow-100 rounded-lg p-6 shadow-md text-center transform transition-transform hover:scale-105">
          <h2 className="text-xl font-semibold text-yellow-800">กำลังดำเนินการ</h2>
          <p className="mt-4 text-3xl font-bold text-yellow-800">50</p>
        </div>

        <div className="bg-green-100 rounded-lg p-6 shadow-md text-center transform transition-transform hover:scale-105">
          <h2 className="text-xl font-semibold text-green-800">คำร้องที่ถูกแก้ไข</h2>
          <p className="mt-4 text-3xl font-bold text-green-800">10</p>
        </div>
      </div>

      {/* Tabs for Switching Views */}
      <div className="mt-8 flex gap-4">
        <button
          className={`px-4 py-2 rounded-lg shadow-md ${
            view === "ทั้งหมด" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("ทั้งหมด")}
        >
          ทั้งหมด
        </button>
        <button
          className={`px-4 py-2 rounded-lg shadow-md ${
            view === "อาจารย์" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("อาจารย์")}
        >
          อาจารย์
        </button>
        <button
          className={`px-4 py-2 rounded-lg shadow-md ${
            view === "นักศึกษา" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("นักศึกษา")}
        >
          นักศึกษา
        </button>
        <button
          className={`px-4 py-2 rounded-lg shadow-md ${
            view === "บุคคลภายนอก" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setView("บุคคลภายนอก")}
        >
          บุคคลภายนอก
        </button>
      </div>

      {/* Main Content */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6 max-w-[90%] w-full flex-grow mb-12">
        {renderContent()}
      </div>
    </div>
  );
};

export default MainPage;
