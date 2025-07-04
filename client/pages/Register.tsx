import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { authAPI, handleAPIError } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Lock, Mail, User, Phone, ArrowRight } from "lucide-react";

export default function Register() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    agreeTerms: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const { fullName, email, phone, password, confirmPassword, agreeTerms } = formData;

  if (password !== confirmPassword) {
    alert("Kata sandi tidak cocok!");
    return;
  }

  if (!agreeTerms) {
    alert("Anda harus menyetujui syarat & ketentuan");
    return;
  }

  setIsLoading(true);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone,
      },
    },
  });

  setIsLoading(false);

  if (error) {
    alert(error.message);
  } else {
    // ✅ Kalau sukses, navigate ke halaman login
    navigate("/masuk");
  }
};



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center text-center p-12">
        <img
          src="https://cdn.builder.io/o/assets%2Fec2d43fcf8b54a079080fd57b2b293e8%2F5105ee43038e43c1a5e35d9df158470e?alt=media&token=d87a45ad-fc03-472a-bc02-8eeab82821c8&apiKey=ec2d43fcf8b54a079080fd57b2b293e8"
          alt="logo"
          className="w-24 h-24 mb-6 rounded-2xl shadow-xl object-cover"
        />
        <h1 className="text-4xl font-bold mb-2 gradient-text">KlixGenix.ID</h1>
        <p className="text-xl text-gray-300">All in One Premium Platform</p>
        <p className="text-gray-400 mt-4">Akses 50+ aplikasi premium, Netflix, Spotify, Adobe, dll.</p>
      </div>

      {/* Right Side - Register Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 py-12 sm:px-8">
        {/* Mobile Logo */}
        <div className="block lg:hidden flex flex-col justify-center items-center text-center mb-6">
          <img
            src="https://cdn.builder.io/o/assets%2Fec2d43fcf8b54a079080fd57b2b293e8%2F5105ee43038e43c1a5e35d9df158470e?alt=media&token=d87a45ad-fc03-472a-bc02-8eeab82821c8&apiKey=ec2d43fcf8b54a079080fd57b2b293e8"
            alt="Logo"
            className="w-20 h-20 mb-4 rounded-2xl shadow-xl object-cover"
          />
          <h2 className="text-lg text-gray-300">Buat akun baru</h2>
        </div>

        <div className="w-full max-w-md mx-auto bg-white/5 border border-white/10 p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold text-white text-center mb-4">Daftar</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-white text-sm font-medium">Nama Lengkap</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Masukkan nama lengkap"
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 pl-12 py-3 rounded-xl"
                  required
                />
              </div>
            </div>

            {/* Email */}
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

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white text-sm font-medium">Nomor Telepon</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+62 812-3456-7890"
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 pl-12 py-3 rounded-xl"
                  required
                />
              </div>
            </div>

            {/* Password */}
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
                  placeholder="Minimal 8 karakter"
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 pl-12 pr-12 py-3 rounded-xl"
                  required
                  minLength={8}
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

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-white text-sm font-medium">Konfirmasi Kata Sandi</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Ulangi kata sandi"
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 pl-12 pr-12 py-3 rounded-xl"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, agreeTerms: checked as boolean }))}
              />
              <Label htmlFor="agreeTerms" className="text-gray-300 text-sm leading-5">
                Saya menyetujui{" "}
                <Link to="/terms" className="text-primary hover:text-primary/80 font-medium">Syarat & Ketentuan</Link>{" "}
                dan{" "}
                <Link to="/privacy" className="text-primary hover:text-primary/80 font-medium">Kebijakan Privasi</Link>
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full gradient-primary text-white font-semibold py-3 rounded-xl"
              disabled={isLoading}
            >
              {isLoading ? "Mendaftar..." : <>Daftar <ArrowRight className="ml-2 w-4 h-4" /></>}
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
