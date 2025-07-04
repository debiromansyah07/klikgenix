import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/api";

export default function Login() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await authAPI.login(formData);

      if (result.error) {
        toast({
          variant: "destructive",
          title: "Login Gagal",
          description: result.error.message || "Email atau password salah.",
        });
      } else if (result.data?.user) {
        const { data: sessionData } = await supabase.auth.getSession();
      console.log("Session after login:", sessionData);
        toast({ title: "Login Berhasil", description: "Selamat datang kembali!" });

        // Tunggu sejenak supaya toast sempat tampil
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        toast({
          variant: "destructive",
          title: "Login Gagal",
          description: "Login gagal, data user tidak ditemukan.",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login Error",
        description: error?.message || "Terjadi kesalahan, coba lagi.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center text-center p-12">
        <img
          src="https://cdn.builder.io/o/assets%2Fec2d43fcf8b54a079080fd57b2b293e8%2F5105ee43038e43c1a5e35d9df158470e"
          alt="logo"
          className="w-24 h-24 mb-6 rounded-2xl shadow-xl object-cover"
        />
        <h1 className="text-4xl font-bold mb-2 gradient-text">KlixGenix.ID</h1>
        <p className="text-xl text-gray-300">All in One Premium Platform</p>
        <p className="text-gray-400 mt-4">Akses 50+ aplikasi premium, Netflix, Spotify, Adobe, dll.</p>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-md mx-auto bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-white text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white text-sm font-medium">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
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

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white text-sm font-medium">Kata Sandi</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
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
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full gradient-primary text-white font-semibold py-3 rounded-xl"
              disabled={isLoading}
            >
              {isLoading ? "Memproses..." : <>Masuk <ArrowRight className="ml-2 w-4 h-4" /></>}
            </Button>

            <div className="text-center">
              <span className="text-gray-400">Belum punya akun? </span>
              <Link to="/daftar" className="text-primary hover:text-primary/80 font-medium">Daftar sekarang</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
