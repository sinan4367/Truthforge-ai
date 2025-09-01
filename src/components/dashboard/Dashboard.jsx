import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import GreetingBanner from "./GreetingBanner";
import FeatureCards from "./FeatureCards";
import PollsDiscussion from "../polls/PollsDiscussion";
import SolvedVulnerabilities from "../vulnerabilities/SolvedVulnerabilities";
import ActivityFeed from "./ActivityFeed";
import StatsInsights from "./StatsInsights";

const Dashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showSidebar, setShowSidebar] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-8"
          >
            <GreetingBanner user={user} />
            <FeatureCards onTabChange={setActiveTab} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ActivityFeed />
              <StatsInsights />
            </div>
          </motion.div>
        );
      case "polls":
        return <PollsDiscussion />;
      case "vulnerabilities":
        return <SolvedVulnerabilities />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-dark-bg transition-colors duration-300">
      <Navbar
        user={user}
        onLogout={onLogout}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        showSidebar={showSidebar}
        onToggleSidebar={() => setShowSidebar(!showSidebar)}
      />

      <main className="pt-20 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
        </div>
      </main>

      {/* Floating Action Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-primary to-secondary 
                   rounded-full shadow-2xl hover:shadow-primary/25 transition-all duration-300 
                   transform hover:scale-110 flex items-center justify-center text-white"
        onClick={() => setActiveTab("vulnerabilities")}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </motion.button>
    </div>
  );
};

export default Dashboard;
