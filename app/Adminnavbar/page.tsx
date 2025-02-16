"use client";

import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-white text-black px-6 py-4 shadow-md">
      <div className="text-lg font-semibold">
        ระบบร้องเรียนคณะบริหารธุรกิจ
      </div>

      <ul className="flex gap-6">
        <li>
          <Link href="/Main" className="hover:underline">
            หน้าหลัก
          </Link>
        </li>
        <li>
          <Link href="/Admincomplaint" className="hover:underline">
            คำร้องเรียน
          </Link>
        </li>
        <li>
          <Link href="/NotAvailable" className="hover:underline">
            ติดตามสถานะ
          </Link>
        </li>
        <li>
          <Link href="/Login" className="hover:underline">
            ออกจากระบบ
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;