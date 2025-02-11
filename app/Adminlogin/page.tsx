import Link from 'next/link';

export default function Login() {
  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gray-100 bg-cover bg-center"
      style={{
        backgroundImage: 'url(/images/BackgroundLogin.jpg)',
      }}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 opacity-100">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">เข้าสู่ระบบ</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">ชื่อผู้ใช้</label>
            <input
              type="text"
              id="username"
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="กรอกชื่อผู้ใช้"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">คำผ่าน</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ระบุคำผ่าน"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            เข้าสู่ระบบ
          </button>
        </form>
        <Link href="/login">
          <button
            className="w-full p-3 bg-white text-gray-600 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 mt-4"
          >
            สำหรับผู้ใช้งานทั่วไป
          </button>
        </Link>
      </div>
    </div>
  );
}
