"use client";
import Link from 'next/link';
// import { useRouter } from "next/navigation";
// import { useAuth } from '../../utils/auth';
// import { useState } from 'react';

export default function Register() {
  //  const router = useRouter();
    // const { register } = useAuth();
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [fullName, setfullName] = useState('');
    // const [error, setError] = useState('');
    // const [isLoading, setIsLoading] = useState(false);


      // const handleRegister = async (e: React.FormEvent) => {
      //   e.preventDefault();
      //   setIsLoading(true);
      //   setError('');
    
      //   try {
      //     await register(email, password,fullName);
      //     router.push("/login");
      //   } catch (error) {
      //     setError('เกิดข้อผิดพลาดในการเข้าสู่ระบบ กรุณาลองใหม่อีกครั้ง');
      //   } finally {
      //     setIsLoading(false);
      //   }
      // };
    
    return (
    <div
      className="flex justify-center items-center min-h-screen bg-gray-100 bg-cover bg-center"
      style={{
        backgroundImage: 'url(/images/Backgroundlogin.jpg)',
      }}
    >
      <div className="flex justify-center rounded-lg items-center  bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Register</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="userName" className="block text-gray-700">Username</label>
              <input
                type="text"
                id="userName"
                className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Username"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Password"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="confirmPassword"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email"
              />
            </div>
            <button
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
    );
  }
  