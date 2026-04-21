import { Link } from 'react-router-dom';
import { Camera, Sparkles, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <div className="hero-section">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="hero-content"
        >
          <div className="badge animate-slide-up">
            <Sparkles size={16} className="text-primary" />
            <span>AI-Powered Nutritional Strategist</span>
          </div>
          
          <h1 className="hero-title">
            Stop Tracking. <br/>
            Start <span className="text-gradient">Negotiating.</span>
          </h1>
          
          <p className="hero-subtitle">
            Don't let health apps act like boring accountants logging your damage. 
            Scan your food before you eat, and let our AI suggest smarter, crave-worthy 
            swaps tailored to your exact biology.
          </p>
          
          <div className="hero-cta">
            <Link to="/auth" className="btn btn-primary btn-lg">
              Get Started Free
            </Link>
            <Link to="/auth" className="btn btn-outline btn-lg">
              View Demo
            </Link>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="hero-visual"
        >
          <div className="glass-card mockup-card">
            <div className="mockup-header">
              <Camera size={24} className="text-primary" />
              <span>Scanning: Canned Soda...</span>
            </div>
            <div className="mockup-body">
              <div className="grade-badge grade-f">Grade: F</div>
              <p className="mockup-text">Goal Conflict: Sugar Detox</p>
              
              <div className="swap-suggestion glass-card">
                <div className="swap-icon">🔄</div>
                <div>
                  <h4>NutriSwap Suggestion</h4>
                  <p>Sparkling water with fresh lime</p>
                  <span className="swap-benefit">Saves 40g sugar • Hits carbonation craving</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="glow-orb orb-1"></div>
          <div className="glow-orb orb-2"></div>
        </motion.div>
      </div>
      
      <div className="features-section">
        <div className="feature-grid">
          <div className="glass-card feature-card">
            <Camera size={32} className="feature-icon" />
            <h3>Vision AI</h3>
            <p>Just point your camera. We identify the food, portion size, and macros instantly.</p>
          </div>
          <div className="glass-card feature-card">
            <Activity size={32} className="feature-icon" />
            <h3>Utility Grade</h3>
            <p>Every meal is graded A-F based on how well it aligns with your active goal.</p>
          </div>
          <div className="glass-card feature-card">
            <Sparkles size={32} className="feature-icon" />
            <h3>Smart Swaps</h3>
            <p>Craving pizza? We'll find a swap that hits the spot without blowing your macros.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
