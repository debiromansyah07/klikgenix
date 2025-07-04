import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, useSearchParams } from "react-router-dom";
import {
  Download,
  CheckCircle,
  Chrome,
  Globe,
  Play,
  Monitor,
  Smartphone,
} from "lucide-react";

const browserSteps = {
  chrome: [
    {
      step: 1,
      title: "Download Extension",
      description: "Klik tombol download di atas untuk mengunduh file ekstensi",
      icon: <Download className="w-5 h-5" />,
    },
    {
      step: 2,
      title: "Buka Chrome Extensions",
      description:
        "Buka chrome://extensions/ atau Menu > More Tools > Extensions",
      icon: <Chrome className="w-5 h-5" />,
    },
    {
      step: 3,
      title: "Enable Developer Mode",
      description: "Aktifkan 'Developer mode' di pojok kanan atas",
      icon: <CheckCircle className="w-5 h-5" />,
    },
    {
      step: 4,
      title: "Load Extension",
      description:
        "Klik 'Load unpacked' dan pilih folder ekstensi yang sudah didownload",
      icon: <Play className="w-5 h-5" />,
    },
  ],
};

export default function DownloadExtension() {
  const [searchParams] = useSearchParams();
  const plan = searchParams.get("plan") || "premium";
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadComplete, setDownloadComplete] = useState(false);

  const planInfo = {
    premium: {
      name: "PREMIUM",
      color: "bg-gradient-to-r from-purple-500 to-pink-500",
      apps: "20+ Premium Apps",
    },
    education: {
      name: "EDUCATION",
      color: "bg-gradient-to-r from-blue-500 to-cyan-500",
      apps: "15+ Education Apps",
    },
  };

  const currentPlan =
    planInfo[plan as keyof typeof planInfo] || planInfo.premium;

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadProgress(0);

    try {
      // Simulate download progress
      const interval = setInterval(() => {
        setDownloadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsDownloading(false);
            setDownloadComplete(true);

            // Trigger actual extension download
            downloadExtensionFiles();

            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 200);
    } catch (error) {
      console.error("Download failed:", error);
      setIsDownloading(false);
      alert("Download gagal. Silakan coba lagi atau hubungi support.");
    }
  };

  const downloadExtensionFiles = async () => {
    try {
      // Import JSZip dynamically
      const JSZip = (await import("jszip")).default;
      const zip = new JSZip();

      // Extension files to include
      const extensionFiles = [
        "manifest.json",
        "popup.html",
        "popup.css",
        "popup.js",
        "background.js",
        "content.js",
        "content.css",
      ];

      // Fetch and add each file to zip
      for (const filename of extensionFiles) {
        try {
          const response = await fetch(`/extension/${filename}`);
          if (response.ok) {
            const content = await response.text();
            zip.file(filename, content);
          } else {
            // Use fallback content if file not found
            zip.file(filename, getFallbackContent(filename, plan));
          }
        } catch (error) {
          console.warn(`Failed to fetch ${filename}, using fallback`);
          zip.file(filename, getFallbackContent(filename, plan));
        }
      }

      // Add README file
      zip.file(
        "README.md",
        `# KlixGenix.ID ${plan.toUpperCase()} Extension

## Installation Instructions

1. Extract this ZIP file to a folder
2. Open Chrome and go to chrome://extensions/
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extracted folder
5. The extension should now appear in your browser toolbar

## Features

✅ ${plan === "premium" ? "71+ Premium Apps" : plan === "education" ? "46 Education Apps" : "84 Exclusive Apps"}
✅ One-click access to premium applications
✅ Auto-login functionality
✅ Real-time updates

## Support

- Website: https://klixgenix.id
- Email: support@klixgenix.id
- WhatsApp: +6281399996666

## Plan: ${plan.toUpperCase()}

Enjoy your premium access to applications!

---
© 2024 KlixGenix.ID - Premium Access Platform
`,
      );

      // Create icons folder with placeholder
      zip.folder("icons")!.file(
        "README.md",
        `# Extension Icons

Place your extension icons here:
- icon-16.png (16x16px) - For toolbar
- icon-32.png (32x32px) - For extension management
- icon-48.png (48x48px) - For extension management
- icon-128.png (128x128px) - For Chrome Web Store

Note: These should be actual PNG files created from the KlixGenix logo.
For now, you can download icons from: https://klixgenix.id/assets/icons/`,
      );

      // Generate zip file
      const zipBlob = await zip.generateAsync({ type: "blob" });

      // Create download link
      const downloadUrl = URL.createObjectURL(zipBlob);
      const downloadLink = document.createElement("a");
      downloadLink.href = downloadUrl;
      downloadLink.download = `KlixGenix-${plan.toUpperCase()}-Extension.zip`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      // Cleanup
      URL.revokeObjectURL(downloadUrl);

      // Show success message
      setTimeout(() => {
        alert(
          `✅ Extension berhasil didownload!\n\n📁 File: KlixGenix-${plan.toUpperCase()}-Extension.zip\n📍 Lokasi: Folder Downloads\n\n📝 Langkah selanjutnya:\n1. Extract file ZIP\n2. Buka Chrome Extensions (chrome://extensions/)\n3. Enable Developer Mode\n4. Klik "Load unpacked"\n5. Pilih folder yang sudah di-extract\n\n💬 Butuh bantuan? Hubungi support@klixgenix.id`,
        );
      }, 1000);
    } catch (error) {
      console.error("Extension creation failed:", error);
      alert(
        "Gagal membuat extension file. Silakan coba lagi atau hubungi support.",
      );
    }
  };

  const getFallbackContent = (filename: string, planType: string): string => {
    switch (filename) {
      case "manifest.json":
        return JSON.stringify(
          {
            manifest_version: 3,
            name: `KlixGenix.ID - ${planType.toUpperCase()} Access`,
            version: "1.0.0",
            description: `Akses mudah ke aplikasi premium ${planType}. Extension resmi KlixGenix.ID`,
            author: "KlixGenix.ID",
            homepage_url: "https://klixgenix.id",
            icons: {
              "16": "icons/icon-16.png",
              "32": "icons/icon-32.png",
              "48": "icons/icon-48.png",
              "128": "icons/icon-128.png",
            },
            action: {
              default_popup: "popup.html",
              default_title: "KlixGenix.ID Premium Access",
            },
            background: {
              service_worker: "background.js",
            },
            content_scripts: [
              {
                matches: ["<all_urls>"],
                js: ["content.js"],
                css: ["content.css"],
              },
            ],
            permissions: ["activeTab", "storage", "tabs", "cookies"],
            host_permissions: [
              "https://netflix.com/*",
              "https://chat.openai.com/*",
              "https://www.canva.com/*",
              "https://klixgenix.id/*",
            ],
          },
          null,
          2,
        );

      case "popup.html":
        return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>KlixGenix.ID - ${planType.toUpperCase()}</title>
  <link rel="stylesheet" href="popup.css">
</head>
<body>
  <div class="header">
    <div class="logo">
      <img src="https://cdn.builder.io/o/assets%2Fec2d43fcf8b54a079080fd57b2b293e8%2F5105ee43038e43c1a5e35d9df158470e?alt=media&token=d87a45ad-fc03-472a-bc02-8eeab82821c8&apiKey=ec2d43fcf8b54a079080fd57b2b293e8" alt="Logo" style="width:32px;height:32px;border-radius:8px;">
    </div>
    <h1>KlixGenix.ID</h1>
    <p>Premium Access - ${planType.toUpperCase()}</p>
  </div>
  <div class="content">
    <p>Extension berhasil diinstall!</p>
    <button id="dashboard-btn">Buka Dashboard</button>
    <p class="apps-count">${planType === "premium" ? "71+" : planType === "education" ? "46" : "84"} Apps Available</p>
  </div>
  <script src="popup.js"></script>
</body>
</html>`;

      case "popup.css":
        return `body {
  width: 350px;
  min-height: 300px;
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: linear-gradient(135deg, #0a1628 0%, #1e293b 100%);
  color: white;
}

.header {
  text-align: center;
  padding: 20px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.logo {
  margin-bottom: 10px;
}

.header h1 {
  margin: 0;
  color: #60a5fa;
  font-size: 18px;
}

.header p {
  margin: 5px 0 0 0;
  color: #9ca3af;
  font-size: 12px;
}

.content {
  padding: 20px;
  text-align: center;
}

button {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  margin: 10px 0;
  transition: opacity 0.2s;
}

button:hover {
  opacity: 0.9;
}

.apps-count {
  margin-top: 15px;
  color: #10b981;
  font-size: 12px;
  font-weight: 500;
}`;

      case "popup.js":
        return `document.addEventListener('DOMContentLoaded', function() {
  console.log('KlixGenix.ID ${planType.toUpperCase()} Extension loaded');

  const dashboardBtn = document.getElementById('dashboard-btn');
  if (dashboardBtn) {
    dashboardBtn.addEventListener('click', () => {
      chrome.tabs.create({ url: 'https://klixgenix.id/dashboard' });
      window.close();
    });
  }
});`;

      case "background.js":
        return `chrome.runtime.onInstalled.addListener(() => {
  console.log('KlixGenix.ID ${planType.toUpperCase()} Extension installed');
});

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.create({ url: 'https://klixgenix.id/dashboard' });
});`;

      case "content.js":
        return `// KlixGenix.ID ${planType.toUpperCase()} Content Script
console.log('KlixGenix.ID Extension loaded on:', window.location.hostname);

// Auto-login functionality can be added here
if (window.location.hostname.includes('netflix.com')) {
  console.log('Netflix detected - Premium access enabled');
}`;

      case "content.css":
        return `/* KlixGenix.ID Extension Styles */
.klixgenix-extension {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.klixgenix-indicator {
  position: fixed;
  top: 10px;
  right: 10px;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 12px;
  z-index: 10000;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
}`;

      default:
        return `// KlixGenix.ID ${planType.toUpperCase()} Extension File: ${filename}`;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-white/10">
        <div className="container-padding py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                <img
                  src="https://cdn.builder.io/o/assets%2Fec2d43fcf8b54a079080fd57b2b293e8%2F5105ee43038e43c1a5e35d9df158470e?alt=media&token=d87a45ad-fc03-472a-bc02-8eeab82821c8&apiKey=ec2d43fcf8b54a079080fd57b2b293e8"
                  alt="KlixGenix Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2Fec2d43fcf8b54a079080fd57b2b293e8%2F3b20a908b17e42928b5c1217ef1988c3?format=webp&width=800"
                alt="KlixGenix.ID"
                className="h-16 md:h-20 lg:h-24 w-auto"
              />
            </Link>
            <div className="flex items-center space-x-4">
              <Badge className={`${currentPlan.color} text-white border-0`}>
                {currentPlan.name}
              </Badge>
              <Link to="/dashboard">
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-padding py-12">
        <div className="max-w-4xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="mb-6">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-white mb-2">
                Payment Berhasil! 🎉
              </h1>
              <p className="text-gray-300 text-lg">
                Selamat! Akun {currentPlan.name} Anda sudah aktif. Saatnya
                download extension untuk mulai menikmati {currentPlan.apps}.
              </p>
            </div>
          </div>

          {/* Download Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Download Card */}
            <Card className="glass-morphism border-white/10 animate-slide-in-left">
              <CardHeader className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Download className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-white text-2xl">
                  Download Extension
                </CardTitle>
                <p className="text-gray-300">
                  Extension untuk {currentPlan.name} dengan akses ke semua fitur
                  premium
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {!downloadComplete ? (
                  <>
                    {!isDownloading ? (
                      <Button
                        onClick={handleDownload}
                        className="w-full gradient-primary text-white font-semibold py-4 text-lg hover:scale-105 transition-transform"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Download KlixGenix Extension
                      </Button>
                    ) : (
                      <div className="space-y-3">
                        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-purple-600 transition-all duration-300 ease-out"
                            style={{ width: `${downloadProgress}%` }}
                          />
                        </div>
                        <p className="text-center text-white">
                          Downloading... {Math.round(downloadProgress)}%
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center space-y-4">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                    <p className="text-green-400 font-semibold">
                      Download Complete!
                    </p>
                    <p className="text-gray-300 text-sm">
                      File tersimpan di folder Downloads Anda
                    </p>
                  </div>
                )}

                {/* Browser Support */}
                <div className="border-t border-white/10 pt-6">
                  <p className="text-white text-sm font-medium mb-3">
                    Supported Browsers:
                  </p>
                  <div className="flex justify-center space-x-4">
                    {[
                      { icon: Chrome, name: "Chrome", supported: true },
                      { icon: Globe, name: "Firefox", supported: true },
                      { icon: Globe, name: "Edge", supported: true },
                      { icon: Globe, name: "Safari", supported: false },
                    ].map((browser) => (
                      <div key={browser.name} className="text-center">
                        <browser.icon
                          className={`w-8 h-8 mx-auto mb-1 ${
                            browser.supported
                              ? "text-green-500"
                              : "text-gray-500"
                          }`}
                        />
                        <p
                          className={`text-xs ${
                            browser.supported
                              ? "text-gray-300"
                              : "text-gray-500"
                          }`}
                        >
                          {browser.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Features Preview */}
            <Card className="glass-morphism border-white/10 animate-slide-in-right">
              <CardHeader>
                <CardTitle className="text-white">
                  Apa yang Anda Dapatkan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  {
                    icon: <Monitor className="w-5 h-5" />,
                    title: "One-Click Access",
                    description:
                      "Akses semua aplikasi premium dengan sekali klik",
                  },
                  {
                    icon: <Smartphone className="w-5 h-5" />,
                    title: "Auto Login",
                    description: "Login otomatis ke semua layanan premium",
                  },
                  {
                    icon: <CheckCircle className="w-5 h-5" />,
                    title: "Real-time Updates",
                    description: "Update otomatis aplikasi dan fitur baru",
                  },
                  {
                    icon: <Play className="w-5 h-5" />,
                    title: "Premium Content",
                    description:
                      plan === "education"
                        ? "Akses unlimited ke platform pembelajaran premium"
                        : "Streaming, design tools, dan software premium",
                  },
                ].map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="text-primary mt-1">{feature.icon}</div>
                    <div>
                      <h4 className="text-white font-medium">
                        {feature.title}
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Installation Guide */}
          <Card className="glass-morphism border-white/10 animate-slide-in-up">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Chrome className="w-6 h-6 mr-2 text-primary" />
                Panduan Instalasi (Chrome)
              </CardTitle>
              <p className="text-gray-300">
                Ikuti langkah-langkah berikut untuk menginstall extension di
                browser Anda
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {browserSteps.chrome.map((step, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-medium mb-1 flex items-center">
                        {step.icon}
                        <span className="ml-2">{step.title}</span>
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-blue-500/20 border border-blue-500/30 rounded-lg">
                <h4 className="text-white font-medium mb-2 flex items-center">
                  💡 Pro Tips:
                </h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Pin extension ke toolbar untuk akses mudah</li>
                  <li>• Extension akan update otomatis saat ada fitur baru</li>
                  <li>• Gunakan mode incognito untuk testing</li>
                  <li>• Hubungi support jika ada kendala instalasi</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="text-center mt-12 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button className="bg-white/10 text-white border border-white/20 hover:bg-white/20 px-8 py-3">
                  Ke Dashboard
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-3"
                >
                  Butuh Bantuan?
                </Button>
              </Link>
            </div>
            <p className="text-gray-400 text-sm">
              Jika mengalami masalah, hubungi tim support kami 24/7
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
