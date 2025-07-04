import { useState } from "react";

const tabs = ["PREMIUM", "EXCLUSIVE", "EDUCATION"];

const services = {
  PREMIUM: [
    {
      name: "ChatGPT",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1746611969622.png",
    },
    {
      name: "Netflix",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1746611849606.png",
    },
    {
      name: "Prime Video",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1746612054926.png",
    },
    {
      name: "Bstation",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1745323394943.png",
    },
    {
      name: "Crunchyroll",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1746612117525.png",
    },
    {
      name: "DeepL",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331534749.png",
    },
    {
      name: "Canva",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1747072394897.png",
    },
    {
      name: "Turnitin",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331054170.png",
    },
    {
      name: "Envato Elements",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331061271.png",
    },
    {
      name: "Viu",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331067913.png",
    },
    {
      name: "Viu Premium+",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1731920209155.png",
    },
    {
      name: "QuillBot",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331083847.png",
    },
    {
      name: "Perplexity",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331118569.png",
    },
    {
      name: "Capcut Website",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331130077.png",
    },
    {
      name: "Scribd",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331170322.png",
    },
    {
      name: "Everand",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331186085.png",
    },
    {
      name: "Slideshare",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331200277.png",
    },
    {
      name: "Scholarcy",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331211227.png",
    },
    {
      name: "WeTV",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331247021.png",
    },
    {
      name: "iflix",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331360016.png",
    },
    {
      name: "Grammarly",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331265501.png",
    },
    {
      name: "Academia Edu",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331277249.png",
    },
    {
      name: "iLoveIMG",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1747077032124.png",
    },
    {
      name: "iLovePDF",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1747077018950.png",
    },
    {
      name: "Duolingo",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331338823.png",
    },
    {
      name: "Freepik",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331369581.png",
    },
    {
      name: "Flaticon",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1736840945897.png",
    },
    {
      name: "YouTube No Ads",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730641254123.png",
    },
    {
      name: "Coursera",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331424928.png",
    },
    {
      name: "Semrush",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1732257003678.png",
    },
    {
      name: "Epidemic Sound",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331436616.png",
    },
    {
      name: "HBO Max",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1745323279912.png",
    },
    {
      name: "Busuu",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1745323415059.png",
    },
    {
      name: "Scite AI",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1732257044432.png",
    },
    {
      name: "iQIYI",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730448810175.jpg",
    },
    {
      name: "Skillshare",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730693747061.jpg",
    },
    {
      name: "SciSpace",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1731051815321.png",
    },
    {
      name: "Production Crate",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1731855623564.png",
    },
    {
      name: "Sider AI",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1731854871727.jpg",
    },
    {
      name: "CatchPlay+",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1731859910216.png",
    },
    {
      name: "YOUKU",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1731990136216.png",
    },
    {
      name: "AskYourPDF",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1745323369891.png",
    },
    {
      name: "Wattpad Premium",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1732185782594.jpg",
    },
    {
      name: "Curiosity Stream",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1732205553839.png",
    },
    {
      name: "Consensus",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1732204515132.png",
    },
    {
      name: "Character AI",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1732612711504.jpg",
    },
    {
      name: "Gamma",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1732610563803.jpg",
    },
    {
      name: "Vision+",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1732612974128.png",
    },
    {
      name: "Tabnine",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1735138299559.png",
    },
    {
      name: "Marvel Unlimited",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1736564477280.png",
    },
    {
      name: "Slidesgo",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1733226866846.png",
    },
    {
      name: "Vecteezy",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331447055.png",
    },
    {
      name: "Jenni AI",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1735024317747.jpg",
    },
    {
      name: "Apple TV+",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1739989183213.png",
    },
    {
      name: "Creative Fabrica",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1742975667195.png",
    },
    {
      name: "Ubersuggest",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730807172007.png",
    },
    {
      name: "Motion Array",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331389539.png",
    },
    {
      name: "Loklok",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1731858512680.png",
    },
    {
      name: "BypassGPT",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1745323456546.png",
    },
    {
      name: "All Debrid",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1743144718593.png",
    },
    {
      name: "Pikbest",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1743145750076.png",
    },
    {
      name: "Quizlet",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1743146609054.png",
    },
    {
      name: "Vector Magic",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1743146082937.png",
    },
    {
      name: "Rawpixel",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1743145097224.png",
    },
    {
      name: "Lovepik",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1745648452399.png",
    },
    {
      name: "Pngtree",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1743145925428.png",
    },
    {
      name: "Slidesdocs",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1743145966747.png",
    },
    {
      name: "Sora AI Plus",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1745635559367.png",
    },
    {
      name: "Speechify",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1744808862117.png",
    },
    {
      name: "Trae AI",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1749530048535.png",
    },
  ],
  EXCLUSIVE: [
    {
      name: "Exclusive Netflix",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1742276395218.png",
    },
    {
      name: "Exclusive ChatGPT Plus",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1742972212659.png",
    },
    {
      name: "Exclusive ChatGPT PRO",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1742277395672.png",
    },
    {
      name: "Exclusive beIN Sports",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1742972235931.png",
    },
    {
      name: "Exclusive Disney+ Hotstar",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1742272953621.png",
    },
    {
      name: "Exclusive Vidio.com",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1742273215456.png",
    },
    {
      name: "Exclusive Perplexity",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1742273033964.png",
    },
    {
      name: "Exclusive Coohom",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1742272886137.png",
    },
    {
      name: "Exclusive Sora Pro",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1742273203148.png",
    },
    {
      name: "Exclusive Sora Plus",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1742273100681.png",
    },
    {
      name: "Exclusive Blackbox AI",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1747729192193.png",
    },
    {
      name: "Exclusive Trae AI",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1749527372782.png",
    },
    {
      name: "Exclusive Cursor AI",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1749553775737.png",
    },
  ],
  EDUCATION: [
    {
      name: "ChatGPT",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1746611969622.png",
    },
    {
      name: "DeepL",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331534749.png",
    },
    {
      name: "Canva",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1747072394897.png",
    },
    {
      name: "Turnitin",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331054170.png",
    },
    {
      name: "QuillBot",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331083847.png",
    },
    {
      name: "Envato Elements",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331061271.png",
    },
    {
      name: "Perplexity",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331118569.png",
    },
    {
      name: "Scribd",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331170322.png",
    },
    {
      name: "Everand",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331186085.png",
    },
    {
      name: "Slideshare",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331200277.png",
    },
    {
      name: "Scholarcy",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331211227.png",
    },
    {
      name: "Grammarly",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331265501.png",
    },
    {
      name: "Academia Edu",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331277249.png",
    },
    {
      name: "iLoveIMG",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1747077032124.png",
    },
    {
      name: "iLovePDF",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1747077018950.png",
    },
    {
      name: "Busuu",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1745323415059.png",
    },
    {
      name: "Freepik",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331369581.png",
    },
    {
      name: "Duolingo",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331338823.png",
    },
    {
      name: "Coursera",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331424928.png",
    },
    {
      name: "Scite AI",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1732257044432.png",
    },
    {
      name: "Flaticon",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1736840945897.png",
    },
    {
      name: "Tabnine",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1735138299559.png",
    },
    {
      name: "Skillshare",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730693747061.jpg",
    },
    {
      name: "Sider AI",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1731854871727.jpg",
    },
    {
      name: "Production Crate",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1731855623564.png",
    },
    {
      name: "SciSpace",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1731051815321.png",
    },
    {
      name: "Capcut Website",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331130077.png",
    },
    {
      name: "Epidemic Sound",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331436616.png",
    },
    {
      name: "Wattpad Premium",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1732185782594.jpg",
    },
    {
      name: "Gamma",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1732610563803.jpg",
    },
    {
      name: "Consensus",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1732204515132.png",
    },
    {
      name: "Character AI",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1732612711504.jpg",
    },
    {
      name: "Marvel Unlimited",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1736564477280.png",
    },
    {
      name: "Jenni AI",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1735024317747.jpg",
    },
    {
      name: "Motion Array",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331389539.png",
    },
    {
      name: "Semrush",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1732257003678.png",
    },
    {
      name: "Ubersuggest",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730807172007.png",
    },
    {
      name: "AskYourPDF",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1745323369891.png",
    },
    {
      name: "Slidesgo",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1733226866846.png",
    },
    {
      name: "IconScout",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1730331349336.png",
    },
    {
      name: "Pikbest",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1743145750076.png",
    },
    {
      name: "Lovepik",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1745648452399.png",
    },
    {
      name: "Slidesdocs",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1743145966747.png",
    },
    {
      name: "Pngtree",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1743145925428.png",
    },
    {
      name: "Creative Fabrica",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1742975667195.png",
    },
    {
      name: "Rawpixel",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1743145097224.png",
    },
    {
      name: "Vector Magic",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1743146082937.png",
    },
    {
      name: "All Debrid",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1743144718593.png",
    },
    {
      name: "Quizlet",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1743146609054.png",
    },
    {
      name: "BypassGPT",
      logo: "https://cdn.premiumportal.id/be/uploads/types/type-1745323456546.png",
    },
  ],
};

