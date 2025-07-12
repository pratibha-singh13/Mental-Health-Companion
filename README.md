# 🧠 Mental Health Companion

> A modern, secure, and user-centric MERN stack application designed to empower individuals to track their emotional well-being, build healthy self-care habits, and seek support through a safe community space.

![Project Banner](https://img.shields.io/badge/Made%20with-MERN-blueviolet?style=for-the-badge)


---

## 🚀 Live Demo

[Click here to try the Mental Health Companion](https://moodmate-mental-health-companion.netlify.app/)


---

## 📌 Project Overview

Mental Health Companion is a full-stack wellness tracker that blends technology with empathy. With features like daily mood check-ins, personalized self-care routines, anonymous peer support, and data-driven insights, the platform offers a holistic mental wellness experience.

This project was collaboratively developed by a team of four developers during a hackathon, showcasing clean architecture, intuitive UI/UX, and a production-ready tech stack.

---

## 🧩 Features

### ✅ Mood & Self-Care Habits Tracking
- 🎭 Daily mood check-ins with emoji-based selection
- 🛌 Sleep, 💧 Water, 🏋️ Exercise, 🧘 Meditation, 📓 Journaling tracking
- 📝 Optional personal reflections and notes

### 📊 Personalized Insights Dashboard
- 📈 Mood trends and fluctuations over time
- 💤 Sleep and hydration visualizations
- 🎯 Habit completion overview
- 📉 Weekly mood and wellness streaks

### 🧾 Self-Care History
- 📆 Visual timeline of mood + self-care entries
- ⌛ Friendly date formatting like “Today” and “Yesterday”
- 🎨 Emojis and icons to enhance readability

### 🔒 Authentication & Authorization
- 🔐 JWT-based secure login system
- 🛡️ Protected routes and endpoints
- 📤 Cloudinary image uploads with secure access

### 🧑‍🤝‍🧑 Anonymous Peer Support Wall
- 📝 Share your thoughts anonymously
- ❤️ Like and 💬 comment on posts
- 📷 Attach images/videos to express freely
- 🧑‍💻 Post ownership with deletion rights

### 📱 Progressive UI
- 🎨 Responsive design with Tailwind CSS
- 🌫️ Glassmorphism + dark-themed modern UI
- 🚀 Smooth animations and transitions

---

## 🛠️ Tech Stack

### 💻 Frontend
- **React** + **Vite** (Blazing fast builds)
- **Tailwind CSS** (Custom theme + utility-first)
- **Lucide Icons** (Clean SVG icons)

### 🌐 Backend
- **Node.js** + **Express.js**
- **MongoDB** (via Mongoose ODM)
- **JWT Authentication**
- **Cloudinary** (Media uploads)
- **Multer** (File handling)

---

## ⚙️ Setup Instructions

### 🔧 Prerequisites
- Node.js & npm
- MongoDB URI (local or cloud)
- Cloudinary account (for media uploads)

### 📥 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pratibha-singh13/Mental-Health-Companion.git
   cd Mental-Health-Companion
2. ## Setup
1. Copy .env.example → .env (fill variables)
2. npm install in server/ and client/
3. npm run dev in root if you create a combined script, or separate:
   - cd server && npm run dev
   - cd client && npm run dev

## Required environment variables
- MONGO_URI
- JWT_SECRET
- CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
