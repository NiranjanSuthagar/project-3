export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  views: number;
  likes: number;
  uploadDate: string;
  channel: Channel;
}

export interface Channel {
  id: string;
  name: string;
  avatarUrl: string;
  subscribers: number;
  videos: Video[];
}