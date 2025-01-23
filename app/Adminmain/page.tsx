"use client";
import React from "react";
import Navbar from "../Adminnavbar/page";
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
  // Mock Data สำหรับกราฟเส้น
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

  // ข้อมูลสำหรับอาจารย์
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

  // ข้อมูลสำหรับนักศึกษา
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

  // ข้อมูลสำหรับบุคคลภายนอก
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

  const combinedLabels = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม"];
  const combinedLineData = {
    labels: combinedLabels,
    datasets: [
      {
        label: "อาจารย์",
        data: [10, 20, 30, 40, 50],
        borderColor: "#FF6384",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
      {
        label: "นักศึกษา",
        data: [15, 25, 35, 20, 30],
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
      {
        label: "บุคคลภายนอก",
        data: [5, 10, 15, 10, 5],
        borderColor: "#FFCE56",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        fill: true,
      },
    ],
  };

  const combinedBarData = {
    labels: [
      "หมวด 1",
      "หมวด 2",
      "หมวด 3",
      "หมวด 4",
      "หมวด 5",
      "หมวด 6",
      "หมวด 7",
    ],
    datasets: [
      {
        label: "อาจารย์",
        data: [5, 8, 10, 6, 4, 3, 2],
        backgroundColor: "#FF6384",
      },
      {
        label: "นักศึกษา",
        data: [10, 12, 15, 8, 6, 2, 4],
        backgroundColor: "#36A2EB",
      },
      {
        label: "บุคคลภายนอก",
        data: [3, 5, 8, 4, 6, 3, 2],
        backgroundColor: "#FFCE56",
      },
    ],
  };

  const combinedPieData = {
    labels: ["อาจารย์", "นักศึกษา", "บุคคลภายนอก"],
    datasets: [
      {
        label: "จำนวนการร้องเรียนทั้งหมด",
        data: [150, 125, 45], // ยอดรวมจากข้อมูลทั้งสามกลุ่ม
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div>
      <Navbar/>

      <div className="p-6">
        <h1 className="text-2xl font-bold">ระบบร้องเรียนคณะบริหารธุรกิจ</h1>

        {/* ข้อมูลการร้องเรียน: ทั้งหมด */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold mb-4">ข้อมูลการร้องเรียน: ทั้งหมด</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <h3 className="text-lg font-medium text-center mb-2">แผนภูมิวงกลม</h3>
              <div className="aspect-square">
                <Pie data={combinedPieData} />
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <h3 className="text-lg font-medium text-center mb-2">กราฟแท่ง</h3>
              <div className="aspect-square">
                <Bar data={combinedBarData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
            <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <h3 className="text-lg font-medium text-center mb-2">กราฟเส้น</h3>
              <div className="aspect-square">
                <Line data={combinedLineData} options={{ maintainAspectRatio: false }} />
              </div>
            </div>
          </div>
        </section>

        {/* ส่วนของอาจารย์ */}
        <section className="mt-8">
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

        {/* ส่วนของนักศึกษา */}
        <section className="mt-8">
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

        {/* ส่วนของบุคคลภายนอก */}
        <section className="mt-8">
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
      </div>
    </div>
  );
};

export default MainPage;
