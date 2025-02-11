"use client";
import React, { useState } from "react";
import Navbar from "../navbar/page"; // Adjust path if necessary
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const MainPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [problemDetails, setProblemDetails] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const categories: Record<string, string[]> = {
    "": [],
    "การใช้งานระบบ": [
      "ระบบไม่เสถียร",
      "ระบบมีบัคหรือข้อผิดพลาด",
      "ความล่าช้าในการตอบสนองของระบบ",
      "ปัญหาการใช้งานบนอุปกรณ์/แพลตฟอร์มต่างๆ",
      "การใช้งานระบบที่ยุ่งยากหรือไม่เป็นมิตรกับผู้ใช้",
      "เรื่องอื่นๆ",
    ],
    "การให้บริการของเจ้าหน้าที่รับเรื่องร้องเรียน": [
      "การให้ข้อมูลไม่ครบถ้วนหรือไม่ชัดเจน",
      "การติดตามผลหรือแก้ปัญหาไม่ต่อเนื่อง",
      "การแก้ปัญหาไม่ได้ผลหรือไม่ตรงจุด",
      "เจ้าหน้าที่ไม่มีความสุภาพหรือไม่ใส่ใจ",
      "เรื่องอื่นๆ",
    ],
  };

  const resetForm = () => {
    setSelectedCategory("");
    setSelectedSubCategory("");
    setProblemDetails("");
    setPhoneNumber("");
    setEmail("");
  };

  const handleSubmit = () => {
    const errors: string[] = [];
    if (!selectedCategory) errors.push("หัวข้อปัญหาที่พบ");
    if (!selectedSubCategory) errors.push("ปัญหาที่พบ");
    if (!problemDetails.trim()) errors.push("รายละเอียดปัญหาที่พบ");
    if (!phoneNumber.trim()) errors.push("เบอร์โทร");
    if (!email.trim()) errors.push("อีเมลล์");

    if (errors.length > 0) {
      Swal.fire({
        title: "กรุณากรอกข้อมูลให้ครบถ้วน!",
        text: `กรุณาระบุ: ${errors.join(", ")}`,
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
      return;
    }

    Swal.fire({
      title: "คุณต้องการส่งข้อมูลหรือไม่?",
      text: "โปรดยืนยันว่าคุณต้องการส่งข้อมูลนี้",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "ส่งข้อมูล",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        resetForm();
        Swal.fire({
          title: "ส่งข้อมูลสำเร็จ!",
          text: "เราได้รับข้อมูลของคุณแล้ว ขอบคุณที่แจ้งปัญหา",
          icon: "success",
          confirmButtonText: "ตกลง",
        });
      }
    });
  };

  return (
    <div>
      <Navbar />
      <motion.div
        className="p-6 mt-4 min-h-screen"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-3xl font-extrabold text-center text-blue-600"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          แจ้งปัญหาการใช้งาน
        </motion.h1>
        <motion.p
          className="mt-4 text-lg text-center text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        >
          ยินดีต้อนรับเข้าสู่หน้าแจ้งปัญหาการใช้งาน กรุณากรอกรายละเอียดปัญหาที่พบ
        </motion.p>

        {/* Category Selection */}
        <div className="mt-10 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <label className="block text-xl font-medium text-gray-700">หัวข้อปัญหาที่พบ</label>
          <select
            className="mt-2 p-3 border rounded-lg w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setSelectedSubCategory("");
            }}
          >
            <option value="">เลือกหัวข้อ</option>
            {Object.keys(categories)
              .filter((key) => key !== "")
              .map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
          </select>
        </div>

        {/* Subcategory Selection */}
        {selectedCategory && categories[selectedCategory].length > 0 && (
          <div className="mt-6 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <label className="block text-xl font-medium text-gray-700">รายละเอียดหัวข้อร้องเรียน</label>
            <select
              className="mt-2 p-3 border rounded-lg w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={selectedSubCategory}
              onChange={(e) => setSelectedSubCategory(e.target.value)}
            >
              <option value="">เลือกหัวข้อย่อย</option>
              {categories[selectedCategory].map((subCategory, index) => (
                <option key={index} value={subCategory}>
                  {subCategory}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Problem Details */}
        <div className="mt-6 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <label className="block text-xl font-medium text-gray-700">รายละเอียดปัญหา</label>
          <textarea
            className="mt-2 p-3 border rounded-lg w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={4}
            placeholder="กรุณากรอกรายละเอียดปัญหาที่พบ"
            value={problemDetails}
            onChange={(e) => setProblemDetails(e.target.value)}
          ></textarea>
        </div>

        {/* Phone Number */}
        <div className="mt-6 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <label className="block text-xl font-medium text-gray-700">เบอร์โทร</label>
          <input
            type="text"
            className="mt-2 p-3 border rounded-lg w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="กรุณากรอกเบอร์โทรสำหรับติดต่อกลับ"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="mt-6 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
          <label className="block text-xl font-medium text-gray-700">อีเมลล์</label>
          <input
            type="email"
            className="mt-2 p-3 border rounded-lg w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="กรุณากรอกอีเมลล์สำหรับติดต่อกลับ"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Submit and Reset Buttons */}
        <div className="mt-6 max-w-3xl mx-auto text-center">
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            ส่งข้อมูล
          </button>
          <button
            onClick={resetForm}
            className="ml-4 px-6 py-3 bg-gray-300 text-gray-700 text-lg font-semibold rounded-lg shadow-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            ล้างข้อมูล
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default MainPage;
