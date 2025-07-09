import "./global.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RedirectDashboard from "@/pages/RedirectDashboard";

import Index from "./pages/Index";
import Fitur from "./pages/Fitur";
import Harga from "./pages/Harga";
import Tentang from "./pages/Tentang";
import Informasi from "./pages/Informasi";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Payment from "./pages/Payment";
import DownloadExtension from "./pages/DownloadExtension";
import ForgotPassword from "./pages/ForgotPassword";

import ExclusiveDashboard from "@/pages/ExclusiveDashboard";
import PremiumDashboard from "@/pages/PremiumDashboard";
import EducationDashboard from "@/pages/EducationDashboard";
import DashboardProfile from "@/pages/DashboardProfile";

import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase"; // atau supabaseUtils kalau kamu pakai helper sendiri

const queryClient = new QueryClient();

  function DashboardRedirect() {
  const { user, loading } = useAuth(); // pastikan useAuth return loading state juga
  const navigate = useNavigate();

   useEffect(() => {
    const checkPlan = async () => {
      const { data, error } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .eq("status", "active")
        .single();

      if (!data || error) {
        navigate("/dashboard/profile");
        return;
      }

      switch (data.plan) {
        case "EXCLUSIVE":
          navigate("/dashboard/exclusive");
          break;
        case "PREMIUM":
          navigate("/dashboard/premium");
          break;
        case "EDUCATION":
          navigate("/dashboard/education");
          break;
        default:
          navigate("/dashboard/profile");
      }
    };

    if (!loading && user?.id) {
      checkPlan();
    }
  }, [user, loading, navigate]);

  return (
    <div className="text-white p-8">
      {loading ? "Memuat akun Anda..." : "Mengalihkan ke dashboard..."}
    </div>
  );
}
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Index />} />
            <Route path="/fitur" element={<Fitur />} />
            <Route path="/harga" element={<Harga />} />
            <Route path="/tentang" element={<Tentang />} />
            <Route path="/informasi" element={<Informasi />} />
            <Route path="/masuk" element={<Login />} />
            <Route path="/daftar" element={<Register />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/download-extension" element={<DownloadExtension />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/login" element={<Login />} />


            <Route path="/dashboard" element={<Navigate to="/redirect-dashboard" replace />} />
            <Route path="/dashboard/exclusive" element={<ExclusiveDashboard />} />
            <Route path="/dashboard/premium" element={<PremiumDashboard />} />
            <Route path="/dashboard/education" element={<EducationDashboard />} />
            <Route path="/dashboard/profile" element={<DashboardProfile />} />
            <Route path="/redirect-dashboard" element={<RedirectDashboard />} />


            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
