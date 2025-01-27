import React from 'react';
import VideoCard from '../components/VideoCard';
import { mockVideos } from '../data/mockData';

export default function Home() {
  return (
    <div className="pt-16 min-h-screen bg-gray-900">
      <div className="max-w-8xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {mockVideos.map((video, index) => (
            <VideoCard key={video.id} video={video} delay={index * 100} />
          ))}
        </div>
      </div>
    </div>
  );
}