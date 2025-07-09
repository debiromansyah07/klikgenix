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
    <div className="text-white text-center mt-10">
      Redirecting to your dashboard...
    </div>
  );
}
