import { useState, useRef } from 'react';
import { Camera, Upload, X, Zap, ArrowRight, RefreshCw, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useScanStore from '../../store/scanStore';
import useAuthStore from '../../store/authStore';
import axios from 'axios';
import './ScanPage.css';

const ScanPage = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  
  const fileInputRef = useRef(null);
  
  const { isScanning, setScanning, scanResults, setScanResults, clearScan, error, setError } = useScanStore();
  const { token, user } = useAuthStore();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      clearScan();
    }
  };

  const handleScan = async () => {
    if (!file) return;
    
    setScanning(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:5000/api/scan/process', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
      setScanResults(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to analyze image. Please try again.');
    } finally {
      setScanning(false);
    }
  };

  const resetScan = () => {
    setFile(null);
    setPreviewUrl(null);
    clearScan();
  };

  return (
    <div className="scan-container">
      {!scanResults ? (
        <div className="scan-setup">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card capture-card"
          >
            <div className="capture-header">
              <h2>NutriScan AI</h2>
              <p>Current Goal: <span className="text-primary">{user?.profile?.goal || 'Maintenance'}</span></p>
            </div>
            
            {error && (
              <div className="scan-error">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            <div className={`capture-area ${previewUrl ? 'has-image' : ''}`}>
              {previewUrl ? (
                <>
                  <img src={previewUrl} alt="Food preview" className="preview-image" />
                  <button className="btn-close" onClick={resetScan}>
                    <X size={20} />
                  </button>
                  {isScanning && (
                    <div className="scan-overlay">
                      <div className="scanner-line"></div>
                      <p className="scanning-text">Analyzing macros & matching goals...</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="upload-placeholder" onClick={() => fileInputRef.current?.click()}>
                  <div className="upload-icon-wrapper">
                    <Camera size={40} className="text-primary" />
                  </div>
                  <h3>Tap to Capture Food</h3>
                  <p>Or upload an image from gallery</p>
                </div>
              )}
              
              <input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                capture="environment"
                className="hidden-input"
              />
            </div>

            {previewUrl && !isScanning && (
              <button className="btn btn-primary btn-scan" onClick={handleScan}>
                <Zap size={20} />
                <span>Analyze Meal</span>
              </button>
            )}
          </motion.div>
        </div>
      ) : (
        <ResultsView results={scanResults} resetScan={resetScan} />
      )}
    </div>
  );
};

const ResultsView = ({ results, resetScan }) => {
  const { identifiedFood, grade, swaps, imageUrl } = results;

  const getGradeClass = (g) => `grade-${g.toLowerCase()}`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="results-container"
    >
      <div className="results-header">
        <button onClick={resetScan} className="btn btn-outline btn-sm">
          <RefreshCw size={16} /> Scan Again
        </button>
        <h2>Analysis Complete</h2>
      </div>

      <div className="results-grid">
        {/* Grade Card */}
        <div className={`glass-card grade-card ${getGradeClass(grade.grade)}`}>
          <div className="grade-circle">{grade.grade}</div>
          <div className="grade-details">
            <h3>Utility Grade</h3>
            <p>{grade.reasoning}</p>
          </div>
        </div>

        {/* Identified Food */}
        <div className="glass-card food-card">
          <h3>Identified Items</h3>
          <div className="food-list">
            {identifiedFood.map((food, idx) => (
              <div key={idx} className="food-item">
                <span className="food-name">{food.name} <span className="portion">({food.portionSize})</span></span>
                <span className="food-cals">{food.calories} kcal</span>
              </div>
            ))}
          </div>
          <div className="macro-summary">
            <div className="macro-pill protein">
              <span className="label">P</span>
              <span className="value">{grade.totalMacros.protein}g</span>
            </div>
            <div className="macro-pill carbs">
              <span className="label">C</span>
              <span className="value">{grade.totalMacros.carbs}g</span>
            </div>
            <div className="macro-pill fats">
              <span className="label">F</span>
              <span className="value">{grade.totalMacros.fats}g</span>
            </div>
          </div>
        </div>
      </div>

      {/* Swaps */}
      {swaps && swaps.length > 0 && (
        <div className="swaps-section">
          <h3 className="section-title">
            <Zap className="text-primary" size={24} /> 
            NutriSwaps
          </h3>
          <div className="swaps-grid">
            {swaps.map((swap, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={swap._id} 
                className="glass-card swap-card"
              >
                <div className="swap-header">
                  <span className="original-food line-through">{swap.originalFood.name}</span>
                  <ArrowRight size={16} className="text-primary" />
                  <span className="suggested-food text-gradient">{swap.suggestedSwap.name}</span>
                </div>
                
                <p className="swap-desc">"{swap.suggestedSwap.description}"</p>
                
                <div className="swap-stats">
                  <span>{swap.suggestedSwap.calories} kcal</span>
                  <span>{swap.suggestedSwap.macros.protein}g P</span>
                  <span>{swap.suggestedSwap.macros.carbs}g C</span>
                </div>
                
                <div className="swap-reason">
                  <strong>Why it fits:</strong> {swap.suggestedSwap.whyItsBetter}
                </div>
                
                <button className="btn btn-outline swap-btn">
                  Log Swap Instead
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Primary Action */}
      <div className="log-action">
        <button className="btn btn-primary btn-lg log-btn">
          Log Original Meal Anyway
        </button>
      </div>
    </motion.div>
  );
};

export default ScanPage;
