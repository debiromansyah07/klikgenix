import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { authAPI, handleAPIError } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "", rememberMe: false });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const result = await authAPI.login(formData);
      if (result.success && result.data) {
        login(result.data.user, result.data.token);
        toast({ title: "Login Berhasil", description: "Selamat datang kembali!" });
        const from = location.state?.from?.pathname || "/dashboard";
        navigate(from, { replace: true });
      }
    } catch (error) {
      toast({ variant: "destructive", title: "Login Gagal", description: handleAPIError(error) });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Left Side (branding) */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center text-center p-12">
        <img
          src="https://cdn.builder.io/o/assets%2Fec2d43fcf8b54a079080fd57b2b293e8%2F5105ee43038e43c1a5e35d9df158470e?alt=media"
          alt="Logo"
          className="w-24 h-24 mb-6 rounded-2xl shadow-xl object-cover"
        />
        <h1 className="text-4xl font-bold mb-2 gradient-text">KlixGenix.ID</h1>
        <p className="text-xl text-gray-300">All in One Premium Platform</p>
        <p className="text-gray-400 mt-4">Akses 50+ aplikasi premium, Netflix, Spotify, Adobe, dll.</p>
      </div>

      {/* Right Side (form) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 py-12 sm:px-8">
        <div className="block lg:hidden text-center mb-6">
          <img
            src="https://cdn.builder.io/o/assets%2Fec2d43fcf8b54a079080fd57b2b293e8%2F5105ee43038e43c1a5e35d9df158470e?alt=media&token=d87a45ad-fc03-472a-bc02-8eeab82821c8&apiKey=ec2d43fcf8b54a079080fd57b2b293e8
          alt="logo"
            className="w-16 h-16 mx-auto mb-2 rounded-2xl shadow-xl object-cover"
          />
          <h2 className="text-lg text-gray-300">Masuk ke akun Anda</h2>
        </div>

        <div className="w-full max-w-md mx-auto bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-white text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white text-sm font-medium">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="nama@email.com"
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 pl-12 py-3 rounded-xl"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white text-sm font-medium">Kata sandi</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 pl-12 pr-12 py-3 rounded-xl"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center space-x-2">
              <Checkbox id="rememberMe" name="rememberMe" checked={formData.rememberMe}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, rememberMe: checked as boolean }))}
                className="border-white/30" />
              <Label htmlFor="rememberMe" className="text-gray-300 text-sm">Ingat saya</Label>
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full gradient-primary text-white font-semibold py-3 rounded-xl">
              {isLoading ? "Memproses..." : <>Masuk <ArrowRight className="ml-2 w-4 h-4" /></>}
            </Button>

            <div className="text-center">
              <span className="text-gray-400">Belum punya akun? </span>
              <Link to="/register" className="text-primary hover:text-primary/80 font-medium">Daftar sekarang</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
