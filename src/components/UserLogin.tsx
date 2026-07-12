import React, { useState } from "react";
import { motion } from "motion/react";
import { Users, Mail, AlertCircle, Eye, EyeOff, Phone } from "lucide-react";

interface UserLoginProps {
  onLogin: (email: string, password: string) => void;
  onSignUpClick: () => void;
}

export default function UserLogin({ onLogin, onSignUpClick }: UserLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [signUpData, setSignUpData] = useState({
    name: "",
    company: "",
    phone: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isSignUp) {
      if (!email || !password || !signUpData.name) {
        setError("Please fill in all required fields");
        return;
      }
    } else {
      if (!email || !password) {
        setError("Please fill in all fields");
        return;
      }
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (isSignUp) {
        setIsSignUp(false);
        setError("Account created! Please log in.");
        setEmail("");
        setPassword("");
        setSignUpData({ name: "", company: "", phone: "" });
      } else {
        if (email === "user@omnipulse.com" && password === "user123") {
          onLogin(email, password);
        } else {
          setError("Invalid credentials. Try user@omnipulse.com / user123");
        }
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50/30 flex items-center justify-center px-4 py-12">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-100/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-green-50/20 rounded-full blur-3xl -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-2xl shadow-xl shadow-green-100/50 p-8 md:p-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-8"
          >
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {isSignUp ? "Create Account" : "User Login"}
            </h1>
            <p className="text-gray-600 text-sm">
              {isSignUp
                ? "Join OmniPulse and boost your business"
                : "Access your OmniPulse account"}
            </p>
          </motion.div>

          {/* Error/Success Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-3 rounded-lg flex items-gap-3 ${
                error.includes("created")
                  ? "bg-green-50 border border-green-200"
                  : "bg-red-50 border border-red-200"
              }`}
            >
              <AlertCircle
                className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                  error.includes("created") ? "text-green-600" : "text-red-600"
                }`}
              />
              <p
                className={`text-sm ${
                  error.includes("created")
                    ? "text-green-700"
                    : "text-red-700"
                }`}
              >
                {error}
              </p>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field (Sign Up Only) */}
            {isSignUp && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={signUpData.name}
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, name: e.target.value })
                  }
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </motion.div>
            )}

            {/* Company Field (Sign Up Only) */}
            {isSignUp && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  value={signUpData.company}
                  onChange={(e) =>
                    setSignUpData({ ...signUpData, company: e.target.value })
                  }
                  placeholder="Your Company"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </motion.div>
            )}

            {/* Phone Field (Sign Up Only) */}
            {isSignUp && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="tel"
                    value={signUpData.phone}
                    onChange={(e) =>
                      setSignUpData({ ...signUpData, phone: e.target.value })
                    }
                    placeholder="+1 (555) 123-4567"
                    className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>
              </motion.div>
            )}

            {/* Email Field */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isSignUp ? 0.2 : 0.15 }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address {isSignUp && "*"}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    isSignUp ? "your@email.com" : "user@omnipulse.com"
                  }
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isSignUp ? 0.25 : 0.2 }}
            >
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password {isSignUp && "*"}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Remember Me (Login Only) */}
            {!isSignUp && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="flex items-center"
              >
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 rounded border-gray-300 text-green-600 cursor-pointer"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm text-gray-600 cursor-pointer"
                >
                  Remember me
                </label>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: isSignUp ? 0.3 : 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="w-full bg-green-600 text-white font-semibold py-2.5 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-6"
            >
              {loading
                ? isSignUp
                  ? "Creating Account..."
                  : "Signing in..."
                : isSignUp
                ? "Create Account"
                : "Sign In"}
            </motion.button>
          </form>

          {/* Test Credentials Hint (Login Only) */}
          {!isSignUp && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-6 p-3 bg-green-50 border border-green-100 rounded-lg text-xs text-green-700"
            >
              <p className="font-semibold mb-1">Demo Credentials:</p>
              <p>Email: user@omnipulse.com</p>
              <p>Password: user123</p>
            </motion.div>
          )}

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: isSignUp ? 0.35 : 0.4 }}
            className="text-center mt-8 pt-6 border-t border-gray-100"
          >
            {isSignUp ? (
              <p className="text-gray-600 text-sm">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setIsSignUp(false)}
                  className="text-green-600 hover:text-green-700 font-semibold"
                >
                  Sign In
                </button>
              </p>
            ) : (
              <>
                <p className="text-gray-600 text-sm mb-4">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(true)}
                    className="text-green-600 hover:text-green-700 font-semibold"
                  >
                    Sign Up
                  </button>
                </p>
                <p className="text-gray-500 text-xs">
                  <button
                    type="button"
                    className="text-green-600 hover:text-green-700 font-semibold"
                  >
                    Forgot password?
                  </button>
                </p>
              </>
            )}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
