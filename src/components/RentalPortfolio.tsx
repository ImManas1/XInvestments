import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  DollarSign,
  Home,
  BarChart3,
  PieChart as PieChartIcon,
  ArrowUpRight,
  ArrowDownRight,
  Target,
  Percent
} from 'lucide-react';

// Sample data - in real app, this would come from your backend
const yearlyData = [
  { year: '2020', income: 180000, yield: 7.2, growth: 0, properties: 1 },
  { year: '2021', income: 216000, yield: 8.1, growth: 20, properties: 1 },
  { year: '2022', income: 259200, yield: 8.8, growth: 20, properties: 2 },
  { year: '2023', income: 311040, yield: 9.2, growth: 20, properties: 2 },
  { year: '2024', income: 373248, yield: 9.8, growth: 20, properties: 3 }
];

const monthlyData2024 = [
  { month: 'Jan', income: 28500, yield: 9.5 },
  { month: 'Feb', income: 29200, yield: 9.7 },
  { month: 'Mar', income: 30100, yield: 10.0 },
  { month: 'Apr', income: 30800, yield: 10.3 },
  { month: 'May', income: 31500, yield: 10.5 },
  { month: 'Jun', income: 32200, yield: 10.7 },
  { month: 'Jul', income: 32900, yield: 10.9 },
  { month: 'Aug', income: 33600, yield: 11.2 },
  { month: 'Sep', income: 34300, yield: 11.4 },
  { month: 'Oct', income: 35000, yield: 11.6 },
  { month: 'Nov', income: 35700, yield: 11.8 },
  { month: 'Dec', income: 36400, yield: 12.0 }
];

const propertyBreakdown = [
  { name: 'Property A - Mumbai', value: 45, income: 168000, color: '#00c853' },
  { name: 'Property B - Pune', value: 30, income: 112000, color: '#00acc1' },
  { name: 'Property C - Bangalore', value: 25, income: 93248, color: '#ff9800' }
];

const COLORS = ['#00c853', '#00acc1', '#ff9800', '#e91e63'];

