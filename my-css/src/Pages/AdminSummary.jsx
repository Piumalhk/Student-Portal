import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import NavBar from '../components/NavBar';

export default function AdminSummary() {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  // Mock data - replace with API call in production
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockData = [
        { id: 1, rating: 4, department: 'Computer Science', date: '2025-05-01', sentiment: 'positive', comment: 'Great teaching methods!' },
        { id: 2, rating: 2, department: 'Mathematics', date: '2025-05-03', sentiment: 'negative', comment: 'Difficult to follow lectures.' },
        { id: 3, rating: 5, department: 'Computer Science', date: '2025-05-10', sentiment: 'positive', comment: 'Excellent resources provided.' },
        { id: 4, rating: 3, department: 'Business', date: '2025-05-15', sentiment: 'neutral', comment: 'Average experience, could be better.' },
        { id: 5, rating: 1, department: 'Mathematics', date: '2025-05-20', sentiment: 'negative', comment: 'Lectures were not engaging.' },
        { id: 6, rating: 4, department: 'Business', date: '2025-05-25', sentiment: 'positive', comment: 'Great practical examples.' },
        { id: 7, rating: 5, department: 'Engineering', date: '2025-06-01', sentiment: 'positive', comment: 'Excellent lab sessions.' },
        { id: 8, rating: 2, department: 'Engineering', date: '2025-06-05', sentiment: 'negative', comment: 'Need more hands-on activities.' },
      ];
      setFeedbackData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter data based on user selections
  const filteredData = feedbackData.filter(item => {
    if (departmentFilter !== 'all' && item.department !== departmentFilter) return false;
    
    if (dateFilter === 'last30') {
      const today = new Date();
      const itemDate = new Date(item.date);
      const diffTime = Math.abs(today - itemDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 30;
    }
    
    return true;
  });

  // Prepare data for department chart
  const departmentData = [];
  const departments = {};
  
  filteredData.forEach(item => {
    if (!departments[item.department]) {
      departments[item.department] = { name: item.department, count: 0 };
      departmentData.push(departments[item.department]);
    }
    departments[item.department].count++;
  });

  // Prepare data for sentiment chart
  const sentimentData = [
    { name: 'Positive', value: filteredData.filter(item => item.sentiment === 'positive').length },
    { name: 'Neutral', value: filteredData.filter(item => item.sentiment === 'neutral').length },
    { name: 'Negative', value: filteredData.filter(item => item.sentiment === 'negative').length },
  ];

  // Prepare data for rating chart
  const ratingData = [
    { name: '5 Stars', value: filteredData.filter(item => item.rating === 5).length },
    { name: '4 Stars', value: filteredData.filter(item => item.rating === 4).length },
    { name: '3 Stars', value: filteredData.filter(item => item.rating === 3).length },
    { name: '2 Stars', value: filteredData.filter(item => item.rating === 2).length },
    { name: '1 Star', value: filteredData.filter(item => item.rating === 1).length },
  ];

  // Calculate average rating
  const averageRating = filteredData.length > 0
    ? (filteredData.reduce((sum, item) => sum + item.rating, 0) / filteredData.length).toFixed(1)
    : 0;

  // Colors for pie charts
  const SENTIMENT_COLORS = ['#4CAF50', '#2196F3', '#F44336'];
  const RATING_COLORS = ['#4CAF50', '#8BC34A', '#FFC107', '#FF9800', '#F44336'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="container mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 pt-10">Feedback Analysis Dashboard</h1>
        
        {/* Filters */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-8">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time Period</label>
              <select 
                className="border border-gray-300 rounded-md px-3 py-2"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="last30">Last 30 Days</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
              <select 
                className="border border-gray-300 rounded-md px-3 py-2"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option value="all">All Departments</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Business">Business</option>
                <option value="Engineering">Engineering</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Total Feedback</h2>
            <p className="text-4xl font-bold text-blue-600">{filteredData.length}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Average Rating</h2>
            <div className="flex items-center">
              <p className="text-4xl font-bold text-blue-600 mr-2">{averageRating}</p>
              <div className="text-yellow-400 flex">
                {[1, 2, 3, 4, 5].map(star => (
                  <svg key={star} xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${star <= Math.round(averageRating) ? 'fill-current' : 'fill-gray-300'}`} viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Sentiment Analysis</h2>
            <div className="flex items-center">
              <div className="w-full grid grid-cols-3 gap-2">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {sentimentData[0].value}
                  </div>
                  <div className="text-sm text-gray-500">Positive</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {sentimentData[1].value}
                  </div>
                  <div className="text-sm text-gray-500">Neutral</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {sentimentData[2].value}
                  </div>
                  <div className="text-sm text-gray-500">Negative</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Department Distribution */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Feedback by Department</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={departmentData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Sentiment Distribution */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Feedback Sentiment</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                  <Pie
                    data={sentimentData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {sentimentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={SENTIMENT_COLORS[index % SENTIMENT_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Rating Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Rating Distribution</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={400} height={400}>
                <Pie
                  data={ratingData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {ratingData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={RATING_COLORS[index % RATING_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
       
      </div>
    </div>
  );
}