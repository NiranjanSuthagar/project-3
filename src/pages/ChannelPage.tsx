import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockChannels, mockVideos } from '../data/mockData';
import VideoCard from '../components/VideoCard';
import { Channel, Video } from '../types';

export default function ChannelPage() {
  const { id } = useParams();

  const [channel, setChannel] = useState<Channel>();
  const [channelVideos, setChannelVideos] = useState<Video[]>();

  useEffect(() => {
    mockChannels.then(result => {
      const output = result.find(c => c.id === id);
      setChannel(output);
    }).catch(err => {
      console.log(err);
    });
    mockVideos.then(result => {
      const output = result.filter(v => v.channel.id === id);
      setChannelVideos(output);
    }).catch(err => {
      console.log(err);
    })
  }, []);
  
  if (!channel) return <div>Channel not found</div>;

  return (
    <div className="pt-16 min-h-screen bg-gray-900">
      <div className="h-48 bg-gradient-to-r from-green-900/50 to-gray-800/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=200&fit=crop')] bg-cover bg-center opacity-30" />
      </div>
      <div className="max-w-8xl mx-auto px-4">
        <div className="flex items-center gap-8 -mt-12 mb-12 relative z-10">
          <img
            src={channel.avatarUrl}
            alt={channel.name}
            className="w-40 h-40 rounded-full border-4 border-gray-900 ring-4 ring-green-500 transform hover:scale-105 transition-transform duration-300"
          />
          <div>
            <h1 className="text-4xl font-bold text-gray-100 laser-text">
              {channel.name}
            </h1>
            <p className="text-xl text-gray-400 mt-2">
              {channel.subscribers.toLocaleString()} subscribers
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {channelVideos?.map((video, index) => (
            <VideoCard key={video.id} video={video} delay={index * 100} />
          ))}
        </div>
      </div>
    </div>
  );
}