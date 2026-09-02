<<<<<<< HEAD
# 🥗 NutriSwap: AI-Powered Nutritional Decision Assistant

![NutriSwap Banner](https://images.unsplash.com/photo-1543333309-8cd45966a09e?auto=format&fit=crop&q=80&w=1200&h=400)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![OpenRouter](https://img.shields.io/badge/AI-OpenRouter-111827)](https://openrouter.ai/)

**NutriSwap** is a cutting-edge intelligent application designed to empower users to make healthier food choices. By leveraging OpenRouter with `google/gemma-4-31b-it:free`, NutriSwap provides real-time nutritional analysis, product grading, and personalized recommendations for healthier alternatives.

---

## ✨ Key Features

- **📷 Intelligent Food Analysis**: Scan product barcodes or upload images of food items. Our AI instantly identifies the product and extracts its nutritional profile.
- **📊 Smart Grading System**: Every product is graded from **A+ (Excellent)** to **F (Poor)** based on its nutritional density, ingredients, and potential health impact.
- **💡 Smart Swaps**: Receive context-aware recommendations for healthier alternatives ("swaps") based on your current selection and dietary goals.
- **🎯 Personalized Nutrition Goals**: Tailor your experience by setting goals such as:
  - **Sugar Detox**: Avoid hidden sugars and high-glycemic foods.
  - **Fat Cut**: Identify and swap high-saturated fat products.
  - **Lean Bulk**: Find protein-rich, calorie-dense healthy alternatives.
- **📈 Progress Tracking**: Monitor your nutritional decisions over time through an interactive dashboard.
- **🔒 Secure & Private**: JWT-based authentication ensures your data remains private and secure.

---

## 🛠️ Tech Stack

### Frontend
- **React**: Modern component-based architecture.
- **Vite**: Ultra-fast build tool and development server.
- **Zustand**: Lightweight state management.
- **Framer Motion**: Smooth, premium UI animations.
- **Chart.js**: Dynamic data visualization for nutritional stats.
- **Lucide React**: Clean and consistent iconography.

### Backend
- **Node.js & Express**: Scalable and robust server-side architecture.
- **MongoDB & Mongoose**: Flexible NoSQL database for user profiles and history.
- **OpenRouter API**: LLM-powered food analysis and healthier swap generation using `google/gemma-4-31b-it:free`.
- **Cloudinary**: Secure image storage and management.
- **JWT**: Secure authentication and authorization.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18.x or higher recommended)
- **MongoDB** (Local instance or MongoDB Atlas)
- **API Keys**: OpenRouter API key, Cloudinary account.

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/shiva43v/AI-Powered-Nutritional-Decision-Assistant-NutriSwap-.git
   cd NutriSwap
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   OPENROUTER_API_KEY=your_openrouter_api_key
   OPENROUTER_MODEL=google/gemma-4-31b-it:free
   OPENROUTER_SITE_URL=http://localhost:5173
   OPENROUTER_APP_NAME=NutriSwap
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```

3. **Frontend Setup**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

**Start the Backend:**
```bash
cd server
npm run dev
```

**Start the Frontend:**
```bash
cd client
npm run dev
```

---

## 🧠 How It Works

1. **Upload/Scan**: The user uploads an image of a food product or its label.
2. **AI Processing**: The input is sent to the backend, which interacts with OpenRouter using `google/gemma-4-31b-it:free`.
3. **Extraction**: The AI identifies the product name, nutritional values (calories, fats, proteins, sugars), and ingredient list.
4. **Grading & Swapping**: Based on the user's specific health goals, the system calculates a grade and searches for healthier products in the same category.
5. **Insights**: The user receives a detailed breakdown of why the product was graded a certain way and what they should choose instead.

---

## 🛣️ Roadmap
- [ ] Mobile App (React Native) for seamless on-the-go scanning.
- [ ] Integration with wearable health devices (Apple Health, Google Fit).
- [ ] Community-driven healthy recipe suggestions.
- [ ] Multi-language support for global nutritional labels.

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
*Developed with ❤️ to help the world eat better.*
=======
# 🥗 NutriSwap: AI-Powered Nutritional Decision Assistant

![NutriSwap Banner](https://images.unsplash.com/photo-1543333309-8cd45966a09e?auto=format&fit=crop&q=80&w=1200&h=400)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Google Gemini](https://img.shields.io/badge/AI-Google%20Gemini-4285F4?logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)

**NutriSwap** is a cutting-edge intelligent application designed to empower users to make healthier food choices. By leveraging the power of Google's Gemini AI, NutriSwap provides real-time nutritional analysis, product grading, and personalized recommendations for healthier alternatives.

---

## ✨ Key Features

- **📷 Intelligent Food Analysis**: Scan product barcodes or upload images of food items. Our AI instantly identifies the product and extracts its nutritional profile.
- **📊 Smart Grading System**: Every product is graded from **A+ (Excellent)** to **F (Poor)** based on its nutritional density, ingredients, and potential health impact.
- **💡 Smart Swaps**: Receive context-aware recommendations for healthier alternatives ("swaps") based on your current selection and dietary goals.
- **🎯 Personalized Nutrition Goals**: Tailor your experience by setting goals such as:
  - **Sugar Detox**: Avoid hidden sugars and high-glycemic foods.
  - **Fat Cut**: Identify and swap high-saturated fat products.
  - **Lean Bulk**: Find protein-rich, calorie-dense healthy alternatives.
- **📈 Progress Tracking**: Monitor your nutritional decisions over time through an interactive dashboard.
- **🔒 Secure & Private**: JWT-based authentication ensures your data remains private and secure.

---

## 🛠️ Tech Stack

### Frontend
- **React**: Modern component-based architecture.
- **Vite**: Ultra-fast build tool and development server.
- **Zustand**: Lightweight state management.
- **Framer Motion**: Smooth, premium UI animations.
- **Chart.js**: Dynamic data visualization for nutritional stats.
- **Lucide React**: Clean and consistent iconography.

### Backend
- **Node.js & Express**: Scalable and robust server-side architecture.
- **MongoDB & Mongoose**: Flexible NoSQL database for user profiles and history.
- **Google Gemini API**: Advanced LLM and Computer Vision for food analysis.
- **Cloudinary**: Secure image storage and management.
- **JWT**: Secure authentication and authorization.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18.x or higher recommended)
- **MongoDB** (Local instance or MongoDB Atlas)
- **API Keys**: Google Gemini API key, Cloudinary account.

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/shiva43v/AI-Powered-Nutritional-Decision-Assistant-NutriSwap-.git
   cd NutriSwap
   ```

