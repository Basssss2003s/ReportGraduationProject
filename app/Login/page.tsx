"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useSession } from '../../utils/useSession';
import { useAuth } from '../../utils/auth';
import { useRouter } from "next/navigation";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { refreshSession } = useSession(); // ดึง refreshSession มาจาก useSession

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
      await refreshSession(); // รีเฟรช session
      router.push("/main");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("เกิดข้อผิดพลาดในการออกจากระบบ กรุณาลองใหม่อีกครั้ง");
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gray-100 bg-cover bg-center"
      style={{
        backgroundImage: 'url(/images/BackgroundLogin.jpg)',
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 opacity-100">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">เข้าสู่ระบบ</h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">อีเมล</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="กรอกอีเมล"
              required
              disabled={isLoading}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">รหัสผ่าน</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="กรอกรหัสผ่าน"
                required
                disabled={isLoading}
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
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
            disabled={isLoading}
          >
            {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
          </button>
        </form>

        <Link href="/register">
          <button className="w-full p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 mt-4">
            สมัครสมาชิกสำหรับบุคคลภายนอก
          </button>
        </Link>

        <Link href="/adminlogin">
          <button className="w-full p-3 bg-white text-gray-600 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 mt-4">
            สำหรับผู้ดูแลระบบ
          </button>
        </Link>
      </div>
    </div>
  );
}
