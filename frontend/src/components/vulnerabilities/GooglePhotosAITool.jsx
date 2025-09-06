import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Image, X, CheckCircle, Loader2, Download, Tag } from 'lucide-react'
import axios from 'axios'
import JSZip from "jszip"
import { saveAs } from "file-saver"


const GooglePhotosAITool = () => {
  const [uploadedImages, setUploadedImages] = useState([])
  const [classificationResults, setClassificationResults] = useState(null)
  const [expanded, setExpanded] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true)
    else if (e.type === 'dragleave') setDragActive(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFiles(e.dataTransfer.files)
  }

  const handleDownloadReport = async () => {
  if (!classificationResults || Object.keys(classificationResults).length === 0) {
    alert("No groups available to download.")
    return
  }

  const zip = new JSZip()

  // Loop over each group
  for (const [groupName, photos] of Object.entries(classificationResults)) {
    const folder = zip.folder(groupName) // create folder for each group

    for (let i = 0; i < photos.length; i++) {
      try {
        const response = await fetch(photos[i])
        const blob = await response.blob()
        folder.file(`image_${i + 1}${photos[i].endsWith(".png") ? ".png" : ".jpg"}`, blob)
      } catch (err) {
        console.error(`Failed to fetch image: ${photos[i]}`, err)
      }
    }
  }

  // Generate ZIP
  zip.generateAsync({ type: "blob" }).then((content) => {
    saveAs(content, "grouped_photos.zip")
  })
}



  const handleFiles = (files) => {
    const newImages = Array.from(files).map((file, index) => ({
      id: Date.now() + index,
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      size: file.size,
    }))
    setUploadedImages(prev => [...prev, ...newImages])
  }

  const removeImage = (id) => {
    setUploadedImages(prev => {
      const image = prev.find(img => img.id === id)
      if (image) URL.revokeObjectURL(image.preview)
      return prev.filter(img => img.id !== id)
    })
  }

  const handleSubmit = async () => {
    if (!uploadedImages.length) {
      alert('Please upload at least one image.')
      return
    }

    try {
      setIsProcessing(true)

      const formData = new FormData()
      uploadedImages.forEach(img => formData.append('images', img.file))

      const response = await axios.post('http://127.0.0.1:8000/api/upload/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      // The backend should return an object with folder names as keys and array of image URLs
      if (response.data.groups && Object.keys(response.data.groups).length > 0) {
        setClassificationResults(response.data.groups)
        setExpanded({})
      } else {
        alert('No images were grouped. Check your backend response format.')
      }
    } catch (error) {
      console.error(error)
      alert('Something went wrong while processing your images.')
    } finally {
      setIsProcessing(false)
    }
  }

  const toggleExpand = (groupName) => {
    setExpanded(prev => ({ ...prev, [groupName]: !prev[groupName] }))
  }

const getCategoryColor = (folderName) => {
  const colors = {
    'Person': 'from-blue-500 to-cyan-500',
    'Flower': 'from-pink-500 to-rose-500',
    'Landscape': 'from-green-500 to-emerald-500',
    'Animal': 'from-orange-500 to-red-500',
    'Object': 'from-purple-500 to-indigo-500'
  }
  return colors[folderName] || 'from-gray-500 to-gray-600'
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

    <AnimatePresence>
  {classificationResults && Object.keys(classificationResults).length > 0 && (
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
            AI Grouping Complete
          </h4>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {Object.keys(classificationResults).length} group(s) detected • Processed successfully
          </p>
        </div>
      </div>

    {/* Groups */}
<div className="space-y-6">
  {Object.entries(classificationResults).map(([groupName, photos]) => {
    const gradientClass = getCategoryColor(groupName)
    const isPerson = groupName.toLowerCase().startsWith("person")
    const IconComponent = isPerson ? CheckCircle : Tag
    const displayName = groupName.charAt(0).toUpperCase() + groupName.slice(1)

    return (
      <div
        key={groupName}
        className={`bg-white/10 dark:bg-gray-800/30 rounded-2xl shadow-md p-6 border border-white/20 ${gradientClass}`}
      >
        {/* Top-left section: 2-column layout */}
        <div className="flex items-start mb-4">
          {/* Column 1: Icon */}
          <div className="flex-shrink-0 mr-4">
            <IconComponent className="w-6 h-6 text-white" />
          </div>

          {/* Column 2: Folder name and number of images */}
          <div className="flex flex-col">
            <h5 className="text-white font-semibold">{displayName}</h5>
            <p className="text-gray-200 text-sm">{photos.length} photo{photos.length !== 1 ? "s" : ""}</p>
          </div>
        </div>

        {/* Photos Row */}
        {Array.isArray(photos) && photos.length > 0 && (
          <div
            className="flex gap-4 overflow-x-auto cursor-grab scrollbar-none"
            onMouseDown={(e) => {
              const slider = e.currentTarget
              let isDown = true
              let startX = e.pageX - slider.offsetLeft
              let scrollLeft = slider.scrollLeft

              const mouseMoveHandler = (eMove) => {
                if (!isDown) return
                eMove.preventDefault()
                const x = eMove.pageX - slider.offsetLeft
                const walk = x - startX
                slider.scrollLeft = scrollLeft - walk
              }

              const mouseUpHandler = () => {
                isDown = false
                window.removeEventListener("mousemove", mouseMoveHandler)
                window.removeEventListener("mouseup", mouseUpHandler)
              }

              window.addEventListener("mousemove", mouseMoveHandler)
              window.addEventListener("mouseup", mouseUpHandler)
            }}
          >
            {photos.map((photo, idx) => (
              <img
                key={idx}
                src={photo}
                alt={groupName}
                className="w-[232px] h-[64px] object-cover rounded-xl shadow flex-shrink-0 border border-white/10"
              />
            ))}
          </div>
        )}
      </div>
    )
  })}
</div>


      <style jsx>{`
  .scrollbar-none::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-none {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`}</style>

      {/* Download Results */}
      <div className="mt-6 pt-6 border-t border-green-200/50 dark:border-green-700/50">
       <button
  onClick={handleDownloadReport}
  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300 flex items-center justify-center space-x-2"
>
  <Download className="w-5 h-5" />
  <span>Download Grouping Report</span>
</button>

      </div>
    </motion.div>
  )}
</AnimatePresence>





          {/* Processing Animation */}
<AnimatePresence>
  {isProcessing && !classificationResults && (
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
        AI is Classifying, Please Wait
      </h4>
      <p className="text-gray-600 dark:text-gray-300">
        Our AI is analyzing your images and grouping them intelligently...
      </p>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  )
}

export default GooglePhotosAITool
