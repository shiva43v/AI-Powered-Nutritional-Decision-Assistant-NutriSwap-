import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Flame, Target, Utensils, History } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import './Dashboard.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const { user } = useAuthStore();
  
  // Dummy data for visual presentation. In a full app, we fetch this from /api/meals
  const [stats, setStats] = useState({
    caloriesConsumed: 1450,
    tdee: user?.profile?.tdee || 2200,
    macros: { protein: 85, carbs: 120, fats: 45 },
    goals: { protein: 150, carbs: 200, fats: 70 }
  });

  const chartData = {
    labels: ['Protein', 'Carbs', 'Fats'],
    datasets: [
      {
        data: [stats.macros.protein, stats.macros.carbs, stats.macros.fats],
        backgroundColor: [
          '#3B82F6', // Blue
          '#F59E0B', // Amber
          '#EF4444', // Red
        ],
        borderColor: 'rgba(10, 10, 15, 1)',
        borderWidth: 2,
        hoverOffset: 4
      }
    ]
  };

  const chartOptions = {
    cutout: '75%',
    plugins: {
      legend: { display: false }
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h2>Welcome back, {user?.name || 'User'}!</h2>
          <p className="text-muted">Here's your nutritional overview for today.</p>
        </div>
        <div className="goal-badge">
          <Target size={18} />
          <span>Active Goal: <strong>{user?.profile?.goal || 'Maintenance'}</strong></span>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Calorie Progress */}
        <div className="glass-card stat-card">
          <div className="stat-icon bg-primary-light">
            <Flame size={24} className="text-primary" />
          </div>
          <div className="stat-details">
            <h3>Calories Remaining</h3>
            <div className="stat-value text-gradient">
              {stats.tdee - stats.caloriesConsumed} <span className="stat-unit">kcal</span>
            </div>
            <p className="stat-subtext">{stats.caloriesConsumed} / {stats.tdee} consumed</p>
            
            <div className="progress-bar-container">
              <div 
                className="progress-bar" 
                style={{ width: `${(stats.caloriesConsumed / stats.tdee) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Macros Ring */}
        <div className="glass-card macro-card">
          <h3>Macro Breakdown</h3>
          <div className="macro-chart-container">
            <div className="chart-wrapper">
              <Doughnut data={chartData} options={chartOptions} />
            </div>
            <div className="macro-legend">
              <div className="legend-item">
                <span className="dot" style={{ background: '#3B82F6' }}></span>
                <span>Protein <br/><strong>{stats.macros.protein}g</strong> <small>/ {stats.goals.protein}g</small></span>
              </div>
              <div className="legend-item">
                <span className="dot" style={{ background: '#F59E0B' }}></span>
                <span>Carbs <br/><strong>{stats.macros.carbs}g</strong> <small>/ {stats.goals.carbs}g</small></span>
              </div>
              <div className="legend-item">
                <span className="dot" style={{ background: '#EF4444' }}></span>
                <span>Fats <br/><strong>{stats.macros.fats}g</strong> <small>/ {stats.goals.fats}g</small></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Meals (Dummy Data) */}
      <div className="recent-meals-section">
        <h3 className="section-title">
          <History size={20} /> Recent Scans
        </h3>
        
        <div className="meals-list">
          <div className="glass-card meal-row">
            <div className="meal-info">
              <div className="meal-icon bg-success-light">
                <Utensils size={20} className="text-success" />
              </div>
              <div>
                <h4>Grilled Chicken Salad</h4>
                <p>12:30 PM • Lunch</p>
              </div>
            </div>
            <div className="meal-stats">
              <span className="badge-grade grade-a">Grade: A</span>
              <span className="meal-cals">420 kcal</span>
            </div>
          </div>
          
          <div className="glass-card meal-row">
            <div className="meal-info">
              <div className="meal-icon bg-warning-light">
                <Utensils size={20} className="text-warning" />
              </div>
              <div>
                <h4>Protein Oatmeal</h4>
                <p>08:15 AM • Breakfast</p>
              </div>
            </div>
            <div className="meal-stats">
              <span className="badge-grade grade-b">Grade: B</span>
              <span className="meal-cals">380 kcal</span>
            </div>
          </div>
          
          <div className="glass-card meal-row swapped-row">
            <div className="meal-info">
              <div className="meal-icon bg-primary-light">
                <Target size={20} className="text-primary" />
              </div>
              <div>
                <h4>Sparkling Water w/ Lime</h4>
                <p>03:00 PM • Snack <span className="swap-badge">NutriSwap Applied</span></p>
              </div>
            </div>
            <div className="meal-stats">
              <span className="badge-grade grade-a">Grade: A</span>
              <span className="meal-cals">5 kcal</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
