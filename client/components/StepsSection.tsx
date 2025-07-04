import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const steps = [
  {
    title: "Daftar dan buat akun KlixGenix.ID.",
    isActive: true,
  },
  {
    title: "Pilih paket langganan yang cocok untuk Anda.",
    isActive: false,
  },
  {
    title: "Lihat Video Tutorial dan pasang ekstensi pada browser Anda.",
    isActive: false,
  },
  {
    title:
      "Pilih Aplikasi Premium yang ingin Anda akses dengan sekali klik melalui ekstensi KlixGenix.ID.",
    isActive: false,
  },
];

// Video Tutorial 3 Slides sesuai screenshot
const tutorialSlides = [
  {
    id: 1,
    title: "Langkah-Langkah Penggunaan",
    image:
      "https://cdn.builder.io/o/assets%2Fec2d43fcf8b54a079080fd57b2b293e8%2F65b5b95b6be2476882392ac3538f8537?alt=media&token=2e801d77-cab7-4a87-8cbe-beb88246a866&apiKey=ec2d43fcf8b54a079080fd57b2b293e8",
    description: "Overview langkah-langkah penggunaan KlixGenix.ID",
  },
  {
    id: 2,
    title: "Panduan Lengkap & Pembayaran",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fec2d43fcf8b54a079080fd57b2b293e8%2F572936f26a3c4d218cca0fdf03a3e92c?format=webp&width=800",
    description: "Tutorial lengkap dan metode pembayaran",
  },
  {
    id: 3,
    title: "Tutorial Login & Akses Premium",
    image:
      "https://cdn.builder.io/api/v1/image/assets%2Fec2d43fcf8b54a079080fd57b2b293e8%2F8b950d3b2e134a5580df9c9e54718354?format=webp&width=800",
    description: "Cara menggunakan akun dan mengakses aplikasi premium",
  },
];

export default function StepsSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % tutorialSlides.length);
    }, 5000); // 5 detik per slide
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section-spacing bg-gradient-to-br from-background to-card">
      <div className="container-padding">
        <div className="flex items-center justify-between gap-16">
          {/* Left Column - Steps */}
          <div className="flex-1">
            <h2 className="text-4xl font-bold text-white mb-12">
              LANGKAH-LANGKAH PENGGUNAAN KLIXGENIX.ID
            </h2>

            {/* Steps List */}
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-4 p-4 rounded-lg transition-all cursor-pointer ${
                    index === activeStep
                      ? "bg-primary/20 border-l-4 border-primary"
                      : "hover:bg-white/5 border-l-4 border-transparent"
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  {/* Step Number */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                      index === activeStep
                        ? "bg-primary text-white"
                        : "bg-gray-600 text-gray-300"
                    }`}
                  >
                    {index + 1}
                  </div>

                  {/* Step Text */}
                  <p
                    className={`text-lg ${
                      index === activeStep
                        ? "text-white font-medium"
                        : "text-gray-300"
                    }`}
                  >
                    {step.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Video Tutorial Slides */}
          <div className="flex-1 flex flex-col items-center">
            <div className="glass-morphism rounded-2xl p-6 max-w-lg w-full mb-6">
              {/* Video Tutorial Container */}
              <div className="relative h-80 rounded-lg overflow-hidden mb-4 bg-gradient-to-br from-gray-800 to-gray-900">
                {tutorialSlides.map((slide, index) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-700 transform ${
                      index === currentSlide
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-105"
                    }`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}

                {/* Slide Navigation Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-lg">
                    <h3 className="font-semibold text-sm mb-1">
                      {tutorialSlides[currentSlide].title}
                    </h3>
                    <p className="text-xs text-gray-300">
                      {tutorialSlides[currentSlide].description}
                    </p>
                  </div>
                </div>

                {/* Step Counter */}
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {currentSlide + 1} / {tutorialSlides.length}
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={() =>
                    setCurrentSlide((prev) =>
                      prev === 0 ? tutorialSlides.length - 1 : prev - 1,
                    )
                  }
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                >
                  ‹
                </button>
                <button
                  onClick={() =>
                    setCurrentSlide(
                      (prev) => (prev + 1) % tutorialSlides.length,
                    )
                  }
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                >
                  ›
                </button>
              </div>

              {/* Slide Indicators */}
              <div className="flex justify-center space-x-3 mb-4">
                {tutorialSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-primary scale-125"
                        : "bg-gray-500 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Video Tutorial Button */}
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white font-medium px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              <span className="mr-2">📺</span>
              Lihat Video Tutorial
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
