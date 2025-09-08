# 🚀 TruthForge AI - International Hackathon Project

> **Making AI Safer, One Vulnerability at a Time**

A cutting-edge web application built with React, Vite, and Tailwind CSS that provides AI-powered tools for detecting and resolving critical security vulnerabilities.

## ✨ Features

### 🔐 Authentication System
- **Modern Login/Signup**: Beautiful glassmorphism design with smooth animations
- **Secure User Management**: Local storage-based authentication with user profiles
- **Responsive Design**: Works seamlessly on all devices

### 🎯 AI-Powered Vulnerability Detection
- **Data Inconsistency Detector**: 
  - Text analysis for logical and factual conflicts
  - AI-powered correction suggestions
  - Confidence scoring and detailed issue reports
  
- **Google Photos AI Problem Solver**:
  - Advanced image classification and grouping
  - Prevents misclassification with high accuracy
  - Drag-and-drop image upload with real-time processing

### 📊 Interactive Dashboard
- **Personalized Greeting**: Welcome message with user's name
- **Feature Cards**: Quick access to all tools and features
- **Activity Feed**: Real-time updates and notifications
- **Stats & Insights**: Performance metrics and analytics

### 🗳️ Polls & Discussion System
- **Create Polls**: Interactive polling with multiple options
- **Real-time Voting**: Live vote updates with animated progress bars
- **Developer Chat**: Real-time discussion forum for collaboration
- **Community Engagement**: Connect with other developers

### 🎨 Modern UI/UX
- **Glassmorphism Design**: Beautiful blurred glass effects
- **Dark/Light Mode**: Seamless theme switching
- **Smooth Animations**: Framer Motion powered interactions
- **Responsive Layout**: Mobile-first design approach

## 🛠️ Technology Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Context + Local Storage
- **Build Tool**: Vite with PostCSS

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd sentinel_ai_0
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 🎨 Design System

### Color Palette
- **Primary**: Electric Blue (#3B82F6)
- **Secondary**: Soft Purple (#8B5CF6) 
- **Accent**: Neon Green (#10B981)
- **Background**: Light mode (off-white) + Dark mode

### Typography
- **Headings**: Poppins (bold, modern)
- **Body**: Inter (clean, readable)
- **Accent**: Montserrat (elegant)

### Components
- **Glass Cards**: Backdrop blur with transparency
- **Gradient Buttons**: Smooth color transitions
- **Animated Elements**: Hover effects and micro-interactions

## 🔧 Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── dashboard/      # Main dashboard components
│   ├── polls/          # Polls and discussion
│   └── vulnerabilities/ # AI tools
├── context/            # React context providers
├── App.jsx            # Main application component
└── index.css          # Global styles and Tailwind
```
#Back End

This project provides utilities for face recognition and human detection using `dlib`, `face_recognition`, `deepface`, and `OpenCV`.

---

## 🚀 Features
- Detect human faces in images
- Face recognition using `dlib` and `face_recognition`
- Optional emotion, age, gender classification via `deepface`
- Utility functions for preprocessing and validation

---

## 📦 Requirements

Make sure you have **Python 3.8+** installed.

Install the required dependencies:

```bash
pip install -r requirements.txt
```

### `requirements.txt`

```txt
cmake>=3.22
dlib==19.24.2
face-recognition==1.3.0
deepface>=0.0.79
opencv-python
numpy
```

---

## ⚙️ Installation Notes

### Windows
1. Install [Visual Studio Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/).
2. Install CMake:
   ```bash
   pip install cmake
   ```
3. Then install dlib:
   ```bash
   pip install dlib
   ```

### Linux / macOS
Make sure you have CMake and a C++ compiler:
```bash
sudo apt-get update
sudo apt-get install cmake g++ make
pip install dlib
```

---

## 🖥️ Usage

### Example: Check if an image contains a human face
```python
from core.utils import is_human

print(is_human("test_image.jpg"))  # True / False
```

### Example: Face Recognition
```python
import face_recognition

image = face_recognition.load_image_file("test_image.jpg")
encodings = face_recognition.face_encodings(image)

if encodings:
    print("Face detected!")
else:
    print("No face found.")
```

---

## 📂 Project Structure
```
project/
│── core/
│   └── utils.py   # Utility functions
│── requirements.txt
│── README.md
```

---

## 📝 Notes
- `dlib` requires **C++ build tools** to compile successfully.
- Use `virtualenv` or `conda` to isolate dependencies.
- For GPU acceleration with `deepface`, install `tensorflow` or `torch` separately.

---

## 🎯 Hackathon Features

### Core AI Models
1. **Data Inconsistency Detection**
   - Analyzes text for logical conflicts
   - Provides corrected versions
   - Confidence scoring system

2. **Image Classification AI**
   - Groups similar images automatically
   - Prevents misclassification
   - High accuracy detection

### Developer Experience
- **Intuitive Interface**: Easy-to-use tools for developers
- **Real-time Collaboration**: Polls and discussion system
- **Performance Metrics**: Detailed analytics and insights

## 🌟 Key Highlights

- **International Ready**: Multi-language support ready
- **Hackathon Optimized**: Fast development and deployment
- **AI Integration Ready**: Prepared for real AI model integration
- **Scalable Architecture**: Easy to extend and modify
- **Professional Quality**: Production-ready code standards

## 🚀 Future Enhancements

- [ ] Real AI model integration
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Real-time collaboration features
- [ ] Mobile app development
- [ ] API documentation
- [ ] User management system
- [ ] Advanced security features

## 🤝 Contributing

This is a hackathon project. Feel free to:
- Fork the repository
- Create feature branches
- Submit pull requests
- Report issues
- Suggest improvements

## 📄 License

This project is created for the International Hackathon. All rights reserved.



**Built with ❤️ for the International Hackathon**

*Making AI Safer, One Vulnerability at a Time*
