import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
// Removed credential modals - using extension access only
import AppsListModal from "@/components/AppsListModal";
import UpgradePlanModal from "@/components/UpgradePlanModal";
import { openWhatsAppSupport, openEmailSupport } from "@/lib/support";

const userData = {
  name: "John Doe",
  email: "john@example.com",
  plan: "EXCLUSIVE",
  planExpiry: "2024-12-31",
  usageQuota: 75,
  totalApps: 82, // 13 exclusive + 69 premium apps via extension
  usedApps: 15,
};

const recentActivities = [
  {
    app: "Exclusive Netflix",
    action: "Watched Movie",
    time: "2 hours ago",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1746611849606.png",
  },
  {
    app: "Exclusive ChatGPT Plus",
    action: "AI Chat Session",
    time: "4 hours ago",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1746611969622.png",
  },
  {
    app: "Exclusive beIN Sports",
    action: "Watched Sports",
    time: "6 hours ago",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1745323279912.png",
  },
  {
    app: "Exclusive Sora Pro",
    action: "Generated Video",
    time: "1 day ago",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1745635559367.png",
  },
];

const availableApps = [
  // Only 13 Exclusive Apps with Direct Credentials
  {
    name: "Exclusive Netflix",
    category: "Exclusive Streaming",
    status: "active",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1742276395218.png",
    exclusive: true,
  },
  {
    name: "Exclusive ChatGPT Plus",
    category: "Exclusive AI",
    status: "active",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1742972212659.png",
    exclusive: true,
  },
  {
    name: "Exclusive ChatGPT PRO",
    category: "Exclusive AI",
    status: "active",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1742277395672.png",
    exclusive: true,
  },
  {
    name: "Exclusive beIN Sports",
    category: "Exclusive Streaming",
    status: "active",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1742972235931.png",
    exclusive: true,
  },
  {
    name: "Exclusive Disney+ Hotstar",
    category: "Exclusive Streaming",
    status: "active",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1742272953621.png",
    exclusive: true,
  },
  {
    name: "Exclusive Vidio.com",
    category: "Exclusive Streaming",
    status: "active",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1742273215456.png",
    exclusive: true,
  },
  {
    name: "Exclusive Perplexity",
    category: "Exclusive AI",
    status: "active",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1742273033964.png",
    exclusive: true,
  },
  {
    name: "Exclusive Coohom",
    category: "Exclusive Design",
    status: "active",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1742272886137.png",
    exclusive: true,
  },
  {
    name: "Exclusive Sora Pro",
    category: "Exclusive AI",
    status: "active",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1742273203148.png",
    exclusive: true,
  },
  {
    name: "Exclusive Sora Plus",
    category: "Exclusive AI",
    status: "active",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1742273100681.png",
    exclusive: true,
  },
  {
    name: "Exclusive Blackbox AI",
    category: "Exclusive AI",
    status: "active",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1747729192193.png",
    exclusive: true,
  },
  {
    name: "Exclusive Trae AI",
    category: "Exclusive AI",
    status: "active",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1749527372782.png",
    exclusive: true,
  },
  {
    name: "Exclusive Cursor AI",
    category: "Exclusive Development",
    status: "active",
    icon: "https://cdn.premiumportal.id/be/uploads/types/type-1749553775737.png",
    exclusive: true,
  },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  // Removed credential modal states - using extension access only
  const [isAppsListModalOpen, setIsAppsListModalOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout Berhasil",
      description: "Anda telah keluar dari akun.",
    });
    navigate("/");
  };

  // Removed handleAppClick - all apps now use extension access only

  return (
    <div className="min-h-screen bg-background">
      {/* Removed credential modals - using extension access only */}

      {/* Apps List Modal - Show all 84 apps for Exclusive plan */}
      <AppsListModal
        isOpen={isAppsListModalOpen}
        onClose={() => setIsAppsListModalOpen(false)}
        planName="EXCLUSIVE"
        planPrice="Rp99.000"
        accessMethod="Extension Browser"
      />

      {/* Upgrade Plan Modal */}
      <UpgradePlanModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        currentPlan={userData.plan}
      />

      {/* Header */}
      <header className="glass-morphism border-b border-white/10 sticky top-0 z-40">
        <div className="container-padding">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden">
                  <img
                    src="https://cdn.builder.io/o/assets%2Fec2d43fcf8b54a079080fd57b2b293e8%2F5105ee43038e43c1a5e35d9df158470e?alt=media&token=d87a45ad-fc03-472a-bc02-8eeab82821c8&apiKey=ec2d43fcf8b54a079080fd57b2b293e8"
                    alt="KlixGenix Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-white font-bold text-xl">KlixGenix</span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-gray-300">
                Welcome, {user?.email || userData.email}
              </span>
              <Button
                variant="ghost"
                className="text-white"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-padding py-8">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          {/* Tab Navigation */}
          <TabsList className="grid w-full grid-cols-5 glass-morphism hover:scale-[1.02] transition-transform duration-300">
            <TabsTrigger
              value="overview"
              className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300 hover:scale-105"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="apps"
              className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300 hover:scale-105"
            >
              My Apps
            </TabsTrigger>
            <TabsTrigger
              value="tutorial"
              className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300 hover:scale-105"
            >
              📺 Video Tutorial
            </TabsTrigger>
            <TabsTrigger
              value="billing"
              className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300 hover:scale-105"
            >
              Billing
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300 hover:scale-105"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="glass-morphism border-white/10 hover:scale-105 hover:border-primary/30 transition-all duration-300 group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                    Active Plan
                  </CardTitle>
                  <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    💎
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {userData.plan}
                  </div>
                  <p className="text-xs text-gray-400">
                    Expires on {userData.planExpiry}
                  </p>
                </CardContent>
              </Card>

              <Card className="glass-morphism border-white/10 hover:scale-105 hover:border-primary/30 transition-all duration-300 group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                    Apps Used
                  </CardTitle>
                  <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    📱
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {userData.usedApps}/{userData.totalApps}
                  </div>
                  <Progress
                    value={(userData.usedApps / userData.totalApps) * 100}
                    className="mt-2 transition-all duration-1000 ease-out"
                  />
                </CardContent>
              </Card>

              <Card className="glass-morphism border-white/10 hover:scale-105 hover:border-primary/30 transition-all duration-300 group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                    Usage Quota
                  </CardTitle>
                  <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    ⚡
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">
                    {userData.usageQuota}%
                  </div>
                  <Progress
                    value={userData.usageQuota}
                    className="mt-2 transition-all duration-1000 ease-out"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="glass-morphism border-white/10 hover:scale-[1.02] transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription className="text-gray-300">
                  Your latest app usage and activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 group cursor-pointer"
                      style={{
                        animationDelay: `${index * 0.1}s`,
                        animation: "fadeInUp 0.6s ease-out forwards",
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                          <img
                            src={activity.icon}
                            alt={activity.app}
                            className="w-full h-full object-contain rounded"
                          />
                        </div>
                        <div>
                          <p className="text-white font-medium group-hover:text-primary transition-colors">
                            {activity.app}
                          </p>
                          <p className="text-gray-400 text-sm">
                            {activity.action}
                          </p>
                        </div>
                      </div>
                      <span className="text-gray-400 text-sm group-hover:text-white transition-colors">
                        {activity.time}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Apps Tab */}
          <TabsContent value="apps" className="space-y-6">
            {/* Access Method Info */}
            <Card className="glass-morphism border-white/10 border-primary/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <span className="text-2xl">🔑🔧</span>
                  Access Method - {userData.plan} Plan
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Hybrid access: 13 exclusive apps dengan direct credentials +
                  69 premium apps melalui extension
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <p className="text-blue-400 font-medium mb-2">
                    🔧 84 Apps - Extension Access
                  </p>
                  <p className="text-gray-300 text-sm">
                    Download dan install browser extension untuk akses mudah ke
                    semua 71 premium apps + 13 exclusive apps.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-morphism border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <span>Exclusive Apps</span>
                  <Badge
                    variant="outline"
                    className="border-purple-500 text-purple-400"
                  >
                    13 Apps
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsAppsListModalOpen(true)}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    View All 82 Apps
                  </Button>
                </CardTitle>
                <CardDescription className="text-gray-300">
                  13 aplikasi exclusive + 71 premium apps melalui extension
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {availableApps.map((app, index) => (
                    <div
                      key={index}
                      className="glass-morphism border-white/20 rounded-lg p-6 flex flex-col items-center space-y-3 group border-blue-500/30"
                    >
                      <div className="w-12 h-12 group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                        <img
                          src={app.icon}
                          alt={app.name}
                          className="w-full h-full object-contain rounded"
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-white font-medium group-hover:text-primary transition-colors">
                          {app.name}
                        </p>
                        <p className="text-gray-400 text-sm">{app.category}</p>
                      </div>
                      <div className="flex flex-col items-center space-y-2">
                        <Badge
                          variant="default"
                          className="bg-green-600 text-white"
                        >
                          {app.status}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-blue-500 text-blue-400 text-xs"
                        >
                          🔧 Extension Access
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Extension Download Section */}
            <Card className="glass-morphism border-white/10 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <span className="text-2xl">🔧</span>
                  Browser Extension
                  <Badge
                    variant="outline"
                    className="border-blue-500 text-blue-400"
                  >
                    69 Premium Apps
                  </Badge>
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Download extension untuk akses mudah ke 69 premium apps
                  (Netflix, ChatGPT, Canva, dll)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-blue-400 font-semibold text-lg mb-2">
                        KlixGenix Browser Extension
                      </h4>
                      <p className="text-gray-300 text-sm mb-4">
                        Akses mudah ke Netflix, Prime Video, ChatGPT, Canva, dan
                        65+ apps premium lainnya dengan sekali klik.
                      </p>
                    </div>
                    <div className="text-4xl">🧩</div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2">
                      <h5 className="text-white font-medium">✨ Features:</h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• One-click access ke premium apps</li>
                        <li>• Auto-login dengan credentials</li>
                        <li>• Search dan filter apps</li>
                        <li>• Quick favorites untuk apps favorit</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h5 className="text-white font-medium">
                        🌐 Supported Browsers:
                      </h5>
                      <ul className="text-gray-300 text-sm space-y-1">
                        <li>• Google Chrome</li>
                        <li>• Microsoft Edge</li>
                        <li>• Mozilla Firefox</li>
                        <li>• Opera</li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                      onClick={() => {
                        // Redirect to download extension page
                        window.location.href = "/download-extension";
                        toast({
                          title: "Redirecting to Download",
                          description: "Opening extension download page...",
                        });
                      }}
                    >
                      ��� Download Chrome Extension
                    </Button>
                    <Button
                      variant="outline"
                      className="border-blue-500 text-blue-400 hover:bg-blue-500/10"
                      onClick={() => {
                        // Redirect to installation guide page
                        window.open("/extension-guide", "_blank");
                        toast({
                          title: "Opening Installation Guide",
                          description:
                            "Step-by-step installation instructions.",
                        });
                      }}
                    >
                      📖 Installation Guide
                    </Button>
                  </div>

                  <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <p className="text-yellow-400 text-sm flex items-center gap-2">
                      <span>💡</span>
                      <span>
                        Setelah install extension, refresh browser dan klik icon
                        KlixGenix untuk mulai menggunakan premium apps.
                      </span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            {/* Plan Features Info */}
            <Card className="glass-morphism border-white/10 border-primary/20 hover-lift">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <span className="text-2xl">✨</span>
                  {userData.plan} Plan Features
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Akses method dan benefits yang Anda miliki
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Access Method:</h4>
                    <div className="space-y-3">
                      <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-blue-400">🔧</span>
                          <span className="text-blue-400 font-medium">
                            Browser Extension
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm">
                          Akses mudah ke semua 84 apps (71 premium + 13
                          exclusive) via browser extension
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Benefits:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-purple-400">🌟</span>
                        <span className="text-purple-300 text-sm">
                          13 Exclusive Apps + 69 Premium Apps
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-400">✅</span>
                        <span className="text-gray-300 text-sm">
                          Extension Access untuk semua apps
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-400">✅</span>
                        <span className="text-gray-300 text-sm">
                          24/7 Priority Support
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-400">✅</span>
                        <span className="text-gray-300 text-sm">
                          Regular Updates
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-purple-400">⭐</span>
                        <span className="text-purple-300 text-sm">
                          Exclusive Content Access
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-purple-400">🎯</span>
                        <span className="text-purple-300 text-sm">
                          3 Accounts per App
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-blue-400">🔧</span>
                        <span className="text-blue-300 text-sm">
                          Browser Extension Access
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Section */}
            <Card className="glass-morphism border-white/10 hover-lift">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <span className="text-2xl">🎧</span>
                  Need Help?
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Our support team is here to help you 24/7
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    onClick={() => openWhatsAppSupport("Dashboard")}
                    className="bg-green-600 hover:bg-green-700 text-white hover:scale-105 transition-all duration-300"
                  >
                    💬 WhatsApp Support
                  </Button>
                  <Button
                    onClick={() => openEmailSupport("Dashboard")}
                    variant="outline"
                    className="border-blue-500 text-blue-400 hover:bg-blue-500/10 hover:scale-105 transition-all duration-300"
                  >
                    📧 Email Support
                  </Button>
                  <Button
                    onClick={() => {
                      toast({
                        title: "Live Chat",
                        description: "Opening live chat...",
                      });
                    }}
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary/10 hover:scale-105 transition-all duration-300"
                  >
                    💬 Live Chat
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Video Tutorial Tab */}
          <TabsContent value="tutorial" className="space-y-6">
            {/* Tutorial Header */}
            <Card className="glass-morphism border-white/10 border-red-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <span className="text-3xl">📺</span>
                  Video Tutorial KlixGenix.ID
                  <Badge
                    variant="outline"
                    className="border-red-500 text-red-400"
                  >
                    {userData.plan} Plan
                  </Badge>
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Pelajari cara menggunakan KlixGenix.ID untuk plan{" "}
                  {userData.plan} Anda
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Video Tutorial by Plan */}
            {userData.plan === "EXCLUSIVE" && (
              <Card className="glass-morphism border-white/10 border-purple-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3">
                    <span className="text-2xl">💎</span>
                    Tutorial Exclusive Plan
                    <Badge className="bg-purple-600 text-white">
                      84 Apps Total
                    </Badge>
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Tutorial lengkap untuk menggunakan 13 Exclusive Apps + 71
                    Premium Apps
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-lg overflow-hidden bg-black mb-4">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/e9TrijHFNuA"
                      title="KlixGenix.ID Exclusive Plan Tutorial"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">
                      Yang akan Anda pelajari:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-purple-400">💎</span>
                          <span className="text-gray-300 text-sm">
                            Akses 13 Exclusive Apps
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-400">🔧</span>
                          <span className="text-gray-300 text-sm">
                            Install Browser Extension
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-400">✅</span>
                          <span className="text-gray-300 text-sm">
                            One-click access ke 71 Premium Apps
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-red-400">🎬</span>
                          <span className="text-gray-300 text-sm">
                            Netflix, Disney+, beIN Sports
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-purple-400">🤖</span>
                          <span className="text-gray-300 text-sm">
                            ChatGPT Plus/PRO, Sora AI
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-400">🎯</span>
                          <span className="text-gray-300 text-sm">
                            Tips & Tricks penggunaan
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {userData.plan === "PREMIUM" && (
              <Card className="glass-morphism border-white/10 border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3">
                    <span className="text-2xl">⭐</span>
                    Tutorial Premium Plan
                    <Badge className="bg-blue-600 text-white">71 Apps</Badge>
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Tutorial menggunakan 71 Premium Apps melalui browser
                    extension
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-lg overflow-hidden bg-black mb-4">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/e9TrijHFNuA"
                      title="KlixGenix.ID Premium Plan Tutorial"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">
                      Yang akan Anda pelajari:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-400">🔧</span>
                          <span className="text-gray-300 text-sm">
                            Install & Setup Extension
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-400">✅</span>
                          <span className="text-gray-300 text-sm">
                            Akses Netflix, ChatGPT, Canva
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-purple-400">🎯</span>
                          <span className="text-gray-300 text-sm">
                            71 Premium Apps Access
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-red-400">🎬</span>
                          <span className="text-gray-300 text-sm">
                            Streaming Apps (Netflix, Prime)
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-400">🤖</span>
                          <span className="text-gray-300 text-sm">
                            AI Tools (ChatGPT, Perplexity)
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-400">🎨</span>
                          <span className="text-gray-300 text-sm">
                            Design Tools (Canva, Figma)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {userData.plan === "EDUCATION" && (
              <Card className="glass-morphism border-white/10 border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-3">
                    <span className="text-2xl">🎓</span>
                    Tutorial Education Plan
                    <Badge className="bg-green-600 text-white">44 Apps</Badge>
                  </CardTitle>
                  <CardDescription className="text-gray-300">
                    Tutorial khusus untuk pelajar dan mahasiswa - 44 Educational
                    Apps
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-lg overflow-hidden bg-black mb-4">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/e9TrijHFNuA"
                      title="KlixGenix.ID Education Plan Tutorial"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">
                      Yang akan Anda pelajari:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-green-400">🎓</span>
                          <span className="text-gray-300 text-sm">
                            Educational Apps khusus
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-400">📚</span>
                          <span className="text-gray-300 text-sm">
                            Scribd, Coursera, Skillshare
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-purple-400">✍️</span>
                          <span className="text-gray-300 text-sm">
                            Turnitin, QuillBot, Grammarly
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-red-400">🤖</span>
                          <span className="text-gray-300 text-sm">
                            AI Study Tools (ChatGPT)
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-blue-400">🎨</span>
                          <span className="text-gray-300 text-sm">
                            Design untuk Tugas (Canva)
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-400">🌍</span>
                          <span className="text-gray-300 text-sm">
                            Language Learning (Duolingo)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card className="glass-morphism border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <span className="text-2xl">🚀</span>
                  Quick Actions
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Langkah cepat untuk memulai menggunakan KlixGenix.ID
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link to="/download-extension">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white hover:scale-105 transition-all duration-300">
                      🔧 Download Extension
                    </Button>
                  </Link>
                  <Button
                    onClick={() => setIsAppsListModalOpen(true)}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white hover:scale-105 transition-all duration-300"
                  >
                    📱 View All Apps
                  </Button>
                  <Button
                    onClick={() => openWhatsAppSupport("Tutorial")}
                    className="w-full bg-green-600 hover:bg-green-700 text-white hover:scale-105 transition-all duration-300"
                  >
                    💬 Get Help
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="glass-morphism border-white/10 hover-lift">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-3">
                  <span className="text-2xl">⚙️</span>
                  Account Settings
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Manage your account preferences and settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Profile Settings */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button
                      asChild
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 hover:scale-105 transition-all duration-300"
                    >
                      <Link to="/profile/edit">👤 Edit Profile</Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 hover:scale-105 transition-all duration-300"
                    >
                      <Link to="/profile/password">🔒 Change Password</Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 hover:scale-105 transition-all duration-300"
                    >
                      <Link to="/profile/notifications">
                        🔔 Notification Settings
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 hover:scale-105 transition-all duration-300"
                    >
                      <Link to="/faq">❓ FAQ & Help</Link>
                    </Button>
                  </div>

                  {/* Contact Support */}
                  <div className="pt-6 border-t border-white/10">
                    <h4 className="text-white font-semibold mb-4">
                      Contact Support
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button
                        asChild
                        variant="outline"
                        className="border-white/20 text-white hover:bg-white/10 hover:scale-105 transition-all duration-300"
                      >
                        <Link to="/contact">📞 Contact Us</Link>
                      </Button>
                      <Button
                        onClick={handleLogout}
                        variant="destructive"
                        className="hover:scale-105 transition-all duration-300"
                      >
                        🚪 Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
