import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Shield, Zap, Brain } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const Login = ({ onLogin, onToggleMode }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isDark } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      onLogin({
        id: 1,
        name: "Developer Muhammed",
        email: formData.email,
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      });
      setIsLoading(false);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full max-w-md">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Logo and Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl flex items-center justify-center shadow-2xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>
        <h1 className="text-4xl font-bold font-poppins gradient-text mb-2">
          TruthForge AI
        </h1>
        <p className="text-gray-600 dark:text-gray-300 font-inter">
          Secure your AI journey — log in to innovate
        </p>
      </motion.div>

      {/* Login Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-3xl p-8 shadow-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl 
                         bg-white/50 dark:bg-dark-card/50 backdrop-blur-sm
                         focus:ring-2 focus:ring-primary/50 focus:border-primary
                         dark:focus:ring-primary/50 dark:focus:border-primary
                         transition-all duration-300 placeholder-gray-600"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl 
                         bg-white/50 dark:bg-dark-card/50 backdrop-blur-sm
                         focus:ring-2 focus:ring-primary/50 focus:border-primary
                         dark:focus:ring-primary/50 dark:focus:border-primary
                         transition-all duration-300 placeholder-gray-600 pr-12"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                Signing in...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Shield className="w-5 h-5 mr-2" />
                Sign In
              </div>
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="flex-1 border-t border-gray-200 dark:border-gray-600"></div>
          <span className="px-4 text-sm text-gray-500 dark:text-gray-400">
            or
          </span>
          <div className="flex-1 border-t border-gray-200 dark:border-gray-600"></div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Don't have an account?{" "}
            <button
              onClick={onToggleMode}
              className="text-primary hover:text-secondary font-semibold transition-colors duration-300"
            >
              Sign up here
            </button>
          </p>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center mt-8"
      >
        <p className="text-xs text-gray-500 dark:text-gray-400">
          A hackathon project @BIT N BUILD
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
