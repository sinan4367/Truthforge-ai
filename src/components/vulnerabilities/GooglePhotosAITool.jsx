import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Image, X, CheckCircle, Loader2, Download, Tag } from 'lucide-react'

const GooglePhotosAITool = () => {
  const [uploadedImages, setUploadedImages] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [classificationResults, setClassificationResults] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFiles = (files) => {
    const newImages = Array.from(files).map((file, index) => ({
      id: Date.now() + index,
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      size: file.size
    }))
    
    setUploadedImages(prev => [...prev, ...newImages])
  }

  const removeImage = (id) => {
    setUploadedImages(prev => {
      const image = prev.find(img => img.id === id)
      if (image) {
        URL.revokeObjectURL(image.preview)
      }
      return prev.filter(img => img.id !== id)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (uploadedImages.length === 0) return

    setIsProcessing(true)
    setClassificationResults(null)

    // Simulate AI processing
    setTimeout(() => {
      const mockResults = {
        totalImages: uploadedImages.length,
        categories: [
          {
            name: 'Person',
            count: 3,
            confidence: 0.98,
            images: uploadedImages.slice(0, 3).map(img => img.id),
            color: 'from-blue-500 to-cyan-500'
          },
          {
            name: 'Flower',
            count: 2,
            confidence: 0.95,
            images: uploadedImages.slice(3, 5).map(img => img.id),
            color: 'from-pink-500 to-rose-500'
          },
          {
            name: 'Landscape',
            count: 1,
            confidence: 0.92,
            images: uploadedImages.slice(5).map(img => img.id),
            color: 'from-green-500 to-emerald-500'
          }
        ],
        processingTime: '4.2s',
        accuracy: 0.96
      }
      
      setClassificationResults(mockResults)
      setIsProcessing(false)
    }, 4000)
  }

  const getCategoryColor = (categoryName) => {
    const colors = {
      'Person': 'from-blue-500 to-cyan-500',
      'Flower': 'from-pink-500 to-rose-500',
      'Landscape': 'from-green-500 to-emerald-500',
      'Animal': 'from-orange-500 to-red-500',
      'Object': 'from-purple-500 to-indigo-500'
    }
    return colors[categoryName] || 'from-gray-500 to-gray-600'
  }

  return (
    <div className="space-y-6">
      {/* Tool Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Image className="w-6 h-6 text-white" />
          </div>
        </div>
        <h3 className="text-2xl font-bold font-poppins text-gray-900 dark:text-white mb-2">
          Google Photos AI Problem Solver
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Upload images and our AI will classify and group them to prevent misclassification
        </p>
      </div>

      {/* Image Upload Area */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Upload Images for Classification
          </label>
          
          {/* Drag & Drop Zone */}
          <div
            className={`relative border-2 border-dashed rounded-3xl p-8 text-center transition-all duration-300 ${
              dragActive 
                ? 'border-green-500 bg-green-50 dark:bg-green-900/20' 
                : 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFiles(e.target.files)}
              className="hidden"
            />
            
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Drop images here or click to browse
                </p>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Supports JPG, PNG, GIF up to 10MB each
                </p>
              </div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="btn-accent"
              >
                Choose Files
              </button>
            </div>
          </div>
        </div>

        {/* Uploaded Images Preview */}
        {uploadedImages.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Uploaded Images ({uploadedImages.length})
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {uploadedImages.map((image) => (
                <div key={image.id} className="relative group">
                  <img
                    src={image.preview}
                    alt={image.name}
                    className="w-full h-24 object-cover rounded-xl border border-gray-200 dark:border-gray-600"
                  />
                  <button
                    onClick={() => removeImage(image.id)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center 
                             opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 rounded-b-xl truncate">
                    {image.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit Button */}
        {uploadedImages.length > 0 && (
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              disabled={isProcessing}
              className="btn-accent disabled:opacity-50 disabled:cursor-not-allowed px-8 py-4 text-lg"
            >
              {isProcessing ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>AI is Classifying Images...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Tag className="w-5 h-5" />
                  <span>Classify Images</span>
                </div>
              )}
            </button>
          </div>
        )}
      </div>

      {/* AI Classification Results */}
      <AnimatePresence>
        {classificationResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-3xl p-6 border border-green-200/50 dark:border-green-700/50"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white">
                  AI Classification Complete
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Accuracy: {classificationResults.accuracy * 100}% • Processed in {classificationResults.processingTime}
                </p>
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <h5 className="font-semibold text-gray-900 dark:text-white text-lg">
                Image Categories ({classificationResults.categories.length})
              </h5>
              
              {classificationResults.categories.map((category, index) => (
                <div key={index} className="bg-white/70 dark:bg-gray-800/70 rounded-2xl p-4 border border-gray-200/50 dark:border-gray-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 bg-gradient-to-br ${category.color} rounded-xl flex items-center justify-center`}>
                        <Tag className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h6 className="font-semibold text-gray-900 dark:text-white">
                          {category.name}
                        </h6>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {category.count} image{category.count !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded-full">
                        {category.confidence * 100}%
                      </span>
                    </div>
                  </div>
                  
                  {/* Category Images */}
                  <div className="grid grid-cols-3 gap-2">
                    {category.images.map((imageId) => {
                      const image = uploadedImages.find(img => img.id === imageId)
                      return image ? (
                        <div key={imageId} className="relative">
                          <img
                            src={image.preview}
                            alt={image.name}
                            className="w-full h-16 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-lg"></div>
                        </div>
                      ) : null
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Download Results */}
            <div className="mt-6 pt-6 border-t border-green-200/50 dark:border-green-700/50">
              <button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 flex items-center justify-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Download Classification Report</span>
              </button>
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
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Image className="w-10 h-10 text-white" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              AI is Analyzing Your Images
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              Our advanced computer vision model is classifying and grouping your images...
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default GooglePhotosAITool
