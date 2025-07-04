import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Copy, Eye, EyeOff, ExternalLink, X } from "lucide-react";

interface CredentialsModalProps {
  isOpen: boolean;
  onClose: () => void;
  app: {
    name: string;
    icon: string;
    category: string;
  };
}

interface AppCredential {
  id: string;
  username: string;
  password: string;
  loginUrl: string;
  status: "available" | "in_use" | "maintenance";
}

// Generate 3 different accounts per app
const generateCredentials = (appName: string): AppCredential[] => {
  const baseUrls: Record<string, string> = {
    Netflix: "https://netflix.com/login",
    ChatGPT: "https://chat.openai.com/auth/login",
    Spotify: "https://accounts.spotify.com/login",
    "YouTube Premium": "https://accounts.google.com/signin",
    "Disney+ Hotstar": "https://www.hotstar.com/id/login",
    "HBO Max": "https://play.hbomax.com/signin",
    "Adobe Creative Cloud": "https://auth.services.adobe.com/login",
    "Canva Pro": "https://www.canva.com/login",
    Figma: "https://www.figma.com/login",
    Notion: "https://www.notion.so/login",
  };

  const appKey =
    Object.keys(baseUrls).find((key) =>
      appName.toLowerCase().includes(key.toLowerCase()),
    ) || appName;

  const baseUrl =
    baseUrls[appKey] ||
    `https://${appName.toLowerCase().replace(/\s+/g, "")}.com/login`;

  // Predefined credentials for each app to make it more realistic
  const predefinedCredentials: Record<string, AppCredential[]> = {
    Netflix: [
      {
        id: "account_1",
        username: "premium_flix2024",
        password: "NetFx8#mP",
        loginUrl: baseUrl,
        status: "available",
      },
      {
        id: "account_2",
        username: "netflix_ultra_hd",
        password: "Ultra4K@2024",
        loginUrl: baseUrl,
        status: "available",
      },
      {
        id: "account_3",
        username: "flix_premium_user",
        password: "Premium#Flix",
        loginUrl: baseUrl,
        status: "available",
      },
    ],
    ChatGPT: [
      {
        id: "account_1",
        username: "user_y1pvajas",
        password: "Pass9x2mK!",
        loginUrl: baseUrl,
        status: "available",
      },
      {
        id: "account_2",
        username: "chatgpt_pro_user",
        password: "AI#Pro2024",
        loginUrl: baseUrl,
        status: "available",
      },
      {
        id: "account_3",
        username: "gpt_premium_access",
        password: "GPT@Premium",
        loginUrl: baseUrl,
        status: "available",
      },
    ],
    Spotify: [
      {
        id: "account_1",
        username: "spot_premium99",
        password: "Mus1c#Pro",
        loginUrl: baseUrl,
        status: "available",
      },
      {
        id: "account_2",
        username: "spotify_hifi_user",
        password: "HiFi@Music",
        loginUrl: baseUrl,
        status: "available",
      },
      {
        id: "account_3",
        username: "premium_music_lover",
        password: "Music#2024",
        loginUrl: baseUrl,
        status: "available",
      },
    ],
  };

  // Use predefined credentials if available, otherwise generate random ones
  if (predefinedCredentials[appName]) {
    return predefinedCredentials[appName];
  }

  return [
    {
      id: "account_1",
      username: `${appName.toLowerCase().replace(/\s+/g, "")}_premium1`,
      password: `Pass${Math.random().toString(36).substr(2, 6)}!`,
      loginUrl: baseUrl,
      status: "available",
    },
    {
      id: "account_2",
      username: `${appName.toLowerCase().replace(/\s+/g, "")}_premium2`,
      password: `Secure${Math.random().toString(36).substr(2, 5)}#`,
      loginUrl: baseUrl,
      status: "available",
    },
    {
      id: "account_3",
      username: `${appName.toLowerCase().replace(/\s+/g, "")}_premium3`,
      password: `Pro${Math.random().toString(36).substr(2, 7)}@`,
      loginUrl: baseUrl,
      status: "available",
    },
  ];
};

