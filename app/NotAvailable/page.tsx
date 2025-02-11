"use client";

import React from "react";
import { useRouter } from "next/navigation";

const MainPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold text-gray-800">ยังไม่เปิดให้บริการ</h1>
        <p className="mt-4 text-gray-600">
          หน้านี้กำลังอยู่ในระหว่างการพัฒนา กรุณากลับมาภายหลัง
        </p>
        <button
          onClick={() => router.push("/main")}
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          กลับสู่หน้าหลัก
        </button>
      </div>
    </div>
  );
};

export default MainPage;
