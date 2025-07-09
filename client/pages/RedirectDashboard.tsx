// client/pages/RedirectDashboard.tsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

export default function RedirectDashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

useEffect(() => {
  const checkPlan = async () => {
    const { data: session, error: sessionError } = await supabase.auth.getSession();

    console.log("session:", session);
    console.log("sessionError:", sessionError);

    if (sessionError || !session?.session?.user) {
      console.log("Redirecting to /login");
      navigate("/login");
      return;
    }

    const user = session.session.user;
    console.log("Logged in user:", user);
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
        navigate("/dashboard");
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

    // Eksekusi fetch plan
    checkPlan();
  }, [user, loading, navigate]);

  return (
    <div className="text-white text-center mt-10">
      {loading ? "Memuat akun..." : "Mengalihkan ke dashboard..."}
    </div>
  );
}