export default function ExclusiveSection() {
  const [activeTab, setActiveTab] = useState("EXCLUSIVE");

  return (
    <section className="section-spacing bg-gradient-to-br from-background to-card">
      <div className="container-padding">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="glass-morphism rounded-full p-2 flex space-x-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-full font-semibold transition-all ${
                  activeTab === tab
                    ? "bg-primary text-white"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mb-12">
          {services[activeTab as keyof typeof services].map(
            (service, index) => (
              <div
                key={index}
                className="glass-morphism rounded-xl p-4 text-center group hover:scale-105 transition-transform duration-300 min-h-[120px] flex flex-col justify-between"
              >
                {/* Service Logo */}
                <div className="w-16 h-16 mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <img
                    src={service.logo}
                    alt={service.name}
                    className="w-full h-full object-contain rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "https://via.placeholder.com/64x64/1f2937/ffffff?text=" +
                        encodeURIComponent(service.name.slice(0, 2));
                    }}
                  />
                </div>

                {/* Service Name */}
                <h3 className="text-white font-medium text-xs leading-tight">
                  {service.name}
                </h3>
              </div>
            ),
          )}
        </div>

        {/* Plan Statistics */}
        <div className="text-center mb-8">
          <div className="glass-morphism rounded-xl p-6 max-w-4xl mx-auto">
            {activeTab === "PREMIUM" && (
              <div>
                <h4 className="text-white font-bold text-lg mb-4">
                  🌟 Paket Premium
                </h4>
                <p className="text-gray-300 text-sm mb-4">
                  Akses ke {services.PREMIUM.length} aplikasi premium terpopuler
                </p>
                <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-300">
                  <span>✓ ChatGPT</span>
                  <span>✓ Netflix</span>
                  <span>✓ Prime Video</span>
                  <span>✓ Canva</span>
                  <span>
                    ✓ Dan {services.PREMIUM.length - 4}+ layanan lainnya
                  </span>
                </div>
              </div>
            )}

            {activeTab === "EXCLUSIVE" && (
              <div>
                <h4 className="text-white font-bold text-lg mb-4">
                  🚀 Paket Exclusive
                </h4>
                <p className="text-primary text-xl font-bold mb-4">
                  DAN SEMUA YANG ADA PADA PAKET PREMIUM
                </p>
                <p className="text-gray-300 text-sm mb-4">
                  {services.EXCLUSIVE.length} aplikasi eksklusif +{" "}
                  {services.PREMIUM.length} aplikasi premium = Total{" "}
                  {services.EXCLUSIVE.length + services.PREMIUM.length} aplikasi
                </p>
                <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-300">
                  <span>✓ Exclusive Netflix</span>
                  <span>✓ Exclusive ChatGPT PRO</span>
                  <span>✓ Exclusive Sora</span>
                  <span>✓ Exclusive beIN Sports</span>
                  <span>✓ Dan semua premium apps</span>
                </div>
              </div>
            )}

            {activeTab === "EDUCATION" && (
              <div>
                <h4 className="text-white font-bold text-lg mb-4">
                  🎓 Khusus Pelajar & Mahasiswa
                </h4>
                <p className="text-gray-300 text-sm mb-4">
                  {services.EDUCATION.length} platform pembelajaran terbaik
                  dengan harga khusus pelajar
                </p>
                <p className="text-yellow-400 text-sm font-medium">
                  ⚠️ Verifikasi status pelajar/mahasiswa diperlukan
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
