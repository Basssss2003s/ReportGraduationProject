import Link from 'next/link';
 
export default function Register() {
    return (
    <div
      className="flex justify-center items-center min-h-screen bg-gray-100 bg-cover bg-center"
      style={{
        backgroundImage: 'url(/images/Backgroundlogin.jpg)',
      }}
    >
      <div className="flex justify-center rounded-lg items-center  bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-96">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">สมัครสมาชิก</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700">ชื่อผู้ใช้</label>
              <input
                type="text"
                id="username"
                className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ระบุชื่อผู้ใช้"
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
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700">ยืนยันคำผ่าน</label>
              <input
                type="password"
                id="confirmPassword"
                className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ระบุคำผ่าน"
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
  