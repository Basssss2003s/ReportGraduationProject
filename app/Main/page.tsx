"use client";
import React from "react";
import Navbar from "../navbar/page";

const MainPage = () => {
  return (
    <div className="min-h-screen bg-[#e8edff] flex flex-col items-center">
      {/* Gradient Header */}
      <div className="w-full bg-gradient-to-b from-green-200 to-blue-200 h-32 rounded-b-lg shadow-md">
        <img
          src="/images/logo.png"
          width={150}
          className="absolute top-2 left-2 z-20"
          alt="Logo"
        />
      </div>

      {/* Navbar */}
      <div className="w-full max-w-[90%] -mt-10 z-10">
        <div className="bg-white shadow-lg rounded-xl">
          <Navbar />
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white shadow-lg rounded-lg p-6 mt-6 max-w-[90%] w-full flex-grow mb-12">
        <h1 className="text-2xl font-bold text-center text-blue-600">ระบบจัดการการร้องเรียน</h1>
        <p className="mt-4 text-center text-gray-600">
          ยินดีต้อนรับเข้าสู่ระบบร้องเรียนคณะบริหารธุรกิจ
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card: All Reports */}
          <div className="bg-blue-100 rounded-lg p-6 shadow-md text-center transform transition-transform hover:scale-105">
            <h2 className="text-xl font-semibold text-blue-800">การรายงานทั้งหมด</h2>
            <p className="mt-4 text-3xl font-bold text-blue-800">120</p>
          </div>

          {/* Card: Pending Reports */}
          <div className="bg-orange-100 rounded-lg p-6 shadow-md text-center transform transition-transform hover:scale-105">
            <h2 className="text-xl font-semibold text-orange-800">รอดำเนินการ</h2>
            <p className="mt-4 text-3xl font-bold text-orange-800">30</p>
          </div>

          {/* Card: In Progress */}
          <div className="bg-yellow-100 rounded-lg p-6 shadow-md text-center transform transition-transform hover:scale-105">
            <h2 className="text-xl font-semibold text-yellow-800">กำลังดำเนินการ</h2>
            <p className="mt-4 text-3xl font-bold text-yellow-800">50</p>
          </div>

          {/* Card: Resolved Reports */}
          <div className="bg-green-100 rounded-lg p-6 shadow-md text-center transform transition-transform hover:scale-105">
            <h2 className="text-xl font-semibold text-green-800">คำร้องที่ถูกแก้ไข</h2>
            <p className="mt-4 text-3xl font-bold text-green-800">10</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card: Your Reports */}
          <div className="bg-purple-100 rounded-lg p-6 shadow-md text-center transform transition-transform hover:scale-105">
            <h2 className="text-xl font-semibold text-purple-800">คำร้องของคุณ</h2>
            <p className="mt-4 text-3xl font-bold text-purple-800">15</p>
            <button
              onClick={() => (window.location.href = '/followreport')}
              className="mt-4 px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              ดูรายละเอียด
            </button>
          </div>

          {/* Card: Resolved Reports */}
          <div className="bg-teal-100 rounded-lg p-6 shadow-md text-center transform transition-transform hover:scale-105">
            <h2 className="text-xl font-semibold text-teal-800">คำร้องที่รอตรวจสอบ</h2>
            <p className="mt-4 text-3xl font-bold text-teal-800">5</p>
            <button
              onClick={() => (window.location.href = '/followreport')}
              className="mt-4 px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              ดูรายละเอียด
            </button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => (window.location.href = '/complaint')}
            className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transform transition-transform hover:scale-105"
          >
            สร้างคำร้องใหม่
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
