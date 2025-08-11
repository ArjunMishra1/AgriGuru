import React, { useState } from 'react';
import { Mail, Lock, Leaf, Sprout, Droplets, Sun, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Dummy auth logic
        if (email === 'user@example.com' && password === '123456') {
            // Store auth state (you can use context or state management instead)
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('user', JSON.stringify({ email }));
            
            // Navigate to dashboard
            navigate('/home');
        } else {
            alert('Please SignUp');
            navigate('/signup');
        }
        setIsLoading(false);
    };

    return (
        <>
            <style>{`
        @import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');
        
        .login-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 25%, #ecfdf5 50%, #f0fdfa 75%, #f0f9ff 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          position: relative;
          overflow: hidden;
        }

        .bg-animated {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 1;
        }

        .bg-orb {
          position: absolute;
          border-radius: 50%;
          opacity: 0.3;
        }

        .bg-orb-1 {
          width: 80px;
          height: 80px;
          background: rgba(34, 197, 94, 0.3);
          top: 10%;
          left: 10%;
          animation: pulse 2s infinite;
        }

        .bg-orb-2 {
          width: 64px;
          height: 64px;
          background: rgba(59, 130, 246, 0.3);
          top: 32%;
          right: 20%;
          animation: bounce 2s infinite;
          animation-delay: 1s;
        }

        .bg-orb-3 {
          width: 96px;
          height: 96px;
          background: rgba(16, 185, 129, 0.3);
          bottom: 20%;
          left: 20%;
          animation: pulse 2s infinite;
          animation-delay: 2s;
        }

        .bg-orb-4 {
          width: 48px;
          height: 48px;
          background: rgba(20, 184, 166, 0.3);
          bottom: 32%;
          right: 10%;
          animation: bounce 2s infinite;
          animation-delay: 0.5s;
        }

        .floating-icon {
          position: absolute;
          opacity: 0.4;
          animation: float 3s ease-in-out infinite;
        }

        .floating-icon-1 {
          top: 16%;
          right: 32%;
          color: rgba(34, 197, 94, 0.4);
        }

        .floating-icon-2 {
          bottom: 24%;
          left: 32%;
          color: rgba(59, 130, 246, 0.4);
          animation-delay: 1.5s;
        }

        .floating-icon-3 {
          top: 48%;
          left: 16%;
          color: rgba(251, 191, 36, 0.4);
          animation-delay: 3s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.05); opacity: 0.5; }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .main-card {
          position: relative;
          width: 100%;
          max-width: 28rem;
          z-index: 2;
        }

        .glow-effect {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.2));
          border-radius: 1.5rem;
          filter: blur(20px);
          z-index: -1;
        }

        .card-content {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(20px);
          border-radius: 1.5rem;
          padding: 2rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(34, 197, 94, 0.1);
          position: relative;
          z-index: 1;
        }

        .brand-icon {
          width: 4rem;
          height: 4rem;
          background: linear-gradient(135deg, #22c55e, #059669);
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
          box-shadow: 0 10px 25px -5px rgba(34, 197, 94, 0.4);
        }

        .brand-title {
          font-size: 1.875rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 0.5rem;
        }

        .gradient-text {
          background: linear-gradient(45deg, #22c55e, #059669);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .brand-subtitle {
          color: #6b7280;
          margin-bottom: 2rem;
        }

        .demo-section {
          background: linear-gradient(45deg, rgba(34, 197, 94, 0.05), rgba(16, 185, 129, 0.05));
          border-radius: 0.75rem;
          padding: 1rem;
          margin-bottom: 1.5rem;
        }

        .demo-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: #059669;
          margin-bottom: 0.5rem;
        }

        .demo-item {
          display: flex;
          align-items: center;
          font-size: 0.875rem;
          color: #6b7280;
          margin-bottom: 0.25rem;
        }

        .demo-dot {
          width: 6px;
          height: 6px;
          background: #22c55e;
          border-radius: 50%;
          margin-right: 0.5rem;
        }

        .form-group {
          position: relative;
          margin-bottom: 1.5rem;
        }

        .form-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          z-index: 2;
        }

        .form-input {
          width: 100%;
          padding: 1rem 1rem 1rem 3rem;
          background: rgba(249, 250, 251, 0.5);
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem;
          color: #111827;
          font-size: 1rem;
          transition: all 0.2s ease;
        }

        .form-input::placeholder {
          color: #9ca3af;
        }

        .form-input:focus {
          outline: none;
          border-color: #22c55e;
          box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
          transform: translateY(-2px);
        }

        .form-input:hover {
          border-color: rgba(229, 231, 235, 0.8);
        }

        .login-btn {
          width: 100%;
          background: linear-gradient(45deg, #22c55e, #059669);
          color: white;
          padding: 1rem 2rem;
          border: none;
          border-radius: 0.75rem;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 10px 25px -5px rgba(34, 197, 94, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }

        .login-btn:hover:not(:disabled) {
          background: linear-gradient(45deg, #16a34a, #047857);
          transform: translateY(-2px);
          box-shadow: 0 15px 35px -5px rgba(34, 197, 94, 0.5);
        }

        .login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .features-section {
          background: linear-gradient(45deg, rgba(34, 197, 94, 0.05), rgba(16, 185, 129, 0.05));
          border-radius: 0.75rem;
          padding: 1rem;
          margin-top: 2rem;
        }

        .features-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
        }

        .feature-item {
          display: flex;
          align-items: center;
          font-size: 0.875rem;
          color: #6b7280;
          margin-bottom: 0.25rem;
        }

        .feature-dot {
          width: 6px;
          height: 6px;
          background: #22c55e;
          border-radius: 50%;
          margin-right: 0.5rem;
        }

        .signup-section {
          text-align: center;
          margin-top: 2rem;
          color: #6b7280;
        }

        .signup-link {
          color: #22c55e;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.2s ease;
        }

        .signup-link:hover {
          color: #16a34a;
        }

        @media (max-width: 768px) {
          .card-content {
            padding: 1.5rem;
          }
          
          .brand-title {
            font-size: 1.5rem;
          }
          
          .brand-subtitle {
            font-size: 0.9rem;
          }
        }
      `}</style>

            <div className="login-container">
                {/* Animated Background */}
                <div className="bg-animated">
                    <div className="bg-orb bg-orb-1"></div>
                    <div className="bg-orb bg-orb-2"></div>
                    <div className="bg-orb bg-orb-3"></div>
                    <div className="bg-orb bg-orb-4"></div>

                    {/* Floating Icons */}
                    <div className="floating-icon floating-icon-1">
                        <Sprout size={32} />
                    </div>
                    <div className="floating-icon floating-icon-2">
                        <Droplets size={24} />
                    </div>
                    <div className="floating-icon floating-icon-3">
                        <Sun size={28} />
                    </div>
                </div>

                {/* Main Card */}
                <div className="main-card">
                    {/* Glow Effect */}
                    <div className="glow-effect"></div>

                    {/* Card Content */}
                    <div className="card-content">
                        {/* Header */}
                        <div className="text-center">
                            <div className="brand-icon">
                                <Leaf size={32} color="white" />
                            </div>
                            <h1 className="brand-title">
                                Welcome to <span className="gradient-text">AgriTech Pro</span>
                            </h1>
                            <p className="brand-subtitle">Sign in to your account</p>
                        </div>

                        {/* Demo Info */}
                        <div className="demo-section">
                            <h4 className="demo-title">Demo Credentials:</h4>
                            <div className="demo-item">
                                <div className="demo-dot"></div>
                                <span>Email: user@example.com</span>
                            </div>
                            <div className="demo-item">
                                <div className="demo-dot"></div>
                                <span>Password: 123456</span>
                            </div>
                        </div>

                        {/* Form */}
                        <div>
                            {/* Email Input */}
                            <div className="form-group">
                                <div className="form-icon">
                                    <Mail size={20} />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-input"
                                    required
                                />
                            </div>

                            {/* Password Input */}
                            <div className="form-group">
                                <div className="form-icon">
                                    <Lock size={20} />
                                </div>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-input"
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                onClick={handleLogin}
                                disabled={isLoading}
                                className="login-btn"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="loading-spinner"></div>
                                        <span>Signing in...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Sign In</span>
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Features Preview */}
                        <div className="features-section">
                            <h3 className="features-title">What you'll get:</h3>
                            <div className="feature-item">
                                <div className="feature-dot"></div>
                                <span>Smart crop recommendations</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-dot"></div>
                                <span>Real-time weather insights</span>
                            </div>
                            <div className="feature-item">
                                <div className="feature-dot"></div>
                                <span>Live sensor monitoring</span>
                            </div>
                        </div>

                        {/* Signup Link */}
                        <div className="signup-section">
                            <p>
                                Don't have an account?{' '}
                                <button
                                    type="button"
                                    onClick={() => navigate("/signup")}
                                    className="signup-link"
                                    style={{ background: 'none', border: 'none', padding: 0 }}
                                >
                                    Sign up here
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;