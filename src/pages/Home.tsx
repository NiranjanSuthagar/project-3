import React, { useEffect, useState } from 'react';
import VideoCard from '../components/VideoCard';
import { mockVideos } from '../data/mockData';
import { Video } from '../types';

export default function Home() {

  const [data, setData] = useState<Video[]>();

  useEffect(() => {
    mockVideos.then(result => {
      setData(result);
    }).catch(err => {
      console.log(err);
    })
  }, []);

  return (
    <div className="pt-16 min-h-screen bg-gray-900">
      <div className="max-w-8xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {(data !== undefined) ? data.map((video, index) => (
            <VideoCard key={video.id} video={video} delay={index * 100} />
          )): ""}
        </div>
      </div>
    </div>
  );
}