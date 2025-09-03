import { motion } from "framer-motion";
import {
  MessageSquare,
  Shield,
  BarChart3,
  Activity,
  Plus,
  ArrowRight,
} from "lucide-react";

const FeatureCards = ({ onTabChange }) => {
  const features = [
    {
      id: "polls",
      title: "Polls & Discussion",
      description:
        "Create polls, discuss with developers, and collaborate on solutions",
      icon: MessageSquare,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      darkBgColor: "from-blue-900/20 to-cyan-900/20",
      titleColor: "text-blue-700 dark:text-blue-300",
      descriptionColor: "text-blue-600 dark:text-blue-200",
      statsColor: "text-blue-800 dark:text-blue-400",
      action: "Create Poll",
      stats: "12 active polls",
    },
    {
      id: "vulnerabilities",
      title: "Solved Vulnerabilities",
      description:
        "Access AI-powered tools to detect and resolve security issues",
      icon: Shield,
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      darkBgColor: "from-green-900/20 to-emerald-900/20",
      titleColor: "text-green-700 dark:text-green-300",
      descriptionColor: "text-green-600 dark:text-green-200",
      statsColor: "text-green-800 dark:text-green-400",
      action: "Explore Tools",
      stats: "2 AI models ready",
    },
    {
      id: "stats",
      title: "Stats & Insights",
      description: "View detailed analytics and performance metrics",
      icon: BarChart3,
      color: "from-purple-500 to-purple-700", // purple gradient for icon
      bgColor: "from-green-50 to-emerald-50",
      darkBgColor: "from-green-900/20 to-emerald-900/20",
      titleColor: "text-purple-700 dark:text-purple-300",
      descriptionColor: "text-purple-600 dark:text-purple-200",
      statsColor: "text-purple-800 dark:text-purple-400",
      action: "View Analytics",
      stats: "Real-time data",
    },
    {
      id: "activity",
      title: "Activity Feed",
      description: "Stay updated with latest activities and notifications",
      icon: Activity,
      color: "from-orange-500 to-orange-700", // orange gradient for icon
      bgColor: "from-green-50 to-emerald-50",
      darkBgColor: "from-green-900/20 to-emerald-900/20",
      titleColor: "text-orange-700 dark:text-orange-300",
      descriptionColor: "text-orange-600 dark:text-orange-200",
      statsColor: "text-orange-800 dark:text-orange-400",
      action: "View Feed",
      stats: "8 new updates",
    },

  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <motion.div
            key={feature.id}
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            className="group cursor-pointer"
            onClick={() => onTabChange(feature.id)}
          >
            <div
              className={`relative h-full bg-gradient-to-br ${feature.bgColor} dark:${feature.darkBgColor} rounded-3xl p-6 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-500 overflow-hidden`}
            >
              {/* Background Pattern */}
              <div
                className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${feature.color} opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-500`}
              ></div>

              {/* Icon */}
              <div
                className={`relative w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon className="w-7 h-7 text-white" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3
                  className={`text-xl font-bold font-poppins mb-2 group-hover:opacity-90 transition-opacity duration-300 ${feature.titleColor}`}
                >
                  {feature.title}
                </h3>
                <p
                  className={`text-sm leading-relaxed mb-4 ${feature.descriptionColor}`}
                >
                  {feature.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-xs font-medium px-3 py-1 rounded-full bg-white/50 dark:bg-gray-800/50 ${feature.statsColor}`}
                  >
                    {feature.stats}
                  </span>
                  <div
                    className={`w-8 h-8 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                  >
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Action Button */}
                <button
                  className={`w-full bg-gradient-to-r ${feature.color} text-white py-3 px-4 rounded-xl font-semibold text-sm group-hover:shadow-lg group-hover:shadow-black/10 transition-all duration-300 flex items-center justify-center space-x-2`}
                >
                  <span>{feature.action}</span>
                  <Plus className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                </button>
              </div>

              {/* Hover Effect Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 dark:from-black/0 dark:to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default FeatureCards;
