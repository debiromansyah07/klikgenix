import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function Register() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    agreeTerms: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { full_name, email, phone, password, confirmPassword, agreeTerms } = formData;

      if (password !== confirmPassword) {
        toast({ variant: "destructive", title: "Error", description: "Kata sandi tidak cocok." });
        return;
      }

      if (!agreeTerms) {
        toast({ variant: "destructive", title: "Error", description: "Harap setujui syarat & ketentuan." });
        return;
      }

      const result = await authAPI.register({ email, password, full_name, phone });

      if (result.error) {
        toast({
          variant: "destructive",
          title: "Gagal Daftar",
          description: result.error.message || "Terjadi kesalahan saat mendaftar.",
        });
      } else if (result.data?.user) {
        toast({ title: "Pendaftaran Berhasil", description: "Silakan login untuk melanjutkan." });
        navigate("/masuk");
      } else {
        toast({ variant: "destructive", title: "Gagal Daftar", description: "Tidak bisa mendaftar, coba lagi." });
      }
    } catch (error: any) {
      toast({ variant: "destructive", title: "Gagal Daftar", description: error?.message || "Terjadi kesalahan." });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center text-center p-12">
        <img
          src="https://cdn.builder.io/api/v1/image/assets%2Fec2d43fcf8b54a079080fd57b2b293e8%2F3b20a908b17e42928b5c1217ef1988c3"
          alt="logo"
          className="w-24 h-24 mb-6 rounded-2xl shadow-xl object-cover"
        />
        <h1 className="text-4xl font-bold mb-2 gradient-text">KlixGenix.ID</h1>
        <p className="text-xl text-gray-300">All in One Premium Platform</p>
        <p className="text-gray-400 mt-4">Akses 50+ aplikasi premium, Netflix, Spotify, Adobe, dll.</p>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-md mx-auto bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-white text-center mb-4">Daftar</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="fullName" className="text-white text-sm font-medium">Nama Lengkap</Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Nama lengkap"
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 py-3 rounded-xl"
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-white text-sm font-medium">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="nama@email.com"
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 py-3 rounded-xl"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-white text-sm font-medium">No. HP</Label>
              <Input
                id="phone"
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                placeholder="08xxxxxxxxxx"
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 py-3 rounded-xl"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-white text-sm font-medium">Kata Sandi</Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 py-3 rounded-xl"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-white text-sm font-medium">Konfirmasi Kata Sandi</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 py-3 rounded-xl"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="accent-primary"
              />
              <Label htmlFor="agreeTerms" className="text-white text-sm">Saya menyetujui syarat & ketentuan</Label>
            </div>

            <Button
              type="submit"
              className="w-full gradient-primary text-white font-semibold py-3 rounded-xl"
              disabled={isLoading}
            >
              {isLoading ? "Memproses..." : "Daftar"}
            </Button>

            <div className="text-center">
              <span className="text-gray-400">Sudah punya akun? </span>
              <Link to="/masuk" className="text-primary hover:text-primary/80 font-medium">Masuk di sini</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
