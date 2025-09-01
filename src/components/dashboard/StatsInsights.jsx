import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Users,
  Shield,
  Zap,
  Target,
} from "lucide-react";

const StatsInsights = () => {
  const stats = [
    {
      title: "Total Vulnerabilities Solved",
      value: "156",
      change: "+12",
      changeType: "positive",
      icon: Shield,
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-200 to-emerald-200",
      darkBgColor: "from-green-900/30 to-emerald-900/30",
    },
    {
      title: "Active Developers",
      value: "89",
      change: "+5",
      changeType: "positive",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-200 to-cyan-200",
      darkBgColor: "from-blue-900/30 to-cyan-900/30",
    },
    {
      title: "AI Model Accuracy",
      value: "98.2%",
      change: "+2.1%",
      changeType: "positive",
      icon: Target,
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-200 to-pink-200",
      darkBgColor: "from-purple-900/30 to-pink-900/30",
    },
    {
      title: "Response Time",
      value: "2.3s",
      change: "-0.8s",
      changeType: "negative",
      icon: Zap,
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-200 to-red-200",
      darkBgColor: "from-orange-900/30 to-red-900/30",
    },
  ];

  const vulnerabilityTypes = [
    {
      type: "Data Inconsistency",
      count: 45,
      percentage: 29,
      color: "from-blue-500 to-cyan-500",
    },
    {
      type: "Image Misclassification",
      count: 38,
      percentage: 24,
      color: "from-green-500 to-emerald-500",
    },
    {
      type: "API Vulnerabilities",
      count: 32,
      percentage: 21,
      color: "from-purple-500 to-pink-500",
    },
    {
      type: "Security Issues",
      count: 25,
      percentage: 16,
      color: "from-orange-500 to-red-500",
    },
    {
      type: "Other",
      count: 16,
      percentage: 10,
      color: "from-gray-500 to-gray-600",
    },
  ];

  const weeklyProgress = [
    { day: "Mon", solved: 8, target: 10 },
    { day: "Tue", solved: 12, target: 10 },
    { day: "Wed", solved: 9, target: 10 },
    { day: "Thu", solved: 15, target: 10 },
    { day: "Fri", solved: 11, target: 10 },
    { day: "Sat", solved: 6, target: 8 },
    { day: "Sun", solved: 4, target: 6 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass-card rounded-3xl p-6 bg-white dark:bg-gray-800 shadow-lg"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-poppins text-gray-900 dark:text-white">
              Stats & Insights
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Performance metrics and analytics
            </p>
          </div>
        </div>
        <button className="text-sm text-primary hover:text-secondary font-medium transition-colors duration-300">
          View Details
        </button>
      </div>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              className={`bg-gradient-to-br ${stat.bgColor} dark:${stat.darkBgColor} rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-md`}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div
                  className={`text-sm font-semibold ${
                    stat.changeType === "positive"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {stat.change}
                </div>
              </div>
              <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-tight">
                {stat.title}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Vulnerability Types Chart */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
          Vulnerabilities by Type
        </h4>
        <div className="space-y-3">
          {vulnerabilityTypes.map((item, index) => (
            <motion.div
              key={item.type}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="flex items-center space-x-3"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {item.type}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {item.count}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Weekly Progress */}
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
          Weekly Progress
        </h4>
        <div className="grid grid-cols-7 gap-2">
          {weeklyProgress.map((day, index) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="text-center"
            >
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                {day.day}
              </div>
              <div className="relative">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-16 flex flex-col justify-end">
                  <div
                    className="bg-gradient-to-t from-primary to-secondary rounded-full transition-all duration-1000 ease-out"
                    style={{ height: `${(day.solved / day.target) * 100}%` }}
                  ></div>
                </div>
                <div className="absolute inset-0 flex flex-col justify-end items-center pb-1">
                  <span className="text-xs font-bold text-white drop-shadow-sm">
                    {day.solved}
                  </span>
                </div>
              </div>
              <div className="text-xs text-gray-400 mt-1">{day.target}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Performance Summary */}
      <div className="mt-6 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Overall performance
            </span>
          </div>
          <span className="text-lg font-bold text-green-600 dark:text-green-400">
            +18.5%
          </span>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          Compared to last week
        </p>
      </div>
    </motion.div>
  );
};

export default StatsInsights;
