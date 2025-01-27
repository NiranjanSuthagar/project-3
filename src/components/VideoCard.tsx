import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { Video } from '../types';

interface VideoCardProps {
  video: Video;
  delay?: number;
}

export default function VideoCard({ video, delay = 0 }: VideoCardProps) {
  return (
    <div className="flex flex-col group slide-in" style={{ animationDelay: `${delay}ms` }}>
      <Link to={`/video/${video.id}`} className="relative overflow-hidden rounded-lg">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          className="w-full aspect-video object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>
      <div className="flex gap-3 mt-3">
        <Link to={`/channel/${video.channel.id}`} className="shrink-0">
          <img
            src={video.channel.avatarUrl}
            alt={video.channel.name}
            className="w-10 h-10 rounded-full ring-2 ring-green-500 ring-offset-2 ring-offset-gray-900 transform group-hover:scale-110 transition-transform duration-300"
          />
        </Link>
        <div>
          <Link to={`/video/${video.id}`}>
            <h3 className="font-semibold line-clamp-2 group-hover:text-green-400 transition-colors duration-300">
              {video.title}
            </h3>
          </Link>
          <Link to={`/channel/${video.channel.id}`}>
            <p className="text-sm text-gray-400 mt-1 hover:text-green-400 transition-colors duration-300">
              {video.channel.name}
            </p>
          </Link>
          <p className="text-sm text-gray-500">
            {video.views.toLocaleString()} views • {formatDistanceToNow(new Date(video.uploadDate))} ago
          </p>
        </div>
      </div>
    </div>
  );
}