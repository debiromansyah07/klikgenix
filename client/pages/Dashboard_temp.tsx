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
  plan: "EXCLUSIVE", // Changed to show exclusive features
  planExpiry: "2024-12-31",
  usageQuota: 75,
  totalApps: 13, // Only showing 13 exclusive apps with direct credentials
  usedApps: 8,
};

const recentActivities = [
  {
    app: "Exclusive Netflix",
    action: "Watched Movie",
    time: "2 hours ago",
    icon: "🎬",
  },
  {
    app: "Exclusive ChatGPT Plus",
    action: "AI Chat Session",
    time: "4 hours ago",
    icon: "🤖",
  },
  {
    app: "Exclusive beIN Sports",
    action: "Watched Sports",
    time: "6 hours ago",
    icon: "⚽",
  },
  {
    app: "Exclusive Sora Pro",
    action: "Generated Video",
    time: "1 day ago",
    icon: "🌟",
  },
];

const availableApps = [
  // Only 13 Exclusive Apps with Direct Credentials
  {
    name: "Exclusive Netflix",
    category: "Exclusive Streaming",
    status: "active",
    icon: "🎬",
    exclusive: true,
  },
  {
    name: "Exclusive ChatGPT Plus",
    category: "Exclusive AI",
    status: "active",
    icon: "🤖",
    exclusive: true,
  },
  {
    name: "Exclusive ChatGPT PRO",
    category: "Exclusive AI",
    status: "active",
    icon: "🤖",
    exclusive: true,
  },
  {
    name: "Exclusive beIN Sports",
    category: "Exclusive Streaming",
    status: "active",
    icon: "⚽",
    exclusive: true,
  },
  {
    name: "Exclusive Disney+ Hotstar",
    category: "Exclusive Streaming",
    status: "active",
    icon: "🏰",
    exclusive: true,
  },
  {
    name: "Exclusive Vidio.com",
    category: "Exclusive Streaming",
    status: "active",
    icon: "📺",
    exclusive: true,
  },
  {
    name: "Exclusive Perplexity",
    category: "Exclusive AI",
    status: "active",
    icon: "🔮",
    exclusive: true,
  },
  {
    name: "Exclusive Coohom",
    category: "Exclusive Design",
    status: "active",
    icon: "🏠",
    exclusive: true,
  },
  {
    name: "Exclusive Sora Pro",
    category: "Exclusive AI",
    status: "active",
    icon: "🌟",
    exclusive: true,
  },
  {
    name: "Exclusive Sora Plus",
    category: "Exclusive AI",
    status: "active",
    icon: "✨",
    exclusive: true,
  },
  {
    name: "Exclusive Blackbox AI",
    category: "Exclusive AI",
    status: "active",
    icon: "⚫",
    exclusive: true,
  },
  {
    name: "Exclusive Trae AI",
    category: "Exclusive AI",
    status: "active",
    icon: "🚀",
    exclusive: true,
  },
  {
    name: "Exclusive Cursor AI",
    category: "Exclusive Development",
    status: "active",
    icon: "➤",
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
          <TabsList className="grid w-full grid-cols-4 glass-morphism hover:scale-[1.02] transition-transform duration-300">
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
                        <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
                          {activity.icon}
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
                  <span className="text-2xl">🔑</span>
                  Access Method - {userData.plan} Plan
                </CardTitle>
                <CardDescription className="text-gray-300">
                  {userData.plan === "EXCLUSIVE"
                    ? "Direct credentials untuk 13 exclusive apps"
                    : "Download extension untuk akses mudah ke semua aplikasi"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userData.plan === "EXCLUSIVE" ? (
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <p className="text-blue-400 font-medium mb-2">
                      🔧 84 Apps - Extension Access
                    </p>
                    <p className="text-gray-300 text-sm">
                      Download dan install browser extension untuk akses mudah
                      ke semua 71 premium apps + 13 exclusive apps.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                      <p className="text-blue-400 font-medium mb-2">
                        📥 Extension Required
                      </p>
                      <p className="text-gray-300 text-sm mb-3">
                        Download extension KlixGenix untuk akses mudah ke semua
                        aplikasi premium.
                      </p>
                      <Button
                        className="gradient-primary text-white hover:scale-105 transition-transform duration-300"
                        onClick={() => {
                          // Create a dummy extension file download
                          const element = document.createElement("a");
                          const file = new Blob(
                            [
                              '// KlixGenix Extension v1.0\nconsole.log("Extension loaded");',
                            ],
                            { type: "text/plain" },
                          );
                          element.href = URL.createObjectURL(file);
                          element.download = "KlixGenix-Extension.zip";
                          document.body.appendChild(element);
                          element.click();
                          document.body.removeChild(element);

                          toast({
                            title: "Download Started",
                            description:
                              "KlixGenix Extension is downloading. Install it in your browser to access premium apps.",
                          });
                        }}
                      >
                        📥 Download Extension
                      </Button>
                    </div>
                  </div>
                )}
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
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Gunakan extension untuk akses instant ke semua aplikasi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {availableApps.map((app, index) => (
                    <div
                      key={index}
                      className="glass-morphism border-white/20 rounded-lg p-6 flex flex-col items-center space-y-3 group border-blue-500/30"
                    >
                      <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                        {app.icon}
                      </div>
                      <div className="text-center">
                        <p className="text-white font-medium group-hover:text-primary transition-colors">
                          {app.name}
                        </p>
                        <p className="text-gray-400 text-sm">{app.category}</p>
                      </div>
                      <div className="flex flex-col items-center space-y-2">
                        <Badge
                          variant={
                            app.status === "active" ? "default" : "secondary"
                          }
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
                    <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-blue-400">🔧</span>
                        <span className="text-blue-400 font-medium">
                          Browser Extension
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm">
                        {userData.plan === "EXCLUSIVE"
                          ? "Akses mudah ke semua 84 apps (71 premium + 13 exclusive) via browser extension"
                          : "Akses melalui extension browser yang mudah digunakan"}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Benefits:</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-purple-400">🌟</span>
                        <span className="text-purple-300 text-sm">
                          13 Exclusive Apps
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
                      {userData.plan === "EXCLUSIVE" && (
                        <>
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
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Upgrade Button for non-Exclusive plans */}
                {userData.plan !== "EXCLUSIVE" && (
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="text-center space-y-4">
                      <h4 className="text-white font-semibold">
                        Want more features?
                      </h4>
                      <Button
                        onClick={() => setIsUpgradeModalOpen(true)}
                        className="gradient-primary text-white font-semibold hover:scale-105 transition-transform duration-300"
                      >
                        Upgrade to{" "}
                        {userData.plan === "EDUCATION" ? "Premium or " : ""}
                        Exclusive
                      </Button>
                    </div>
                  </div>
                )}
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
                      <Link to="/edit-profile">👤 Edit Profile</Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 hover:scale-105 transition-all duration-300"
                    >
                      <Link to="/change-password">🔒 Change Password</Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 hover:scale-105 transition-all duration-300"
                    >
                      <Link to="/notification-settings">
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