2. **Backend Setup**
   ```bash
   cd server
   npm install
   ```
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   GEMINI_API_KEY=your_gemini_api_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_key
   CLOUDINARY_API_SECRET=your_cloudinary_secret
   ```

3. **Frontend Setup**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

**Start the Backend:**
```bash
cd server
npm run dev
```

**Start the Frontend:**
```bash
cd client
npm run dev
```

---

## 🧠 How It Works

1. **Upload/Scan**: The user uploads an image of a food product or its label.
2. **AI Processing**: The image is sent to the backend, which interacts with the **Google Gemini Pro Vision** model.
3. **Extraction**: The AI identifies the product name, nutritional values (calories, fats, proteins, sugars), and ingredient list.
4. **Grading & Swapping**: Based on the user's specific health goals, the system calculates a grade and searches for healthier products in the same category.
5. **Insights**: The user receives a detailed breakdown of why the product was graded a certain way and what they should choose instead.

---

## 🛣️ Roadmap
- [ ] Mobile App (React Native) for seamless on-the-go scanning.
- [ ] Integration with wearable health devices (Apple Health, Google Fit).
- [ ] Community-driven healthy recipe suggestions.
- [ ] Multi-language support for global nutritional labels.

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
*Developed with ❤️ to help the world eat better.*


<img width="1911" height="919" alt="Screenshot 2026-05-13 105608" src="https://github.com/user-attachments/assets/a6c2671b-1b97-4520-9dd4-85655038c662" />
<img width="1911" height="975" alt="Screenshot 2026-05-13 105752" src="https://github.com/user-attachments/assets/713e0255-bd8c-469d-b5f0-cbb033669fe6" />


>>>>>>> e2185e1756256264be7e8f43fae32b6144838db0
