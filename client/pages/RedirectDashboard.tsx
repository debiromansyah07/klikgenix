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

  if (sessionError || !session?.session?.user) {
    navigate("/login");
    return;
  }

  const user = session.session.user;

  const { data: subsData } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", user.id);

  if (!subsData || subsData.length === 0) {
    navigate("/dashboard/profile");
    return;
  }

  const plan = subsData[0]?.plan;

  if (plan === "EXCLUSIVE") {
    navigate("/dashboard");
  } else if (plan === "EDUCATION") {
    navigate("/education-dashboard");
  } else if (plan === "PREMIUM") {
    navigate("/premium-dashboard");
  } else {
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
