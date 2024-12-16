// pages/test2/[carID]/page.jsx
"use client";
import { useParams } from 'next/navigation';

export default function ExampleClientComponent() {
  const params = useParams(); // ใช้ useParams เพื่อดึงค่าจาก query string

  console.log(params); // ดูค่าที่ได้จาก query

  return (
    <div>
      <h1>Query Information</h1>
      <p>Received carID: {params.carID}</p>
    </div>
  );
}