"use client";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useAuth } from '../../utils/auth';
import { useState } from 'react';
import AlertBox from '../../components/modal/Alert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Swal from "sweetalert2";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const router = useRouter();
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  //Modal Alert
  const [openAlert, setOpenAlert] = useState(false);
  const [typeAlert, setTypeAlert] = useState("");
  const [textAlert, setTextAlert] = useState("");

  const handleAlert = (type: ("success" | "error" | "warning" | "info"), text: string) => {
    setOpenAlert(true);
    setTypeAlert(type);
    setTextAlert(text);
  }
  const formatName = (value: string) => {
    // ตรวจสอบว่าขึ้นต้นด้วยตัวพิมพ์ใหญ่ และตัวที่เหลือเป็นพิมพ์เล็ก
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  };



  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault(); // เพิ่มบรรทัดนี้เพื่อป้องกันการ refresh หน้า

    if (isSubmitting) return;

    const errors: string[] = [];
    if (!firstName) errors.push("ชื่อ");
    if (!lastName) errors.push("นามสกุล");
    if (!email.trim()) errors.push("อีเมล");
    if (!password.trim()) errors.push("รหัสผ่าน");

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

    try {
      await register(email, password, firstName, lastName);
      handleAlert("success", "Register Success");
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      handleAlert("warning", "Register Already");
      setTimeout(() => {
        window.location.reload(); // รีเฟรชหน้าเมื่อเกิด error
      }, 1500);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div
        className="flex justify-center items-center min-h-screen bg-gray-100 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/images/BackgroundLogin.jpg)',
        }}
      >
        <div className="flex justify-center rounded-lg items-center  bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Register</h2>
            <form>
              <div>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700">
                    ชื่อ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="ชื่อ"
                    required
                    value={firstName}
                    onChange={(e) => {
                      const value = formatName(e.target.value); // แปลงเป็นพิมพ์ใหญ่ตัวแรก
                      setFirstName(value);
                    }}
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="surname" className="block text-gray-700">
                    นามสกุล<span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="surname"
                    className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="นามสกุล"
                    required
                    value={lastName}
                    onChange={(e) => {
                      const value = formatName(e.target.value); // แปลงเป็นพิมพ์ใหญ่ตัวแรก
                      setLastName(value);
                    }}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">อีเมล
                  <span className="text-red-500"> *</span>
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="อีเมล"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">รหัสผ่าน
                  <span className="text-red-500"> *</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="รหัสผ่าน"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-8 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </button>
                </div>
              </div>
              <button
                onClick={handleRegister}
                type="submit"
                className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              >
                สมัครสมาชิก
              </button>
            </form>

            <div className="text-center">
              <Link href="/login">
                <p className="text-gray-600 mb-4">มีบัญชีอยู่แล้ว?</p>
                <button
                  className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  เข้าสู่ระบบ
                </button>
              </Link>
            </div>
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
}
