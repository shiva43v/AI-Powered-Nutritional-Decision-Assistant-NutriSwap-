import { Link, useLocation } from 'react-router-dom';
import { Camera, LayoutDashboard, LogOut, Leaf } from 'lucide-react';
import useAuthStore from '../../store/authStore';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const location = useLocation();

  return (
    <nav className="glass-nav">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          <Leaf className="brand-icon" />
          <span className="text-gradient">NutriSwap</span>
        </Link>
        
        <div className="nav-links">
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </Link>
              <Link to="/scan" className="btn btn-primary nav-scan-btn">
                <Camera size={20} />
                <span>Scan Food</span>
              </Link>
              <button onClick={logout} className="nav-item btn-logout">
                <LogOut size={20} />
              </button>
            </>
          ) : (
            <Link to="/auth" className="btn btn-primary">
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
