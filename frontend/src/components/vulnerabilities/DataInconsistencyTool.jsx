import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Database,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

const DataInconsistencyTool = () => {
  const [inputText, setInputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResponse, setAiResponse] = useState(null);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsProcessing(true);
    setAiResponse(null);
    setHasError(false);

    // Simulate AI processing
    setTimeout(() => {
      const mockResponse = {
        originalText: inputText,
        correctedText: inputText.replace(
          /inconsistenc(y|ies)/gi,
          "consistency"
        ),
        issues: [
          {
            type: "data_inconsistency",
            severity: "medium",
            description: "Detected inconsistent terminology usage",
            suggestion:
              "Standardize terminology across the text for better clarity",
          },
        ],
        confidence: 0.94,
        processingTime: "2.3s",
      };

      setAiResponse(mockResponse);
      setIsProcessing(false);
    }, 2500);
  };

  const examples = [
    "The user database shows 150 active users, but the analytics report indicates 175 users.",
    "The API documentation states the endpoint returns JSON, but the example shows XML format.",
    "The system requirements mention Windows 10, but the installation guide lists Windows 11.",
  ];

  return (
    <div className="space-y-6">
      {/* Tool Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Database className="w-6 h-6 text-white" />
          </div>
        </div>
        <h3 className="text-2xl font-bold font-poppins text-gray-900 dark:text-white mb-2">
          Data Inconsistency Detector
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Enter any text and our AI will identify and resolve data
          inconsistencies automatically
        </p>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Enter Text to Analyze
          </label>
          <div className="relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste or type your text here to check for data inconsistencies..."
              className="w-full h-32 px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-2xl 
                       bg-white/50 dark:bg-dark-card/50 backdrop-blur-sm resize-none
                       focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500
                       dark:focus:ring-blue-500/50 dark:focus:border-blue-500
                       transition-all duration-300 placeholder-gray-400 text-gray-900 dark:text-white"
              required
            />
            <div className="absolute bottom-3 right-3">
              <span className="text-xs text-gray-400">
                {inputText.length} characters
              </span>
            </div>
          </div>
        </div>

        {/* Example Texts */}
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Try these examples:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {examples.map((example, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setInputText(example)}
                className="p-3 text-left text-sm bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200/50 dark:border-gray-700/50 
                         hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 text-gray-600 dark:text-gray-300"
              >
                {example.substring(0, 60)}...
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isProcessing || !inputText.trim()}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed px-8 py-4 text-lg"
          >
            {isProcessing ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Analyzing with AI...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Send className="w-5 h-5" />
                <span>Analyze Text</span>
              </div>
            )}
          </button>
        </div>
      </form>

      {/* AI Response */}
      <AnimatePresence>
        {aiResponse && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-3xl p-6 border border-blue-200/50 dark:border-blue-700/50"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  AI Analysis Complete
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Confidence: {aiResponse.confidence * 100}% • Processed in{" "}
                  {aiResponse.processingTime}
                </p>
              </div>
            </div>

            {/* Issues Found */}
            {aiResponse.issues.length > 0 && (
              <div className="mb-6">
                <h5 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <AlertCircle className="w-5 h-5 text-orange-500 mr-2" />
                  Issues Detected ({aiResponse.issues.length})
                </h5>
                <div className="space-y-3">
                  {aiResponse.issues.map((issue, index) => (
                    <div
                      key={index}
                      className="bg-white/50 dark:bg-gray-800/50 rounded-xl p-4 border border-orange-200/50 dark:border-orange-700/50"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-sm font-medium text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-900/20 px-2 py-1 rounded-full">
                          {issue.severity.toUpperCase()}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {issue.type.replace("_", " ")}
                        </span>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                        {issue.description}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        <strong>Suggestion:</strong> {issue.suggestion}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Corrected Text */}
            <div>
              <h5 className="font-semibold text-gray-900 dark:text-white mb-3">
                Corrected Version
              </h5>
              <div className="bg-white/70 dark:bg-gray-800/70 rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50">
                <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                  {aiResponse.correctedText}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Processing Animation */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Database className="w-10 h-10 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              AI is Analyzing Your Text
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              Our advanced model is scanning for inconsistencies and preparing
              corrections...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DataInconsistencyTool;
