import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import VideoPage from './pages/VideoPage';
import ChannelPage from './pages/ChannelPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/video/:id" element={<VideoPage />} />
          <Route path="/channel/:id" element={<ChannelPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;