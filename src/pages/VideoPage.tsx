import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ThumbsUp, Share2, MessageSquare, Heart } from 'lucide-react';
// import { mockVideos } from '../data/mockData';
import { mockVideos } from  '../data/mockData';
import VideoCard from '../components/VideoCard';

export default function VideoPage() {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  
  const video = mockVideos.find(v => v.id === id);
  const relatedVideos = mockVideos.filter(v => v.id !== id).slice(0, 5);
  
  if (!video) return <div>Video not found</div>;

  return (
    <div className="pt-16 min-h-screen bg-gray-900">
      <div className="max-w-8xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 fade-in">
            <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden shadow-2xl shadow-green-500/10">
              <video
                src={video.videoUrl}
                poster={video.thumbnailUrl}
                controls
                className="w-full h-full object-cover"
              >
                <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            
            <h1 className="text-2xl font-bold mt-6 text-gray-100">{video.title}</h1>
            
            <div className="flex items-center justify-between mt-6">
              <Link 
                to={`/channel/${video.channel.id}`} 
                className="flex items-center gap-4 group hover:bg-gray-800 p-3 rounded-xl transition-colors duration-300"
              >
                <img
                  src={video.channel.avatarUrl}
                  alt={video.channel.name}
                  className="w-12 h-12 rounded-full ring-2 ring-green-500 ring-offset-2 ring-offset-gray-900 group-hover:scale-110 transition-transform duration-300"
                />
                <div>
                  <h3 className="font-semibold text-gray-100 group-hover:text-green-400 transition-colors duration-300">
                    {video.channel.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {video.channel.subscribers.toLocaleString()} subscribers
                  </p>
                </div>
              </Link>
              
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${
                    isLiked 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {isLiked ? <Heart size={20} /> : <ThumbsUp size={20} />}
                  <span>{video.likes.toLocaleString()}</span>
                </button>
                <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 transition-all duration-300">
                  <Share2 size={20} />
                  <span>Share</span>
                </button>
              </div>
            </div>
            
            <div className="mt-6 bg-gray-800 rounded-xl p-6">
              <p className="text-sm text-gray-400">
                {video.views.toLocaleString()} views • {new Date(video.uploadDate).toLocaleDateString()}
              </p>
              <p className="mt-4 text-gray-200">{video.description}</p>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-6 text-gray-100">Comments</h3>
              <div className="flex items-center gap-4">
                <MessageSquare className="text-gray-400" size={24} />
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="flex-1 px-4 py-3 bg-gray-800 border-b border-gray-700 focus:border-green-500 focus:outline-none text-gray-100 placeholder-gray-500 transition-all duration-300"
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-100">Related Videos</h3>
            <div className="flex flex-col gap-6">
              {relatedVideos.map((video, index) => (
                <VideoCard key={video.id} video={video} delay={index * 100} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}