export default function CredentialsModal({
  isOpen,
  onClose,
  app,
}: CredentialsModalProps) {
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>(
    {},
  );
  const [credentials] = useState<AppCredential[]>(() =>
    generateCredentials(app.name),
  );

  const togglePasswordVisibility = (accountId: string) => {
    setShowPasswords((prev) => ({
      ...prev,
      [accountId]: !prev[accountId],
    }));
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert(`${type} copied to clipboard!`);
    });
  };

  const copyAllCredentials = (credential: AppCredential) => {
    const allData = `App: ${app.name}\nUsername: ${credential.username}\nPassword: ${credential.password}\nLogin URL: ${credential.loginUrl}`;
    navigator.clipboard.writeText(allData).then(() => {
      alert(`All credentials copied to clipboard!`);
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      available: {
        color: "bg-green-500/20 border-green-500/30 text-green-400",
        text: "Available",
      },
      in_use: {
        color: "bg-yellow-500/20 border-yellow-500/30 text-yellow-400",
        text: "In Use",
      },
      maintenance: {
        color: "bg-red-500/20 border-red-500/30 text-red-400",
        text: "Maintenance",
      },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] ||
      statusConfig.available;

    return (
      <div
        className={`inline-flex items-center px-2 py-1 rounded-md border text-xs font-medium ${config.color}`}
      >
        <div className="w-2 h-2 rounded-full bg-current mr-1"></div>
        {config.text}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-morphism border-white/20 text-white max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12">
                <img
                  src={app.icon}
                  alt={app.name}
                  className="w-full h-full object-contain rounded-lg"
                />
              </div>
              <div>
                <DialogTitle className="text-2xl text-white">
                  {app.name}
                </DialogTitle>
                <DialogDescription className="text-gray-300">
                  {app.category} • Exclusive Access
                </DialogDescription>
              </div>
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

        <div className="space-y-6">
          {/* Success Alert */}
          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <span className="text-green-400">✅</span>
              <span className="text-green-400 font-medium">
                Credentials Ready
              </span>
            </div>
            <p className="text-gray-300 text-sm mt-1">
              Use these credentials to login directly to {app.name}. Choose any
              available account below.
            </p>
          </div>

          {/* Credentials Grid - 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {credentials.map((credential, index) => (
              <div
                key={credential.id}
                className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-4 hover:bg-white/10 transition-colors"
              >
                {/* Account Header */}
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">
                    Account {index + 1}
                  </h3>
                  {getStatusBadge(credential.status)}
                </div>

                {/* Credentials */}
                <div className="space-y-3">
                  {/* Username */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Username
                    </label>
                    <div className="flex items-stretch space-x-2">
                      <div className="flex-1 bg-white/10 border border-white/20 rounded-lg p-3 font-mono text-sm text-gray-200 truncate min-h-[44px] flex items-center">
                        {credential.username}
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="p-2 h-11 w-11 text-gray-400 hover:text-white flex-shrink-0"
                        onClick={() =>
                          copyToClipboard(credential.username, "Username")
                        }
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Password
                    </label>
                    <div className="flex items-stretch space-x-2">
                      <div className="flex-1 bg-white/10 border border-white/20 rounded-lg p-3 font-mono text-sm text-gray-200 min-h-[44px] flex items-center">
                        {showPasswords[credential.id]
                          ? credential.password
                          : "••••••••••"}
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="p-2 h-11 w-11 text-gray-400 hover:text-white flex-shrink-0"
                        onClick={() => togglePasswordVisibility(credential.id)}
                      >
                        {showPasswords[credential.id] ? (
                          <EyeOff className="w-3 h-3" />
                        ) : (
                          <Eye className="w-3 h-3" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="p-2 h-11 w-11 text-gray-400 hover:text-white flex-shrink-0"
                        onClick={() =>
                          copyToClipboard(credential.password, "Password")
                        }
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Login URL */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                      Login URL
                    </label>
                    <div className="flex items-stretch space-x-2">
                      <div className="flex-1 bg-white/10 border border-white/20 rounded-lg p-3 text-sm text-blue-300 truncate min-h-[44px] flex items-center">
                        {credential.loginUrl}
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="p-2 h-11 w-11 text-gray-400 hover:text-white flex-shrink-0"
                        onClick={() =>
                          copyToClipboard(credential.loginUrl, "URL")
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
                    className="w-full gradient-primary text-white font-medium"
                    onClick={() => window.open(credential.loginUrl, "_blank")}
                    disabled={credential.status === "maintenance"}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open {app.name} & Login
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full border-white/20 text-white hover:bg-white/10"
                    onClick={() => copyAllCredentials(credential)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy All Credentials
                  </Button>
                </div>

                {/* Security Notice */}
                {index === 0 && (
                  <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-3">
                    <div className="flex items-start space-x-2">
                      <span className="text-yellow-400 text-sm">⚠️</span>
                      <div>
                        <p className="text-yellow-400 font-medium text-sm">
                          Security Notice
                        </p>
                        <p className="text-gray-300 text-xs mt-1">
                          Jangan bagikan kredensial ini kepada siapa pun.
                          Kredensial ini khusus untuk akun Anda.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-4 border-t border-white/10">
            <div className="text-sm text-gray-400">
              3 akun tersedia untuk {app.name}
            </div>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
                onClick={onClose}
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
