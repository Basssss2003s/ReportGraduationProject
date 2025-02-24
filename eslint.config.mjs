import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // ปิดเตือน 'any'
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }], // ปิดเตือนตัวแปรไม่ได้ใช้
      "@next/next/no-img-element": "off", // ✅ ปิดเตือนการใช้ <img>
      "react/jsx-key": "off", // ✅ ปิดเตือนการใช้ key ใน .map()
    },
  },
];
export default eslintConfig;
