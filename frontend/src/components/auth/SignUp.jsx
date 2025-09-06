import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, UserPlus, Zap, Brain, ArrowLeft } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

const SignUp = ({ onLogin, onToggleMode }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { isDark } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      onLogin({
        id: 1,
        name: formData.name,
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
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        onClick={onToggleMode}
        className="mb-6 flex items-center text-gray-600 dark:text-gray-300 hover:text-primary transition-colors duration-300"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Login
      </motion.button>

      {/* Logo and Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-secondary via-accent to-primary rounded-2xl flex items-center justify-center shadow-2xl">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Zap className="w-3 h-3 text-white" />
            </div>
          </div>
        </div>
        <h1 className="text-4xl font-bold font-poppins gradient-text mb-2">
          Join TruthForge
        </h1>
        <p className="text-gray-600 dark:text-gray-300 font-inter">
          Start your journey in making AI safer
        </p>
      </motion.div>

      {/* Sign Up Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-3xl p-8 shadow-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl 
                       bg-white/50 dark:bg-dark-card/50 backdrop-blur-sm
                       focus:ring-2 focus:ring-primary/50 focus:border-primary
                       dark:focus:ring-primary/50 dark:focus:border-primary
                       transition-all duration-300 placeholder-gray-600"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
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
                placeholder="Create a password"
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

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl 
                         bg-white/50 dark:bg-dark-card/50 backdrop-blur-sm
                         focus:ring-2 focus:ring-primary/50 focus:border-primary
                         dark:focus:ring-primary/50 dark:focus:border-primary
                         transition-all duration-300 placeholder-gray-600 pr-12"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                {showConfirmPassword ? (
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
            className="w-full btn-accent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                Creating account...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <UserPlus className="w-5 h-5 mr-2" />
                Create Account
              </div>
            )}
          </button>
        </form>

        {/* Terms */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            By signing up, you agree to our{" "}
            <a href="#" className="text-primary hover:text-secondary underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:text-secondary underline">
              Privacy Policy
            </a>
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
          Ready to forge the future of secure AI
        </p>
      </motion.div>
    </div>
  );
};

export default SignUp;
