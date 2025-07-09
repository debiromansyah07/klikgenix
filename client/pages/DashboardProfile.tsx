// src/pages/DashboardProfile.tsx
// src/pages/DashboardProfile.tsx
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function DashboardProfile() {
  const navigate = useNavigate();

  return (
    <div className="p-4 text-white space-y-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold">👤 Profil Anda</h1>
      <p className="text-gray-300">
        Anda belum memiliki langganan aktif. Untuk mengakses semua fitur premium, silakan upgrade ke salah satu paket kami.
      </p>

      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-white mb-2">Apa yang Anda dapatkan:</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li>Akses ke lebih dari 10 aplikasi AI</li>
          <li>Fitur integrasi Chrome Extension</li>
          <li>Dashboard penggunaan dan statistik lengkap</li>
          <li>Update & fitur eksklusif setiap bulan</li>
        </ul>
      </div>

      <div className="flex gap-4">
        <Button onClick={() => navigate("/harga")}>Lihat Paket Harga</Button>
        <Button variant="outline" onClick={() => navigate("/")}>Kembali ke Beranda</Button>
      </div>
    </div>
  );
}
