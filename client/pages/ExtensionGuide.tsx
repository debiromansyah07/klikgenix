import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Download,
  Chrome,
  Settings,
  CheckCircle,
  Play,
  AlertCircle,
} from "lucide-react";

export default function ExtensionGuide() {
  const steps = [
    {
      step: 1,
      title: "Download Extension",
      description: "Download the KlixGenix extension file from the dashboard",
      icon: <Download className="w-6 h-6" />,
      details: [
        "Go to your Dashboard",
        "Click 'Download Chrome Extension' button",
        "Save the ZIP file to your computer",
      ],
    },
    {
      step: 2,
      title: "Extract Files",
      description: "Extract the downloaded ZIP file to a folder",
      icon: <Settings className="w-6 h-6" />,
      details: [
        "Right-click the downloaded ZIP file",
        "Select 'Extract All' or use your preferred ZIP tool",
        "Remember the location where you extracted it",
      ],
    },
    {
      step: 3,
      title: "Open Chrome Extensions",
      description: "Navigate to Chrome's extension management page",
      icon: <Chrome className="w-6 h-6" />,
      details: [
        "Open Google Chrome browser",
        "Type 'chrome://extensions/' in the address bar",
        "Or go to Menu > More Tools > Extensions",
      ],
    },
    {
      step: 4,
      title: "Enable Developer Mode",
      description: "Turn on developer mode to install unpacked extensions",
      icon: <CheckCircle className="w-6 h-6" />,
      details: [
        "Find the 'Developer mode' toggle at the top right",
        "Click to enable it",
        "You'll see new buttons appear",
      ],
    },
    {
      step: 5,
      title: "Load Extension",
      description: "Install the KlixGenix extension",
      icon: <Play className="w-6 h-6" />,
      details: [
        "Click the 'Load unpacked' button",
        "Navigate to the folder where you extracted the files",
        "Select the KlixGenix extension folder",
        "Click 'Select Folder'",
      ],
    },
    {
      step: 6,
      title: "Start Using",
      description: "Access your premium apps through the extension",
      icon: <CheckCircle className="w-6 h-6" />,
      details: [
        "Look for the KlixGenix icon in your browser toolbar",
        "Click the icon to open the extension",
        "Login with your KlixGenix account",
        "Start accessing premium apps!",
      ],
    },
  ];

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
              <Link to="/dashboard">
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  ← Back to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-padding py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Chrome className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">
              Extension Installation Guide
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Follow this step-by-step guide to install and set up your
              KlixGenix browser extension for seamless access to premium apps.
            </p>
          </div>

          {/* Installation Steps */}
          <div className="space-y-8 mb-12">
            {steps.map((step, index) => (
              <Card key={index} className="glass-morphism border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {step.step}
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-primary">{step.icon}</div>
                      <span>{step.title}</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4 ml-16">{step.description}</p>
                  <div className="ml-16">
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li
                          key={idx}
                          className="text-gray-400 text-sm flex items-start gap-2"
                        >
                          <span className="text-primary mt-1">•</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Troubleshooting */}
          <Card className="glass-morphism border-white/10 border-yellow-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-yellow-400" />
                Troubleshooting
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-white font-medium mb-2">
                  Extension not loading?
                </h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Make sure Developer mode is enabled</li>
                  <li>
                    • Check that you selected the correct folder (should contain
                    manifest.json)
                  </li>
                  <li>• Try refreshing the Extensions page</li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-medium mb-2">
                  Can't see the extension icon?
                </h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>• Click the puzzle piece icon in your toolbar</li>
                  <li>• Pin the KlixGenix extension for easy access</li>
                  <li>• Check if the extension is enabled</li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-medium mb-2">
                  Apps not working?
                </h4>
                <ul className="text-gray-300 text-sm space-y-1">
                  <li>
                    • Make sure you're logged into your KlixGenix account in the
                    extension
                  </li>
                  <li>• Check your subscription status in the dashboard</li>
                  <li>• Try clearing your browser cache</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Support */}
          <div className="text-center mt-12">
            <Card className="glass-morphism border-white/10 inline-block">
              <CardContent className="p-6">
                <h3 className="text-white font-semibold mb-4">
                  Need More Help?
                </h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() =>
                      window.open("https://wa.me/6281234567890", "_blank")
                    }
                  >
                    💬 WhatsApp Support
                  </Button>
                  <Button
                    variant="outline"
                    className="border-blue-500 text-blue-400 hover:bg-blue-500/10"
                    onClick={() =>
                      window.open("mailto:support@klixgenix.id", "_blank")
                    }
                  >
                    📧 Email Support
                  </Button>
                  <Link to="/contact">
                    <Button
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 w-full"
                    >
                      📞 Contact Us
                    </Button>
                  </Link>
                </div>
                <p className="text-gray-400 text-sm mt-4">
                  Our support team is available 24/7 to help you with
                  installation and usage.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