export default function RentalPortfolio() {
  const [selectedView, setSelectedView] = useState('overview');
  const [selectedYear, setSelectedYear] = useState('2024');

  const currentYearData = yearlyData.find(d => d.year === selectedYear) || yearlyData[yearlyData.length - 1];
  const totalIncome = yearlyData.reduce((sum, year) => sum + year.income, 0);
  const avgYield = yearlyData.reduce((sum, year) => sum + year.yield, 0) / yearlyData.length;
  const currentYearGrowth = currentYearData.growth;

  const StatCard = ({ title, value, change, icon: Icon, color, prefix = '', suffix = '' }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-r ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change !== undefined && (
          <div className={`flex items-center text-sm font-medium ${
            change >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {change >= 0 ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
            {Math.abs(change)}%
          </div>
        )}
      </div>
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">
        {prefix}{typeof value === 'number' ? value.toLocaleString('en-IN') : value}{suffix}
      </p>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Rental Income Portfolio</h1>
              <p className="text-gray-600">Track your rental income performance and growth</p>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00c853] bg-white"
              >
                {yearlyData.map(year => (
                  <option key={year.year} value={year.year}>{year.year}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-1 bg-gray-200 p-1 rounded-xl">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'yearly', label: 'Yearly Analysis', icon: Calendar },
              { id: 'monthly', label: 'Monthly Breakdown', icon: TrendingUp },
              { id: 'properties', label: 'Property Wise', icon: Home }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedView(tab.id)}
                  className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedView === tab.id
                      ? 'bg-white text-[#00c853] shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Overview Dashboard */}
        {selectedView === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Rental Income"
                value={totalIncome}
                change={currentYearGrowth}
                icon={DollarSign}
                color="from-[#00c853] to-[#00b248]"
                prefix="₹"
              />
              <StatCard
                title="Current Year Income"
                value={currentYearData.income}
                change={currentYearGrowth}
                icon={TrendingUp}
                color="from-[#00acc1] to-[#0097a7]"
                prefix="₹"
              />
              <StatCard
                title="Average Rental Yield"
                value={avgYield.toFixed(1)}
                change={1.2}
                icon={Percent}
                color="from-[#ff9800] to-[#f57c00]"
                suffix="%"
              />
              <StatCard
                title="Active Properties"
                value={currentYearData.properties}
                icon={Home}
                color="from-[#e91e63] to-[#c2185b]"
              />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Income Trend */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Income Growth Trend</h3>
                  <div className="flex items-center text-green-600 text-sm font-medium">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +{currentYearGrowth}% YoY
                  </div>
                </div>
                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                    <AreaChart data={yearlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="year" 
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis 
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) => `₹${(value/1000).toFixed(0)}K`}
                      />
                      <Tooltip 
                        formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Income']}
                        contentStyle={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '12px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="income" 
                        stroke="#00c853" 
                        fill="url(#colorIncome)"
                        strokeWidth={3}
                      />
                      <defs>
                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00c853" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#00c853" stopOpacity={0.05}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              {/* Rental Yield Trend */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Rental Yield Trend</h3>
                  <div className="flex items-center text-blue-600 text-sm font-medium">
                    <Target className="w-4 h-4 mr-1" />
                    {currentYearData.yield}% Current
                  </div>
                </div>
                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                    <LineChart data={yearlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis 
                        dataKey="year" 
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis 
                        tick={{ fill: '#64748b', fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Yield']}
                        contentStyle={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '12px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="yield" 
                        stroke="#00acc1" 
                        strokeWidth={3}
                        dot={{ fill: '#00acc1', strokeWidth: 2, r: 5 }}
                        activeDot={{ r: 7, stroke: '#00acc1', strokeWidth: 2, fill: '#ffffff' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Yearly Analysis */}
        {selectedView === 'yearly' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Year-over-Year Performance</h3>
              <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                  <BarChart data={yearlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="year" 
                      tick={{ fill: '#64748b', fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      tick={{ fill: '#64748b', fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => `₹${(value/1000).toFixed(0)}K`}
                    />
                    <Tooltip 
                      formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Income']}
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Bar 
                      dataKey="income" 
                      fill="url(#colorBar)"
                      radius={[8, 8, 0, 0]}
                    />
                    <defs>
                      <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00c853" stopOpacity={0.9}/>
                        <stop offset="95%" stopColor="#00c853" stopOpacity={0.6}/>
                      </linearGradient>
                    </defs>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Yearly Details Table */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">Detailed Yearly Breakdown</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Year</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Income</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Yield</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Growth</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Properties</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {yearlyData.map((year, index) => (
                      <tr key={year.year} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{year.year}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">₹{year.income.toLocaleString('en-IN')}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{year.yield}%</td>
                        <td className="px-6 py-4 text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            year.growth >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {year.growth > 0 ? '+' : ''}{year.growth}%
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{year.properties}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {/* Monthly Breakdown */}
        {selectedView === 'monthly' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Monthly Performance - {selectedYear}</h3>
              <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer>
                  <LineChart data={monthlyData2024}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fill: '#64748b', fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      yAxisId="income"
                      orientation="left"
                      tick={{ fill: '#64748b', fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => `₹${(value/1000).toFixed(0)}K`}
                    />
                    <YAxis 
                      yAxisId="yield"
                      orientation="right"
                      tick={{ fill: '#64748b', fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <Tooltip 
                      formatter={(value, name) => [
                        name === 'income' ? `₹${value.toLocaleString('en-IN')}` : `${value}%`,
                        name === 'income' ? 'Income' : 'Yield'
                      ]}
                      contentStyle={{
                        backgroundColor: '#ffffff',
                        border: '1px solid #e2e8f0',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Line 
                      yAxisId="income"
                      type="monotone" 
                      dataKey="income" 
                      stroke="#00c853" 
                      strokeWidth={3}
                      dot={{ fill: '#00c853', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      yAxisId="yield"
                      type="monotone" 
                      dataKey="yield" 
                      stroke="#00acc1" 
                      strokeWidth={3}
                      dot={{ fill: '#00acc1', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        )}

        {/* Property Wise Breakdown */}
        {selectedView === 'properties' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Pie Chart */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Income Distribution</h3>
                <div style={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={propertyBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {propertyBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Share']}
                        contentStyle={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #e2e8f0',
                          borderRadius: '12px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Property Details */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Property Performance</h3>
                <div className="space-y-4">
                  {propertyBreakdown.map((property, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full mr-3"
                          style={{ backgroundColor: property.color }}
                        ></div>
                        <div>
                          <p className="font-medium text-gray-900">{property.name}</p>
                          <p className="text-sm text-gray-600">{property.value}% of total income</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">₹{property.income.toLocaleString('en-IN')}</p>
                        <p className="text-sm text-gray-600">Annual Income</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}