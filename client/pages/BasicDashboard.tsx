import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import UpgradePlanModal from "@/components/UpgradePlanModal";
import { useState } from "react";

export default function BasicDashboard() {
  const { user, logout } = useAuth();
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.email}</h1>
      <p className="text-gray-300 mb-6">
        Anda belum memiliki plan aktif. Silakan pilih plan untuk mulai
        menggunakan layanan.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => setIsUpgradeModalOpen(true)}>Upgrade Plan</Button>
        <Button variant="destructive" onClick={logout}>Logout</Button>
      </div>

      <UpgradePlanModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        currentPlan="None"
      />
    </div>
  );
}
