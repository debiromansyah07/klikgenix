import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Copy, Eye, EyeOff, ExternalLink, X } from "lucide-react";

interface ExclusiveApp {
  id: string;
  name: string;
  icon: string;
  category: string;
  loginUrl: string;
  username: string;
  password: string;
}

interface ExclusiveCredentialsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const exclusiveApps: ExclusiveApp[] = [
  {
    id: "chatgpt",
    name: "ChatGPT Plus",
    icon: "🤖",
    category: "AI",
    loginUrl: "https://chat.openai.com/auth/login",
    username: "user_y1pvajas",
    password: "Pass9x2mK!",
  },
  {
    id: "netflix",
    name: "Netflix Premium",
    icon: "🎬",
    category: "Streaming",
    loginUrl: "https://netflix.com/login",
    username: "premium_flix2024",
    password: "NetFx8#mP",
  },
  {
    id: "spotify",
    name: "Spotify Premium",
    icon: "🎵",
    category: "Music",
    loginUrl: "https://accounts.spotify.com/login",
    username: "spot_premium99",
    password: "Mus1c#Pro",
  },
  {
    id: "youtube",
    name: "YouTube Premium",
    icon: "📺",
    category: "Streaming",
    loginUrl: "https://accounts.google.com/signin",
    username: "yt_premium_user",
    password: "YtPrem!2024",
  },
  {
    id: "disney",
    name: "Disney+ Hotstar",
    icon: "🏰",
    category: "Streaming",
    loginUrl: "https://www.hotstar.com/id/login",
    username: "disney_hotstar_vip",
    password: "Disney#2024",
  },
  {
    id: "hbo",
    name: "HBO Max",
    icon: "🎭",
    category: "Streaming",
    loginUrl: "https://play.hbomax.com/signin",
    username: "hbo_max_premium",
    password: "HboMax!99",
  },
];

export default function ExclusiveCredentialsModal({
  isOpen,
  onClose,
}: ExclusiveCredentialsModalProps) {
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>(
    {},
  );
  const [searchTerm, setSearchTerm] = useState("");

  const togglePasswordVisibility = (appId: string) => {
    setShowPasswords((prev) => ({
      ...prev,
      [appId]: !prev[appId],
    }));
  };

  const copyToClipboard = (text: string, type: string, appName: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // Use a more subtle notification instead of alert
      console.log(`${type} for ${appName} copied to clipboard!`);
    });
  };

  const copyAllCredentials = (app: ExclusiveApp) => {
    const allData = `App: ${app.name}\nUsername: ${app.username}\nPassword: ${app.password}\nLogin URL: ${app.loginUrl}`;
    navigator.clipboard.writeText(allData).then(() => {
      console.log(`All credentials for ${app.name} copied to clipboard!`);
    });
  };

  const filteredApps = exclusiveApps.filter(
    (app) =>
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-morphism border-white/20 text-white max-w-5xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl text-white flex items-center">
                <span className="text-2xl mr-2">🎯</span>
                Exclusive Plan Credentials
              </DialogTitle>
              <DialogDescription className="text-gray-300">
                Direct access credentials for all Exclusive plan applications
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Input
              placeholder="Search applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 pl-4 py-3"
            />
          </div>

          {/* Apps Grid */}
          <div className="overflow-y-auto max-h-[60vh]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredApps.map((app) => (
                <div
                  key={app.id}
                  className="bg-gray-800/40 border border-gray-700/30 rounded-lg p-4 space-y-4"
                >
                  {/* App Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{app.icon}</div>
                      <div>
                        <h3 className="font-medium text-white text-sm">
                          {app.name}
                        </h3>
                        <p className="text-xs text-gray-400">
                          {app.category} • Exclusive Access
                        </p>
                      </div>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>

                  {/* Credentials Ready Badge */}
                  <div className="bg-green-600/20 border border-green-500/30 rounded-md p-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-green-400 text-sm">✅</span>
                      <span className="text-green-400 font-medium text-sm">
                        Credentials Ready
                      </span>
                    </div>
                    <p className="text-gray-300 text-xs mt-1">
                      Use these credentials to login directly to {app.name}
                    </p>
                  </div>

                  {/* Credentials Fields */}
                  <div className="space-y-3">
                    {/* Username */}
                    <div className="space-y-1">
                      <label className="text-xs text-gray-300 font-medium">
                        Username
                      </label>
                      <div className="flex items-center space-x-1">
                        <div className="flex-1 bg-gray-700/50 border border-gray-600/30 rounded-md p-2 text-xs text-gray-200 font-mono">
                          {app.username}
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="p-1 h-7 w-7 text-gray-400 hover:text-white"
                          onClick={() =>
                            copyToClipboard(app.username, "Username", app.name)
                          }
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-1">
                      <label className="text-xs text-gray-300 font-medium">
                        Password
                      </label>
                      <div className="flex items-center space-x-1">
                        <div className="flex-1 bg-gray-700/50 border border-gray-600/30 rounded-md p-2 text-xs text-gray-200 font-mono">
                          {showPasswords[app.id] ? app.password : "••••••••••"}
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="p-1 h-7 w-7 text-gray-400 hover:text-white"
                          onClick={() => togglePasswordVisibility(app.id)}
                        >
                          {showPasswords[app.id] ? (
                            <EyeOff className="w-3 h-3" />
                          ) : (
                            <Eye className="w-3 h-3" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="p-1 h-7 w-7 text-gray-400 hover:text-white"
                          onClick={() =>
                            copyToClipboard(app.password, "Password", app.name)
                          }
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Login URL */}
                    <div className="space-y-1">
                      <label className="text-xs text-gray-300 font-medium">
                        Login URL
                      </label>
                      <div className="flex items-center space-x-1">
                        <div className="flex-1 bg-gray-700/50 border border-gray-600/30 rounded-md p-2 text-xs text-blue-300 truncate">
                          {app.loginUrl}
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="p-1 h-7 w-7 text-gray-400 hover:text-white"
                          onClick={() =>
                            copyToClipboard(app.loginUrl, "URL", app.name)
                          }
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    <Button
                      size="sm"
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium"
                      onClick={() => window.open(app.loginUrl, "_blank")}
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Open {app.name} & Login
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full border-gray-600/30 text-gray-300 hover:bg-gray-700/30 text-xs"
                      onClick={() => copyAllCredentials(app)}
                    >
                      <Copy className="w-3 h-3 mr-1" />
                      Copy All
                    </Button>
                  </div>

                  {/* Private Access Warning */}
                  <div className="bg-yellow-600/20 border border-yellow-500/30 rounded-md p-2">
                    <div className="flex items-start space-x-1">
                      <span className="text-yellow-400 text-xs">⚠️</span>
                      <div>
                        <p className="text-yellow-400 text-xs font-medium">
                          Private Access
                        </p>
                        <p className="text-gray-300 text-xs mt-1">
                          Jangan bagikan kredensial ini kepada siapa pun.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-4 border-t border-white/10">
            <div className="text-sm text-gray-400">
              {filteredApps.length} aplikasi tersedia
            </div>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
