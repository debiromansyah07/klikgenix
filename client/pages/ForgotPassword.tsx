export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="max-w-md w-full px-4 py-8 glass-morphism rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Reset Kata Sandi</h1>
        <p className="text-gray-300 mb-6">
          Masukkan email akun kamu untuk mendapatkan tautan reset.
        </p>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email kamu"
            className="w-full p-3 rounded bg-white/10 text-white border border-white/20"
            required
          />
          <button
            type="submit"
            className="w-full bg-primary py-3 rounded text-white font-semibold"
          >
            Kirim Tautan Reset
          </button>
        </form>
      </div>
    </div>
  );
}
