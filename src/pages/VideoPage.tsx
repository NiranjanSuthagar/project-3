import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ThumbsUp, Share2, Heart, Send } from 'lucide-react';
import { mockVideos } from '../data/mockData';
import VideoCard from '../components/VideoCard';
import type { Comment, Video } from '../types';
import { v4 as uuidv4 } from 'uuid';

export default function VideoPage() {
  const { id } = useParams();
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [like, setLike] = useState<number | undefined>();
  const [video, setVideo] = useState<Video | undefined>();
  const [relatedVideos, setRelatedVideos] = useState<Video[] | undefined>();
  // const [entries, setEntries] = useState([] as Comment[]);

  useEffect(() => {
    if (id) {
      fetchComments();
      const video = mockVideos.find((v) => v.id === id);
      setVideo(video);
      setLike(video?.likes);
      setRelatedVideos(mockVideos.filter((v) => v.id !== id).slice(0, 5));
    }
  }, [id]);

  const fetchComments = async () => {
    try {
      setIsLoading(true);

      // Environment variables (Vite)
      const baseUrl = import.meta.env.VITE_REACT_APP_CONTENTSTACK_API_HOST;
      const accessToken = import.meta.env.VITE_REACT_APP_CONTENTSTACK_API_KEY;
      const contentTypeUid = import.meta.env.VITE_CONTENTSTACK_COMMENT_CONTENT_TYPE_UID;
      // console.log(baseUrl+" "+accessToken+" "+contentTypeUid)
      if (!baseUrl || !accessToken || !contentTypeUid) {
        console.error('Environment variables are missing');
        return;
      }
      // console.log("the id is: "+id);
      const queryUrl = `https://${baseUrl}/v3/content_types/${contentTypeUid}/entries?query={"vid_id": "${id}"}`;
      // console.log(queryUrl);
      // var entries =null;
      await fetch(queryUrl, {
        method: 'GET',
        headers: {
          'access_token': import.meta.env.VITE_REACT_APP_CONTENTSTACK_DELIVERY_TOKEN,
          'api_key': import.meta.env.VITE_REACT_APP_CONTENTSTACK_API_KEY,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
      }).then(res => {
        res.json().then(output => {
          // entries = output.entries;
          console.log(output.entries);
          setComments(output.entries);
          // console.log(entries);
        }).catch(err => {
          console.log(err);
        })
      }).catch(err => {
        console.log(err);
      });


      // console.log(entries);
      // const mappedComments = entries.map((entry: any) => ({

      //   id: entry.uid,
      //   content: entry.comment_text,
      //   published_at: entry.published_at,
      // }));

      // setComments(mappedComments);
    } catch (error) {
      console.log(error);
      console.error('Error fetching comments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const baseUrl = import.meta.env.VITE_REACT_APP_CONTENTSTACK_APP_HOST;
      const accessToken = import.meta.env.VITE_REACT_APP_CONTENTSTACK_API_KEY;
      const contentTypeUid = import.meta.env.VITE_CONTENTSTACK_COMMENT_CONTENT_TYPE_UID;
      // console.log(baseUrl+" "+accessToken+" "+contentTypeUid)
      if (!baseUrl || !accessToken || !contentTypeUid) {
        console.error('Environment variables are missing');
        return;
      }

      const postUrl = `https://${baseUrl}/v3/content_types/${contentTypeUid}/entries`;
      const uniqueTitle = `Comment_${Date.now()}_${uuidv4()}`;
      const new_comment= {
        title: uniqueTitle,
        vid_id: id,
        comment_text: comment,
        published_at: new Date().toISOString(),
      };
      setComments((prevComments) => [
        {
          id: new_comment.title,
          comment_text: new_comment.comment_text,
          published_at: new Date(),
        },
        ...prevComments,
      ]);
  
      setComment('');
      
      // First POST request to create the entry
      const response = await fetch(postUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          api_key: `${accessToken}`,
          authorization: import.meta.env.VITE_CONTENTSTACK_MANAGEMENT_TOKEN,
        },
        body: JSON.stringify({
          entry: new_comment,
        }),
      });

      if (!response.ok) throw new Error('Failed to create comment entry');

      const createdEntry = await response.json();
      const entryUid = createdEntry.entry.uid;

      // Second POST request to publish the entry
      const publishUrl = `https://${baseUrl}/v3/content_types/${contentTypeUid}/entries/${entryUid}/publish`;

      const publishResponse = await fetch(publishUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          api_key: `${accessToken}`,
          authorization: import.meta.env.VITE_CONTENTSTACK_MANAGEMENT_TOKEN,
        },
        body: JSON.stringify({
          "entry": {
            "environments": ["development"],
            "locales": ["en-us"]
          },
          "locale": "en-us",
          "version": 1,
        }),
      });

      if (!publishResponse.ok) throw new Error('Failed to publish comment entry');

      // const publishedEntry = await publishResponse.json();
      // fetchComments();
      // window.location.reload();
      // console.log(publishResponse)
      // setComments((prev) => [
      //   {
      //     id: publishedEntry.entry.uid,
      //     comment_text: publishedEntry.entry.comment_text,
      //     published_at: publishedEntry.entry.published_at,
      //   },
      //   ...prev,
      // ]);

      // setComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

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
                <source src={video.videoUrl} type="video/mp4" />
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
                  onClick={() => {
                    
                    if(isLiked==false){
                      setLike(like => (like !== undefined) ? like +1: like);

                    }
                    if(isLiked==true){
                      setLike(like => (like !== undefined) ? like-1: like);
                    }
                    setIsLiked(!isLiked);


                  }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 ${isLiked
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                >
                  {isLiked ? <Heart size={20} /> : <ThumbsUp size={20} />}
                  <span>{like?.toString()}</span>
                </button>
                <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-800 text-gray-300 hover:bg-gray-700 transition-all duration-300">
                  <Share2 size={20} />
                  <span>Share</span>
                </button>
              </div>
            </div>

            <div className="mt-6 bg-gray-800 rounded-xl p-6">
              <p className="text-sm text-gray-400">
                {video.views.toLocaleString()} views •{' '}
                {new Date(video.uploadDate).toLocaleDateString()}
              </p>
              <p className="mt-4 text-gray-200">{video.description}</p>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-6 text-gray-100">Comments</h3>

              <form onSubmit={handleCommentSubmit} className="mb-8">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="w-full px-4 py-3 bg-gray-800 border-b border-gray-700 focus:border-green-500 focus:outline-none text-gray-100 placeholder-gray-500 transition-all duration-300 pr-12"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-700 rounded-full transition-colors duration-300"
                    disabled={!comment.trim()}
                  >
                    <Send
                      size={20}
                      className={`${comment.trim()
                          ? 'text-green-400'
                          : 'text-gray-500'
                        } transition-colors duration-300`}
                    />
                  </button>
                </div>
              </form>

              <div className="space-y-6">
                {isLoading ? (
                  <div className="text-center text-gray-400">
                    Loading comments...
                  </div>
                ) : comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded-lg slide-in">
                      <p className="text-gray-300">{comment.comment_text}</p>
                      <span className="text-sm text-gray-500 mt-2 block">
                        {new Date(comment.published_at).toLocaleDateString()}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-centexr text-gray-400">
                    No comments yet. Be the first to comment!
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-100">Related Videos</h3>
            <div className="flex flex-col gap-6">
              {relatedVideos?.map((video, index) => (
                <VideoCard key={video.id} video={video} delay={index * 100} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
