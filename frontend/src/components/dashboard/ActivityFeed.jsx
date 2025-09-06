import { motion } from "framer-motion";
import {
  Activity,
  MessageSquare,
  Shield,
  BarChart3,
  Clock,
  User,
} from "lucide-react";

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: "vulnerability_solved",
      title: "Data inconsistency detected and resolved",
      description:
        "AI model successfully identified and corrected 3 data conflicts in user documentation",
      time: "2 minutes ago",
      icon: Shield,
      color: "text-green-600",
      bgColor: "bg-green-200 dark:bg-green-900/30",
    },
    {
      id: 2,
      type: "poll_created",
      title: "New poll created by Sarah Chen",
      description:
        'Poll: "Which AI model should we prioritize for next development cycle?"',
      time: "15 minutes ago",
      icon: MessageSquare,
      color: "text-blue-600",
      bgColor: "bg-blue-200 dark:bg-blue-900/30",
    },
    {
      id: 3,
      type: "ai_update",
      title: "Google Photos AI model updated",
      description: "Image classification accuracy improved from 94% to 98%",
      time: "1 hour ago",
      icon: BarChart3,
      color: "text-purple-600",
      bgColor: "bg-purple-200 dark:bg-purple-900/30",
    },
    {
      id: 4,
      type: "user_joined",
      title: "New developer joined the platform",
      description: "Alex Rodriguez joined TruthForge AI community",
      time: "2 hours ago",
      icon: User,
      color: "text-orange-600",
      bgColor: "bg-orange-200 dark:bg-orange-900/30",
    },
    {
      id: 5,
      type: "vulnerability_solved",
      title: "Image misclassification resolved",
      description: "Successfully grouped 12 similar images with 96% accuracy",
      time: "3 hours ago",
      icon: Shield,
      color: "text-green-600",
      bgColor: "bg-green-200 dark:bg-green-900/30",
    },
  ];

  const getActivityIcon = (type) => {
    const iconMap = {
      vulnerability_solved: Shield,
      poll_created: MessageSquare,
      ai_update: BarChart3,
      user_joined: User,
    };
    return iconMap[type] || Activity;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass-card rounded-3xl p-6 bg-white dark:bg-gray-800 shadow-lg"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-red-400 rounded-2xl flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-poppins text-gray-900 dark:text-white">
              Activity Feed
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Latest updates and activities
            </p>
          </div>
        </div>
        <button className="text-sm text-primary hover:text-secondary font-medium transition-colors duration-300">
          View All
        </button>
      </div>

      {/* Activities List */}
      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = getActivityIcon(activity.type);
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className="group cursor-pointer"
            >
              <div className="flex items-start space-x-3 p-3 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors duration-200">
                {/* Activity Icon */}
                <div
                  className={`w-10 h-10 ${activity.bgColor} rounded-xl flex items-center justify-center flex-shrink-0`}
                >
                  <Icon className={`w-5 h-5 ${activity.color}`} />
                </div>

                {/* Activity Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors duration-200">
                    {activity.title}
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 leading-relaxed">
                    {activity.description}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                    <Clock className="w-3 h-3" />
                    <span>{activity.time}</span>
                  </div>
                </div>

                {/* Hover Indicator */}
                <div className="w-2 h-2 bg-gray-300 dark:bg-gray-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
        <div className="text-center">
          <button className="text-sm text-primary hover:text-secondary font-medium transition-colors duration-300">
            Load More Activities
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityFeed;
