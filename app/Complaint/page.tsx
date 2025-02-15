'use client'
import React, { useEffect, useState } from "react";
import Navbar from "../navbar/page";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import useComplaintCreate from "../../hooks/useComplaintCreate";
import { ComplaintCreate } from "../../types/complaintCreate";
import AlertBox from "../../components/modal/Alert";
import { useSession } from "../../utils/useSession";
import { useAuth } from "../../utils/auth";
import ApplicantTracking from "../../navbar/Breadcrump";
import PersonIcon from '@mui/icons-material/Person';

const MainPage: React.FC = () => {
  const { session } = useSession();
  const { logout } = useAuth();
  const router = useRouter();
  const [userName, setUserName] = useState<string>("");
  const [topicOfComplaint, setTopicOfComplaint] = useState<string>("");
  const [detailsOfTheTopic, setDetailsOfTheTopic] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [problemDetails, setProblemDetails] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);


  const { mutateAsync: mutateAsyncCreate } = useComplaintCreate();
  //Modal Alert
  const [openAlert, setOpenAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState("");
  const [textAlert, setTextAlert] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);

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
  useEffect(() => {
    let redirectTimeout: NodeJS.Timeout;

    if (shouldRedirect) {
      redirectTimeout = setTimeout(() => {
        router.push("/followreport");
        setShouldRedirect(false); // Reset the redirect state
      }, 1500);
    }

    return () => {
      if (redirectTimeout) {
        clearTimeout(redirectTimeout);
      }
    };
  }, [shouldRedirect, router]);


  const handleLogout = async () => {
    try {
      logout();
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("เกิดข้อผิดพลาดในการออกจากระบบ กรุณาลองใหม่อีกครั้ง");
    }
  };


  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.push('/login');
  //   }
  // }, [isAuthenticated, router]);

  // if (!user) {
  //   return null;
  // }  

  const handleAddComplaint = async () => {
    if (isSubmitting) return;

    const errors: string[] = [];
    if (!selectedCategory) errors.push("หัวข้อร้องเรียนสำหรับ");
    if (!selectedSubCategory) errors.push("รายละเอียดหัวข้อร้องเรียน");
    if (!problemDetails.trim()) errors.push("รายละเอียดปัญหา");
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

    const payload: ComplaintCreate = {
      firstName: session?.firstName || "",
      lastName: session?.lastName || "",
      emailAddress: session?.emailAddress || "",
      topicOfComplaint: topicOfComplaint,
      detailsOfTheTopic: detailsOfTheTopic,
      problemDetail: problemDetails,
      telephone: phoneNumber,
      status: "รอดำเนินการ",
      createDate: new Date(),
      fullName: session?.fullName || "",
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


  const categories: Record<string, string[]> = {
    "": [],
    "อาจารย์": [
      "ร้องเรียนห้องพักอาจารย์",
      "ร้องเรียนอุปกรณ์ในห้องเรียน",
      "ร้องเรียนระบบอินเทอร์เน็ต",
      "ร้องเรียนพื้นที่ส่วนกลาง",
      "ร้องเรียนเจ้าหน้าที่",
      "ร้องเรียนที่จอดรถ",
      "เรื่องอื่นๆ",
    ],
    "นักศึกษา": [
      "ร้องเรียนห้องเรียน",
      "ร้องเรียนอุปกรณ์ในห้องเรียน",
      "ร้องเรียนระบบอินเทอร์เน็ต",
      "ร้องเรียนพื้นที่ส่วนกลาง",
      "ร้องเรียนบุคลากร",
      "ร้องเรียนเจ้าหน้าที่",
      "เรื่องอื่นๆ",
    ],
    "บุคคลภายนอก": [
      "ร้องเรียนนักศึกษา",
      "ร้องเรียนบุคลากร",
      "ร้องเรียนเจ้าหน้าที่",
      "ร้องเรียนที่จอดรถ",
      "เรื่องอื่นๆ",
    ],
  };

  const resetForm = () => {
    setSelectedCategory("");
    setSelectedSubCategory("");
    setProblemDetails("");
    setPhoneNumber("");
    setTopicOfComplaint("");
    setDetailsOfTheTopic("");
  };

  // const handleSubmit = () => {
  //   const errors: string[] = [];
  //   if (!selectedCategory) errors.push("หัวข้อร้องเรียนสำหรับ");
  //   if (!selectedSubCategory) errors.push("รายละเอียดหัวข้อร้องเรียน");
  //   if (!problemDetails.trim()) errors.push("รายละเอียดปัญหา");
  //   if (!phoneNumber.trim()) errors.push("เบอร์โทร");
  //   if (!email.trim()) errors.push("อีเมลล์");

  //   if (errors.length > 0) {
  //     Swal.fire({
  //       title: "กรุณากรอกข้อมูลให้ครบถ้วน!",
  //       text: `กรุณาระบุ: ${errors.join(", ")}`,
  //       icon: "warning",
  //       confirmButtonText: "ตกลง",
  //     });
  //     return;
  //   }

  //   Swal.fire({
  //     title: "คุณต้องการส่งข้อมูลหรือไม่?",
  //     text: "โปรดยืนยันว่าคุณต้องการส่งข้อมูลนี้",
  //     icon: "question",
  //     showCancelButton: true,
  //     confirmButtonText: "ส่งข้อมูล",
  //     cancelButtonText: "ยกเลิก",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       resetForm();
  //       Swal.fire({
  //         title: "ส่งข้อมูลสำเร็จ!",
  //         text: "เราได้รับข้อมูลของคุณแล้ว ขอบคุณที่แจ้งปัญหา",
  //         icon: "success",
  //         confirmButtonText: "ตกลง",
  //       });
  //     }
  //   });
  // };

  return (
    <>
      <div className="min-h-screen bg-[#e8edff] flex flex-col items-center">
        {/* Gradient Header */}
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

        {/* Navbar */}
        <div className="w-full max-w-[90%] -mt-10 z-10">
          <div className="bg-white shadow-lg rounded-xl">
            <Navbar />
          </div>
        </div>
        <div className="rounded-lg mt-6 ml-8 w-[90%]">
          <ApplicantTracking />
        </div>
        {/* Main Content */}
        <div className="bg-white shadow-lg rounded-lg p-6 mt-2 max-w-[90%] w-full flex-grow mb-12">
          <motion.div
            className="p-6"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1
              className="text-3xl font-extrabold text-center mt-8 text-blue-600"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              เขียนคำร้องเรียน
            </motion.h1>

            {/* Form Layout */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {/* Left Column */}
              <div className="col-span-1 space-y-6">
                <div>
                  <label className="block text-xl font-medium text-gray-700">
                    หัวข้อร้องเรียนสำหรับ
                    <span className="text-red-500"> *</span>
                  </label>
                  <select
                    className="mt-2 p-3 border rounded-lg w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={selectedCategory}
                    onChange={(e) => {
                      const selectedValue = e.target.value;
                      setSelectedCategory(selectedValue);
                      setTopicOfComplaint(selectedValue);  // Update topicOfComplaint here
                      setSelectedSubCategory("");  // Reset subcategory
                    }}
                    required
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


                {selectedCategory && categories[selectedCategory].length > 0 && (
                  <div>
                    <label className="block text-xl font-medium text-gray-700">
                      รายละเอียดหัวข้อร้องเรียน
                      <span className="text-red-500"> *</span>
                    </label>
                    <select
                      className="mt-2 p-3 border rounded-lg w-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                      value={selectedSubCategory}
                      onChange={(e) => {
                        const selectedSub = e.target.value;
                        setSelectedSubCategory(selectedSub);
                        setDetailsOfTheTopic(selectedSub);  // Update detailsOfTheTopic here
                      }}
                      required
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

                {/* Contact Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xl font-medium text-gray-700">
                      เบอร์โทร
                      <span className="text-red-500"> *</span>
                    </label>
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
                      อีเมลล์
                      <span className="text-red-500"> *</span>
                    </label>
                    <input
                      type="email"
                      className="mt-2 p-3 border rounded-lg w-full text-gray-500 bg-gray-100 cursor-not-allowed focus:outline-none"
                      placeholder="กรุณากรอกอีเมลล์"
                      value={session?.emailAddress}
                      readOnly
                      style={{ pointerEvents: 'none' }} // ป้องกันการคลิกหรือโฟกัส
                    />
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="col-span-1 flex flex-col justify-between">
                <label className="block text-xl font-medium text-gray-700">
                  รายละเอียดปัญหา
                  <span className="text-red-500"> *</span>
                </label>
                <textarea
                  className="mt-2 p-3 border rounded-lg w-full h-full text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  rows={10}
                  placeholder="กรุณากรอกรายละเอียดปัญหาที่พบ"
                  value={problemDetails}
                  onChange={(e) => setProblemDetails(e.target.value)}
                  required
                ></textarea>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 text-center">
              <button
                onClick={handleAddComplaint}
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
