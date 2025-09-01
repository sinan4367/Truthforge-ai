import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Shield, Database, Image, ArrowLeft } from 'lucide-react'
import DataInconsistencyTool from './DataInconsistencyTool'
import GooglePhotosAITool from './GooglePhotosAITool'

const SolvedVulnerabilities = () => {
  const [expandedTool, setExpandedTool] = useState(null)

  const tools = [
    {
      id: 'data-inconsistency',
      title: 'Data Inconsistency Detection',
      description: 'AI-powered tool to detect and resolve data inconsistencies in text',
      icon: Database,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-50 to-cyan-50',
      darkBgColor: 'from-blue-900/20 to-cyan-900/20',
      explanation: 'Data inconsistency occurs when information is contradictory or mismatched across sources. Our AI ensures your text is logically and factually aligned, identifying and resolving conflicts automatically.',
      component: DataInconsistencyTool
    },
    {
      id: 'google-photos-ai',
      title: 'Google Photos AI Problem Solver',
      description: 'Advanced image classification and grouping to prevent misclassification',
      icon: Image,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-50',
      darkBgColor: 'from-green-900/20 to-emerald-900/20',
      explanation: 'Our AI detects and groups similar images to prevent misclassification, ensuring accurate photo organization. It can distinguish between different objects, people, and scenes with high precision.',
      component: GooglePhotosAITool
    }
  ]

  const toggleTool = (toolId) => {
    setExpandedTool(expandedTool === toolId ? null : toolId)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary via-secondary to-accent rounded-2xl flex items-center justify-center shadow-2xl">
            <Shield className="w-8 h-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold font-poppins gradient-text mb-4">
          Solved Vulnerabilities
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 font-inter max-w-3xl mx-auto">
          Access our cutting-edge AI models designed to detect and resolve critical security vulnerabilities. 
          Choose from our specialized tools below to get started.
        </p>
      </motion.div>

      {/* Tools Accordion */}
      <div className="max-w-4xl mx-auto space-y-6">
        {tools.map((tool, index) => {
          const Icon = tool.icon
          const ToolComponent = tool.component
          const isExpanded = expandedTool === tool.id
          
          return (
            <motion.div
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="overflow-hidden"
            >
              {/* Tool Card */}
              <div className={`relative bg-gradient-to-br ${tool.bgColor} dark:${tool.darkBgColor} rounded-3xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden`}>
                {/* Background Pattern */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${tool.color} opacity-10 rounded-full blur-3xl`}></div>
                
                {/* Header */}
                <button
                  onClick={() => toggleTool(tool.id)}
                  className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-3xl"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-14 h-14 bg-gradient-to-br ${tool.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold font-poppins text-gray-900 dark:text-white mb-2">
                          {tool.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 font-inter">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className={`w-10 h-10 bg-white/50 dark:bg-gray-800/50 rounded-xl flex items-center justify-center shadow-lg`}
                    >
                      <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </motion.div>
                  </div>
                </button>

                {/* Expanded Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        {/* Divider */}
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent my-6"></div>
                        
                        {/* Explanation */}
                        <div className="mb-6 p-4 bg-white/50 dark:bg-gray-800/50 rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            What is {tool.title.toLowerCase()}?
                          </h4>
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {tool.explanation}
                          </p>
                        </div>

                        {/* Tool Component */}
                        <div className="bg-white/30 dark:bg-gray-800/30 rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50">
                          <ToolComponent />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Footer Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center"
      >
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            🚀 Powered by Advanced AI
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Our models are continuously trained on the latest vulnerability patterns and updated regularly 
            to provide the most accurate detection and resolution capabilities.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default SolvedVulnerabilities
