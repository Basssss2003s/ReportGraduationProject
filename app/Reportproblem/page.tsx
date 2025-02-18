"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../navbar/page"; // Adjust path if necessary
import Swal from "sweetalert2";
import { useSession } from '../../utils/useSession';
import { useAuth } from "../../utils/auth";
import { useRouter } from "next/navigation";
import ApplicantTracking from "../../navbar/Breadcrump";
import PersonIcon from '@mui/icons-material/Person';
import Link from "next/link";
import useReportProblemCreate from "../../hooks/useReportProblemCreate";
import { ReportProblemCreate } from "../../types/complaintCreate";
import AlertBox from "../../components/modal/Alert";

const MainPage: React.FC = () => {
  const { session } = useSession();
  const { logout } = useAuth();
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [problemDetails, setProblemDetails] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  //Modal Alert
  const [openAlert, setOpenAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState("");
  const [textAlert, setTextAlert] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const { mutateAsync: mutateAsyncCreate } = useReportProblemCreate();
  const handleAlert = (type: ("success" | "error" | "warning" | "info"), text: string) => {
    setOpenAlert(true);
    setTypeAlert(type);
    setTextAlert(text);
  }
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
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    const errors: string[] = [];
    if (!selectedCategory) errors.push("หัวข้อปัญหาที่พบ");
    if (!selectedSubCategory) errors.push("ปัญหาที่พบ");
    if (!problemDetails.trim()) errors.push("รายละเอียดปัญหาที่พบ");
    if (!phoneNumber.trim()) errors.push("เบอร์โทร");

    if (errors.length > 0) {
      Swal.fire({
        title: "กรุณากรอกข้อมูลให้ครบถ้วน!",
        text: `กรุณาระบุ: ${errors.join(", ")}`,
        icon: "warning",
        confirmButtonText: "ตกลง",
      });
      return;
    }
    setIsSubmitting(true);

    const payload: ReportProblemCreate = {
      topic: selectedCategory,
      problem: selectedSubCategory,
      emailAddress: session?.emailAddress || "",
      problemDetail: problemDetails,
      telephone: phoneNumber,
      createDate: new Date(),
    };

    try {
      const res = await mutateAsyncCreate(payload);
      if (res) {
        handleAlert("success", "Create Success");
        setShouldRedirect(true); // Set redirect flag after successful creation
      } else {
        handleAlert("error", "Failed to create problem.");
      }
    } catch (error) {
      console.error('Error:', error);
      handleAlert("error", "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }

  };

  useEffect(() => {
      let redirectTimeout: NodeJS.Timeout;
  
      if (shouldRedirect) {
        redirectTimeout = setTimeout(() => {
          router.push("/main");
          setShouldRedirect(false); // Reset the redirect state
        }, 1500);
      }
  
      return () => {
        if (redirectTimeout) {
          clearTimeout(redirectTimeout);
        }
      };
    }, [shouldRedirect, router]);

  return (
    <>
      <div className="min-h-screen bg-[#e8edff] flex flex-col items-center">
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

        <div className="w-full max-w-[90%] -mt-10 z-10">
          <div className="bg-white shadow-lg rounded-xl">
            <Navbar />
          </div>
        </div>
        <div className="rounded-lg mt-6 ml-8 w-[90%]">
          <ApplicantTracking />
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6 mt-2 max-w-[90%] w-full flex-grow mb-12">
          <h1 className="text-2xl mt-6 font-bold text-center text-blue-600">ระบบแจ้งปัญหาการใช้งาน</h1>

          <div className="mt-10 max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xl font-medium text-gray-700">หัวข้อปัญหาที่พบ</label>
              <select
                className="mt-2 p-3 border rounded-lg w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value);
                  setSelectedSubCategory(""); // Reset subcategory when category changes
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
              {/* Subcategory select displayed based on category selection */}
              {selectedCategory && (
                <div className="mt-4">
                  <label className="block text-xl font-medium text-gray-700">ปัญหาที่พบ</label>
                  <select
                    className="mt-2 p-3 border rounded-lg w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={selectedSubCategory}
                    onChange={(e) => setSelectedSubCategory(e.target.value)}
                  >
                    <option value="">เลือกปัญหาที่พบ</option>
                    {categories[selectedCategory].map((subCategory, index) => (
                      <option key={index} value={subCategory}>
                        {subCategory}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-xl font-medium text-gray-700">เบอร์โทร</label>
                  <input
                    type="text"
                    className="mt-2 p-3 border rounded-lg w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="กรุณากรอกเบอร์โทร"
                    value={phoneNumber}
                    onChange={(e) => {
                      // ดักพิมพ์เฉพาะตัวเลข 10 ตัว
                      const value = e.target.value.replace(/\D/g, ''); // ลบอักขระที่ไม่ใช่ตัวเลข
                      if (value.length <= 10) {
                        setPhoneNumber(value);
                      }
                    }}
                    required
                    maxLength={10} // กำหนดความยาวไม่เกิน 10 ตัว
                  />
                </div>
                <div>
                    <label className="block text-xl font-medium text-gray-700">
                      อีเมล
                    </label>
                    <input
                      type="email"
                      className="mt-2 p-3 border rounded-lg w-full text-gray-500 bg-gray-100 cursor-not-allowed focus:outline-none"
                      placeholder="กรุณากรอกอีเมล"
                      value={session?.emailAddress}
                      readOnly
                      style={{ pointerEvents: 'none' }} // ป้องกันการคลิกหรือโฟกัส
                    />
                  </div>
              </div>
            </div>
            <div>
              <label className="block text-xl font-medium text-gray-700">รายละเอียดปัญหา</label>
              <textarea
                className="mt-2 p-3 border rounded-lg w-full h-[200px] text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="กรุณากรอกรายละเอียดปัญหาที่พบ"
                value={problemDetails}
                onChange={(e) => setProblemDetails(e.target.value)}
              ></textarea>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={handleSubmit}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              ส่งข้อมูล
            </button>
            <button
              onClick={resetForm}
              className="px-6 py-3 bg-gray-400 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              ล้างข้อมูล
            </button>
          </div>
        </div>
      </div>
      <AlertBox
        type={typeAlert}
        text={textAlert}
        isOpen={openAlert}
        setIsOpen={setOpenAlert}
      />
    </>
  );
};

export default MainPage;