import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link, useSearchParams } from "react-router-dom";
import { paymentAPI, handleAPIError } from "@/lib/api";

const pricingPlans = {
  premium: {
    name: "PREMIUM",
    price: "49.000",
    originalPrice: "75.000",
    description: "Paket pilihan para Hematers",
    features: [
      "ChatGPT PLUS",
      "Netflix",
      "Spotify Premium",
      "Adobe Creative Suite",
      "+20 Apps",
    ],
  },
  exclusive: {
    name: "EXCLUSIVE",
    price: "99.000",
    originalPrice: "150.000",
    description: "Akses semua fitur premium + ekslusif",
    features: [
      "Semua dari Premium",
      "YouTube Premium",
      "Disney+ Hotstar",
      "HBO Max",
      "+30 Apps",
    ],
  },
  education: {
    name: "EDUCATION",
    price: "69.000",
    originalPrice: "100.000",
    description: "Khusus untuk pelajar dan mahasiswa",
    features: [
      "ChatGPT PLUS",
      "Microsoft Office",
      "Adobe Suite",
      "Coursera Plus",
      "+15 Apps",
    ],
  },
};

export default function Payment() {
  const [searchParams] = useSearchParams();
  const selectedPlan = searchParams.get("plan") || "premium";
  const isUpgrade = searchParams.get("upgrade") === "true";
  const fromPlan = searchParams.get("from");
  const plan = pricingPlans[selectedPlan as keyof typeof pricingPlans];

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    // Card details
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
    // Bank transfer
    bankAccount: "",
    // E-wallet
    walletPhone: "",
    // Personal info
    fullName: "",
    email: "",
    phone: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      const paymentData = {
        plan: selectedPlan,
        paymentMethod,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        ...(paymentMethod === "card" && {
          cardNumber: formData.cardNumber,
          expiryDate: formData.expiryDate,
          cvv: formData.cvv,
          cardName: formData.cardName,
        }),
        ...(paymentMethod === "bank" && {
          bankAccount: formData.bankAccount,
        }),
        ...(paymentMethod === "ewallet" && {
          walletPhone: formData.walletPhone,
        }),
      };

      const result = await paymentAPI.createPayment(paymentData);

      if (result.success && result.data) {
        if (paymentMethod === "card") {
          // For card payments, redirect based on plan type
          alert("Payment successful! Redirecting...");

          if (
            selectedPlan === "premium" ||
            selectedPlan === "education" ||
            selectedPlan === "exclusive"
          ) {
            // Redirect to extension download for all plans (Premium, Education, and Exclusive)
            window.location.href = `/download-extension?plan=${selectedPlan}`;
          } else {
            window.location.href = "/dashboard";
          }
        } else if (paymentMethod === "bank") {
          // Show bank transfer instructions
          alert(
            `Bank Transfer Instructions:\nBank: ${result.data.bankInstructions?.bankName}\nAccount: ${result.data.bankInstructions?.accountNumber}\nAmount: Rp${result.data.bankInstructions?.amount}\nCode: ${result.data.bankInstructions?.code}\n\nAfter payment confirmation, you will be redirected to download the extension.`,
          );
        } else if (paymentMethod === "ewallet") {
          // Redirect to e-wallet payment page
          if (result.data.redirectUrl) {
            window.open(result.data.redirectUrl, "_blank");
          }
        }
      }
    } catch (error) {
      alert(`Payment failed: ${handleAPIError(error)}`);
    } finally {
      setIsProcessing(false);
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
              <span className="text-gray-300">Secure Payment</span>
              <div className="text-green-500">🔒</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-padding py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              {isUpgrade ? "Upgrade Your Plan" : "Complete Your Payment"}
            </h1>
            <p className="text-gray-300">
              {isUpgrade
                ? `Upgrading from ${fromPlan?.toUpperCase()} to ${plan.name}`
                : `Secure checkout for your ${plan.name} subscription`}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="glass-morphism border-white/10 sticky top-6">
                <CardHeader>
                  <CardTitle className="text-white">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-semibold">{plan.name}</h3>
                      <p className="text-gray-400 text-sm">
                        {plan.description}
                      </p>
                    </div>
                    <Badge className="bg-primary text-white">Popular</Badge>
                  </div>

                  <div className="space-y-2">
                    {plan.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                    <p className="text-gray-400 text-sm">...and many more</p>
                  </div>

                  <div className="border-t border-white/10 pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Subtotal</span>
                      <span className="text-white line-through">
                        Rp{plan.originalPrice}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Discount (34%)</span>
                      <span className="text-green-500">
                        -Rp
                        {(
                          parseInt(plan.originalPrice) - parseInt(plan.price)
                        ).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-white/10">
                      <span className="text-white font-bold">Total</span>
                      <span className="text-white font-bold text-xl">
                        Rp{plan.price}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs">
                      Per month, auto-renewal
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Form */}
            <div className="lg:col-span-2">
              <Card className="glass-morphism border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Payment Details</CardTitle>
                  <CardDescription className="text-gray-300">
                    Choose your preferred payment method
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Personal Information */}
                    <div className="space-y-4">
                      <h3 className="text-white font-semibold">
                        Personal Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="fullName" className="text-white">
                            Full Name
                          </Label>
                          <Input
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="John Doe"
                            className="bg-white/10 border-white/20 text-white"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-white">
                            Email
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="john@example.com"
                            className="bg-white/10 border-white/20 text-white"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-white">
                          Phone Number
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+62 812-3456-7890"
                          className="bg-white/10 border-white/20 text-white"
                          required
                        />
                      </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="space-y-4">
                      <h3 className="text-white font-semibold">
                        Payment Method
                      </h3>
                      <Tabs
                        value={paymentMethod}
                        onValueChange={setPaymentMethod}
                      >
                        <TabsList className="grid w-full grid-cols-3 glass-morphism">
                          <TabsTrigger value="card">Credit Card</TabsTrigger>
                          <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
                          <TabsTrigger value="ewallet">E-Wallet</TabsTrigger>
                        </TabsList>

                        {/* Credit Card */}
                        <TabsContent value="card" className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2 space-y-2">
                              <Label
                                htmlFor="cardNumber"
                                className="text-white"
                              >
                                Card Number
                              </Label>
                              <Input
                                id="cardNumber"
                                name="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                placeholder="1234 5678 9012 3456"
                                className="bg-white/10 border-white/20 text-white"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label
                                htmlFor="expiryDate"
                                className="text-white"
                              >
                                Expiry Date
                              </Label>
                              <Input
                                id="expiryDate"
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleInputChange}
                                placeholder="MM/YY"
                                className="bg-white/10 border-white/20 text-white"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvv" className="text-white">
                                CVV
                              </Label>
                              <Input
                                id="cvv"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleInputChange}
                                placeholder="123"
                                className="bg-white/10 border-white/20 text-white"
                                required
                              />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                              <Label htmlFor="cardName" className="text-white">
                                Name on Card
                              </Label>
                              <Input
                                id="cardName"
                                name="cardName"
                                value={formData.cardName}
                                onChange={handleInputChange}
                                placeholder="John Doe"
                                className="bg-white/10 border-white/20 text-white"
                                required
                              />
                            </div>
                          </div>
                          <div className="flex space-x-2 text-gray-300 text-sm">
                            <span>💳</span>
                            <span>
                              We accept Visa, Mastercard, and American Express
                            </span>
                          </div>
                        </TabsContent>

                        {/* Bank Transfer */}
                        <TabsContent value="bank" className="space-y-4">
                          <div className="space-y-4">
                            <RadioGroup
                              defaultValue="bca"
                              className="space-y-3"
                            >
                              {[
                                { id: "bca", name: "BCA", logo: "🏦" },
                                { id: "mandiri", name: "Mandiri", logo: "🏛️" },
                                { id: "bni", name: "BNI", logo: "🏪" },
                                { id: "bri", name: "BRI", logo: "🏬" },
                              ].map((bank) => (
                                <div
                                  key={bank.id}
                                  className="flex items-center space-x-2 glass-morphism p-3 rounded-lg"
                                >
                                  <RadioGroupItem
                                    value={bank.id}
                                    id={bank.id}
                                  />
                                  <label
                                    htmlFor={bank.id}
                                    className="flex items-center space-x-3 cursor-pointer flex-1"
                                  >
                                    <span className="text-2xl">
                                      {bank.logo}
                                    </span>
                                    <span className="text-white font-medium">
                                      {bank.name}
                                    </span>
                                  </label>
                                </div>
                              ))}
                            </RadioGroup>
                            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
                              <p className="text-white text-sm">
                                ℹ️ You will receive payment instructions via
                                email after clicking "Pay Now"
                              </p>
                            </div>
                          </div>
                        </TabsContent>

                        {/* E-Wallet */}
                        <TabsContent value="ewallet" className="space-y-4">
                          <div className="space-y-4">
                            <RadioGroup
                              defaultValue="gopay"
                              className="space-y-3"
                            >
                              {[
                                {
                                  id: "gopay",
                                  name: "GoPay",
                                  logo: "https://cdn.builder.io/api/v1/image/assets%2Fec2d43fcf8b54a079080fd57b2b293e8%2F8911826a320f43aca236337c2a499bad?format=webp&width=800",
                                },
                                {
                                  id: "ovo",
                                  name: "OVO",
                                  logo: "https://cdn.builder.io/api/v1/image/assets%2Fec2d43fcf8b54a079080fd57b2b293e8%2F952167071cd2494e90e2eac74f3c3eb5?format=webp&width=800",
                                },
                                {
                                  id: "dana",
                                  name: "DANA",
                                  logo: "https://cdn.builder.io/api/v1/image/assets%2Fec2d43fcf8b54a079080fd57b2b293e8%2Fb7b2946d4d65420592f0492ed953ab8c?format=webp&width=800",
                                },
                                {
                                  id: "shopeepay",
                                  name: "ShopeePay",
                                  logo: "https://cdn.builder.io/api/v1/image/assets%2Fec2d43fcf8b54a079080fd57b2b293e8%2F5524704afe3848039bfad4ad4684e996?format=webp&width=800",
                                },
                              ].map((wallet) => (
                                <div
                                  key={wallet.id}
                                  className="flex items-center space-x-2 glass-morphism p-3 rounded-lg"
                                >
                                  <RadioGroupItem
                                    value={wallet.id}
                                    id={wallet.id}
                                  />
                                  <label
                                    htmlFor={wallet.id}
                                    className="flex items-center space-x-3 cursor-pointer flex-1"
                                  >
                                    <div
                                      className={`flex items-center justify-center ${wallet.id === "gopay" ? "w-24 h-24" : "w-20 h-20"}`}
                                    >
                                      <img
                                        src={wallet.logo}
                                        alt={wallet.name}
                                        className={`object-contain ${wallet.id === "gopay" ? "w-20 h-20" : "w-16 h-16"}`}
                                      />
                                    </div>
                                    <span className="text-white font-medium">
                                      {wallet.name}
                                    </span>
                                  </label>
                                </div>
                              ))}
                            </RadioGroup>
                            <div className="space-y-2">
                              <Label
                                htmlFor="walletPhone"
                                className="text-white"
                              >
                                Phone Number
                              </Label>
                              <Input
                                id="walletPhone"
                                name="walletPhone"
                                value={formData.walletPhone}
                                onChange={handleInputChange}
                                placeholder="+62 812-3456-7890"
                                className="bg-white/10 border-white/20 text-white"
                                required
                              />
                            </div>
                          </div>
                        </TabsContent>
                      </Tabs>
                    </div>

                    {/* Submit Button */}
                    <div className="space-y-4">
                      <Button
                        type="submit"
                        className="w-full gradient-primary text-white font-semibold py-4 text-lg"
                        disabled={isProcessing}
                      >
                        {isProcessing
                          ? "Processing Payment..."
                          : `Pay Rp${plan.price} Now`}
                      </Button>

                      <div className="text-center space-y-2">
                        <p className="text-gray-400 text-sm">
                          🔒 Secure payment powered by SSL encryption
                        </p>
                        <p className="text-gray-400 text-xs">
                          By completing this payment, you agree to our Terms of
                          Service and Privacy Policy
                        </p>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
