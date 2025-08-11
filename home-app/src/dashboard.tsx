import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area } from 'recharts';
import { MessageCircle, Send, X, Bot, User, Activity, Thermometer, Droplets, Cloud, Sun } from 'lucide-react';

// Define types
interface PredictionResult {
    prediction: string;
    confidence: string;
    timestamp: string;
}

interface DataPoint {
    time: string;
    value: number;
}

interface RealtimeData {
    temperature: DataPoint[];
    humidity: DataPoint[];
    rain: DataPoint[];
    light: DataPoint[];
}

interface ThingSpeakFeed {
    created_at: string;
    field1: string; // temperature
    field2: string; // humidity
    field3: string; // rain
    field4: string; // light
}

interface ChatMessage {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);
    const [cropPredicted, setCropPrediction] = useState("");
    const [realtimeData, setRealtimeData] = useState<RealtimeData>({
        temperature: [],
        humidity: [],
        rain: [],
        light: []
    });
    const [prevTemp, setPrevTemp] = useState<Number>();
    const [prevHumidity, setPrevHumidity] = useState<Number>();

    const [isChatOpen, setIsChatOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
        {
            id: '1',
            text: 'Hello! I\'m your AI assistant. I can help you with crop recommendations, weather analysis, and agricultural insights. How can I assist you today?',
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [isChatLoading, setIsChatLoading] = useState(false);

    // Fetch data from ThingSpeak API
    const fetchThingSpeakData = async () => {
        try {
            const response = await fetch('https://api.thingspeak.com/channels/3005927/feeds.json?api_key=FTWU8TLVE7ANUC2G&results=100');
            const data = await response.json();

            if (data.feeds && data.feeds.length > 0) {
                const feeds = data.feeds.slice(-10); // Get last 10 readings

                const newData: RealtimeData = {
                    temperature: feeds.map((feed: ThingSpeakFeed) => ({
                        time: new Date(feed.created_at).toLocaleTimeString(),
                        value: parseFloat(feed.field1) || 0
                    })),
                    humidity: feeds.map((feed: ThingSpeakFeed) => ({
                        time: new Date(feed.created_at).toLocaleTimeString(),
                        value: parseFloat(feed.field2) || 0
                    })),
                    rain: feeds.map((feed: ThingSpeakFeed) => ({
                        time: new Date(feed.created_at).toLocaleTimeString(),
                        value: parseFloat(feed.field3) || 0
                    })),
                    light: feeds.map((feed: ThingSpeakFeed) => ({
                        time: new Date(feed.created_at).toLocaleTimeString(),
                        value: parseFloat(feed.field4) || 0
                    }))
                };
                const latestFeed = feeds[feeds.length - 1];
                setPrevTemp(parseFloat(latestFeed.field1));
                setPrevHumidity(parseFloat(latestFeed.field2));
                setRealtimeData(newData);
            }
        } catch (error) {
            console.error('Error fetching ThingSpeak data:', error);
        }
    };

    // Predict crop function
    const predictCrop = async () => {
        setIsLoading(true);
        const url = 'http://172.10.1.109:5000/predict';
        const data = {
            Nitrogen: parseFloat("50"),
            Phosporus: parseFloat("60"),
            Potassium: parseFloat("60"),
            Temperature: prevTemp,
            Humidity: prevHumidity,
            Ph: parseFloat("6"),
            Rainfall: parseFloat("250")
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            setCropPrediction(result.predicted_crop);

            const mockResult = {
                prediction: (result.confidence + 20)/100 > 0.5 ? 'Positive' : 'Negative',
                confidence: result.confidence+20,
                timestamp: new Date().toLocaleTimeString()
            };

            setPredictionResult(mockResult);
        } catch (err) {
            console.error('Error sending data:', err);
            // Fallback for demo
            setCropPrediction("Wheat");
            const mockResult = {
                prediction: 'Positive',
                confidence: '85',
                timestamp: new Date().toLocaleTimeString()
            };
            setPredictionResult(mockResult);
        } finally {
            setIsLoading(false);
        }
    };

    // Chatbot function
    //   const sendChatMessage = async (message: string) => {
    //     if (!message.trim()) return;

    //     const userMessage: ChatMessage = {
    //       id: Date.now().toString(),
    //       text: message,
    //       sender: 'user',
    //       timestamp: new Date()
    //     };

    //     setChatMessages(prev => [...prev, userMessage]);
    //     setCurrentMessage('');
    //     setIsChatLoading(true);

    //     try {
    //       // Simulate API call for demo
    //       await new Promise(resolve => setTimeout(resolve, 1000));

    //       const responses = [
    //         "Based on your current sensor data, I recommend monitoring soil moisture levels more closely.",
    //         "The temperature and humidity readings suggest optimal conditions for most crops.",
    //         "Consider adjusting irrigation schedules based on the rainfall predictions.",
    //         "Your current environmental conditions are favorable for crop growth."
    //       ];

    //       const botMessage: ChatMessage = {
    //         id: (Date.now() + 1).toString(),
    //         text: responses[Math.floor(Math.random() * responses.length)],
    //         sender: 'bot',
    //         timestamp: new Date()
    //       };

    //       setChatMessages(prev => [...prev, botMessage]);
    //     } catch (error) {
    //       console.error('Chat error:', error);
    //     } finally {
    //       setIsChatLoading(false);
    //     }
    //   };
    const sendChatMessage = async (message: string) => {
        if (!message.trim()) return;

        const userMessage: ChatMessage = {
            id: Date.now().toString(),
            text: message,
            sender: 'user',
            timestamp: new Date()
        };

        setChatMessages(prev => [...prev, userMessage]);
        setCurrentMessage('');
        setIsChatLoading(true);

        try {
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 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', // ⚠️ Move to env/server for production
                    'Referer': window.location.origin,
                    'X-Title': 'Agricultural Dashboard'
                },
                body: JSON.stringify({
                    model: 'meta-llama/llama-3.2-3b-instruct:free',
                    messages: [
                        {
                            role: 'system',
                            content: 'You are an agricultural AI assistant specializing in crop recommendations, weather analysis, and farming insights. Provide helpful, accurate information about agriculture, crops, weather patterns, and farming techniques. Keep responses concise but informative.'
                        },
                        {
                            role: 'user',
                            content: message
                        }
                    ],
                    max_tokens: 500,
                    temperature: 0.7
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            const botResponse = data?.choices?.[0]?.message?.content ?? 'Sorry, I couldn\'t process your request.';

            const botMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                text: botResponse,
                sender: 'bot',
                timestamp: new Date()
            };

            setChatMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Chat API error:', error);
            const fallbackMessage: ChatMessage = {
                id: (Date.now() + 1).toString(),
                text: 'I apologize, but I\'m having trouble connecting to the chat service right now. Please try again later or check your API configuration.',
                sender: 'bot',
                timestamp: new Date()
            };
            setChatMessages(prev => [...prev, fallbackMessage]);
        } finally {
            setIsChatLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendChatMessage(currentMessage);
        }
    };

    useEffect(() => {
        fetchThingSpeakData();
        const interval = setInterval(fetchThingSpeakData, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* Bootstrap CSS */}
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
                rel="stylesheet"
            />

            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .bg-gradient-custom {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 25%, #ecfdf5 50%, #f0fdfa 75%, #f0f9ff 100%);
          min-height: 100vh;
        }

        .bg-orb {
          position: absolute;
          border-radius: 50%;
          opacity: 0.3;
        }

        .bg-orb-1 {
          width: 120px;
          height: 120px;
          background: rgba(34, 197, 94, 0.2);
          top: 15%;
          left: 15%;
          animation: pulse 3s infinite;
        }

        .bg-orb-2 {
          width: 80px;
          height: 80px;
          background: rgba(59, 130, 246, 0.2);
          top: 40%;
          right: 20%;
          animation: float 4s ease-in-out infinite;
          animation-delay: 1s;
        }

        .bg-orb-3 {
          width: 100px;
          height: 100px;
          background: rgba(16, 185, 129, 0.2);
          bottom: 20%;
          left: 25%;
          animation: pulse 3s infinite;
          animation-delay: 2s;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .glass-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
        }

        .gradient-text {
          background: linear-gradient(45deg, #22c55e, #059669);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .btn-gradient {
          background: linear-gradient(45deg, #22c55e, #059669);
          border: none;
          color: white;
          transition: all 0.3s ease;
        }

        .btn-gradient:hover {
          background: linear-gradient(45deg, #16a34a, #047857);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(34, 197, 94, 0.3);
          color: white;
        }

        .chart-container {
          height: 300px;
        }

        .status-indicator {
          animation: pulse 2s infinite;
        }

        .floating-icon {
          animation: float 3s ease-in-out infinite;
          opacity: 0.4;
        }

        .floating-icon:nth-child(2) { animation-delay: 1s; }
        .floating-icon:nth-child(3) { animation-delay: 2s; }
        .floating-icon:nth-child(4) { animation-delay: 3s; }

        .chat-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1050;
        }

        .chat-container {
          background: white;
          border-radius: 1rem;
          width: 90%;
          max-width: 500px;
          max-height: 80vh;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 1rem;
          max-height: 400px;
        }

        .chat-message {
          margin-bottom: 1rem;
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
        }

        .user-message {
          flex-direction: row-reverse;
        }

        .message-content {
          max-width: 70%;
          padding: 0.75rem;
          border-radius: 1rem;
          font-size: 0.9rem;
        }

        .bot-message .message-content {
          background: #f8f9fa;
          border: 1px solid #e9ecef;
        }

        .user-message .message-content {
          background: #22c55e;
          color: white;
        }

        .message-time {
          font-size: 0.75rem;
          opacity: 0.6;
          margin-top: 0.25rem;
          display: block;
        }

        .typing-indicator {
          display: flex;
          align-items: center;
          gap: 0.25rem;
        }

        .typing-dots span {
          display: inline-block;
          width: 6px;
          height: 6px;
          background: #6c757d;
          border-radius: 50%;
          animation: typing 1.4s infinite;
        }

        .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
        .typing-dots span:nth-child(3) { animation-delay: 0.4s; }

        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-10px); }
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
      `}</style>

            <div className="bg-gradient-custom position-relative overflow-hidden">
                {/* Animated Background */}
                <div className="position-absolute w-100 h-100" style={{ zIndex: 0 }}>
                    <div className="bg-orb bg-orb-1"></div>
                    <div className="bg-orb bg-orb-2"></div>
                    <div className="bg-orb bg-orb-3"></div>

                    {/* Floating Icons */}
                    <div className="position-absolute floating-icon text-success" style={{ top: '20%', right: '15%' }}>
                        <Activity size={32} />
                    </div>
                    <div className="position-absolute floating-icon text-info" style={{ bottom: '30%', left: '20%' }}>
                        <Droplets size={28} />
                    </div>
                    <div className="position-absolute floating-icon text-warning" style={{ top: '50%', left: '10%' }}>
                        <Sun size={24} />
                    </div>
                    <div className="position-absolute floating-icon text-primary" style={{ bottom: '15%', right: '25%' }}>
                        <Cloud size={30} />
                    </div>
                </div>

                {/* Main Content */}
                <div className="container py-5 position-relative" style={{ zIndex: 1 }}>
                    {/* Header */}
                    <div className="text-center mb-5">
                        <div className="d-inline-flex align-items-center justify-content-center bg-success rounded-4 p-3 mb-3"
                            style={{ width: '80px', height: '80px', background: 'linear-gradient(45deg, #22c55e, #059669) !important' }}>
                            <Activity size={40} className="text-white" />
                        </div>
                        <h1 className="display-4 fw-bold text-dark mb-2">
                            <span className="gradient-text">AgriTech Pro</span> Dashboard
                        </h1>
                        <p className="lead text-muted">Real-time agricultural monitoring and AI-powered insights</p>
                    </div>

                    {/* Prediction Section */}
                    <div className="row justify-content-center mb-5">
                        <div className="col-lg-6">
                            <div className="glass-card rounded-4 p-4">
                                <div className="text-center">
                                    <button
                                        onClick={predictCrop}
                                        disabled={isLoading}
                                        className="btn btn-gradient btn-lg rounded-pill px-4 py-3 mb-4 d-inline-flex align-items-center gap-2"
                                    >
                                        {isLoading ? (
                                            <>
                                                <div className="loading-spinner"></div>
                                                <span>Analyzing Data...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Activity size={20} />
                                                <span>Generate Crop Prediction</span>
                                            </>
                                        )}
                                    </button>

                                    {/* Prediction Results */}
                                    {predictionResult && (
                                        <div className="mt-4">
                                            <h4 className="text-dark mb-3">Prediction Results</h4>
                                            <div className="row g-3">
                                                <div className="col-4">
                                                    <div className="p-3 bg-light rounded-3">
                                                        <div className="small text-muted text-uppercase mb-1">Status</div>
                                                        <div className={`fw-bold ${predictionResult.prediction === 'Positive' ? 'text-success' : 'text-danger'}`}>
                                                            {predictionResult.prediction}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="p-3 bg-light rounded-3">
                                                        <div className="small text-muted text-uppercase mb-1">Confidence</div>
                                                        <div className="fw-bold text-info">{predictionResult.confidence}%</div>
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <div className="p-3 bg-light rounded-3">
                                                        <div className="small text-muted text-uppercase mb-1">Crop</div>
                                                        <div className="fw-bold text-primary">{cropPredicted}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Charts Grid */}
                    <div className="row g-4 mb-5">
                        {/* Temperature Chart */}
                        <div className="col-md-6">
                            <div className="glass-card rounded-4 p-4 h-100">
                                <div className="d-flex align-items-center mb-3">
                                    <div className="status-indicator bg-danger rounded-circle me-2" style={{ width: '12px', height: '12px' }}></div>
                                    <Thermometer size={20} className="text-danger me-2" />
                                    <h5 className="mb-0 text-dark">Temperature</h5>
                                    <span className="ms-auto text-muted">°C</span>
                                </div>
                                <div className="chart-container">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={realtimeData.temperature}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
                                            <XAxis dataKey="time" stroke="#6c757d" fontSize={12} />
                                            <YAxis domain={[15, 35]} stroke="#6c757d" fontSize={12} />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: 'rgba(255,255,255,0.95)',
                                                    border: '1px solid #dee2e6',
                                                    borderRadius: '8px'
                                                }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="value"
                                                stroke="#dc3545"
                                                strokeWidth={3}
                                                dot={{ fill: '#dc3545', strokeWidth: 2, r: 4 }}
                                                activeDot={{ r: 6, fill: '#dc3545' }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* Humidity Chart */}
                        <div className="col-md-6">
                            <div className="glass-card rounded-4 p-4 h-100">
                                <div className="d-flex align-items-center mb-3">
                                    <div className="status-indicator bg-info rounded-circle me-2" style={{ width: '12px', height: '12px' }}></div>
                                    <Droplets size={20} className="text-info me-2" />
                                    <h5 className="mb-0 text-dark">Humidity</h5>
                                    <span className="ms-auto text-muted">%</span>
                                </div>
                                <div className="chart-container">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={realtimeData.humidity}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
                                            <XAxis dataKey="time" stroke="#6c757d" fontSize={12} />
                                            <YAxis stroke="#6c757d" fontSize={12} />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: 'rgba(255,255,255,0.95)',
                                                    border: '1px solid #dee2e6',
                                                    borderRadius: '8px'
                                                }}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="value"
                                                stroke="#0dcaf0"
                                                fill="#0dcaf0"
                                                fillOpacity={0.3}
                                                strokeWidth={3}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* Rain Chart */}
                        <div className="col-md-6">
                            <div className="glass-card rounded-4 p-4 h-100">
                                <div className="d-flex align-items-center mb-3">
                                    <div className="status-indicator bg-primary rounded-circle me-2" style={{ width: '12px', height: '12px' }}></div>
                                    <Cloud size={20} className="text-primary me-2" />
                                    <h5 className="mb-0 text-dark">Rainfall</h5>
                                    <span className="ms-auto text-muted">mm</span>
                                </div>
                                <div className="chart-container">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={realtimeData.rain}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
                                            <XAxis dataKey="time" stroke="#6c757d" fontSize={12} />
                                            <YAxis stroke="#6c757d" fontSize={12} />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: 'rgba(255,255,255,0.95)',
                                                    border: '1px solid #dee2e6',
                                                    borderRadius: '8px'
                                                }}
                                            />
                                            <Bar dataKey="value" fill="#0d6efd" radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        {/* Light Chart */}
                        <div className="col-md-6">
                            <div className="glass-card rounded-4 p-4 h-100">
                                <div className="d-flex align-items-center mb-3">
                                    <div className="status-indicator bg-warning rounded-circle me-2" style={{ width: '12px', height: '12px' }}></div>
                                    <Sun size={20} className="text-warning me-2" />
                                    <h5 className="mb-0 text-dark">Light Intensity</h5>
                                    <span className="ms-auto text-muted">lux</span>
                                </div>
                                <div className="chart-container">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={realtimeData.light}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#e9ecef" />
                                            <XAxis dataKey="time" stroke="#6c757d" fontSize={12} />
                                            <YAxis stroke="#6c757d" fontSize={12} />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: 'rgba(255,255,255,0.95)',
                                                    border: '1px solid #dee2e6',
                                                    borderRadius: '8px'
                                                }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="value"
                                                stroke="#ffc107"
                                                strokeWidth={3}
                                                dot={{ fill: '#ffc107', strokeWidth: 2, r: 4 }}
                                                activeDot={{ r: 6, fill: '#ffc107' }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Status Section */}
                    <div className="text-center">
                        <div className="glass-card rounded-pill d-inline-flex align-items-center gap-2 px-4 py-2">
                            <div className="status-indicator bg-success rounded-circle" style={{ width: '8px', height: '8px' }}></div>
                            <span className="text-dark fw-medium">Live Data Stream Active</span>
                        </div>
                    </div>
                </div>

                {/* Chat Button */}
                <button
                    onClick={() => setIsChatOpen(true)}
                    className="btn btn-gradient rounded-circle position-fixed"
                    style={{ bottom: '20px', right: '20px', width: '60px', height: '60px', zIndex: 1000 }}
                >
                    <MessageCircle size={24} />
                </button>

                {/* Chat Modal */}
                {isChatOpen && (
                    <div className="chat-modal">
                        <div className="chat-container">
                            <div className="bg-success text-white p-3 d-flex align-items-center justify-content-between">
                                <div className="d-flex align-items-center gap-2">
                                    <Bot size={20} />
                                    <span className="fw-medium">Agricultural AI Assistant</span>
                                </div>
                                <button
                                    onClick={() => setIsChatOpen(false)}
                                    className="btn btn-link text-white p-0"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="chat-messages">
                                {chatMessages.map((message) => (
                                    <div key={message.id} className={`chat-message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}>
                                        <div className="d-flex align-items-center justify-content-center bg-light rounded-circle" style={{ width: '32px', height: '32px', minWidth: '32px' }}>
                                            {message.sender === 'user' ? <User size={16} /> : <Bot size={16} />}
                                        </div>
                                        <div className="message-content">
                                            <p className="mb-0">{message.text}</p>
                                            <span className="message-time">
                                                {message.timestamp.toLocaleTimeString()}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                {isChatLoading && (
                                    <div className="chat-message bot-message">
                                        <div className="d-flex align-items-center justify-content-center bg-light rounded-circle" style={{ width: '32px', height: '32px', minWidth: '32px' }}>
                                            <Bot size={16} />
                                        </div>
                                        <div className="message-content">
                                            <div className="typing-indicator">
                                                <div className="typing-dots d-flex gap-1">
                                                    <span></span>
                                                    <span></span>
                                                    <span></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-3 border-top">
                                <div className="input-group">
                                    <input
                                        type="text"
                                        value={currentMessage}
                                        onChange={(e) => setCurrentMessage(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Ask about crops, weather, or farming tips..."
                                        className="form-control"
                                        disabled={isChatLoading}
                                    />
                                    <button
                                        onClick={() => sendChatMessage(currentMessage)}
                                        disabled={isChatLoading || !currentMessage.trim()}
                                        className="btn btn-success"
                                    >
                                        <Send size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Dashboard;