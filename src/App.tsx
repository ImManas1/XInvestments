import React, { useState } from "react";
import { motion } from "framer-motion";
import OnboardingForm from "./components/OnboardingForm";
import RentalPortfolio from "./components/RentalPortfolio";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const data = [
  { name: "Jan", value: 45 },
  { name: "Feb", value: 60 },
  { name: "Mar", value: 75 },
  { name: "Apr", value: 90 },
  { name: "May", value: 110 },
  { name: "Jun", value: 130 },
];

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Welcome ${username}, you have logged in successfully!`);
  };

  if (showOnboarding) {
    return <OnboardingForm />;
  }

  if (showPortfolio) {
    return <RentalPortfolio />;
  }

  return (
    <div className="min-h-screen font-sans bg-white">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-lg border-b border-gray-100 font-poppins">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <div className="text-3xl font-extrabold tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00c853] to-[#00acc1]">
                  X Investment
                </span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-10 text-gray-700 font-semibold">
              <a href="#home" className="hover:text-[#00c853] transition-all duration-300 hover:scale-105">Home</a>
              <a href="#about" className="hover:text-[#00c853] transition-all duration-300 hover:scale-105">About</a>
              <button 
                onClick={() => setShowPortfolio(true)}
                className="hover:text-[#00c853] transition-all duration-300 hover:scale-105"
              >
                Portfolio
              </button>
              <a href="#login" className="hover:text-[#00c853] transition-all duration-300 hover:scale-105">Login</a>
              <a href="#contact" className="hover:text-[#00c853] transition-all duration-300 hover:scale-105">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header id="home" className="relative bg-gradient-to-br from-[#f8fffe] via-[#f0fdf4] to-[#ecfdf5] font-inter overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#00c853] to-[#00acc1] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-[#00acc1] to-[#00c853] rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-[#00c853]/10 to-[#00acc1]/10 rounded-full border border-[#00c853]/20 mb-6">
                <span className="text-sm font-semibold text-[#00c853]">🚀 Smart Investment Platform</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                Invest Smart, <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00c853] to-[#00acc1]">
                  X Investment
                </span>
              </h1>
              <p className="text-xl text-gray-600 max-w-xl leading-relaxed">
                Track, manage and expand your portfolio — all in one place. Simple tools, clear
                insights and secure access to help you make confident investment decisions.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowOnboarding(true);
                  }}
                  className="inline-flex items-center px-8 py-4 rounded-full font-semibold text-white shadow-xl bg-gradient-to-r from-[#00c853] to-[#00acc1] hover:from-[#00b248] hover:to-[#0097a7] transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
                >
                  Add Property
                </a>

                <a
                  href="#login"
                  className="inline-flex items-center px-8 py-4 rounded-full font-semibold border-2 border-gray-300 text-gray-700 hover:bg-white hover:border-[#00c853] hover:text-[#00c853] transition-all duration-300 hover:shadow-lg"
                >
                  Login
                </a>
              </div>
            </motion.div>

            {/* Right: Portfolio Chart Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 hover:shadow-3xl transition-all duration-500 border border-white/50">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-500 font-semibold uppercase tracking-wide">Portfolio Value</p>
                    <p className="text-4xl font-bold text-gray-900 mt-1">₹12,45,600</p>
                  </div>
                  <div className="text-sm text-[#00c853] font-bold bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 rounded-full border border-green-100">
                    +12.4% this month
                  </div>
                </div>

                <div style={{ width: "100%", height: 260 }}>
                  <ResponsiveContainer>
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fill: "#64748b", fontSize: 12 }} 
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis 
                        tick={{ fill: "#64748b", fontSize: 12 }} 
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '12px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#00c853" 
                        strokeWidth={4} 
                        dot={{ fill: '#00c853', strokeWidth: 2, r: 5 }}
                        activeDot={{ r: 8, stroke: '#00c853', strokeWidth: 2, fill: '#ffffff' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose X Investment?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our platform provides everything you need to make informed investment decisions and grow your wealth consistently.
          </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <motion.div 
            className="group bg-white rounded-3xl shadow-xl p-10 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-[#00c853] to-[#00acc1] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="text-3xl">📊</span>
            </div>
            <h4 className="font-bold text-2xl text-gray-900 mb-4">Portfolio Tracking</h4>
            <p className="text-gray-600 text-lg leading-relaxed">Real-time insights and comprehensive portfolio monitoring with detailed analytics.</p>
          </motion.div>

          <motion.div 
            className="group bg-white rounded-3xl shadow-xl p-10 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-[#00c853] to-[#00acc1] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="text-3xl">🔒</span>
            </div>
            <h4 className="font-bold text-2xl text-gray-900 mb-4">Secure & Private</h4>
            <p className="text-gray-600 text-lg leading-relaxed">Bank-level security protocols to protect your financial data and privacy.</p>
          </motion.div>

          <motion.div 
            className="group bg-white rounded-3xl shadow-xl p-10 text-center hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-[#00c853] to-[#00acc1] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <span className="text-3xl">💡</span>
            </div>
            <h4 className="font-bold text-2xl text-gray-900 mb-4">Smart Recommendations</h4>
            <p className="text-gray-600 text-lg leading-relaxed">AI-powered personalized insights to help you make smarter investment decisions.</p>
          </motion.div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-gradient-to-br from-gray-50 to-gray-100 py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl font-bold text-gray-900 mb-8">About X Investment</h3>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We help investors of all sizes manage real estate and financial portfolios with clarity and confidence. 
                Our tools are built for simplicity so you can focus on what matters most — growing your wealth.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-[#00c853] to-[#00acc1] rounded-full"></div>
                  <span className="text-gray-700 text-lg font-medium">Professional portfolio management tools</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-[#00c853] to-[#00acc1] rounded-full"></div>
                  <span className="text-gray-700 text-lg font-medium">Real-time market data and insights</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-[#00c853] to-[#00acc1] rounded-full"></div>
                  <span className="text-gray-700 text-lg font-medium">Comprehensive risk assessment</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <img 
                src="https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Investment Dashboard" 
                className="w-full max-w-lg rounded-3xl shadow-2xl hover:shadow-3xl transition-shadow duration-500"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* LOGIN SECTION */}
      <section id="login" className="bg-gradient-to-br from-[#f0fdfa] to-[#f0fdf4] py-24">
        <div className="max-w-lg mx-auto px-6">
          <motion.div 
            className="bg-white/90 backdrop-blur-sm p-10 rounded-3xl shadow-2xl border border-white/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-3">Welcome Back</h3>
              <p className="text-gray-600">Login to your X Investment account</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-8">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00c853] focus:border-transparent transition-all duration-300 text-lg"
                  placeholder="Enter your username"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00c853] focus:border-transparent transition-all duration-300 text-lg"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00c853] to-[#00acc1] text-white font-bold text-lg hover:from-[#00b248] hover:to-[#0097a7] transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                Login
              </button>
            </form>
            
            <div className="mt-8 text-center">
              <a href="#" className="text-[#00c853] hover:text-[#00b248] font-semibold hover:underline transition-colors duration-300">Forgot your password?</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="text-3xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00c853] to-[#00acc1]">
                X Investment
              </span>
            </div>
            <p className="text-gray-300 mb-8 text-lg">Building wealth through smart investment decisions</p>
            <div className="border-t border-gray-700 pt-8">
              <p className="text-gray-400">© 2025 X Investment — Built for investors by investors.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}