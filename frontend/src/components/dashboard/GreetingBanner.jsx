import { motion } from "framer-motion";
import { Zap, Shield, Brain } from "lucide-react";

const GreetingBanner = ({ user }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-3xl"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/10 to-transparent rounded-full blur-3xl"></div>

      <div className="relative glass-card rounded-3xl p-8 lg:p-12 bg-gray-100 dark:bg-gray-800">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Greeting */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-3"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                Welcome back!
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl lg:text-5xl font-bold font-poppins text-gray-800 dark:text-gray-100"
            >
              👋 Hi,{" "}
              <span className="gradient-text">{user.name.split(" ")[0]}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl text-gray-700 dark:text-gray-200 font-inter leading-relaxed"
            >
              Ready to solve vulnerabilities today? Your AI security journey
              continues with powerful tools and insights.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-3"
            >
              <div className="flex items-center space-x-2 bg-green-100 dark:bg-green-900/20 px-4 py-2 rounded-xl">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium text-green-700 dark:text-green-300">
                  2 AI Models Active
                </span>
              </div>
              <div className="flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/20 px-4 py-2 rounded-xl">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  Latest Updates
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20"
            >
              <div className="flex items-center justify-between mb-3">
                <Shield className="w-8 h-8 text-primary" />
                <span className="text-2xl font-bold text-primary">24</span>
              </div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                Vulnerabilities
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Solved this week
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-2xl p-6 border border-secondary/20"
            >
              <div className="flex items-center justify-between mb-3">
                <Brain className="w-8 h-8 text-secondary" />
                <span className="text-2xl font-bold text-secondary">98%</span>
              </div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                AI Accuracy
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Detection rate
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-6 border border-accent/20 col-span-2"
            >
              <div className="flex items-center justify-between mb-3">
                <Zap className="w-8 h-8 text-accent" />
                <span className="text-2xl font-bold text-accent">156</span>
              </div>
              <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                Total Issues Resolved
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Since project start
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default GreetingBanner;
