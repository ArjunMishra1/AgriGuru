import React, { useState, useEffect } from 'react';
import { 
  Leaf, 
  Thermometer, 
  Droplets, 
  Sun, 
  TrendingUp, 
  BarChart3,
  Users,
  ChevronRight,
  Play,
  ArrowRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();

  const features = [
    {
      icon: <Thermometer size={32} />,
      title: 'Smart Monitoring',
      description: 'Real-time sensor data for optimal crop management'
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'Yield Prediction',
      description: 'AI-powered insights for better harvest planning'
    },
    {
      icon: <BarChart3 size={32} />,
      title: 'Data Analytics',
      description: 'Comprehensive farm performance analytics'
    }
  ];

  const stats = [
    { value: '10K+', label: 'Active Farms' },
    { value: '95%', label: 'Accuracy Rate' },
    { value: '24/7', label: 'Monitoring' }
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const goToDashboard = () => {
    // Navigate to dashboard - you can replace this with your routing logic
    navigate('/dashboard');
    alert('Redirecting to Dashboard...');
  };

  return (
    <>
      {/* Bootstrap CSS */}
      <link 
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" 
        rel="stylesheet"
      />
      
      <style>{`
        :root {
          --primary-color: #22c55e;
          --secondary-color: #059669;
          --accent-color: #3b82f6;
          --text-dark: #1f2937;
          --text-light: #6b7280;
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          overflow-x: hidden;
        }
        
        .hero-section {
          background: linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%);
          min-height: 100vh;
          position: relative;
          overflow: hidden;
        }
        
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.1);
        }
        
        .navbar-custom {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .navbar-transparent {
          background: transparent;
        }
        
        .btn-primary-custom {
          background: var(--primary-color);
          border: none;
          border-radius: 50px;
          padding: 12px 30px;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .btn-primary-custom:hover {
          background: var(--secondary-color);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(34, 197, 94, 0.3);
        }
        
        .btn-outline-custom {
          border: 2px solid white;
          color: white;
          border-radius: 50px;
          padding: 12px 30px;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        
        .btn-outline-custom:hover {
          background: white;
          color: var(--primary-color);
          transform: translateY(-2px);
        }
        
        .feature-card {
          background: white;
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          border: none;
          height: 100%;
        }
        
        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
        }
        
        .feature-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin-bottom: 1.5rem;
        }
        
        .stat-card {
          text-align: center;
          padding: 1.5rem;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }
        
        .hero-content {
          position: relative;
          z-index: 10;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .section-padding {
          padding: 100px 0;
        }
        
        .floating-shapes {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }
        
        .floating-shape {
          position: absolute;
          opacity: 0.1;
          animation: float 6s ease-in-out infinite;
        }
        
        .shape-1 {
          top: 20%;
          left: 10%;
          width: 80px;
          height: 80px;
          background: white;
          border-radius: 50%;
          animation-delay: 0s;
        }
        
        .shape-2 {
          top: 50%;
          right: 10%;
          width: 120px;
          height: 120px;
          background: white;
          border-radius: 30px;
          animation-delay: 2s;
        }
        
        .shape-3 {
          bottom: 20%;
          left: 20%;
          width: 100px;
          height: 100px;
          background: white;
          border-radius: 50%;
          animation-delay: 4s;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 1.5rem;
        }
        
        .hero-subtitle {
          font-size: 1.3rem;
          opacity: 0.9;
          margin-bottom: 2rem;
          line-height: 1.6;
        }
        
        @media (max-width: 768px) {
          .hero-title {
            font-size: 2.5rem;
          }
          
          .hero-subtitle {
            font-size: 1.1rem;
          }
          
          .section-padding {
            padding: 60px 0;
          }
        }
        
        .brand-text {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-color);
        }
        
        .nav-link-custom {
          color: var(--text-dark);
          font-weight: 500;
          transition: color 0.3s ease;
        }
        
        .nav-link-custom:hover {
          color: var(--primary-color);
        }
        
        .dashboard-preview {
          background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%);
          border-radius: 20px;
          padding: 3rem;
          margin-top: 3rem;
        }
        
        .dashboard-card {
          background: white;
          border-radius: 12px;
          padding: 1.5rem;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
          text-align: center;
        }
        
        .dashboard-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
          border-radius: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin: 0 auto 1rem;
        }
      `}</style>

      <div className="min-vh-100">
        {/* Navigation */}
        <nav className={`navbar navbar-expand-lg ${
          scrollY > 50 ? 'navbar-custom' : 'navbar-transparent'
        }`}>
          <div className="container">
            <div className="navbar-brand d-flex align-items-center">
              <div className="d-flex align-items-center justify-content-center me-3" 
                   style={{ 
                     width: '40px', 
                     height: '40px', 
                     background: 'var(--primary-color)', 
                     borderRadius: '10px' 
                   }}>
                <Leaf className="text-white" size={24} />
              </div>
              <span className="brand-text">AgriTech Pro</span>
            </div>
            
            <div className="navbar-nav ms-auto d-flex flex-row gap-3">
              <button className="btn btn-link nav-link-custom text-decoration-none">
                About
              </button>
              <button className="btn btn-link nav-link-custom text-decoration-none">
                Features
              </button>
              <button 
                className="btn btn-primary-custom text-white d-flex align-items-center gap-2"
                onClick={goToDashboard}
              >
                <BarChart3 size={16} />
                Dashboard
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="hero-section d-flex align-items-center">
          <div className="hero-overlay"></div>
          
          <div className="floating-shapes">
            <div className="floating-shape shape-1"></div>
            <div className="floating-shape shape-2"></div>
            <div className="floating-shape shape-3"></div>
          </div>
          
          <div className="container hero-content">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <h1 className="hero-title text-white">
                  Smart Farming for the
                  <span className="d-block text-white">Digital Age</span>
                </h1>
                <p className="hero-subtitle text-white">
                  Transform your agricultural operations with AI-powered insights, 
                  real-time monitoring, and data-driven decisions.
                </p>
                <div className="d-flex gap-3 flex-wrap">
                  <button 
                    className="btn btn-primary-custom text-white d-flex align-items-center gap-2"
                    onClick={goToDashboard}
                  >
                    <ArrowRight size={20} />
                    Get Started
                  </button>
                  <button className="btn btn-outline-custom d-flex align-items-center gap-2">
                    <Play size={20} />
                    Watch Demo
                  </button>
                </div>
              </div>

              <div className="col-lg-6 mt-5 mt-lg-0">
                <div className="row g-3">
                  {stats.map((stat, index) => (
                    <div key={index} className="col-4">
                      <div className="stat-card">
                        <div className="h3 fw-bold text-white mb-1">{stat.value}</div>
                        <div className="small text-white opacity-75">{stat.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-padding bg-light">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mx-auto text-center mb-5">
                <h2 className="display-5 fw-bold text-dark mb-3">
                  Powerful Features
                </h2>
                <p className="lead text-muted">
                  Everything you need to optimize your farm operations
                </p>
              </div>
            </div>

            <div className="row g-4">
              {features.map((feature, index) => (
                <div key={index} className="col-md-6 col-lg-4">
                  <div className="feature-card">
                    <div className="feature-icon">
                      {feature.icon}
                    </div>
                    <h4 className="fw-bold mb-3">{feature.title}</h4>
                    <p className="text-muted">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard Preview */}
        <section className="section-padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 mx-auto text-center">
                <h2 className="display-5 fw-bold mb-3">
                  Monitor Your Farm in Real-Time
                </h2>
                <p className="lead text-muted mb-4">
                  Access comprehensive analytics and insights from your personalized dashboard
                </p>
                
                <div className="dashboard-preview">
                  <div className="row g-4">
                    <div className="col-md-4">
                      <div className="dashboard-card">
                        <div className="dashboard-icon">
                          <Droplets size={24} />
                        </div>
                        <h5 className="fw-bold">Soil Moisture</h5>
                        <p className="text-muted small">68% - Optimal</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="dashboard-card">
                        <div className="dashboard-icon">
                          <Thermometer size={24} />
                        </div>
                        <h5 className="fw-bold">Temperature</h5>
                        <p className="text-muted small">24°C - Perfect</p>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="dashboard-card">
                        <div className="dashboard-icon">
                          <Sun size={24} />
                        </div>
                        <h5 className="fw-bold">Sunlight</h5>
                        <p className="text-muted small">95% - Excellent</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <button 
                      className="btn btn-primary-custom text-white btn-lg d-flex align-items-center gap-2 mx-auto"
                      onClick={goToDashboard}
                    >
                      <BarChart3 size={20} />
                      View Full Dashboard
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        {/* <footer className="bg-dark text-white py-5">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="d-flex align-items-center mb-3">
                  <div className="d-flex align-items-center justify-content-center me-3" 
                       style={{ 
                         width: '40px', 
                         height: '40px', 
                         background: 'var(--primary-color)', 
                         borderRadius: '10px' 
                       }}>
                    <Leaf className="text-white" size={24} />
                  </div>
                  <span className="h5 mb-0">AgriTech Pro</span>
                </div>
                <p className="text-muted">
                  Empowering farmers with intelligent technology for sustainable agriculture.
                </p>
              </div>
              <div className="col-md-6 text-md-end">
                <p className="text-muted mb-0">
                  © 2025 AgriTech Pro. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </footer> */}
      </div>
    </>
  );
};

export default Home;