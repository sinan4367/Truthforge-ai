import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Plus,
  Send,
  ThumbsUp,
  Users,
  Clock,
  BarChart3,
} from "lucide-react";

const PollsDiscussion = () => {
  const [activeTab, setActiveTab] = useState("polls");
  const [showCreatePoll, setShowCreatePoll] = useState(false);
  const [newPoll, setNewPoll] = useState({ question: "", options: ["", ""] });
  const [polls, setPolls] = useState([
    {
      id: 1,
      question:
        "Which AI model should we prioritize for next development cycle?",
      options: [
        { text: "Data Inconsistency Detector", votes: 23, percentage: 46 },
        { text: "Google Photos AI Solver", votes: 18, percentage: 36 },
        { text: "API Security Scanner", votes: 9, percentage: 18 },
      ],
      totalVotes: 50,
      author: "Sarah Chen",
      time: "2 hours ago",
      isActive: true,
    },
    {
      id: 2,
      question: "What new feature would be most valuable for developers?",
      options: [
        { text: "Real-time collaboration tools", votes: 31, percentage: 52 },
        { text: "Advanced analytics dashboard", votes: 19, percentage: 32 },
        { text: "Automated testing suite", votes: 10, percentage: 16 },
      ],
      totalVotes: 60,
      author: "Alex Rodriguez",
      time: "1 day ago",
      isActive: true,
    },
  ]);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      user: "Sarah Chen",
      message:
        "Has anyone tried the new data inconsistency tool? The results are impressive!",
      time: "2 minutes ago",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    },
    {
      id: 2,
      user: "Alex Rodriguez",
      message:
        "Yes! I tested it with some API documentation and it caught several inconsistencies I missed.",
      time: "1 minute ago",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    },
    {
      id: 3,
      user: "Developer Muhammed",
      message:
        "Great to hear! The AI model has been trained on thousands of real-world examples.",
      time: "Just now",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleCreatePoll = () => {
    if (
      newPoll.question.trim() &&
      newPoll.options.filter((opt) => opt.trim()).length >= 2
    ) {
      const poll = {
        id: Date.now(),
        question: newPoll.question,
        options: newPoll.options
          .filter((opt) => opt.trim())
          .map((opt) => ({ text: opt, votes: 0, percentage: 0 })),
        totalVotes: 0,
        author: "Developer Muhammed",
        time: "Just now",
        isActive: true,
      };
      setPolls([poll, ...polls]);
      setNewPoll({ question: "", options: ["", ""] });
      setShowCreatePoll(false);
    }
  };

  const handleVote = (pollId, optionIndex) => {
    setPolls(
      polls.map((poll) => {
        if (poll.id === pollId) {
          const newOptions = [...poll.options];
          newOptions[optionIndex].votes += 1;
          const totalVotes = newOptions.reduce(
            (sum, opt) => sum + opt.votes,
            0
          );
          newOptions.forEach((opt) => {
            opt.percentage =
              totalVotes > 0 ? Math.round((opt.votes / totalVotes) * 100) : 0;
          });
          return { ...poll, options: newOptions, totalVotes };
        }
        return poll;
      })
    );
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        user: "Developer Muhammed",
        message: newMessage,
        time: "Just now",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      };
      setChatMessages([...chatMessages, message]);
      setNewMessage("");
    }
  };

  const addOption = () => {
    setNewPoll({ ...newPoll, options: [...newPoll.options, ""] });
  };

  const removeOption = (index) => {
    if (newPoll.options.length > 2) {
      setNewPoll({
        ...newPoll,
        options: newPoll.options.filter((_, i) => i !== index),
      });
    }
  };

  const updateOption = (index, value) => {
    const newOptions = [...newPoll.options];
    newOptions[index] = value;
    setNewPoll({ ...newPoll, options: newOptions });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl flex items-center justify-center shadow-xl">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold font-poppins gradient-text mb-4">
          Polls & Discussion
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 font-inter max-w-3xl mx-auto">
          Create polls, discuss with developers, and collaborate on solutions.
          Share your thoughts and vote on important decisions.
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-1">
          <button
            onClick={() => setActiveTab("polls")}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === "polls"
                ? "bg-white dark:bg-gray-700 text-primary shadow-lg"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Polls
          </button>
          <button
            onClick={() => setActiveTab("discussion")}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === "discussion"
                ? "bg-white dark:bg-gray-700 text-primary shadow-lg"
                : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            Discussion
          </button>
        </div>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === "polls" ? (
          <motion.div
            key="polls"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="max-w-4xl mx-auto"
          >
            {/* Create Poll Button */}
            <div className="text-center mb-8">
              <button
                onClick={() => setShowCreatePoll(!showCreatePoll)}
                className="btn-primary bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create New Poll
              </button>
            </div>

            {/* Create Poll Form */}
            <AnimatePresence>
              {showCreatePoll && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="glass-card rounded-3xl p-6 mb-8 bg-white dark:bg-gray-800 shadow-lg"
                >
                  <h3 className="text-xl font-bold font-poppins text-gray-900 dark:text-white mb-4">
                    Create New Poll
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Question
                      </label>
                      <input
                        type="text"
                        value={newPoll.question}
                        onChange={(e) =>
                          setNewPoll({ ...newPoll, question: e.target.value })
                        }
                        placeholder="Enter your poll question..."
                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl 
                                 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm
                                 focus:ring-2 focus:ring-primary/50 focus:border-primary
                                 dark:focus:ring-primary/50 dark:focus:border-primary
                                 transition-all duration-300 placeholder-gray-400 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Options
                      </label>
                      <div className="space-y-3">
                        {newPoll.options.map((option, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3"
                          >
                            <input
                              type="text"
                              value={option}
                              onChange={(e) =>
                                updateOption(index, e.target.value)
                              }
                              placeholder={`Option ${index + 1}`}
                              className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-lg 
                                       bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm
                                       focus:ring-2 focus:ring-primary/50 focus:border-primary
                                       dark:focus:ring-primary/50 dark:focus:border-primary
                                       transition-all duration-300 placeholder-gray-400 text-white"
                            />
                            {newPoll.options.length > 2 && (
                              <button
                                onClick={() => removeOption(index)}
                                className="w-8 h-8 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors duration-200"
                              >
                                ×
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={addOption}
                        className="mt-3 text-sm text-primary hover:text-secondary font-medium transition-colors duration-300"
                      >
                        + Add Option
                      </button>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        onClick={() => setShowCreatePoll(false)}
                        className="px-6 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleCreatePoll}
                        className="btn-primary bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                      >
                        Create Poll
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Polls List */}
            <div className="space-y-6">
              {polls.map((poll, index) => (
                <motion.div
                  key={poll.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-3xl p-6 bg-white dark:bg-gray-800 shadow-lg"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold font-poppins text-gray-900 dark:text-white mb-2">
                        {poll.question}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {poll.totalVotes} votes
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {poll.time}
                        </span>
                        <span className="text-primary font-medium">
                          by {poll.author}
                        </span>
                      </div>
                    </div>
                    {poll.isActive && (
                      <span className="bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-medium">
                        Active
                      </span>
                    )}
                  </div>

                  {/* Poll Options */}
                  <div className="space-y-3">
                    {poll.options.map((option, optionIndex) => (
                      <button
                        key={optionIndex}
                        onClick={() => handleVote(poll.id, optionIndex)}
                        className="w-full group"
                      >
                        <div className="relative bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-gray-900 dark:text-white group-hover:text-primary transition-colors duration-200">
                              {option.text}
                            </span>
                            <span className="text-sm font-bold text-primary">
                              {option.percentage}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                            <div
                              className="h-3 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-1000 ease-out"
                              style={{ width: `${option.percentage}%` }}
                            ></div>
                          </div>
                          <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 rounded-xl transition-colors duration-200"></div>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="discussion"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-4xl mx-auto"
          >
            {/* Discussion Chat */}
            <div className="glass-card rounded-3xl p-6 bg-white dark:bg-gray-800 shadow-lg">
              <h3 className="text-xl font-bold font-poppins text-gray-900 dark:text-white mb-6">
                Developer Discussion
              </h3>

              {/* Chat Messages */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                {chatMessages.map((message, index) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <img
                      src={message.avatar}
                      alt={message.user}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {message.user}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {message.time}
                        </span>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl px-4 py-3">
                        <p className="text-gray-800 dark:text-gray-200">
                          {message.message}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Message Input */}
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl 
             bg-white/50 dark:bg-gray-500/50 backdrop-blur-sm
             focus:ring-2 focus:ring-primary/50 focus:border-primary
             dark:focus:ring-primary/50 dark:focus:border-primary
             transition-all duration-300 
             text-white placeholder-white"
                />

                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="w-12 h-12 bg-gradient-to-r from-primary to-secondary text-white rounded-xl 
                           flex items-center justify-center hover:shadow-lg hover:shadow-primary/25 
                           transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PollsDiscussion;
