import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Phone, Mail, X, Zap } from "lucide-react";
import { contactSupport } from "@/lib/support";

export default function FloatingSupport() {
  const [isOpen, setIsOpen] = useState(false);

  const handleContact = (method: "whatsapp" | "email" | "livechat") => {
    contactSupport(method);
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Support Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {isOpen && (
          <Card className="glass-morphism border-white/20 mb-4 w-80 animate-in slide-in-from-bottom-5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-primary" />
                  Butuh Bantuan?
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white p-1 h-auto"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-3">
                {/* Live Chat */}
                <Button
                  onClick={() => handleContact("livechat")}
                  className="w-full justify-start bg-gradient-to-r from-primary to-purple-600 hover:from-primary/80 hover:to-purple-600/80 text-white"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Live Chat (Tercepat)
                </Button>

                {/* WhatsApp */}
                <Button
                  onClick={() => handleContact("whatsapp")}
                  className="w-full justify-start bg-green-600 hover:bg-green-700 text-white"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  WhatsApp Support
                </Button>

                {/* Email */}
                <Button
                  onClick={() => handleContact("email")}
                  variant="outline"
                  className="w-full justify-start border-white/20 text-white hover:bg-white/10"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Support
                </Button>
              </div>

              {/* Quick Info */}
              <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                <p className="text-xs text-gray-300 flex items-center gap-1">
                  <Zap className="w-3 h-3 text-primary" />
                  Respon rata-rata &lt; 5 menit
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main FAB */}
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/80 hover:to-purple-600/80 shadow-2xl border-0"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </Button>
      </div>
    </>
  );
}
